import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import { createPost } from "../../../utils/validation";
import db from "../../../utils/db"; // Database connection
import auth from "../../../middleware/auth"; // Authentication middleware
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import PostModel from "@/models/Post";

interface AuthenticatedRequest extends NextApiRequest {
    user: {
        _id: string;
    };
}
const router = createRouter<AuthenticatedRequest, NextApiResponse>();

router.use(cors());
router.use(auth);

router.post(async (req, res) => {
    try {
        await db.connectDb();
        const validation = await createPost(req.body, req.user._id);
        if (!validation.isValid) {
            return res.status(400).json({ error: validation.errors });
        }
        const session = await getServerSession(req, res, authOptions);

        const newPost = new PostModel({
            ...req.body,
            author: req.user._id,
        });
        await newPost.save();
        await db.disconnectDb();

        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await db.disconnectDb();
    }
});

router.get(async (req, res) => {
    try {
        await db.connectDb();
        const posts = await PostModel.find().sort({ createdAt: -1 });
        await db.disconnectDb();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await db.disconnectDb();
    }
});

export default router.handler({
    onError: (err: unknown, req: AuthenticatedRequest, res: NextApiResponse) => {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        console.error("API Error:", err);
        res.status(500).json({ error: errorMessage });
    },
});