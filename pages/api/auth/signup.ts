import { createRouter } from "next-connect";
import { createUser } from "../../../utils/validation";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../../utils/sendEmails";
import { activateEmail } from "../../../emails/activateEmail";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb();
    const user: User = req.body;

    const newUser = await createUser(user);

    const activation_token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2d",
      }
    );
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    try {
      await sendEmail(
        newUser.email,
        url,
        "Activate your account.",
        activateEmail
      );
    } catch (emailError) {
      console.error("Failed to send activation email:", emailError);
      return res
        .status(500)
        .json({ message: "Failed to send activation email." });
    }
    await newUser.save();

    await db.disconnectDb();
    return res.json({
      message: "Register success! Please activate your email to start.",
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
