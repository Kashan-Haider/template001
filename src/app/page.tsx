"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ServicesSection from "@/sections/ServicesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import GallerySection from "@/sections/GallerySection";
import BusinessOverviewSection from "@/sections/BusinessOverviewSection";
import FAQSection from "@/sections/FAQSection";
import ServiceAreasSection from "@/sections/ServiceAreasSection";
import ServiceHighlightsSection from "@/sections/ServiceHighlightsSection";
import FooterSection from "@/sections/FooterSection";
import CTASection from "@/sections/CTASection";
import { LandingPageData } from "@/types/template";
import CompanyDetails from "@/sections/CompanyDetails";

export default function Home() {
  const [landingPageData, setLandingPageData] =
    useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        // Use the correct templateId and id from our database
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        const id = process.env.NEXT_PUBLIC_ID;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

        const response = await fetch(
          `${apiUrl}/api/template?templateId=${templateId}&id=${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: LandingPageData = await response.json();
        console.log("Fetched data:", data);
        setLandingPageData(data);
      } catch (error) {
        console.error("Error fetching landing page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPageData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200 mx-auto mb-4"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-blue-600 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium animate-pulse">
            Loading landing page<span className="loading-dots"></span>
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (!landingPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load landing page data</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout
      title={landingPageData.seoData.title}
      description={landingPageData.seoData.description}
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
    >
      <div className="animate-fade-in-up">
        <Navbar
          businessName={landingPageData.businessName}
          logoImage={
            landingPageData.images?.find((img) => img.slotName === "logo-image")
              ?.imageUrl
          }
          themeData={landingPageData.themeData}
        />
        <main>
          {landingPageData.content.hero && (
            <HeroSection
              title={landingPageData.content.hero.title}
              subtitle={landingPageData.content.hero.subtitle}
              description={landingPageData.content.hero.description}
              ctaButton={
                landingPageData.content.hero.ctaButton || {
                  label: "Learn More",
                  href: "#",
                }
              }
              backgroundImage={
                landingPageData.images?.find(
                  (img) =>
                    img.slotName === "hero-image-1" || img.category === "hero"
                )?.imageUrl
              }
            />
          )}

          {landingPageData.content.serviceHighlights && (
            <ServiceHighlightsSection
              data={landingPageData.content.serviceHighlights}
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.about && (
            <AboutSection
              title={landingPageData.content.about.title}
              description={landingPageData.content.about.description}
              features={landingPageData.content.about.features}
              ctaButton={
                landingPageData.content.about.ctaButton || {
                  label: "Contact Us",
                  href: "#contact",
                }
              }
              image={
                landingPageData.images?.find(
                  (img) => img.slotName === "about" || img.category === "about"
                )?.imageUrl
              }
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.companyDetails && (
            <CompanyDetails
              data={landingPageData.content.companyDetails}
              images={landingPageData.images}
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.services && (
            <ServicesSection
              title={landingPageData.content.services.title}
              description={landingPageData.content.services.description}
              services={landingPageData.content.services.services}
              theme={landingPageData.themeData}
              images={
                landingPageData.images?.filter((img) =>
                  img.slotName.includes("services")
                ) || []
              }
            />
          )}

          {landingPageData.content.testimonials && (
            <TestimonialsSection
              title={landingPageData.content.testimonials.title}
              description={landingPageData.content.testimonials.description}
              testimonials={landingPageData.content.testimonials.testimonials}
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.ctaSection && (
            <CTASection
              data={landingPageData.content.ctaSection}
              theme={landingPageData.themeData}
              images={landingPageData.images}
            />
          )}

          {landingPageData.content.gallery && (
            <GallerySection
              title={landingPageData.content.gallery.title}
              description={landingPageData.content.gallery.description}
              images={landingPageData.images?.filter(
                (img) =>
                  img.category === "gallery" || img.slotName === "gallery"
              )}
            />
          )}

          {landingPageData.content.businessOverview && (
            <BusinessOverviewSection
              content={landingPageData.content.businessOverview.content}
              contact={
                landingPageData.content.contact || {
                  title: "Contact Us",
                  description: "Get in touch with us today",
                  showMap: true,
                }
              }
              businessData={landingPageData.businessData}
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.faq && (
            <FAQSection
              title={landingPageData.content.faq.title}
              description={landingPageData.content.faq.description}
              questions={landingPageData.content.faq.questions}
            />
          )}

          {landingPageData.businessData.serviceAreas &&
            landingPageData.businessData.serviceAreas.length > 0 && (
              <ServiceAreasSection
                serviceAreas={landingPageData.businessData.serviceAreas}
                themeData={landingPageData.themeData}
              />
            )}

          <FooterSection
            businessName={landingPageData.businessName}
            businessDescription={
              landingPageData.content?.about?.description ||
              "Professional services you can trust. We're here to help with all your business needs."
            }
            logoImage={
              landingPageData.images?.find(
                (img) => img.slotName === "logo-image"
              )?.imageUrl
            }
            businessData={landingPageData.businessData}
            themeData={landingPageData.themeData}
            copyright={landingPageData.content.footer?.copyright}
          />
        </main>
      </div>
    </Layout>
  );
}
