import React from "react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-gray-900 text-white mt-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-pink-900/20"></div>
      
      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand section */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Glamour Salon
              </h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Where beauty meets artistry. Transform your look with our premium salon services and expert stylists.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <span className="text-white text-sm">ig</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <span className="text-white text-sm">tw</span>
                </div>
              </div>
            </div>
            
            {/* Contact info */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-rose-300">Contact</h4>
              <div className="space-y-3 text-gray-300">
                <p>📞 +212 123 456 789</p>
                <p>✉️ hello@glamoursalon.ma</p>
                <p>📍 123 Avenue Mohammed V, Casablanca</p>
              </div>
            </div>
            
            {/* Hours */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-rose-300">Hours</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 9:00 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Glamour Salon. All rights reserved. | Crafted with ❤️ for beauty
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
