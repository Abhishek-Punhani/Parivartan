import db from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb();

    await db.disconnectDb();
    return res.send("Hello World");
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
