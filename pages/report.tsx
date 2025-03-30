import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/index";
import ReportForm from "@/components/forms/ReportForm";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

const Report = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Report River Pollution
              </h1>
              <p className="text-gray-600">
                Your reports help us track and address pollution issues across
                India's rivers. Please provide as much detail as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-100 p-2 mb-3">
                  <AlertTriangle className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Report Accurately
                </h3>
                <p className="text-sm text-gray-600">
                  Be as specific and accurate as possible when describing the
                  pollution.
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex flex-col items-center text-center">
                <div className="rounded-full bg-orange-100 p-2 mb-3">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Stay Safe</h3>
                <p className="text-sm text-gray-600">
                  Don't put yourself at risk. Maintain a safe distance from
                  polluted areas.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex flex-col items-center text-center">
                <div className="rounded-full bg-green-100 p-2 mb-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Take Action
                </h3>
                <p className="text-sm text-gray-600">
                  After reporting, consider organizing or joining a cleanup
                  event.
                </p>
              </div>
            </div>

            <ReportForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Report;
