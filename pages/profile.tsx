"use client";
import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Calendar,
  Edit,
  Award,
  Activity,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(session);

  const [userData, setUserData] = useState({
    name: "River Guardian",
    email: "user@example.com",
    location: "Seattle, WA",
    joinDate: "January 2023",
    bio: "Passionate about river conservation and environmental protection. I regularly participate in cleanup events and educational workshops.",
    activities: [
      {
        id: 1,
        type: "Campaign",
        title: "Seattle River Cleanup",
        date: "2023-06-15",
        status: "Completed",
      },
      {
        id: 2,
        type: "Report",
        title: "Pollution near Green Lake",
        date: "2023-07-22",
        status: "Published",
      },
      {
        id: 3,
        type: "Campaign",
        title: "Water Quality Workshop",
        date: "2023-08-10",
        status: "Ongoing",
      },
    ],
    badges: [
      {
        id: 1,
        name: "Cleanup Champion",
        description: "Participated in 5+ cleanup events",
      },
      {
        id: 2,
        name: "Watershed Watcher",
        description: "Submitted 3+ water quality reports",
      },
    ],
    governmentSchemes: [
      { id: 1, name: "Swachh Bharat Mission", status: "Participating" },
      { id: 2, name: "River Rejuvenation Initiative", status: "Eligible" },
    ],
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img
                    src={user?.picture || "/default-profile.png"}
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.name}
                </h2>
                <button className="mt-2 text-sm flex items-center text-blue-500 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Profile
                </button>

                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                    <span>Joined {userData.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  About
                </h3>
                <p className="text-gray-600 text-sm">{userData.bio}</p>
              </div>

              {/* Badges/Achievements Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-500" />
                  Achievements
                </h3>
                <div className="space-y-4">
                  {userData.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Award className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {badge.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Government Schemes Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Government Schemes
                </h3>
                <div className="space-y-3">
                  {userData.governmentSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm font-medium text-gray-800">
                        {scheme.name}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          scheme.status === "Participating"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {scheme.status}
                      </span>
                    </div>
                  ))}
                  <Link
                    href="/government-schemes"
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium block text-center mt-2"
                  >
                    Explore More Schemes
                  </Link>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-500" />
                  Your Activity
                </h3>
                <div className="space-y-6">
                  {userData.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 mb-2">
                            {activity.type}
                          </span>
                          <h4 className="text-lg font-medium text-gray-800">
                            {activity.title}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500 block mb-1">
                            {activity.date}
                          </span>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                              activity.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : activity.status === "Published"
                                ? "bg-blue-100 text-blue-800"
                                : activity.status === "Ongoing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {activity.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex">
                        <Link
                          href={
                            activity.type === "Campaign"
                              ? `/campaigns/${activity.id}`
                              : `/posts/${activity.id}`
                          }
                          className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-500" />
                  Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                    <Activity className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <h4 className="text-sm text-gray-600 mb-1">
                        Campaigns Joined
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">5</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                    <FileText className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <h4 className="text-sm text-gray-600 mb-1">
                        Reports Submitted
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                    <Award className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <h4 className="text-sm text-gray-600 mb-1">
                        Total Impact
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">High</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href="/historical-trends"
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                  >
                    View Historical Trends
                  </Link>
                </div>
              </div>

              {/* Data Security Note */}
              <div className="mt-6 text-center text-xs text-gray-500">
                <p>Your data is protected with industry-standard encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
