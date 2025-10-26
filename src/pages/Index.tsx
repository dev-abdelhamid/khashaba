
import { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import DoctorsSection from "./home/DoctorsSection";
import TestimonialsSection from "./home/TestimonialsSection";
import ContactCtaSection from "./home/ContactCtaSection";
import AppointmentCTA from "@/components/CTA/AppointmentCTA";
import ConsultationCTA from "@/components/CTA/ConsultationCTA";
import CoursePromotionSection from "@/components/CTA/CoursesCTA";
import StatsCTA from "@/components/CTA/StatsCTA";
import EmergencyCTA from "@/components/CTA/EmergencyCTA";
import DentalCareCTA from "@/components/CTA/DentalCareCTA";
import BlogPreviewSection from "./home/BlogPreviewSection";

import BeforeAfterSection from "./home/BeforeAfterSection";
import TrustBadgesSection from "./home/TrustBadgesSection";
import FAQSection from "./home/FAQSection";
import TrustCTA from "@/components/CTA/TrustCTA";
import CtaSection from "./home/CtaSection";
import WelcomeMessage from "./home/WelcomeMessage";
import PatientSupportHub from "./home/PatientSupportHub";
import PatientJourney from "./home/PatientJourney";
import TechnologySection from "./home/TechnologySection";
import CompositeCourseSection from "./home/CompositeCourseSection";
import PatientExperienceSection from "./home/PatientExperienceSection";
import { InteractiveServicesSection } from "@/components/InteractiveServicesSection";
import ServicesCarousel from "./home/ServicesCarousel";

import { useApp } from "@/contexts/AppContext";
import { allServices } from "@/data/allServices"; // Importing the services data
import ServiceTestimonials from "@/components/ServiceTestimonials";
const Index = () => {
  useEffect(() => {
    document.title = "عيادة د. محمد خشبة - رعاية أسنان متميزة";
    
    // Add schema for SEO
    const schema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "عيادة د. محمد خشبة",
      "image": "/dr.jpg",
      "meta": {
        "@type": "ContactPoint",
        "telephone": "+201040659965",
        "contactType": "customer service"
      },
      "description": "عيادة د. محمد خشبة - رعاية أسنان متميزة",
      "url": "https://khashaba-clinics.tsd-education.com/",
      "email": "https://khashaba-clinics.tsd-education.com/",
      "areaServed": "Egypt",
      "availableLanguage": "ar , en",
      "priceCurrency": "EGP",
      "sameAs": "https://www.facebook.com/drmohamedkhsb",
      "priceRange": "$$",
      "telephone": "+201040659965",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "المنصورة",
        "addressRegion": "الدقهلية",
        "addressCountry": "مصر"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "20:00"
        }
      ]
    };

    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.text = JSON.stringify(schema);
    document.head.appendChild(scriptElement);

    return () => {
      document.head.removeChild(scriptElement);
    };
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen relative mx-0 w-full w-full overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main sections */}
      <HeroSection />
          <WelcomeMessage />
  <TrustBadgesSection />
      <AboutSection />
            <ServicesCarousel />  
            <BeforeAfterSection /> 

      
                <InteractiveServicesSection />
      <ServiceTestimonials />
<DentalCareCTA /> 
                <PatientJourney />


 


    
<CompositeCourseSection />



      {/* Portfolio and doctors */}
                  <ConsultationCTA />

      {/* Third CTA group */}



       {/* Final sections */}
      <BlogPreviewSection />
            <FAQSection />

    </motion.div>
  );
};

export default Index;
