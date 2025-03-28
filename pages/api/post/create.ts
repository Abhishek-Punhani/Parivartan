import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import { createPost } from "../../../utils/validation";
import db from "../../../utils/db"; // Database connection
import auth from "../../../middleware/auth"; // Authentication middleware
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";


interface AuthenticatedRequest extends NextApiRequest {
    user: {
        _id: string;
    };
}
const router = createRouter<AuthenticatedRequest, NextApiResponse>();

router.use(cors());
// router.use(auth);

router.post(async (req, res) => {
    try {
        await db.connectDb();
        console.log(req.body);
        console.log(req.body.author);

        const validation = await createPost(req.body,'67e59897b0555f2db5046ecd');
        const session = await getServerSession(req, res, authOptions);
        console.log(session);
        db.disconnectDb();

        res.status(201).json({ message: "Post created successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

});

export default router.handler({
    onError: (err: unknown, req: AuthenticatedRequest, res: NextApiResponse) => {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        console.error("API Error:", err);
        res.status(500).json({ error: errorMessage });
    },
});