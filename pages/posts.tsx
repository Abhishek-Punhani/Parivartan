import Navbar from '@/components/Navbar';
import { Button } from '@/components/buttons/button';
import Footer from '@/components/footer/index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { AlertTriangle, Clock, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Posts() {
  // const { toast } = useToast();
  const [searchText, setSearchText] = useState('');
  const [sortMethod, setSortMethod] = useState('trending');
  const [pollutionTypeFilter, setPollutionTypeFilter] = useState('all');
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Pollution Reports</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Community-submitted pollution reports from across India. Join us in tracking and addressing environmental issues.
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports by title, location, or author"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <Select value={pollutionTypeFilter} onValueChange={setPollutionTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pollution Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Water">Water Pollution</SelectItem>
                    <SelectItem value="Air">Air Pollution</SelectItem>
                    <SelectItem value="Soil">Soil Pollution</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortMethod} onValueChange={setSortMethod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Trending</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="recent">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Most Recent</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="severity">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Highest Severity</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {posts.length} reports
              </div>

              <Link href="/report">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Report New Pollution
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}