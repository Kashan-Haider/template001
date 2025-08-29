"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ServicesSection from '@/sections/ServicesSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import GallerySection from '@/sections/GallerySection';
import BusinessOverviewSection from '@/sections/BusinessOverviewSection';
import FAQSection from '@/sections/FAQSection';
import ContactSection from '@/sections/ContactSection';
import FooterSection from '@/sections/FooterSection';

interface LandingPageData {
  id: string;
  templateId: string;
  businessName: string;
  content: any;
  seoData: any;
  themeData: any;
  businessData: any;
  images?: Array<{
    id: string;
    slotName: string;
    title: string;
    altText: string;
    imageUrl: string;
    category: string;
  }>;
}

export default function Home() {
  const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        // Use the correct templateId and id from our database
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID
        const id = process.env.NEXT_PUBLIC_ID;

        const response = await fetch(
          `/api/template?templateId=${templateId}&id=${id}`
        );
        const data = await response.json();
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading landing page...</p>
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
      title={landingPageData.seoData?.title} 
      description={landingPageData.seoData?.description} 
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
    >
      <Navbar 
        businessName={landingPageData.businessName} 
        logoImage={landingPageData.images?.find((img: any) => img.slotName === 'logo-image')?.imageUrl}
        themeData={landingPageData.themeData} 
      />
      <main>

      {landingPageData.content?.hero && (
        <HeroSection
          title={landingPageData.content.hero.title}
          subtitle={landingPageData.content.hero.subtitle}
          description={landingPageData.content.hero.description}
          ctaButton={landingPageData.content.hero.ctaButton}
          backgroundImage={landingPageData.images?.find((img: any) => img.slotName === 'hero-background' || img.category === 'hero')?.imageUrl}
        />
      )}

      {landingPageData.content?.about && (
        <AboutSection
          title={landingPageData.content.about.title}
          description={landingPageData.content.about.description}
          features={landingPageData.content.about.features}
          ctaButton={landingPageData.content.about.ctaButton}
          image={landingPageData.images?.find((img: any) => img.slotName === 'about' || img.category === 'about')?.imageUrl}
          theme={landingPageData.themeData}
        />
      )}

      {landingPageData.content?.services && (
        <ServicesSection
          title={landingPageData.content.services.title}
          description={landingPageData.content.services.description}
          services={landingPageData.content.services.services}
          theme={landingPageData.themeData}
        />
      )}

      {landingPageData.content?.testimonials && (
        <TestimonialsSection
          title={landingPageData.content.testimonials.title}
          description={landingPageData.content.testimonials.description}
          testimonials={landingPageData.content.testimonials.testimonials}
          theme={landingPageData.themeData}
        />
      )}

      {landingPageData.content?.gallery && (
        <GallerySection
          title={landingPageData.content.gallery.title}
          description={landingPageData.content.gallery.description}
          images={landingPageData.images?.filter((img: any) => img.category === 'gallery' || img.slotName === 'gallery')}
        />
      )}

      {landingPageData.content?.businessOverview && (
        <BusinessOverviewSection
          content={landingPageData.content.businessOverview.content}
          contact={landingPageData.content?.contact}
          businessData={landingPageData.businessData}
          theme={landingPageData.themeData}
        />
      )}

      {landingPageData.content?.faq && (
        <FAQSection
          title={landingPageData.content.faq.title}
          description={landingPageData.content.faq.description}
          questions={landingPageData.content.faq.questions}
        />
      )}

      {landingPageData.content?.footer && (
        <FooterSection
          links={landingPageData.content.footer.links}
          copyright={landingPageData.content.footer.copyright}
          socialLinks={landingPageData.businessData?.socialLinks}
          themeData={landingPageData.themeData}
        />
      )}
      </main>
    </Layout>
  );
}
