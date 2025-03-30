import React from 'react';
import ReportCard from '@/components/ReportCard';

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="cursor-pointer">
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
      </main>
    </div>
  );
}