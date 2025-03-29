import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';
import CampaignModel from '@/models/Campaign';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connectDb();
    const now = new Date();
    const campaigns = await CampaignModel.find().sort({ date: 1 });
    const upcomingCampaigns = campaigns.filter(campaign => new Date(campaign.date) >= now);
    const pastCampaigns = campaigns.filter(campaign => new Date(campaign.date) < now);
    await db.disconnectDb();
    res.status(200).json({ upcomingCampaigns, pastCampaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;