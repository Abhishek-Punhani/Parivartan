import { Button } from "@/components/buttons/button";
import Footer from "@/components/footer";
import { Input } from "@/components/inputs/input";
import Navbar from "@/components/Navbar";
import { Award, Badge, CalendarDays, MapPin, Plus, Search, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";


export default function Community() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

const topContributors = [
  {
    id: 1,
    name: "Aarav Sharma",
    location: "Mumbai",
    points: 1280,
    events: 15,
    reports: 32,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Delhi",
    points: 1150,
    events: 12,
    reports: 28,
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: 3,
    name: "Vikram Mehta",
    location: "Bangalore",
    points: 980,
    events: 10,
    reports: 22,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Deepika Reddy",
    location: "Chennai",
    points: 920,
    events: 8,
    reports: 30,
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 5,
    name: "Raj Kumar",
    location: "Kolkata",
    points: 870,
    events: 9,
    reports: 20,
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              River Guardian Community
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join forces with fellow environmentalists to organize cleanups,
              share knowledge, and make a real difference in river conservation.
            </p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search events, locations, or rivers"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-green-500 hover:bg-green-600 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Cleanup Event
            </Button>
          </div>

          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="impact">Community Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="overflow-hidden shadow-sm opacity-70 border border-gray-200 rounded-lg"
                            >
                                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                                <div className="p-4 border-b border-gray-200">
                                    <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mt-2"></div>
                                </div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 mb-4">
                            No events found matching your search criteria.
                        </p>
                        <button
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                            onClick={() => setSearchText("")}
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Organize Your Own Cleanup Event
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-6">
                                Making a difference is easier than you think! Organize your own river
                                cleanup event and we'll help you every step of the way.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-green-100 rounded-full p-2 mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Plan & Schedule</h4>
                                        <p className="text-sm text-gray-600">
                                            Choose a location, date, and time that works for your community.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="bg-green-100 rounded-full p-2 mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a2 2 0 00-2-2h-3M9 20H4v-2a2 2 0 012-2h3m7-4h5v-2a2 2 0 00-2-2h-3m-7 0H4v-2a2 2 0 012-2h3m7-4h5V4a2 2 0 00-2-2h-3M9 4H4a2 2 0 00-2 2v2h5m7 4H4a2 2 0 00-2 2v2h5"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Recruit Volunteers</h4>
                                        <p className="text-sm text-gray-600">
                                            Invite friends, family, and use our platform to gather
                                            participants.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="bg-green-100 rounded-full p-2 mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 9V7a4 4 0 00-8 0v2m-2 0a6 6 0 0112 0v2a6 6 0 01-12 0V9m6 6v2m0 4h.01"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Execute & Report</h4>
                                        <p className="text-sm text-gray-600">
                                            Lead the cleanup and track your impact with our reporting tools.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                            <h4 className="font-semibold text-gray-800 mb-3">
                                Ready to make a difference?
                            </h4>

                            <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4">
                                Start Planning Your Event
                            </button>

                            <p className="text-sm text-gray-600">
                                By creating an event, you're taking a crucial step in river
                                conservation. Our team will provide guidance and resources to help
                                ensure your event is a success.
                            </p>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800">Top Contributors</h3>
                                <p className="text-gray-600">
                                    Recognizing our most active community members making a difference in river conservation.
                                </p>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {topContributors.map((user, index) => (
                                    <div key={user.id} className="p-4 flex items-center space-x-4">
                                        <div className="font-semibold text-lg text-gray-500 w-8 text-center">{index + 1}</div>

                                        <div className="relative">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            {index < 3 && (
                                                <div
                                                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                                                        index === 0
                                                            ? "bg-yellow-500"
                                                            : index === 1
                                                            ? "bg-gray-400"
                                                            : "bg-amber-600"
                                                    }`}
                                                >
                                                    {index === 0 ? "1" : index === 1 ? "2" : "3"}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800">{user.name}</h4>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {user.location}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <div className="font-bold text-green-600">{user.points} pts</div>
                                            <div className="text-xs text-gray-500">
                                                {user.events} events • {user.reports} reports
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-gray-200 text-center">
                                <Button variant="link" className="text-blue-600">
                                    View Complete Leaderboard
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center mb-2">
                                <Award className="h-6 w-6 text-orange-500" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800">Monthly Challenges</h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Complete challenges to earn extra points
                            </p>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-3 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-gray-800">Report 5 Pollution Incidents</h4>
                                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">500 pts</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">3/5 completed</div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-gray-800">Participate in 2 Cleanups</h4>
                                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">750 pts</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">1/2 completed</div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-gray-800">Organize a Cleanup Event</h4>
                                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">1000 pts</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "0%" }}></div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">0/1 completed</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-2">
                                <TrendingUp className="h-6 w-6 text-blue-500" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800">Your Status</h4>
                            <p className="text-sm text-gray-600 mb-4">Your contribution statistics</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Your Rank</span>
                                    <span className="font-bold text-gray-800">#42</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Points</span>
                                    <span className="font-bold text-gray-800">580</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Reports Submitted</span>
                                    <span className="font-bold text-gray-800">12</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Events Participated</span>
                                    <span className="font-bold text-gray-800">3</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Events Organized</span>
                                    <span className="font-bold text-gray-800">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">15,750 kg</div>
                        <div className="text-gray-600">Waste Collected</div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">247</div>
                        <div className="text-gray-600">Cleanup Events</div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <div className="text-4xl font-bold text-orange-600 mb-2">5,280</div>
                        <div className="text-gray-600">Participants</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800">Impact by Region</h3>
                        <p className="text-gray-600">
                            River cleanup progress across different regions of India.
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            {[
                                { region: "Mumbai", rivers: "Mithi River, Ulhas River", weight: "4,350 kg", events: "62 events", progress: "85%" },
                                { region: "Delhi", rivers: "Yamuna River", weight: "3,820 kg", events: "54 events", progress: "75%" },
                                { region: "Varanasi", rivers: "Ganges River", weight: "2,980 kg", events: "45 events", progress: "60%" },
                                { region: "Chennai", rivers: "Cooum River, Adyar River", weight: "2,450 kg", events: "38 events", progress: "50%" },
                                { region: "Pune", rivers: "Mula-Mutha Rivers", weight: "2,150 kg", events: "32 events", progress: "40%" },
                            ].map((data, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{data.region}</h4>
                                            <p className="text-sm text-gray-500">{data.rivers}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-green-600">{data.weight}</div>
                                            <div className="text-xs text-gray-500">{data.events}</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: data.progress }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Types of Waste Collected</h3>
                        <div className="space-y-4">
                            {[
                                { type: "Plastic Waste", percentage: "68%" },
                                { type: "Fabric & Clothing", percentage: "12%" },
                                { type: "Glass & Metal", percentage: "8%" },
                                { type: "Styrofoam", percentage: "6%" },
                                { type: "Rubber", percentage: "4%" },
                                { type: "Other", percentage: "2%" },
                            ].map((data, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-gray-600">{data.type}</span>
                                        <span className="text-sm font-semibold text-gray-800">{data.percentage}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: data.percentage }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Most Improved Rivers</h3>
                        <div className="space-y-6">
                            {[
                                { river: "Sabarmati River", description: "Water quality improved by 32% in the past 6 months due to regular cleanup efforts." },
                                { river: "Mithi River", description: "Significant reduction in floating waste and improved dissolved oxygen levels." },
                                { river: "Adyar River", description: "Restored riverbanks with native vegetation helping filter pollutants." },
                            ].map((data, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="bg-green-100 rounded-full p-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-green-600"
                                        >
                                            <path d="m18 15-6-6-6 6" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{data.river}</h4>
                                        <p className="text-sm text-gray-600">{data.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
