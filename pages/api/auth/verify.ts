import { createRouter } from "next-connect";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/models/User";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb();
    const { token } = req.body;
    console.log("token", token);
    let decoded;
    try {
      decoded = jwt.verify(token[0], process.env.JWT_SECRET as string) as {
        id: string;
      };
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.isEmailVerified = true;
    await user.save();
    await db.disconnectDb();
    return res.json({
      message: "Activation email sent! Please check your email to activate.",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});
export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
