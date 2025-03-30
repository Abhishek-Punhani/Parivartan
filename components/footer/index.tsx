import React from "react";
import Link from "next/link";
import { Droplets } from "lucide-react";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-river-500" />
              <span className="text-xl font-bold">Parivartan</span>
            </div>
            <p className="text-gray-400">
              A community-driven platform for river pollution reporting and
              cleanup initiatives across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <BsFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <BsTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <BsInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-400 hover:text-white">
                  Pollution Map
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-gray-400 hover:text-white">
                  Report Pollution
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-400 hover:text-white"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="text-gray-400 hover:text-white"
                >
                  Education
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Government Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://cpcb.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Central Pollution Control Board
                </a>
              </li>
              <li>
                <a
                  href="http://www.nwic.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  National Water Informatics Centre
                </a>
              </li>
              <li>
                <a
                  href="https://swachhbharat.mygov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Swachh Bharat Mission
                </a>
              </li>
              <li>
                <a
                  href="https://www.india-wris.nrsc.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  India-WRIS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Parivartan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
