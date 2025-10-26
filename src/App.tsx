import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Appointment from "@/pages/Appointment";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import NotFound from "@/pages/NotFound";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Portfolio from "@/pages/Portfolio";
import Consultation from "@/pages/Consultation";
import Courses from "@/pages/Courses";
import AdvancedBooking from "@/pages/AdvancedBooking";
import AllServices from "@/pages/AllServices";
import ScrollToTop from "@/components/ScrollToTop";
import { Loader } from "@/components/ui/loader";
import CaseDetail from './pages/CaseDetail';

import "./App.css";

const AppContent = () => {
  const { isLoading, setIsLoading, language, isRTL } = useApp();
  const { t } = useTranslation();
  const location = useLocation();

  // تسجيل زيارة في السيرفر
  useEffect(() => {
    const logVisit = async () => {
      try {
        await fetch('/api/visit', {
          method: 'POST',
          credentials: 'include',
        });
      } catch (error) {
        console.error('Error logging visit:', error);
      }
    };
    logVisit();
  }, [location.pathname]);

  // تتبع تغييرات الصفحة باستخدام gtag
  useEffect(() => {
    gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  // محاكاة التحميل الابتدائي
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // تحديث العلامات الوصفية (SEO Meta tags)
  useEffect(() => {
    document.title = t("siteTitle");

    const updateMetaTag = (name, content) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    };

    updateMetaTag("description", t("siteDescription"));
    updateMetaTag("keywords", t("keywords"));
    updateMetaTag("author", t("siteName"));

    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOGTag("og:title", t("siteTitle"));
    updateOGTag("og:description", t("siteDescription"));
    updateOGTag("og:locale", language === "ar" ? "ar_EG" : "en_US");
    updateOGTag("og:type", "website");
    updateOGTag("og:site_name", t("siteName"));
    updateOGTag("og:url", window.location.href);

    const updateTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateTwitterTag("twitter:card", "summary_large_image");
    updateTwitterTag("twitter:title", t("siteTitle"));
    updateTwitterTag("twitter:description", t("siteDescription"));

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", window.location.href);

    const updateAlternateLink = (hreflang, href) => {
      let alternateLink = document.querySelector(`link[hreflang="${hreflang}"]`);
      if (!alternateLink) {
        alternateLink = document.createElement("link");
        alternateLink.setAttribute("rel", "alternate");
        alternateLink.setAttribute("hreflang", hreflang);
        document.head.appendChild(alternateLink);
      }
      alternateLink.setAttribute("href", href);
    };

    const currentUrl = window.location.href;
    updateAlternateLink("ar", currentUrl);
    updateAlternateLink("en", currentUrl);
    updateAlternateLink("x-default", currentUrl);
  }, [language, t]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white dark:bg-dental-black min-h-screen relative mx-0 w-full overflow-hidden transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main className="relative">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/advanced-booking" element={<AdvancedBooking />} />
            <Route path="/services" element={<AllServices />} />
            <Route path="/service-categories" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/case/:id" element={<CaseDetail />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster
        position={isRTL ? "top-left" : "top-right"}
        dir={isRTL ? "rtl" : "ltr"}
        className={isRTL ? "font-arabic" : "font-english"}
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;