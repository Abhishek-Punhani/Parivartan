import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import { createCampaign } from "@/utils/validation";
import db from "../../../utils/db";
import auth from "@/middleware/auth";

interface AuthenticatedRequest extends NextApiRequest {
    user: {
        id: string,
        _id:string;
    };
}

const router = createRouter<AuthenticatedRequest, NextApiResponse>();

router.use(cors());
router.use(auth);

router.post(async (req, res) => {
    try {
        await db.connectDb();
        console.log("db connected");
        await createCampaign(req.body, req.user.id);

        db.disconnectDb();

        res.status(201).json({ message: "Campaign created successfully" });
    }
    catch (error) {

        console.error("Validation error:", error);
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