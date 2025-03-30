import React, { useState } from "react";
import { User, Mail, MapPin, Calendar, Edit } from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
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
      },
      {
        id: 2,
        type: "Report",
        title: "Pollution near Green Lake",
        date: "2023-07-22",
      },
      {
        id: 3,
        type: "Campaign",
        title: "Water Quality Workshop",
        date: "2023-08-10",
      },
    ],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userData.name}
            </h2>
            <button className="mt-2 text-sm flex items-center text-blue-500 hover:text-blue-600">
              <Edit className="w-4 h-4 mr-1" />
              Edit Profile
            </button>

            <div className="w-full mt-6 space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                <span>{userData.email}</span>
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
            <h3 className="text-lg font-semibold mb-2 text-gray-800">About</h3>
            <p className="text-gray-600">{userData.bio}</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Your Activity
            </h3>
            <div className="space-y-4">
              {userData.activities.map((activity) => (
                <div key={activity.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 mb-2">
                        {activity.type}
                      </span>
                      <h4 className="text-lg font-medium text-gray-800">
                        {activity.title}
                      </h4>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.date}
                    </span>
                  </div>
                  <div className="mt-2 flex">
                    <Link
                      href={
                        activity.type === "Campaign"
                          ? `/campaigns/${activity.id}`
                          : `/posts/${activity.id}`
                      }
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600 mb-1">Campaigns Joined</h4>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600 mb-1">
                  Reports Submitted
                </h4>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600 mb-1">Total Impact</h4>
                <p className="text-2xl font-bold text-blue-600">High</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
