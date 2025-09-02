"use client";

import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";
import Link from "next/link";

interface SocialLink {
  platform: string;
  url: string;
}

interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
}

interface ServiceArea {
  city: string;
  region: string;
  description?: string;
}

interface BusinessData {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  socialLinks?: SocialLink[];
  serviceAreas?: ServiceArea[];
}

interface FooterSectionProps {
  businessName: string;
  businessDescription?: string;
  logoImage?: string;
  businessData?: BusinessData;
  themeData?: ThemeData;
  copyright?: string;
}

export default function FooterSection({
  businessName,
  businessDescription,
  logoImage,
  businessData,
  themeData,
  copyright,
}: FooterSectionProps) {
  const { ref: footerRef, isVisible: footerVisible } =
    useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { ref: serviceAreasRef, visibleItems } = useStaggeredAnimation(
    businessData?.serviceAreas?.length || 0,
    100
  );

  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case "facebook":
        return (
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        );
      case "instagram":
        return (
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
        );
      case "twitter":
        return (
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        );
      case "linkedin":
        return (
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
        );
      case "youtube":
        return (
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
        );
      default:
        return null;
    }
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="py-16 relative overflow-hidden"
      style={{
        background: themeData
          ? `linear-gradient(135deg, ${themeData.primaryColor}dd, ${themeData.secondaryColor}dd, #000000)`
          : "#1f2937",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-5 rounded-full blur-3xl animate-pulse"
        style={{
          background: themeData
            ? `radial-gradient(circle, ${themeData.primaryColor}40, transparent)`
            : "rgba(255,255,255,0.1)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 opacity-3 rounded-full blur-2xl animate-bounce"
        style={{
          background: themeData
            ? `radial-gradient(circle, ${themeData.secondaryColor}40, transparent)`
            : "rgba(255,255,255,0.05)",
        }}
      />

      <div className="px-5 md:px-10 lg:px-20 relative">
        {/* Logo + Business Info */}
        <div className="flex flex-col lg:flex-row md:items-center justify-around gap-8 mb-12">
          <div className="text-start flex flex-col">
            {logoImage && (
              <div className="mb-6">
                <img
                  src={logoImage}
                  alt={`${businessName} logo`}
                  className="h-16 w-auto mx-auto lg:mx-0 hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300">
              {businessName}
            </h3>
            <h1>
              {" "}
              {businessDescription && (
                <p className="text-lg text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {businessDescription}
                </p>
              )}
            </h1>
            {/* Social Links */}
            {businessData?.socialLinks &&
              businessData.socialLinks.length > 0 && (
                <div className="">
                  <div className="flex space-x-4 mt-5">
                    {businessData.socialLinks.map((social, index) => {
                      const iconPath = getSocialIcon(social.platform);
                      return (
                        <a
                          key={index}
                          href={social.url}
                          className="text-white/80 hover:text-white transition-colors p-3 rounded-full hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Follow us on ${social.platform}`}
                        >
                          {iconPath ? (
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              {iconPath}
                            </svg>
                          ) : (
                            <span className="text-sm">{social.platform}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div>
            <h3
                    className={`text-2xl font-bold text-white md:text-center mb-8 transition-all duration-1000 ${
                      footerVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    Quick Links
                  </h3>

                  <div className="flex flex-col gap-2 md:items-center">
                  <Link href={'#home'} >Home</Link>
                  <Link href={'#about'} >About</Link>
                  <Link href={'#services'} >Services</Link>
                  <Link href={'#testimoinials'} >Testimonials</Link>
                  <Link href={'#contact'} >Contact</Link>
                  </div>

            </div>
            {/* Service Areas */}
            {businessData?.serviceAreas &&
              businessData.serviceAreas.length > 0 && (
                <div className="mb-12">
                  <h3
                    className={`text-2xl font-bold text-white md:text-center mb-8 transition-all duration-1000 ${
                      footerVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    Service Areas
                  </h3>
                  <div
                    ref={serviceAreasRef}
                    className="flex flex-col gap-4 md:items-center justify-center"
                  >
                    {businessData.serviceAreas.map((area, index) => (
                      <div key={index}>{area.city}</div>
                    ))}
                  </div>
                </div>
              )}

            <div className="flex flex-col gap-1 md:text-center">
              <h3
                className={`text-2xl font-bold text-white text-center mb-8 transition-all duration-1000 ${
                  footerVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Contact Us
              </h3>
              <h3 className="">{businessName}</h3>
              <h3>{businessData?.email}</h3>
              <h3>{businessData?.phone}</h3>
              <h3>{businessData?.phone}</h3>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="text-center">
            <p className="text-white/80 text-sm">
              {copyright ||
                `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
