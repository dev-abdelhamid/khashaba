import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import LazyImage from "@/components/LazyImage";

const content = {
  ar: {
    ctaTitle: "ابتسامتك المثالية مع أفضل دكتور أسنان بالمنصورة!",
    ctaDescription: "احجز موعدك الآن مع د. محمد خشبة، أفضل طبيب أسنان بالمنصورة، للحصول على ابتسامة مشرقة بأحدث تقنيات فينيرز الأسنان، زراعة الأسنان، كومبوزيت فينيرز، تقويم الأسنان، تبييض الأسنان، والتقويم الشفاف. عيادة د. محمد خشبة هي وجهتك الأولى لطب الأسنان التجميلي والعلاجي في المنصورة، مع تقنيات حديثة ونتائج مضمونة.",
    bookAppointment: "احجز موعدك",
    contactUs: "تواصل معنا",
  },
  en: {
    ctaTitle: "Your Perfect Smile with the Best Dentist in Mansoura!",
    ctaDescription: "Book your appointment now with Dr. Mohamed Khashaba, the best dentist in Mansoura, for a radiant smile using cutting-edge dental veneers, dental implants, composite veneers, orthodontics, teeth whitening, and clear aligners. Dr. Mohamed Khashaba’s clinic is your top destination for cosmetic and restorative dentistry in Mansoura, with advanced technology and guaranteed results.",
    bookAppointment: "Book Your Appointment",
    contactUs: "Contact Us",
  }
};

const CTASection = () => {
  const { isRTL } = useApp();
  const t = content[isRTL ? 'ar' : 'en'];

  return (
    <section className="py-12 bg-gradient-to-br from-dental-gold/90 to-dental-darkGold/90 text-white relative overflow-hidden shadow-md bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center w-full max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale:  1.1 }}
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <LazyImage
              src="/logo-inwhite.png"
              alt={isRTL ? "شعار عيادة د. محمد خشبة" : "Dr. Mohamed Khashaba Clinic Logo"}
              className="w-32 h-42 mx-auto object-contain "
              loading="lazy"
            />
          </motion.div>
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold mb-4 leading-relaxed"
          )}>
            {t.ctaTitle}
          </h2>
          <p className={cn(
            "text-base md:text-lg mb-6  text-white/80 leading-relaxed max-w-3xl mx-auto"
          )}>
            {t.ctaDescription}
          </p>
          <div className={cn(
            "flex flex-row gap-4 mx-auto justify-center items-center",
            isRTL ? "flex-row-reverse" : "" 
          )}>
            <Button
              size="sm"
              className="bg-white text-dental-gold hover:bg-dental-darkGold hover:text-white font-medium px-3 py-2 rounded-lg w-full w-auto shadow-md transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/contact">{t.bookAppointment}</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-dental-gold text-white bg-transparent hover:bg-dental-gold hover:text-white font-medium px-3 py-2 rounded-lg w-full w-auto shadow-md transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://wa.me/+20123456789?text=أرغب في استشارة عن خدمات طب الأسنان">{t.contactUs}</a>
            </Button>
          </div>
        </motion.div>
        <div className="sr-only">
          موقع عيادة د. محمد خشبة يقدم تجربة سهلة لحجز المواعيد مع أفضل دكتور أسنان بالمنصورة. فينيرز الأسنان، زراعة الأسنان، كومبوزيت فينيرز، تقويم الأسنان، تبييض الأسنان، تقويم شفاف، أفضل طبيب أسنان بالمنصورة، أفضل دكتور أسنان بالمنصورة، أفضل دكتور أسنان تجميلي بالمنصورة، أفضل دكتور زراعة بالمنصورة، حجز موعد عيادة أسنان المنصورة، ابتسامة مشرقة المنصورة، د. محمد خشبة، هوليود سمايل مصر، عيادة أسنان بالمنصورة، فينيرز الأسنان المنصورة، زراعة الأسنان المنصورة، تقويم شفاف المنصورة
        </div>
        <Helmet>
          <meta name="keywords" content="فينيرز الأسنان, زراعة الأسنان, كومبوزيت فينيرز, تقويم الأسنان, تبييض الأسنان, تقويم شفاف, أفضل طبيب أسنان بالمنصورة, أفضل دكتور أسنان بالمنصورة, أفضل دكتور أسنان تجميلي بالمنصورة, أفضل دكتور زراعة بالمنصورة, حجز موعد عيادة أسنان المنصورة, ابتسامة مشرقة المنصورة, د. محمد خشبة, هوليود سمايل مصر, عيادة أسنان بالمنصورة, فينيرز الأسنان المنصورة, زراعة الأسنان المنصورة, تقويم شفاف المنصورة" />
          <meta name="description" content={t.ctaDescription} />
          <meta property="og:title" content={t.ctaTitle} />
          <meta property="og:description" content={t.ctaDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://drkhashaba.com/contact" />
          <meta property="og:image" content="/assets/images/clinic-cta.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t.ctaTitle} />
          <meta name="twitter:description" content={t.ctaDescription} />
          <meta name="twitter:image" content="/assets/images/clinic-cta.jpg" />
          <link rel="alternate" href="https://drkhashaba.com/contact" hreflang="ar" />
          <link rel="alternate" href="https://drkhashaba.com/en/contact" hreflang="en" />
          <link rel="alternate" href="https://drkhashaba.com/contact" hreflang="x-default" />
        </Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": isRTL ? "عيادة د. محمد خشبة" : "Dr. Mohamed Khashaba Clinic",
            "description": t.ctaDescription,
            "url": "https://drkhashaba.com/contact",
            "telephone": "+201234567890",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": isRTL ? "المنصورة" : "Mansoura",
              "addressLocality": isRTL ? "وسط البلد" : "Downtown",
              "addressCountry": "EG"
            },
            "openingHours": "Mo-Th 09:00-21:00, Sa 09:00-21:00",
            "priceRange": "$$",
            "medicalSpecialty": [
              isRTL ? "فينيرز الأسنان" : "Dental Veneers",
              isRTL ? "زراعة الأسنان" : "Dental Implants",
              isRTL ? "كومبوزيت فينيرز" : "Composite Veneers",
              isRTL ? "تقويم الأسنان" : "Orthodontics",
              isRTL ? "تبييض الأسنان" : "Teeth Whitening",
              isRTL ? "تقويم شفاف" : "Clear Aligners"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500",
              "bestRating": "5"
            },
            "keywords": [
              "فينيرز الأسنان",
              "زراعة الأسنان",
              "كومبوزيت فينيرز",
              "تقويم الأسنان",
              "تبييض الأسنان",
              "تقويم شفاف",
              "أفضل طبيب أسنان بالمنصورة",
              "أفضل دكتور أسنان بالمنصورة",
              "أفضل دكتور أسنان تجميلي بالمنصورة",
              "أفضل دكتور زراعة بالمنصورة",
              "حجز موعد عيادة أسنان المنصورة",
              "ابتسامة مشرقة المنصورة",
              "د. محمد خشبة",
              "هوليود سمايل مصر",
              "عيادة أسنان بالمنصورة",
              "فينيرز الأسنان المنصورة",
              "زراعة الأسنان المنصورة",
              "تقويم شفاف المنصورة"
            ]
          })}
        </script>
      </div>
    </section>
  );
};

export default CTASection;