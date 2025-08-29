interface AboutSectionProps {
  title: string;
  description: string;
  features: string[];
  ctaButton: {
    href: string;
    label: string;
  };
  image?: string;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function AboutSection({ title, description, features, ctaButton, image, theme }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 relative overflow-hidden" style={{
      background: theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : '#f9fafb'
    }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl" style={{
        background: theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : '#000'
      }}></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5 rounded-full blur-2xl" style={{
        background: theme ? `linear-gradient(135deg, ${theme.secondaryColor}, ${theme.primaryColor})` : '#666'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="section-title text-gray-50 mb-6">
              {title}
            </h2>
            
            <p className="text-lg text-gray-50 mb-8 leading-relaxed">
              {description}
            </p>
            
            {features && features.length > 0 && (
              <div className="grid grid-cols-1 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="group flex items-start space-x-4 p-4 rounded-xl bg-white/70 shadow-2xl shadow-black/30 transition-all duration-300" style={{
                    '--hover-bg': theme ? `linear-gradient(145deg, white 0%, ${theme.primaryColor}10 100%)` : 'white'
                  } as React.CSSProperties}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform" style={{
                      background: theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : '#000'
                    }}>
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            
            {ctaButton && (
              <a
                href={ctaButton.href}
                className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 bg-black/70 shadow-black/30 shadow-md"
              >
                {ctaButton.label}
              </a>
            )}
          </div>
          
          <div className="relative">
            {/* Modern visual element with floating cards */}
            <div className="relative">
            {image ? (
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={image} 
                  alt="About us" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            ) : (
              <div className="aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden" style={{
                background: theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : 'linear-gradient(135deg, #000, #666)'
              }}>
                {/* Floating elements */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="absolute bottom-4 left-4 w-20 h-12 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-sm">Modern Solutions</p>
                </div>
              </div>
            )}
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full shadow-lg" style={{
                background: theme?.secondaryColor || '#666'
              }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full shadow-lg" style={{
                background: theme?.primaryColor || '#000'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
