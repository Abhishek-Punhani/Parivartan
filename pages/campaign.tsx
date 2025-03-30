import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import DotLoaderSpinner from "../components/loaders/dotLoader";

export default function Campaigns() {
  const [upcomingCampaigns, setUpcomingCampaigns] = useState<Campaign[]>([]);
  const [pastCampaigns, setPastCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/campaign/retrieve`);
        setUpcomingCampaigns(response.data.upcomingCampaigns);
        setPastCampaigns(response.data.pastCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className="relative min-h-screen overflow-hidden flex flex-col items-center bg-gray-100">
        <div className="w-full max-w-6xl p-12 mt-12 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" passHref>
              <div className="w-10 h-10 border border-gray-400 rounded-full grid place-items-center cursor-pointer hover:border-blue-500">
                <BiLeftArrowAlt className="w-6 h-6 text-gray-800 hover:text-blue-500" />
              </div>
            </Link>
            <h1 className="text-4xl font-bold">Campaigns</h1>
          </div>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Upcoming Campaigns</h2>
            {upcomingCampaigns.length === 0 ? (
              <p>No upcoming campaigns at the moment. Check back later!</p>
            ) : (
              upcomingCampaigns.map((campaign, index) => (
                <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold">{campaign.title}</h3>
                  <p className="text-gray-700">{campaign.description}</p>
                  <p className="text-gray-600">Location: {campaign.location}</p>
                  <p className="text-gray-600">Date: {new Date(campaign.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">Organizer: {campaign.organizer}</p>
                  {campaign.images && campaign.images.length > 0 && (
                    <div className="flex mt-4 space-x-4">
                      {campaign.images.map((image, idx) => (
                        <img key={idx} src={image} alt={`Campaign image ${idx + 1}`} className="w-32 h-32 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </section>
          <section>
            <h2 className="text-3xl font-semibold mb-4">Past Campaigns</h2>
            {pastCampaigns.length === 0 ? (
              <p>No past campaigns available.</p>
            ) : (
              pastCampaigns.map((campaign, index) => (
                <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold">{campaign.title}</h3>
                  <p className="text-gray-700">{campaign.description}</p>
                  <p className="text-gray-600">Location: {campaign.location}</p>
                  <p className="text-gray-600">Date: {new Date(campaign.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">Organizer: {campaign.organizer}</p>
                  {campaign.images && campaign.images.length > 0 && (
                    <div className="flex mt-4 space-x-4">
                      {campaign.images.map((image, idx) => (
                        <img key={idx} src={image} alt={`Campaign image ${idx + 1}`} className="w-32 h-32 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}