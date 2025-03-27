import { createRouter } from "next-connect";
import { createUser } from "../../../utils/validation";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { encode } from "next-auth/jwt";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb();
    const user: User = req.body;

    const newUser = await createUser(user);

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2d",
      }
    );


    console.log(newUser);

    await db.disconnectDb();
    return res.json({
      message: "Register success! Please activate your email to start.",
      newUser: newUser,
      token,
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
