"use client";

import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-xl shadow-lg z-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 bg-clip-text text-transparent tracking-wide">
          Glamour Salon
        </h1>
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
          <a href="/" className="relative hover:text-rose-500 transition-all duration-300 group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/services" className="relative hover:text-rose-500 transition-all duration-300 group">
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/about" className="relative hover:text-rose-500 transition-all duration-300 group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/contact" className="relative hover:text-rose-500 transition-all duration-300 group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/services"
            className="ml-6 px-4 py-2 bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 text-white font-semibold rounded-full shadow-md hover:brightness-110 transition duration-300"
          >
            Book Your Transformation
          </a>
        </div>
        <button className="md:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
