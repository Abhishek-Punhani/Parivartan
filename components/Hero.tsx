import React from "react";
import Link from "next/link";
import { Button } from "@/components/buttons/button";
import { Droplet, Users, Award } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative">
            <div className="bg-gradient-to-b from-blue-100 to-white">
                <div className="container mx-auto px-6 py-16 md:py-20">
                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                            Join the Fight for <span className="text-blue-500">Clean Rivers</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Report pollution incidents, organize cleanup campaigns, and make a real difference in your community's waterways.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                            <Link href="/report">
                                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 font-semibold text-white">
                                    <Droplet className="mr-2 h-5 w-5" />
                                    Report Pollution
                                </Button>
                            </Link>
                            <Link href="/community">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border border-blue-500 text-blue-500 hover:bg-blue-50"
                                >
                                    <Users className="mr-2 h-5 w-5" />
                                    Join Community
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-14 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            RiverWatchers unites communities to monitor, report, and clean up river pollution through these simple steps:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Droplet className="h-8 w-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Report Pollution</h3>
                            <p className="text-gray-600">
                                Submit photos, location details, and describe the pollution you've spotted in rivers.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Join Cleanups</h3>
                            <p className="text-gray-600">
                                Participate in community-organized cleanup events to restore river ecosystems.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Earn Recognition</h3>
                            <p className="text-gray-600">
                                Get rewarded for your contributions and rise up the community leaderboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
