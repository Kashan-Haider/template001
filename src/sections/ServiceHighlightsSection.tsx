"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { ServiceHighlightsContent } from "@/types/template";

interface ServiceHighlightsSectionProps {
  data: ServiceHighlightsContent;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function ServiceHighlightsSection({
  data,
  theme,
}: ServiceHighlightsSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });
  const { ref: servicesRef, visibleItems } = useStaggeredAnimation(
    data.services.length,
    120
  );

  // Helper function to format the display value
  const formatDisplayValue = (description: string) => {
    if (description.includes("+")) {
      return { value: description.replace("+", ""), suffix: "+" };
    }
    if (description.includes("%")) {
      return { value: description.replace("%", ""), suffix: "%" };
    }
    if (description.includes("/")) {
      return { value: description, suffix: "" };
    }
    return { value: description, suffix: "" };
  };

  return (
    <section
      id="service-highlights"
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${theme?.primaryColor || '#3b82f6'}, transparent)`
          }}
        />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${theme?.secondaryColor || '#1d4ed8'}, transparent)`,
            animationDelay: '2s'
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
          style={{
            background: `conic-gradient(from 0deg, ${theme?.primaryColor || '#3b82f6'}20, transparent, ${theme?.secondaryColor || '#1d4ed8'}20)`
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{
              background: `linear-gradient(135deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`
            }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          <h2
            ref={titleRef}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold mb-6 transition-all duration-1000 bg-gradient-to-r bg-clip-text text-transparent ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme?.primaryColor || '#1f2937'}, ${theme?.secondaryColor || '#374151'})`
            }}
          >
            {data.title}
          </h2>
          
          <div className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`
            }}
          />
          
          <p
            ref={descRef}
            className={`text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-300 ${
              descVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {data.description}
          </p>
        </div>

        {/* Enhanced Service Highlights Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {data.services && data.services.length > 0 ? data.services.map((service, index) => {
            const { value, suffix } = formatDisplayValue(service.description);
            
            return (
              <div
                key={`service-${index}`}
                className={`group relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 hover:scale-105 border border-gray-100 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`
                  }}
                >
                  <div className="bg-white rounded-3xl h-full w-full" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Enhanced Number Display */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div
                        className="w-24 h-24 mx-auto rounded-2xl flex flex-col items-center justify-center text-white mb-4 shadow-lg transform group-hover:rotate-6 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`
                        }}
                      >
                        <span className="text-2xl font-black leading-none">
                          {value}
                        </span>
                        {suffix && (
                          <span className="text-lg font-bold opacity-90">
                            {suffix}
                          </span>
                        )}
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-60 animate-bounce"
                        style={{
                          background: theme?.primaryColor || '#3b82f6',
                          animationDelay: `${index * 0.5}s`
                        }}
                      />
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full opacity-40 animate-bounce"
                        style={{
                          background: theme?.secondaryColor || '#1d4ed8',
                          animationDelay: `${index * 0.7}s`
                        }}
                      />
                    </div>
                  </div>

                  {/* Enhanced Service Name */}
                  <h3 className="text-xl font-bold text-gray-900 text-center leading-tight group-hover:text-gray-700 transition-colors duration-300">
                    {service.name}
                  </h3>
                  
                  {/* Subtle accent line */}
                  <div className="w-12 h-0.5 mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`
                    }}
                  />
                </div>
              </div>
            );
          }) : (
            <div className="col-span-full text-center text-gray-500">
              No service highlights available
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-sm font-medium">Excellence in Numbers</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
