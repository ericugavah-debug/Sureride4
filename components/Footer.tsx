
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-bus-2-line text-2xl text-red-500"></i>
              </div>
              <span className="text-xl font-semibold">SureRide</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Safe, affordable, and convenient interstate travel for Nigerian university students. 
              Connecting students to their destinations with trusted transport partners.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-facebook-fill text-xl text-gray-400 hover:text-white cursor-pointer"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-twitter-fill text-xl text-gray-400 hover:text-white cursor-pointer"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-instagram-fill text-xl text-gray-400 hover:text-white cursor-pointer"></i>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/book" className="text-gray-400 hover:text-white cursor-pointer">Book a Trip</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white cursor-pointer">About Us</Link></li>
              <li><Link href="/safety" className="text-gray-400 hover:text-white cursor-pointer">Safety</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-white cursor-pointer">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white cursor-pointer">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white cursor-pointer">Contact Us</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white cursor-pointer">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 SureRide. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <Link href="https://readdy.ai/?origin=logo" className="text-gray-400 hover:text-white text-sm cursor-pointer">
              Made with Readdy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
