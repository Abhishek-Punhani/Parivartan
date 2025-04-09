import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import db from "../../../utils/db"; // Database connection
import PostModel from "@/models/Post";
import auth from "@/middleware/auth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(cors());

router.get(async (req, res) => {
  try {
    await db.connectDb();
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler({
  onError: (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error("API Error:", err);
    res.status(500).json({ error: errorMessage });
  },
});
