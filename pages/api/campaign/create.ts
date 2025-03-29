import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import { createCampaign } from "@/utils/validation";
import db from "../../../utils/db";

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
        await createCampaign(req.body, '67e64564cdb446899d9eeb68');

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