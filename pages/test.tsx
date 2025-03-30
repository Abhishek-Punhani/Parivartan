import React from "react";
import ReportCard from "@/components/ReportCard";
import { useToast } from "@/contexts/toast/toastContext";

export default function TestPage() {
  const toast = useToast();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Test Report Page
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore detailed reports on river pollution and its impact on the
              environment and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="cursor-pointer bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <ReportCard
                id={1}
                title="Pollution in River Ganga"
                description="Severe pollution observed in the river, affecting the local ecosystem and community health."
                location="Varanasi"
                riverName="Ganga"
                severity="high"
                date="2025-03-30"
                image="https://cdn.dnaindia.com/sites/default/files/2021/07/23/986750-ganga-pollution.jpg?im=FitAndFill=(1200,900)"
                likes={100}
                comments={20}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => {
              toast.open({
                message: {
                  heading: "Info",
                  content: "This is an informational toast message",
                },
                duration: 5000,
                position: "top-center",
                color: "info",
              });
            }}
          >
            Show Info Toast
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={() => {
              toast.open({
                message: {
                  heading: "Success",
                  content: "This is a success toast message",
                },
                duration: 5000,
                position: "top-center",
                color: "success",
              });
            }}
          >
            Show Success Toast
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={() => {
              toast.open({
                message: {
                  heading: "Error",
                  content: "This is an error toast message",
                },
                duration: 5000,
                position: "top-center",
                color: "error",
              });
            }}
          >
            Show Error Toast
          </button>
        </div>
      </main>
    </div>
  );
}
