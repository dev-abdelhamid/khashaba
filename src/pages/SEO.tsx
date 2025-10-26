import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  language?: 'ar' | 'en';
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/images/og-image.jpg',
  url = window.location.href,
  type = 'website',
  language = 'ar'
}) => {
  const siteName = language === 'ar' 
    ? 'عيادة د. محمد خشبة - أفضل دكتور أسنان بالمنصورة'
    : 'Dr. Mohamed Khashaba Clinic - Best Dentist in Mansoura';

  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="language" content={language} />
      <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_EG' : 'en_US'} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Dr. Mohamed Khashaba" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data for Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          "name": language === 'ar' ? "د. محمد خشبة" : "Dr. Mohamed Khashaba",
          "image": image,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": language === 'ar' ? "شارع الجمهورية" : "Gomhoria Street",
            "addressLocality": language === 'ar' ? "المنصورة" : "Mansoura",
            "addressRegion": language === 'ar' ? "الدقهلية" : "Dakahlia",
            "addressCountry": language === 'ar' ? "مصر" : "Egypt"
          },
          "telephone": "+201234567890",
          "openingHours": "Mo-Th 09:00-22:00, Sa 09:00-22:00",
          "priceRange": "$$",
          "url": url,
          "sameAs": [
            "https://www.facebook.com/drmohamedkhashaba",
            "https://www.instagram.com/drmohamedkhashaba"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
