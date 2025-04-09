import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import { createRouter } from "next-connect";
import cors from "cors";
import CampaignModel from "@/models/Campaign";
// Removed unused 'auth' import

const router = createRouter<NextApiRequest, NextApiResponse>();

interface Campaign {
  date: string;
  [key: string]: any;
}

router.use(cors());

router.get(async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("Request received:"), await db.connectDb();
    const now = new Date();
    const campaigns: Campaign[] = await CampaignModel.find().sort({ date: 1 });
    const upcomingCampaigns = campaigns.filter(
      (campaign: Campaign) => new Date(campaign.date) >= now
    );
    const pastCampaigns = campaigns.filter(
      (campaign: Campaign) => new Date(campaign.date) < now
    );
    return res.status(200).json({ upcomingCampaigns, pastCampaigns });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler({
  onError: (err: unknown, _: NextApiRequest, res: NextApiResponse) => {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error("API Error:", err);
    res.status(500).json({ error: errorMessage });
  },
});
