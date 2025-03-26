import db from "../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connectDb();
  res.status(200).json({ name: "John Doe" });
}
