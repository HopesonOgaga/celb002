import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div>
            <a href="/"><h1 className="font-bold text-2xl text-gray-800 cursor-pointer uppercase">Creative artist spot</h1></a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a
            href="#about"
            className="text-gray-700 hover:text-gray-600 transition"
          >
            About
          </a>
          {/* <a
            href="#portfolio"
            className="text-gray-700 hover:text-gray-600 transition"
          >
            Portfolio
          </a> */}
          <a
            href="#service"
            className="text-gray-700 hover:text-gray-600 transition"
          >
            Services
          </a>
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:block">
          <a href="#service">
            {" "}
            <button className="bg-gray-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg hover:bg-gray-900 active:bg-gray-950 transition">
              Book a Call
            </button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-600 ease-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 p-4 bg-white">
          <a
            href="#about"
            className="text-gray-700 hover:text-gray-600 transition"
          >
            About
          </a>
          {/* <a
            href="#portfolio"
            className="text-gray-700 hover:text-gray-600 transition"
          >
            Portfolio
          </a> */}
          <a
            href="#service"
            className="text-gray-700 hover:text-gray-600 transition"
          >
            Services
          </a>
          <a href="#service">
            {" "}
            <button className="bg-gray-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg hover:bg-gray-900 active:bg-gray-950 transition">
              Book a Call
            </button>
          </a>
        </nav>
      </div>
    </header>
  );
}
