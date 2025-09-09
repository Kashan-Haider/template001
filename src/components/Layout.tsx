import Head from 'next/head';
import { ReactNode } from 'react';
import { SEOData, ThemeData } from '@/types/template';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  theme?: ThemeData;
  seoData?: SEOData;
}

export default function Layout({ 
  children, 
  title = 'Business Template', 
  description = 'Professional business website template',
  theme,
  seoData 
}: LayoutProps) {
  const keywordsString = seoData?.keywords ? seoData.keywords.join(', ') : '';
  
  return (
    <>
      <Head>
        <title>{seoData?.title || title}</title>
        <meta name="description" content={seoData?.description || description} />
        <meta name="keywords" content={keywordsString} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoData?.title || title} />
        <meta property="og:description" content={seoData?.description || description} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={seoData?.title || title} />
        <meta property="twitter:description" content={seoData?.description || description} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme Colors */}
        {theme && (
          <>
            <meta name="theme-color" content={theme.primaryColor} />
            <style jsx global>{`
              :root {
                --color-primary: ${theme.primaryColor};
                --color-secondary: ${theme.secondaryColor};
                --color-primary-light: ${theme.primaryColor}20;
                --color-primary-dark: ${theme.primaryColor}dd;
                --color-secondary-light: ${theme.secondaryColor}20;
                --color-secondary-dark: ${theme.secondaryColor}dd;
                --color-accent: ${theme.primaryColor};
                --color-accent-light: ${theme.primaryColor}10;
              }
            `}</style>
          </>
        )}
      </Head>
      
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
}
