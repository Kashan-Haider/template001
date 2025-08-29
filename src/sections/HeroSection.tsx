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
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 hero-decorative-light rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 hero-decorative-lighter rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <h1 className="hero-title mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <h2 className="text-xl md:text-2xl hero-subtitle mb-8 max-w-3xl mx-auto font-medium">
              {subtitle}
            </h2>
          )}
          
          {description && (
            <p className="text-lg hero-description mb-12 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          
          {ctaButton && 
                <a
                  href={ctaButton.href}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hero-cta-button shadow-lg hover:shadow-xl hover:scale-105`}
                >
                  {ctaButton.label}
                </a>
}
        </div>
      </div>
      
      
    </section>
  );
}
