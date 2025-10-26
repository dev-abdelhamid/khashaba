import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

interface BlogSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export default function BlogSEO({
  title,
  description,
  keywords,
  image,
  url,
  publishedTime,
  modifiedTime,
  author = "Dr. Mohamed Khashaba"
}: BlogSEOProps) {
  const { isRTL } = useApp();

  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }

    // Create or update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic SEO tags
    if (description) {
      updateMetaTag('description', description);
    }
    
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', isRTL ? 'ar' : 'en');

    // Open Graph tags
    if (title) {
      updateMetaTag('og:title', title, true);
    }
    
    if (description) {
      updateMetaTag('og:description', description, true);
    }
    
    updateMetaTag('og:type', 'article', true);
    
    if (url) {
      updateMetaTag('og:url', url, true);
    }
    
    if (image) {
      updateMetaTag('og:image', image, true);
    }

    updateMetaTag('og:site_name', isRTL ? 'عيادة د. محمد خشبة' : 'Dr. Mohamed Khashaba Clinic', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    
    if (title) {
      updateMetaTag('twitter:title', title);
    }
    
    if (description) {
      updateMetaTag('twitter:description', description);
    }
    
    if (image) {
      updateMetaTag('twitter:image', image);
    }

    // Article specific tags
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true);
    }
    
    updateMetaTag('article:author', author, true);

    // Structured data for articles
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": description,
      "image": image,
      "author": {
        "@type": "Person",
        "name": author,
        "url": "https://drmohamedkhashaba.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": isRTL ? "عيادة د. محمد خشبة" : "Dr. Mohamed Khashaba Clinic",
        "logo": {
          "@type": "ImageObject",
          "url": "https://drmohamedkhashaba.com/logo.png"
        }
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    };

    // Add structured data script
    let structuredDataScript = document.querySelector('#structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, publishedTime, modifiedTime, author, isRTL]);

  return null;
}
