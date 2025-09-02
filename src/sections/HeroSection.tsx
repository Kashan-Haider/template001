'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: {
    href: string;
    label: string;
  };
  backgroundImage?: string;
}

export default function HeroSection({ title, subtitle, description, ctaButton, backgroundImage }: HeroSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: descriptionRef, isVisible: descriptionVisible } = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.3 });
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden h-screen">
      {/* Background image or gradient */}
      {backgroundImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-hero"></div>
      )}
      
      {/* Decorative elements with floating animation */}
      <div className="absolute top-0 left-0 w-72 h-72 hero-decorative-light rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 hero-decorative-lighter rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <h1 
            ref={titleRef}
            className={`hero-title mb-6 transition-all duration-1000 ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h1>
          
          {subtitle && (
            <h2 
              ref={subtitleRef}
              className={`text-xl md:text-2xl hero-subtitle mb-8 max-w-3xl mx-auto font-medium transition-all duration-1000 delay-300 ${
                subtitleVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {subtitle}
            </h2>
          )}
          
          {description && (
            <p 
              ref={descriptionRef}
              className={`text-lg hero-description mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                descriptionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {description}
            </p>
          )}
          
          {ctaButton && 
            <a
              href="tel:+1-800-555-0123"
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 hero-cta-button shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 group ${
                descriptionVisible 
                  ? 'opacity-100 translate-y-0 delay-700' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="group-hover:animate-pulse">Call Now</span>
            </a>
          }
        </div>
      </div>
      
      
    </section>
  );
}
