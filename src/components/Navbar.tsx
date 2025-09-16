"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  businessName?: string;
  logoImage?: string;
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
  phoneNumber?: string;
}

export default function Navbar({
  businessName = "Business",
  logoImage,
  themeData,
  phoneNumber,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="shadow-lg fixed w-full z-50 backdrop-blur-sm"
      style={{
        background: themeData
          ? `linear-gradient(135deg, ${themeData.primaryColor}99, ${themeData.secondaryColor}99, #000000)`
          : "linear-gradient(135deg, #000000, #1f2937)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              {logoImage ? (
                <div className="flex items-center gap-5">
                  <Image
                    src={logoImage}
                    alt={`${businessName} Logo`}
                    width={200}
                    height={40}
                    className="h-10 w-auto max-w-[200px] object-contain"
                    priority
                  />
                  <h1 className="text-white font-bold md:block hidden text-2xl">
                    {businessName}
                  </h1>
                </div>
              ) : (
                <span className="md:text-2xl font-bold text-white">
                  {businessName}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#home"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="#testimonials"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              href={phoneNumber ? `tel:${phoneNumber}` : "#"}
              className="text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-0.5 border border-white/20 hover:border-white/40 backdrop-blur-sm"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
              }}
            >
              Call Us Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white/80 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden h-screen">
            <div
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/20 h-full flex flex-col items-center justify-center"
              style={{
                background: themeData
                  ? `linear-gradient(135deg, ${themeData.primaryColor}aa, ${themeData.secondaryColor}aa, #000000)`
                  : "linear-gradient(135deg, #000000, #1f2937)",
              }}
            >
              <Link
onClick={() => setIsOpen(false)}
href="#home"
                className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
              >
                Home
              </Link>
              <Link
onClick={() => setIsOpen(false)}
href="#about"
                className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
              >
                About
              </Link>
              <Link
onClick={() => setIsOpen(false)}
href="#services"
                className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
              >
                Services
              </Link>
              <Link
onClick={() => setIsOpen(false)}
href="#testimonials"
                className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
              >
                Testimonials
              </Link>
              <Link
onClick={() => setIsOpen(false)}
href="#contact"
                className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
              >
                Contact
              </Link>
              <Link
onClick={() => setIsOpen(false)}
href="#contact"
                className="block mx-3 my-2 text-white px-4 py-2 rounded-lg text-center transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm hover:bg-white/20"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
