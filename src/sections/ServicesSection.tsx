"use client";

import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";
import { Image as ImageType } from "@/types/template";
import Image from "next/image";

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
  images: ImageType[] ;
}

export default function ServicesSection({
  title,
  description,
  services,
  theme,
  images,
}: ServicesSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });
  const { ref: gridRef, visibleItems } = useStaggeredAnimation(
    services.length,
    150
  );

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-3xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {title}
          </h2>
          <p
            ref={descRef}
            className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              descVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {description}
          </p>
        </div>

        {/* Simple Responsive Grid */}
        <div
          ref={gridRef}
          className="flex flex-wrap gap-6 mb-12 justify-center items-center rounded-xl "
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative md:h-[600px] w-full overflow-hidden md:w-[380px] justify-center flex flex-col gap-3 border rounded-2xl shadow-sm transition-all duration-700 ease-out group:
            `}
              style={{
                background: theme
                  ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                  : "#f9fafb",
              }}
            >
              <Image
                src={
                  images.find(img => img.slotName === `services-image-${index}`)?.imageUrl ||
                  "https://images.pexels.com/photos/6195895/pexels-photo-6195895.jpeg"
                }
                alt={
                  images.find(img => img.slotName === `services-image-${index}`)?.altText ||
                  "Service section image"
                }
                width={500}
                height={500}
                className="rounded-t-xl group-hover:scale-105 transition-all duration-300"
              />
              <div className="px-4 py-8 md:px-6 md:py-12">
                {/* Decorative Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-500 bg-black"></div>

                <h3 className="text-xl md:text-3xl font-bold text-gray-50 mb-2 relative z-10">
                  {service.name}
                </h3>
                <p className="font-semibold text-lg mb-2 text-gray-50 relative z-10">
                  {service.price}
                </p>
                <p className="text-gray-50 text-sm leading-relaxed mb-4 relative z-10">
                  {service.description}
                </p>

                {service.features?.length > 0 && (
                  <ul className="space-y-2 text-sm text-gray-50 relative z-10">
                    {service.features
                      .slice(0, 3)
                      .map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="w-2 h-2 rounded-full mr-3 bg-white"></span>
                          {feature}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Ready to transform your business? Let's discuss your specific needs.
          </p>
          <a
            href="tel:+1-800-555-0123"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:-translate-y-1"
            style={{
              background: theme
                ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                : "#000",
            }}
          >
            Get Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
