interface Service {
  name: string;
  description: string;
  price: string;
  features: string[];
}

interface ServicesSectionProps {
  title: string;
  description: string;
  services: Service[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function ServicesSection({ title, description, services, theme }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-5 rounded-full blur-3xl" style={{
        background: theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : '#000'
      }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-8 rounded-full blur-3xl" style={{
        background: theme ? `linear-gradient(135deg, ${theme.secondaryColor}, ${theme.primaryColor})` : '#666'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Bento-style grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`card-bento transition-all duration-300 hover:scale-[1.02] ${
                index === 0 ? 'lg:col-span-2 lg:row-span-1' : 
                index === 1 ? 'lg:row-span-2' : 
                index === 2 ? 'lg:col-span-1' : 
                'lg:col-span-1'
              }`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{
                  background: theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : '#000'
                }}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="font-semibold text-sm mb-2" style={{
                    color: theme?.primaryColor || '#000'
                  }}>
                    {service.price}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              
              {service.features && service.features.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 gap-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600 bg-white/50 rounded-lg px-3 py-2">
                        <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{
                          background: theme?.primaryColor || '#000'
                        }}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Ready to transform your business? Let's discuss your specific needs.
          </p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1"
            style={{
              background: theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : '#000'
            }}
          >
            Get Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
