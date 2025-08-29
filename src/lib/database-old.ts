import { Pool } from "pg";

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Database client for querying PostgreSQL
export const dbClient = {
  async query(text: string, params?: any[]) {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result.rows;
    } finally {
      client.release();
    }
  },

  async fetchLandingPageData(templateId: string, id: string) {
    try {
      // Fetch complete landing page data with all relations
      // const query = `
      //   SELECT
      //     lp.id,
      //     lp.template_id,
      //     lp.business_name,
      //     lp.github_url,
      //     lp.created_at,
      //     lp.updated_at,

      //     -- SEO Settings
      //     seo.title as seo_title,
      //     seo.description as seo_description,
      //     seo.keywords as seo_keywords,

      //     -- Theme
      //     theme.primary_color,
      //     theme.secondary_color,

      //     -- Business Contact
      //     bc.business_name as contact_business_name,
      //     bc.phone,
      //     bc.emergency_phone,
      //     bc.email,
      //     bc.emergency_email,
      //     bc.street,
      //     bc.city,
      //     bc.state,
      //     bc.zip_code,
      //     bc.latitude,
      //     bc.longitude,

      //     -- Hero Section
      //     hs.title as hero_title,
      //     hs.subtitle as hero_subtitle,
      //     hs.description as hero_description,

      //     -- About Section
      //     abs.title as about_title,
      //     abs.description as about_description,
      //     abs.features as about_features,

      //     -- Services Section
      //     ss.title as services_title,
      //     ss.description as services_description,

      //     -- Gallery Section
      //     gs.title as gallery_title,
      //     gs.description as gallery_description,

      //     -- Testimonials Section
      //     ts.title as testimonials_title,
      //     ts.description as testimonials_description,

      //     -- FAQ Section
      //     faq.title as faq_title,
      //     faq.description as faq_description,

      //     -- Service Area Section
      //     sas.title as service_area_title,
      //     sas.description as service_area_description,

      //     -- Business Details Section
      //     bds.title as business_details_title,

      //     -- Company Overview Section
      //     cos.title as company_overview_title,

      //     -- Service Highlights Section
      //     shs.title as service_highlights_title,

      //     -- Pre Footer Section
      //     pfs.description as pre_footer_description,

      //     -- Footer Section
      //     fs.copyright as footer_copyright

      //   FROM "LandingPage" lp
      //   LEFT JOIN "SEOSettings" seo ON lp.seo_settings_id = seo.id
      //   LEFT JOIN "Theme" theme ON lp.theme_id = theme.id
      //   LEFT JOIN "BusinessContact" bc ON lp.business_contact_id = bc.id
      //   LEFT JOIN "HeroSection" hs ON lp.hero_section_id = hs.id
      //   LEFT JOIN "AboutSection" abs ON lp.about_section_id = abs.id
      //   LEFT JOIN "ServicesSection" ss ON lp.services_section_id = ss.id
      //   LEFT JOIN "GallerySection" gs ON lp.gallery_section_id = gs.id
      //   LEFT JOIN "TestimonialsSection" ts ON lp.testimonials_section_id = ts.id
      //   LEFT JOIN "FAQSection" faq ON lp.faq_section_id = faq.id
      //   LEFT JOIN "ServiceAreaSection" sas ON lp.service_area_section_id = sas.id
      //   LEFT JOIN "BusinessDetailsSection" bds ON lp.business_details_section_id = bds.id
      //   LEFT JOIN "CompanyOverviewSection" cos ON lp.company_overview_section_id = cos.id
      //   LEFT JOIN "ServiceHighlightsSection" shs ON lp.service_highlights_section_id = shs.id
      //   LEFT JOIN "PreFooterSection" pfs ON lp.pre_footer_section_id = pfs.id
      //   LEFT JOIN "FooterSection" fs ON lp.footer_section_id = fs.id
      //   WHERE lp.template_id = $1
      // `;

      const query = `SELECT * FROM cms_dashboard_db`;

      const result = await this.query(query, [templateId, id]);

      if (result.length === 0) {
        return null;
      }

      const landingPage = result[0];

      // Fetch additional related data
      const [
        businessHours,
        services,
        ctaButtons,
        socialPlatforms,
        images,
        testimonials,
        faqItems,
        serviceAreas,
        businessDetailSubSections,
        companyOverviewSubSections,
        statistics,
        footerServiceAreas,
      ] = await Promise.all([
        this.fetchBusinessHours(landingPage.id),
        this.fetchServices(landingPage.id),
        this.fetchCtaButtons(landingPage.id),
        this.fetchSocialPlatforms(landingPage.id),
        this.fetchImages(landingPage.id),
        this.fetchTestimonials(landingPage.id),
        this.fetchFAQItems(landingPage.id),
        this.fetchServiceAreas(landingPage.id),
        this.fetchBusinessDetailSubSections(landingPage.id),
        this.fetchCompanyOverviewSubSections(landingPage.id),
        this.fetchStatistics(landingPage.id),
        this.fetchFooterServiceAreas(landingPage.id),
      ]);

      return {
        id: landingPage.id,
        templateId: landingPage.template_id,
        businessName: landingPage.business_name,
        githubUrl: landingPage.github_url,
        createdAt: landingPage.created_at,
        updatedAt: landingPage.updated_at,
        seoSettings: {
          title: landingPage.seo_title,
          description: landingPage.seo_description,
          keywords: landingPage.seo_keywords,
        },
        theme: {
          primaryColor: landingPage.primary_color,
          secondaryColor: landingPage.secondary_color,
        },
        businessContact: {
          businessName: landingPage.contact_business_name,
          phone: landingPage.phone,
          emergencyPhone: landingPage.emergency_phone,
          email: landingPage.email,
          emergencyEmail: landingPage.emergency_email,
          street: landingPage.street,
          city: landingPage.city,
          state: landingPage.state,
          zipCode: landingPage.zip_code,
          latitude: landingPage.latitude,
          longitude: landingPage.longitude,
          businessHours,
        },
        heroSection: {
          title: landingPage.hero_title,
          subtitle: landingPage.hero_subtitle,
          description: landingPage.hero_description,
          ctaButtons: ctaButtons.filter((btn) => btn.section_type === "hero"),
        },
        aboutSection: {
          title: landingPage.about_title,
          description: landingPage.about_description,
          features: landingPage.about_features,
          ctaButton: ctaButtons.find((btn) => btn.section_type === "about"),
        },
        servicesSection: {
          title: landingPage.services_title,
          description: landingPage.services_description,
          services,
          ctaButton: ctaButtons.find((btn) => btn.section_type === "services"),
        },
        gallerySection: {
          title: landingPage.gallery_title,
          description: landingPage.gallery_description,
          images,
        },
        testimonialsSection: {
          title: landingPage.testimonials_title,
          description: landingPage.testimonials_description,
          testimonials,
        },
        faqSection: {
          title: landingPage.faq_title,
          description: landingPage.faq_description,
          faqItems,
        },
        serviceAreaSection: {
          title: landingPage.service_area_title,
          description: landingPage.service_area_description,
          serviceAreas,
          ctaButton: ctaButtons.find(
            (btn) => btn.section_type === "service_area"
          ),
        },
        businessDetailsSection: {
          title: landingPage.business_details_title,
          subSections: businessDetailSubSections,
        },
        companyOverviewSection: {
          title: landingPage.company_overview_title,
          subSections: companyOverviewSubSections,
          ctaButton: ctaButtons.find(
            (btn) => btn.section_type === "company_overview"
          ),
        },
        serviceHighlightsSection: {
          title: landingPage.service_highlights_title,
          statistics,
        },
        preFooterSection: {
          description: landingPage.pre_footer_description,
        },
        footerSection: {
          copyright: landingPage.footer_copyright,
          serviceAreas: footerServiceAreas,
        },
        socialPlatforms,
      };
    } catch (error) {
      console.error("Error fetching landing page data:", error);
      return null;
    }
  },

  async fetchBusinessHours(landingPageId: string) {
    const query = `
      SELECT bh.day, bh.hours, bh.is_closed
      FROM "BusinessHour" bh
      JOIN "BusinessContact" bc ON bh.business_contact_id = bc.id
      JOIN "LandingPage" lp ON lp.business_contact_id = bc.id
      WHERE lp.id = $1
      ORDER BY 
        CASE bh.day 
          WHEN 'Monday' THEN 1
          WHEN 'Tuesday' THEN 2
          WHEN 'Wednesday' THEN 3
          WHEN 'Thursday' THEN 4
          WHEN 'Friday' THEN 5
          WHEN 'Saturday' THEN 6
          WHEN 'Sunday' THEN 7
        END
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchServices(landingPageId: string) {
    const query = `
      SELECT s.id, s.title, s.description, s.features, cb.label as cta_label, cb.href as cta_href
      FROM "Service" s
      JOIN "ServicesSection" ss ON s.services_section_id = ss.id
      JOIN "LandingPage" lp ON lp.services_section_id = ss.id
      LEFT JOIN "CtaButton" cb ON s.cta_button_id = cb.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchCtaButtons(landingPageId: string) {
    const query = `
      SELECT cb.id, cb.label, cb.href, 'hero' as section_type
      FROM "CtaButton" cb
      JOIN "HeroSection" hs ON cb.id = ANY(hs.cta_button_ids)
      JOIN "LandingPage" lp ON lp.hero_section_id = hs.id
      WHERE lp.id = $1
      
      UNION ALL
      
      SELECT cb.id, cb.label, cb.href, 'about' as section_type
      FROM "CtaButton" cb
      JOIN "AboutSection" abs ON abs.cta_button_id = cb.id
      JOIN "LandingPage" lp ON lp.about_section_id = abs.id
      WHERE lp.id = $1
      
      UNION ALL
      
      SELECT cb.id, cb.label, cb.href, 'services' as section_type
      FROM "CtaButton" cb
      JOIN "ServicesSection" ss ON ss.cta_button_id = cb.id
      JOIN "LandingPage" lp ON lp.services_section_id = ss.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchSocialPlatforms(landingPageId: string) {
    const query = `
      SELECT sp.platform, sp.url
      FROM "SocialPlatform" sp
      JOIN "SocialLink" sl ON sp.social_link_id = sl.id
      JOIN "LandingPage" lp ON lp.social_link_id = sl.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchImages(landingPageId: string) {
    const query = `
      SELECT i.image_id, i.title, i.alt_text, i.image_url, i.category, i.description
      FROM "Image" i
      JOIN "ImagesPool" ip ON i.image_pool_id = ip.id
      JOIN "LandingPage" lp ON lp.image_pool_id = ip.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchTestimonials(landingPageId: string) {
    const query = `
      SELECT t.name, t.role, t.company, t.industry, t.text
      FROM "Testimonial" t
      JOIN "TestimonialsSection" ts ON t.testimonials_section_id = ts.id
      JOIN "LandingPage" lp ON lp.testimonials_section_id = ts.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchFAQItems(landingPageId: string) {
    const query = `
      SELECT fi.question, fi.answer, fi.category
      FROM "FAQItem" fi
      JOIN "FAQSection" fs ON fi.faq_section_id = fs.id
      JOIN "LandingPage" lp ON lp.faq_section_id = fs.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchServiceAreas(landingPageId: string) {
    const query = `
      SELECT sa.city, sa.region, sa.description, cb.label as cta_label, cb.href as cta_href
      FROM "ServiceArea" sa
      LEFT JOIN "CtaButton" cb ON sa.cta_button_id = cb.id
      WHERE sa.landing_page_id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchBusinessDetailSubSections(landingPageId: string) {
    const query = `
      SELECT bdss.title, bdss.description, bdss.cta_title
      FROM "BusinessDetailSubSection" bdss
      JOIN "BusinessDetailsSection" bds ON bdss.business_details_section_id = bds.id
      JOIN "LandingPage" lp ON lp.business_details_section_id = bds.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchCompanyOverviewSubSections(landingPageId: string) {
    const query = `
      SELECT coss.title, coss.description
      FROM "CompanyOverviewSubSection" coss
      JOIN "CompanyOverviewSection" cos ON coss.company_overview_section_id = cos.id
      JOIN "LandingPage" lp ON lp.company_overview_section_id = cos.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchStatistics(landingPageId: string) {
    const query = `
      SELECT s.value, s.label
      FROM "Statistic" s
      JOIN "ServiceHighlightsSection" shs ON s.service_highlights_section_id = shs.id
      JOIN "LandingPage" lp ON lp.service_highlights_section_id = shs.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },

  async fetchFooterServiceAreas(landingPageId: string) {
    const query = `
      SELECT fsa.region, fsa.services
      FROM "FooterServiceArea" fsa
      JOIN "FooterSection" fs ON fsa.footer_section_id = fs.id
      JOIN "LandingPage" lp ON lp.footer_section_id = fs.id
      WHERE lp.id = $1
    `;
    return await this.query(query, [landingPageId]);
  },
};

export default dbClient;
