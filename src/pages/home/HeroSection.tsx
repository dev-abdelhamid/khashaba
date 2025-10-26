import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";

// Animation variants
const slideVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const SEO_DATA = {
  titleAr: 'د. محمد خشبة - رائد التميز في طب الأسنان التجميلي',
  titleEn: 'Dr. Mohamed Khashaba - The Pinnacle of Cosmetic Dentistry',
  subtitleAr: 'ابتسامة مصممة بدقة لتعكس أناقتك الفريدة',
  subtitleEn: 'A smile crafted with precision to reflect your unique elegance',
  ctaAr: 'احجز استشارتك الفاخرة',
  ctaEn: 'Book Your Exclusive Consultation',
  highlight: 'consultation',
  keywords: 'دكتور أسنان المنصورة، أفضل عيادة أسنان مصر، طب أسنان تجميلي، فخامة الابتسامة',
  badge: { ar: 'استشارة مجانية', en: 'Free Consultation' }
};

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isRTL } = useApp();

  // Content fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setIsContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic viewport height
  useEffect(() => {
    const updateVH = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    updateVH();
    window.addEventListener('resize', updateVH);
    return () => window.removeEventListener('resize', updateVH);
  }, []);

  // Video play/pause with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch((error) => {
              console.error('Video playback failed:', error);
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.2 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // Mute/unmute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Scroll to next section
  const scrollToNextSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const getLink = (highlight: string) => {
    const links = {
      consultation: '/consultation',
      cosmetic: '/portfolio',
      course: '/courses',
      implants: '/services/dental-implants',
      orthodontics: '/services/orthodontics'
    };
    return links[highlight as keyof typeof links] || '/appointment';
  };

  return (
    <section className="relative w-full min-h-screen mt-24 flex items-center justify-center overflow-hidden bg-dental-black">
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dental-black/30 to-dental-black/50 z-[-1]" />

      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
      >
        <source src="/hero.mp4" type="video/mp4" />
        {isRTL ? 'متصفحك لا يدعم تشغيل الفيديو' : 'Your browser does not support video playback.'}
      </video>

 
      {/* Scroll Down Button */}
      <button
        onClick={scrollToNextSection}
        aria-label={isRTL ? 'التمرير لأسفل' : 'Scroll down'}
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000",
          isContentVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="w-12 h-14 rounded-full border-2 border-dental-gold flex items-start justify-center p-2 hover:bg-dental-gold/10">
          <ChevronDown className="text-dental-gold mt-2 animate-bounce" size={25} />
        </div>
      </button>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        aria-label={isRTL ? (isMuted ? 'تشغيل الصوت' : 'كتم الصوت') : (isMuted ? 'Unmute' : 'Mute')}
        className="absolute bottom-6 right-6 z-20 p-3 rounded-full bg-dental-black/50 hover:bg-dental-black/70 text-dental-gold transition-all"
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>

      {/* SEO Content */}
      <div className="sr-only">
        <h2>
          {isRTL 
            ? "د. محمد خشبة - أفضل دكتور أسنان في القاهرة ومصر | عيادة أسنان متخصصة"
            : "Dr. Mohamed Khashaba - Best Dentist in Cairo & Egypt | Specialized Dental Clinic"
          }
        </h2>
        <div>
          <h3>{isRTL ? "خدماتنا المتميزة:" : "Our Premium Services:"}</h3>
          <ul>
            <li>
              <strong>{isRTL ? SEO_DATA.titleAr : SEO_DATA.titleEn}</strong>
              <p>{isRTL ? SEO_DATA.subtitleAr : SEO_DATA.subtitleEn}</p>
              <span>{SEO_DATA.keywords}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3>{isRTL ? "لماذا نحن الأفضل:" : "Why We're The Best:"}</h3>
          <ul>
            <li>{isRTL ? "خبرة أكثر من 8 عاماً في طب الأسنان التجميلي" : "Over 8 years experience in cosmetic dentistry"}</li>
            <li>{isRTL ? "أكثر من 5000 حالة ناجحة ومرضى راضون" : "Over 5000 successful cases and satisfied patients"}</li>
            <li>{isRTL ? "أحدث التقنيات العالمية والمواد الأصلية" : "Latest global technologies and original materials"}</li>
            <li>{isRTL ? "فريق طبي متخصص ومدرب على أعلى مستوى" : "Specialized medical team trained to the highest level"}</li>
            <li>{isRTL ? "ضمانات طويلة المدى على جميع العلاجات" : "Long-term warranties on all treatments"}</li>
            <li>{isRTL ? "استشارة مجانية شاملة مع خطة علاج مفصلة" : "Comprehensive free consultation with detailed treatment plan"}</li>
          </ul>
        </div>
        <div>
          <h3>{isRTL ? "تخصصاتنا الطبية:" : "Our Medical Specialties:"}</h3>
          <ul>
            <li>{isRTL ? "زراعة الأسنان الفورية والتقليدية" : "Immediate and traditional dental implants"}</li>
            <li>{isRTL ? "ابتسامة هوليود وفينيرز البورسلين" : "Hollywood smile and porcelain veneers"}</li>
            <li>{isRTL ? "تقويم الأسنان الشفاف والمعدني" : "Clear and metal orthodontics"}</li>
            <li>{isRTL ? "تبييض الأسنان بالليزر والتقنيات الحديثة" : "Laser teeth whitening and modern techniques"}</li>
            <li>{isRTL ? "علاج جذور الأسنان المتقدم" : "Advanced root canal treatment"}</li>
            <li>{isRTL ? "جراحة الفم والوجه والفكين" : "Oral and maxillofacial surgery"}</li>
            <li>{isRTL ? "طب أسنان الأطفال المتخصص" : "Specialized pediatric dentistry"}</li>
          </ul>
        </div>
        <address>
          <h3>{isRTL ? "معلومات التواصل:" : "Contact Information:"}</h3>
          <p>{isRTL ? "العنوان: شارع التحرير، وسط البلد، القاهرة، مصر" : "Address: Tahrir Street, Downtown, Cairo, Egypt"}</p>
          <p>{isRTL ? "الهاتف: 01040659965" : "Phone: 01040659965"}</p>
          <p>{isRTL ? "مواعيد العمل: السبت - الخميس 9 صباحاً - 9 مساءً" : "Working Hours: Saturday - Thursday 9 AM - 9 PM"}</p>
        </address>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": isRTL ? "د. محمد خشبة - عيادة طب الأسنان" : "Dr. Mohamed Khashaba - Dental Clinic",
            "description": isRTL 
              ? "أفضل عيادة أسنان في مصر والقاهرة متخصصة في زراعة الأسنان الفورية، ابتسامة هوليود، فينيرز البورسلين، تقويم الأسنان الشفاف، تبييض الأسنان بالليزر مع خبرة أكثر من 8 عاماً و5000+ حالة ناجحة"
              : "Best dental clinic in Egypt and Cairo specialized in immediate dental implants, Hollywood smile, porcelain veneers, clear aligners, laser teeth whitening with over 8 years experience and 5000+ successful cases",
            "url": typeof window !== 'undefined' ? window.location.origin : '',
            "telephone": "+201040659965",
            "priceRange": "$$-$$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500+",
              "bestRating": "5"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "EG",
              "addressLocality": isRTL ? "المنصوره" : "mansoura",
            },
            "openingHours": ["Mo-Th 09:00-21:00", "Sa-Su 09:00-21:00"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": isRTL ? "عروض طب الأسنان المتميزة" : "Premium Dental Offers",
              "itemListElement": [{
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": isRTL ? SEO_DATA.titleAr : SEO_DATA.titleEn,
                  "description": isRTL ? SEO_DATA.subtitleAr : SEO_DATA.subtitleEn
                }
              }]
            },
            "founder": {
              "@type": "Person",
              "name": isRTL ? "د. محمد خشبة" : "Dr. Mohamed Khashaba",
              "jobTitle": isRTL ? "استشاري طب وجراحة الفم والأسنان" : "Oral & Dental Surgery Consultant",
              "alumniOf": isRTL ? "جامعة القاهرة - كلية طب الأسنان" : "Cairo University - Faculty of Dentistry"
            },
            "medicalSpecialty": [
              isRTL ? "زراعة الأسنان الفورية" : "Immediate Dental Implants",
              isRTL ? "ابتسامة هوليود" : "Hollywood Smile",
              isRTL ? "فينيرز البورسلين" : "Porcelain Veneers",
              isRTL ? "تقويم الأسنان الشفاف" : "Clear Aligners",
              isRTL ? "تبييض الأسنان بالليزر" : "Laser Teeth Whitening"
            ]
          })
        }}
      />
    </section>
  );
}