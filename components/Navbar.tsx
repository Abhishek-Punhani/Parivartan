import React, { useState } from 'react';
import { Menu, X, Droplets, MapPin, BookOpen, Users, FileText } from 'lucide-react';
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Droplets className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-800">RiverWatchers</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/map" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100">
              Map
            </Link>
            <Link href="/posts" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100">
              Reports
            </Link>
            <Link href="/community" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100">
              Community
            </Link>
            <Link href="/education" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100">
              Education
            </Link>
            <Link href="/report">
              <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600">
                Report Pollution
              </button>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 space-y-2 shadow-lg">
          <Link href="/" className="block px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>Home</span>
            </div>
          </Link>
          <Link href="/map" className="block px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>Map</span>
            </div>
          </Link>
          <Link href="/posts" className="block px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>Reports</span>
            </div>
          </Link>
          <Link href="/community" className="block px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Community</span>
            </div>
          </Link>
          <Link href="/education" className="block px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span>Education</span>
            </div>
          </Link>
          <Link href="/report" className="block px-4 py-2 rounded-lg text-base font-medium bg-blue-500 text-white hover:bg-blue-600">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-white" />
              <span>Report Pollution</span>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
