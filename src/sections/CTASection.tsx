import React from 'react';
import NextImage from 'next/image';
import { CTAContent, ThemeData, Image } from '@/types/template';

interface CTASectionProps {
  data: CTAContent;
  theme?: ThemeData;
  images?: Image[];
}

const CTASection: React.FC<CTASectionProps> = ({ data, theme, images }) => {
  const primaryColor = theme?.primaryColor || '#3B82F6';
  const secondaryColor = theme?.secondaryColor || '#1E40AF';
  
  // Find the CTA background image or use fallback
  const ctaImage = images?.find(img => img.slotName === 'cta-image-1')?.imageUrl || 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg';

  return (
    <section className="py-20 relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image */}
      <NextImage
        src={ctaImage}
        alt="CTA background"
        fill
        className="object-cover"
        quality={85}
        sizes="100vw"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Sub heading */}
          <p 
            className="text-white text-sm font-semibold uppercase tracking-wider mb-4"
          >
            {data.subHeading}
          </p>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {data.heading}
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a
              href={data.ctaButton.href}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              style={{ 
                backgroundColor: primaryColor,
                boxShadow: `0 10px 25px ${primaryColor}30`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = secondaryColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
              }}
            >
              {data.ctaButton.label}
              <svg 
                className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default CTASection;
