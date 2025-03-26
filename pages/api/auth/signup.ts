import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import User from "../../../models/User";

import { NextApiRequest, NextApiResponse } from "next";

interface User {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  picture?: string;
  password: string;
  role: "User" | "Admin" | "SuperAdmin";
  isVerified: boolean;
  age: number;
}
const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // await db.connectDb();
    const user :User = req.body;
    
    console.log(user);
    // await db.disconnectDb();
    res.json({
      message: "Register success! Please activate your email to start.",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
