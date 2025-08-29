interface GallerySectionProps {
  title: string;
  description: string;
  images?: Array<{
    id: string;
    slotName: string;
    title: string;
    altText: string;
    imageUrl: string;
    category: string;
  }>;
}

export default function GallerySection({ title, description, images }: GallerySectionProps) {
  // Use provided images or fallback to sample images
  const galleryImages = images && images.length > 0 ? images : [
    { id: '1', slotName: 'gallery', title: 'Team Collaboration', altText: 'Our team working together', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop', category: 'gallery' },
    { id: '2', slotName: 'gallery', title: 'Modern Office', altText: 'Our modern office space', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', category: 'gallery' },
    { id: '3', slotName: 'gallery', title: 'Client Meeting', altText: 'Meeting with clients', imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', category: 'gallery' },
    { id: '4', slotName: 'gallery', title: 'Technology Solutions', altText: 'Advanced technology setup', imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop', category: 'gallery' },
    { id: '5', slotName: 'gallery', title: 'Success Celebration', altText: 'Celebrating project success', imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop', category: 'gallery' },
    { id: '6', slotName: 'gallery', title: 'Strategic Planning', altText: 'Strategic planning session', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', category: 'gallery' },
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index === 0 ? 'md:col-span-2 md:row-span-1' : 
                index === 1 ? 'lg:row-span-2' : ''
              }`}
            >
              <div className={`bg-gray-200 ${index === 0 ? 'h-80' : index === 1 ? 'h-96' : 'h-64'}`}>
                {image.imageUrl ? (
                  <img 
                    src={image.imageUrl} 
                    alt={image.altText} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{image.title || 'Gallery Image'}</h3>
                  <p className="text-white/80 text-sm">{image.altText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
