import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import { BookOpen, ExternalLink, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Education() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Educational Resources
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn about river pollution causes, impacts, and solutions through
              our curated collection of educational materials.
            </p>
          </div>
          <Tabs defaultValue="impacts" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="impacts">Pollution Impacts</TabsTrigger>
              <TabsTrigger value="solutions">Solutions</TabsTrigger>
              <TabsTrigger value="news">Latest News</TabsTrigger>
              <TabsTrigger value="chatbot">Ask AI Chatbot</TabsTrigger>
            </TabsList>

            {/* Pollution Impacts Tab */}
            <TabsContent value="impacts" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&q=80"
                      alt="Industrial pollution"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Health Impacts of River Pollution</CardTitle>
                    <CardDescription>
                      How polluted rivers affect human health and communities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      River pollution exposes communities to various health
                      risks including waterborne diseases, chemical exposure,
                      and contamination of food sources.
                    </p>
                    <a
                      href="#"
                      className="text-sky-600 hover:text-sky-700 text-sm flex items-center"
                    >
                      Read full article{" "}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&q=80"
                      alt="Dead fish"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Ecological Consequences</CardTitle>
                    <CardDescription>
                      How pollution disrupts river ecosystems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Pollution devastates aquatic habitats, causing oxygen
                      depletion, algal blooms, and threatening the survival of
                      fish, plants, and other organisms.
                    </p>
                    <a
                      href="#"
                      className="text-sky-600 hover:text-sky-700 text-sm flex items-center"
                    >
                      Read full article{" "}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1624806992066-5ffdef566d8d?w=800&q=80"
                      alt="Economic impact"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Economic & Social Impacts</CardTitle>
                    <CardDescription>
                      The hidden costs of polluted waterways
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      River pollution reduces tourism, decreases property
                      values, increases water treatment costs, and jeopardizes
                      industries dependent on clean water.
                    </p>
                    <a
                      href="#"
                      className="text-sky-600 hover:text-sky-700 text-sm flex items-center"
                    >
                      Read full article{" "}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Common River Pollutants
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-sky-500"
                      >
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                        <line x1="16" x2="2" y1="8" y2="22" />
                        <line x1="17.5" x2="9" y1="15" y2="15" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Industrial Waste
                      </h4>
                      <p className="text-sm text-gray-600">
                        Heavy metals, solvents, toxic sludge, and various
                        chemical compounds discharged from factories and
                        industries.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-sky-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Sewage & Wastewater
                      </h4>
                      <p className="text-sm text-gray-600">
                        Human waste, bacteria, household chemicals, and personal
                        care products from residential and municipal sources.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-sky-500"
                      >
                        <path d="M21 6H3" />
                        <path d="M17 6v12c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V6" />
                        <path d="M11 6v12c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1V6" />
                        <path d="M7 15c-1.5 0-3-.5-3-2v-2c0-1.5 1.5-2 3-2" />
                        <path d="M17 15c1.5 0 3-.5 3-2v-2c0-1.5-1.5-2-3-2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Agricultural Runoff
                      </h4>
                      <p className="text-sm text-gray-600">
                        Fertilizers, pesticides, herbicides, and animal waste
                        that wash into rivers from farms and agricultural lands.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-sky-500"
                      >
                        <rect
                          width="18"
                          height="12"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="2" x2="22" y1="20" y2="20" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Plastic Waste
                      </h4>
                      <p className="text-sm text-gray-600">
                        Bottles, bags, packaging, and microplastics that can
                        persist in the environment for hundreds of years.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/_ScqJ81eCgw"
                  title="River Pollution Documentary"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    The Crisis of India's Rivers
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This documentary explores the current state of India's major
                    rivers and the challenges they face from various pollution
                    sources.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Documentary • 15:24</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Solutions Tab */}
            <TabsContent value="solutions" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <BookOpen className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle>Policy & Regulation</CardTitle>
                    <CardDescription>
                      Legislative approaches to river protection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Learn about effective policies, regulations, and
                      enforcement mechanisms that can help protect rivers from
                      pollution.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          India's Water Pollution Control Acts
                        </a>
                      </li>
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          International River Protection Laws
                        </a>
                      </li>
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          River Rejuvenation Policies
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
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
                        className="text-green-500"
                      >
                        <path d="M12 2v20" />
                        <path d="M2 12h10" />
                        <path d="m7 17 5-5" />
                        <path d="m7 7 5 5" />
                        <rect width="10" height="20" x="12" y="2" rx="2" />
                      </svg>
                    </div>
                    <CardTitle>Technology Solutions</CardTitle>
                    <CardDescription>
                      Innovations for cleaner rivers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Explore cutting-edge technologies and engineering
                      solutions being used around the world to address river
                      pollution.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          Advanced Wastewater Treatment
                        </a>
                      </li>
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          River Cleanup Innovations
                        </a>
                      </li>
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          Plastic Capture Systems
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
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
                        className="text-green-500"
                      >
                        <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                      </svg>
                    </div>
                    <CardTitle>Community Action</CardTitle>
                    <CardDescription>What you can do to help</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Discover how individuals and communities can take action
                      to protect rivers and reduce pollution through everyday
                      choices.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          Organizing Effective Cleanups
                        </a>
                      </li>
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          Reducing Personal Pollution
                        </a>
                      </li>
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-green-500" />
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          Advocacy & Education Guide
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Government Schemes & Initiatives
                </h3>

                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Namami Gange Programme
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      An integrated conservation mission with a budget of Rs.
                      20,000 crore to accomplish the twin objectives of
                      effective abatement of pollution and conservation and
                      rejuvenation of the Ganges.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://nmcg.nic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        Official Website
                      </a>
                      <a
                        href="#"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        How to Participate
                      </a>
                      <a
                        href="#"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        Progress Reports
                      </a>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Central Pollution Control Board (CPCB)
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      The CPCB provides technical services for pollution
                      prevention and control in India's waterways, as well as
                      monitoring water quality across the country.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://cpcb.nic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        Official Website
                      </a>
                      <a
                        href="#"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        Water Quality Data
                      </a>
                      <a
                        href="#"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        Compliance Reporting
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      National River Conservation Plan (NRCP)
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      A centrally sponsored scheme with an objective to improve
                      the water quality of major rivers through the
                      implementation of various pollution abatement projects.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="http://moef.gov.in/nrcd/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        Official Website
                      </a>
                      <a
                        href="#"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        Covered Rivers
                      </a>
                      <a
                        href="#"
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        Project Funding
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"
                      alt="People cleaning a river"
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Success Stories
                    </h3>
                    <p className="text-gray-700 mb-4">
                      From the Thames in London to the Cheonggyecheon in Seoul,
                      many rivers around the world have been successfully
                      restored from severe pollution. India too has seen some
                      success in river restoration efforts.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Link
                        href="#"
                        className="text-sm text-green-600 hover:text-green-700 hover:underline flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 16 3-8 3 8" />
                          <path d="M14 17h-4" />
                        </svg>
                        Sabarmati Riverfront Development
                      </Link>
                      <Link
                        href="#"
                        className="text-sm text-green-600 hover:text-green-700 hover:underline flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 16 3-8 3 8" />
                          <path d="M14 17h-4" />
                        </svg>
                        Narmada Basin Protection
                      </Link>
                      <Link
                        href="#"
                        className="text-sm text-green-600 hover:text-green-700 hover:underline flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 16 3-8 3 8" />
                          <path d="M14 17h-4" />
                        </svg>
                        Cooum River Restoration
                      </Link>
                      <Link
                        href="#"
                        className="text-sm text-green-600 hover:text-green-700 hover:underline flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 16 3-8 3 8" />
                          <path d="M14 17h-4" />
                        </svg>
                        Global River Revival Models
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* News */}
            <TabsContent value="news" className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Latest River Pollution News
                  </h3>
                  <p className="text-gray-600">
                    Updates on river pollution issues, cleanup efforts, and
                    policy changes from across India.
                  </p>
                </div>

                <div className="divide-y divide-gray-100">
                  <div className="p-6 flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <img
                        src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&q=80"
                        alt="News thumbnail"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <div className="text-xs text-gray-500 mb-1">
                        May 30, 2023 • The Hindu
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Supreme Court Directs States to Submit River Pollution
                        Action Plans
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        The Supreme Court has directed all states to submit
                        comprehensive action plans to address river pollution
                        within their jurisdictions. The court expressed concern
                        over the deteriorating condition of major rivers...
                      </p>
                      <Link
                        href="#"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Read full article →
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <img
                        src="https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=400&q=80"
                        alt="News thumbnail"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <div className="text-xs text-gray-500 mb-1">
                        May 27, 2023 • India Today
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        New Technology Deployed to Clean Yamuna River
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        The Delhi government has deployed new floating barriers
                        and waste collection systems to tackle pollution in the
                        Yamuna River. These technologies, inspired by successful
                        models in Europe, are designed to...
                      </p>
                      <Link
                        href="#"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Read full article →
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <img
                        src="https://images.unsplash.com/photo-1519408299519-b7a0274f7d67?w=400&q=80"
                        alt="News thumbnail"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <div className="text-xs text-gray-500 mb-1">
                        May 25, 2023 • Economic Times
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Pharmaceutical Pollution in Indian Rivers Reaches
                        Alarming Levels
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        A new study has found high concentrations of
                        pharmaceutical compounds in several Indian rivers,
                        particularly near manufacturing hubs. Researchers warn
                        that these contaminants pose a significant threat to...
                      </p>
                      <Link
                        href="#"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Read full article →
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <img
                        src="https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?w=400&q=80"
                        alt="News thumbnail"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <div className="text-xs text-gray-500 mb-1">
                        May 22, 2023 • The Times of India
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Massive Citizen-Led Cleanup Drive Removes 40 Tons of
                        Waste from Mumbai Rivers
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Over 3,000 volunteers participated in a massive cleanup
                        drive across Mumbai's rivers last weekend, removing
                        approximately 40 tons of plastic and other waste. The
                        initiative, organized by local NGOs and...
                      </p>
                      <Link
                        href="#"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Read full article →
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center p-6 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <Link
                      href="#"
                      className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    >
                      1
                    </Link>
                    <Link
                      href="#"
                      className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    >
                      2
                    </Link>
                    <Link
                      href="#"
                      className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    >
                      3
                    </Link>
                    <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                      ...
                    </span>
                    <Link
                      href="#"
                      className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    >
                      8
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ChatBot */}
            
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
