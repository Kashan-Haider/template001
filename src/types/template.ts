// TypeScript interfaces matching the landing-page-builder_dashboard schema
export interface BusinessHour {
  day: string;
  hours: string;
  isClosed: boolean;
}

export interface BusinessContact {
  id?: string;
  businessName: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  emergencyEmail: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  businessHours?: BusinessHour[];
}

export interface SEOSettings {
  id?: string;
  title: string;
  description: string;
  keywords: string[];
}

export interface Theme {
  id?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface CtaButton {
  id?: string;
  label: string;
  href: string;
}

export interface ServiceArea {
  id?: string;
  city: string;
  region: string;
  description: string;
  ctaButton?: CtaButton;
}

export interface SocialPlatform {
  id?: string;
  platform: string;
  url: string;
  socialLinkId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SocialLink {
  id?: string;
  name: string;
  socialPlatforms?: SocialPlatform[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Image {
  id?: string;
  title: string;
  altText: string;
  slotName: string;
  imageUrl: string;
  category?: string;
  createdAt?: string;
}

export interface HeroSection {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  ctaButtons?: CtaButton[];
}

export interface AboutSection {
  id?: string;
  title: string;
  description: string;
  features: string[];
  ctaButton?: CtaButton;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  features: string[];
  ctaButton?: CtaButton;
}

export interface ServicesSection {
  id?: string;
  title: string;
  description: string;
  services?: Service[];
  ctaButton?: CtaButton;
}

export interface GallerySection {
  id?: string;
  title: string;
  description: string;
  images?: Image[];
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  text: string;
}

export interface GalleryItem {
  id?: string;
  title: string;
  description: string;
  category: string;
  ctaButton?: CtaButton;
}

export interface TestimonialsSection {
  id?: string;
  title: string;
  description: string;
  testimonials?: Testimonial[];
  galleryItems?: GalleryItem[];
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category: string;
}

export interface FAQSection {
  id?: string;
  title: string;
  description: string;
  faqItems?: FAQItem[];
}

export interface ServiceAreaSection {
  id?: string;
  title: string;
  description: string;
  serviceAreas?: ServiceArea[];
  ctaButton?: CtaButton;
}

export interface BusinessDetailSubSection {
  id?: string;
  title: string;
  description: string;
  ctaTitle: string;
}

export interface BusinessContactForm {
  id?: string;
  title: string;
}

export interface MapSettings {
  id?: string;
  latitude: number;
  longitude: number;
  locationName: string;
}

export interface BusinessDetailsSection {
  id?: string;
  title: string;
  subSections?: BusinessDetailSubSection[];
  contactForm?: BusinessContactForm;
  mapSettings?: MapSettings;
}

export interface CompanyOverviewSubSection {
  id?: string;
  title: string;
  description: string;
}

export interface CompanyOverviewSection {
  id?: string;
  title: string;
  subSections?: CompanyOverviewSubSection[];
  ctaButton?: CtaButton;
}

export interface Statistic {
  id?: string;
  value: string;
  label: string;
}

export interface ServiceHighlightsSection {
  id?: string;
  title: string;
  statistics?: Statistic[];
}

export interface PreFooterSection {
  id?: string;
  description: string;
}

export interface FooterServiceArea {
  id?: string;
  region: string;
  services: string[];
}

export interface FooterSection {
  id?: string;
  copyright: string;
  serviceAreas?: FooterServiceArea[];
}

export interface LandingPageData {
  id?: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  createdAt?: string;
  updatedAt?: string;

  // Core sections
  seoSettings?: SEOSettings;
  theme?: Theme;
  businessContact?: BusinessContact;
  socialPlatforms?: SocialPlatform[];
  imagesPool?: Image[];

  // Page sections
  heroSection?: HeroSection;
  aboutSection?: AboutSection;
  servicesSection?: ServicesSection;
  gallerySection?: GallerySection;
  testimonialsSection?: TestimonialsSection;
  faqSection?: FAQSection;
  serviceAreaSection?: ServiceAreaSection;
  businessDetailsSection?: BusinessDetailsSection;
  companyOverviewSection?: CompanyOverviewSection;
  serviceHighlightsSection?: ServiceHighlightsSection;
  preFooterSection?: PreFooterSection;
  footerSection?: FooterSection;
}

// Legacy interface for backward compatibility
export interface TemplateData extends LandingPageData {
  sections?: any[];
}
