import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {/* Call to Action */}
        <section className="py-20 bg-blue-300 text-black">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of citizens across India in the fight against river
              pollution. Your reports and actions matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/report">
                <button className="px-6 py-3 text-lg font-semibold bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition">
                  Report Pollution
                </button>
              </Link>
              <Link href="/community">
                <button className="px-6 py-3 text-lg font-semibold  border-white text-white rounded-lg hover:bg-river-700 transition border-2">
                  Join a Cleanup
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
