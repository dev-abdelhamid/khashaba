import { memo, useMemo } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { FaTiktok } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { cn } from '@/lib/utils';
import { contact } from '@/data/contact';

const Footer = memo(() => {
  const { isRTL } = useApp();
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.3 } 
    }
  };

  const translations = {
    ar: {
      about: "عن العيادة",
      aboutText: "حقق حلمك بابتسامة مثالية مع عيادة د. محمد خشبة بالمنصورة! بنقدم خدمات فينيرز، زراعة أسنان، تقويم شفاف، وتبييض أسنان بأحدث التقنيات لنتايج مبهرة. فريقنا بيركز على راحتك وثقتك بنفسك، سواء كنت عايز فينيرز طبيعية أو علاج أسنان متقدم. احجز موعدك النهاردة وابدأ رحلتك نحو ابتسامة تلفت الأنظار!",
      quickLinks: "روابط سريعة",
      services: "خدماتنا",
      contact: "معلومات الاتصال",
      location: "أعلى معرض السراج، المشاية السفلية، أمام نادي جزيرة الورد، المنصورة، الدقهلية",
      phone: "+201040659965",
      email: "khashabaclinics@gmail.com",
      contactNow: "حجز موعد الآن",
      copyright: `© ${currentYear} عيادة د. محمد خشبة لطب الأسنان. جميع الحقوق محفوظة.`,
      home: "الصفحة الرئيسية",
      portfolio: "معرض الأعمال",
      courses: "كورس الكومبوزيت",
      consultation: "استشارة طبية",
      blog: "المدونة",
      contactUs: "اتصل بنا",
      booking: "حجز موعد",
      veneers: "فينيرز الأسنان",
      dentalImplants: "زراعة الأسنان",
      compositeVeneers: "كومبوزيت فينيرز",
      orthodontics: "تقويم الأسنان",
      teethWhitening: "تبييض الأسنان",
      clearAligners: "تقويم شفاف"
    },
    en: {
      about: "About Us",
      aboutText: "Achieve your dream smile with Dr. Mohamed Khashaba Clinic in Mansoura! We offer veneers, dental implants, clear aligners, and teeth whitening with cutting-edge technology for stunning results. Our team focuses on your comfort and confidence, whether you’re seeking natural veneers or advanced dental care. Book your appointment today and start your journey to a captivating smile!",
      quickLinks: "Quick Links",
      services: "Our Services",
      contact: "Contact Info",
      location: "Above Al-Siraj Showroom, Mashaya Sefla, In front of Geziret Al-Ward Club, Mansoura, Dakahlia",
      phone: "+201040659965",
      email: "khashabaclinics@gmail.com",
      contactNow: "Book Appointment Now",
      copyright: `© ${currentYear} Dr. Mohamed Khashaba Dental Clinic. All rights reserved.`,
      home: "Home",
      portfolio: "Portfolio",
      courses: "Composite Course",
      consultation: "Consultation",
      blog: "Blog",
      contactUs: "Contact",
      booking: "Booking",
      veneers: "Dental Veneers",
      dentalImplants: "Dental Implants",
      compositeVeneers: "Composite Veneers",
      orthodontics: "Orthodontics",
      teethWhitening: "Teeth Whitening",
      clearAligners: "Clear Aligners"
    }
  };

  const t = isRTL ? translations.ar : translations.en;

  const seoTitle = isRTL
    ? "عيادة د. محمد خشبة - خدمات طب أسنان تجميلي ومتقدم في المنصورة"
    : "Dr. Mohamed Khashaba Clinic - Cosmetic & Advanced Dentistry in Mansoura";
  const seoDescription = isRTL
    ? "عيادة د. محمد خشبة بالمنصورة تقدم خدمات فينيرز، زراعة أسنان، تقويم شفاف، وتبييض أسنان بأحدث التقنيات لنتائج مبهرة."
    : "Dr. Mohamed Khashaba Clinic in Mansoura offers veneers, dental implants, clear aligners, and teeth whitening with cutting-edge technology for stunning results.";
  const seoKeywords = isRTL
    ? "أفضل دكتور أسنان في المنصورة, أفضل عيادة أسنان بالمنصورة, فينيرز المنصورة, زراعة أسنان المنصورة, كومبوزيت فينيرز المنصورة, تقويم أسنان المنصورة, تبييض أسنان المنصورة, تقويم شفاف المنصورة, د. محمد خشبة, طب أسنان تجميلي المنصورة, خدمات أسنان متقدمة, أفضل دكتور فينيرز بالمنصورة, أفضل دكتور زراعة أسنان بالمنصورة, أفضل دكتور تقويم شفاف بالمنصورة, طب أسنان الدقهلية, تجميل الأسنان القاهرة, زراعة أسنان السعودية, تقويم أسنان الإمارات, فينيرز إيماكس المنصورة, تبييض أسنان بالليزر المنصورة"
    : "best dentist in Mansoura, best dental clinic Mansoura, veneers Mansoura, dental implants Mansoura, composite veneers Mansoura, orthodontics Mansoura, teeth whitening Mansoura, clear aligners Mansoura, Dr. Mohamed Khashaba, cosmetic dentistry Mansoura, advanced dental services, best veneer dentist Mansoura, best dental implant dentist Mansoura, best clear aligners dentist Mansoura, dentistry Dakahlia, cosmetic dentistry Cairo, dental implants Saudi Arabia, orthodontics UAE, Emax veneers Mansoura, laser teeth whitening Mansoura";

  const socialLinks = useMemo(
    () => [
      {
        icon: Facebook,
        href: contact.social.facebook,
        label: 'Facebook',
        color: 'hover:text-blue-500',
      },
      {
        icon: FaTiktok,
        href: contact.social.tiktok,
        label: 'TikTok',
        color: 'hover:text-pink-600',
      },
      {
        icon: Instagram,
        href: contact.social.instagram,
        label: 'Instagram',
        color: 'hover:text-pink-500',
      },
    ],
    []
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { to: "/", label: t.home },
    { to: "/services", label: t.services },
    { to: "/portfolio", label: t.portfolio },
    { to: "/consultation", label: t.consultation },
    { to: "/blog", label: t.blog },
    { to: "/contact", label: t.contactUs },
    { to: "/appointment", label: t.booking },
        { to: "/courses", label: t.courses },

  ];

  const serviceLinks = [
    { to: "/services/veneers", label: t.veneers },
    { to: "/services/dental-implants", label: t.dentalImplants },
    { to: "/services/composite-veneers", label: t.compositeVeneers },
    { to: "/services/orthodontics", label: t.orthodontics },
    { to: "/services/teeth-whitening", label: t.teethWhitening },
    { to: "/services/clear-aligners", label: t.clearAligners }
  ];

  const contactInfo = [
    { icon: MapPin, text: t.location },
    { icon: Phone, text: t.phone, href: `tel:${t.phone}` },
    { icon: Mail, text: t.email, href: `mailto:${t.email}` },
  ];

  return (
    <motion.footer
      className="bg-dental-black text-white py-12 w-full overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Helmet>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/path/to/clinic-hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="/path/to/clinic-hero.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dentist',
            'name': isRTL ? 'عيادة د. محمد خشبة' : 'Dr. Mohamed Khashaba Clinic',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Above Al-Siraj Showroom, Mashaya Sefla, In front of Geziret Al-Ward Club',
              'addressLocality': 'Mansoura',
              'addressRegion': 'Dakahlia',
              'postalCode': '53111',
              'addressCountry': 'EG',
            },
            'telephone': t.phone,
            'description': seoDescription,
            'sameAs': socialLinks.map(link => link.href),
            'service': [
              {
                '@type': 'MedicalService',
                'name': isRTL ? 'فينيرز الأسنان' : 'Dental Veneers',
                'description': isRTL ? 'فينيرز إيماكس لابتسامة طبيعية في المنصورة' : 'Emax veneers for a natural smile in Mansoura'
              },
              {
                '@type': 'MedicalService',
                'name': isRTL ? 'زراعة الأسنان' : 'Dental Implants',
                'description': isRTL ? 'زراعة أسنان متطورة بغرسات تيتانيوم في المنصورة' : 'Advanced dental implants with titanium in Mansoura'
              },
              {
                '@type': 'MedicalService',
                'name': isRTL ? 'كومبوزيت فينيرز' : 'Composite Veneers',
                'description': isRTL ? 'كومبوزيت فينيرز اقتصادي لتحسين مظهر الأسنان في المنصورة' : 'Affordable composite veneers for enhanced teeth appearance in Mansoura'
              },
              {
                '@type': 'MedicalService',
                'name': isRTL ? 'تقويم الأسنان' : 'Orthodontics',
                'description': isRTL ? 'تقويم أسنان تقليدي وشفاف لتناسق مثالي في المنصورة' : 'Traditional and clear orthodontics for perfect alignment in Mansoura'
              },
              {
                '@type': 'MedicalService',
                'name': isRTL ? 'تبييض الأسنان' : 'Teeth Whitening',
                'description': isRTL ? 'تبييض أسنان بالليزر لابتسامة مشرقة في المنصورة' : 'Laser teeth whitening for a radiant smile in Mansoura'
              },
              {
                '@type': 'MedicalService',
                'name': isRTL ? 'تقويم شفاف' : 'Clear Aligners',
                'description': isRTL ? 'تقويم شفاف غير مرئي لتصحيح الأسنان في المنصورة' : 'Invisible clear aligners for teeth correction in Mansoura'
              }
            ],
            'review': [
              {
                '@type': 'Review',
                'reviewRating': {
                  '@type': 'Rating',
                  'ratingValue': '5',
                  'bestRating': '5',
                },
                'author': {
                  '@type': 'Person',
                  'name': isRTL ? 'عميل راضٍ' : 'Satisfied Client',
                },
                'reviewBody': isRTL ? 'خدمات فينيرز وزراعة أسنان ممتازة في عيادة د. محمد خشبة بالمنصورة!' : 'Excellent veneers and dental implant services at Dr. Mohamed Khashaba Clinic in Mansoura!'
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hidden SEO Content */}
      <div hidden>
        <h2>{isRTL ? "أفضل عيادة أسنان في المنصورة" : "Best Dental Clinic in Mansoura"}</h2>
        <p>
          {isRTL
            ? "عيادة د. محمد خشبة بالمنصورة تقدم خدمات فينيرز، زراعة أسنان، كومبوزيت فينيرز، تقويم أسنان، تبييض أسنان، وتقويم شفاف بأحدث التقنيات. احصل على ابتسامة مثالية مع أفضل دكتور أسنان في المنصورة."
            : "Dr. Mohamed Khashaba Clinic in Mansoura offers veneers, dental implants, composite veneers, orthodontics, teeth whitening, and clear aligners with cutting-edge technology. Achieve a perfect smile with the best dentist in Mansoura."}
        </p>
        <ul>
          <li>{isRTL ? "فينيرز المنصورة - قشور إيماكس لابتسامة طبيعية" : "Veneers Mansoura - Emax shells for a natural smile"}</li>
          <li>{isRTL ? "زراعة أسنان المنصورة - غرسات تيتانيوم دائمة" : "Dental implants Mansoura - Durable titanium implants"}</li>
          <li>{isRTL ? "كومبوزيت فينيرز المنصورة - تجميل أسنان اقتصادي" : "Composite veneers Mansoura - Affordable teeth enhancement"}</li>
          <li>{isRTL ? "تقويم أسنان المنصورة - تناسق مثالي للأسنان" : "Orthodontics Mansoura - Perfect teeth alignment"}</li>
          <li>{isRTL ? "تبييض أسنان المنصورة - ابتسامة بيضاء بالليزر" : "Teeth whitening Mansoura - Bright smile with laser"}</li>
          <li>{isRTL ? "تقويم شفاف المنصورة - تصحيح غير مرئي للأسنان" : "Clear aligners Mansoura - Invisible teeth correction"}</li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* About Section */}
          <motion.div 
            className="space-y-6 text-center md:text-start"
            variants={itemVariants}
          >
            <div className="relative">
              <h3 className={`text-xl font-bold text-white mb-4 relative inline-block ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                {t.about}
                <span className={`absolute -bottom-2 w-12 h-0.5 bg-dental-gold ${isRTL ? 'md:right-0' : 'md:left-0'} left-1/2 transform -translate-x-1/2 md:transform-none`}></span>
              </h3>
            </div>
            
            <p className={`text-gray-200 text-sm leading-relaxed ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              {t.aboutText}
            </p>
            
            {/* Social Media Icons */}
            <div className={`flex justify-center gap-4 md:justify-start`}>
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener nofollow"
                  className={cn(
                    'w-10 h-10 rounded-full bg-dental-gold/10 flex items-center justify-center transition-all duration-300',
                    color
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-gray-200" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6 text-center md:text-start"
            variants={itemVariants}
          >
            <div className="relative">
              <h3 className={`text-xl font-bold text-white mb-4 relative inline-block ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                {t.quickLinks}
                <span className={`absolute -bottom-2 w-12 h-0.5 bg-dental-gold ${isRTL ? 'md:right-0' : 'md:left-0'} left-1/2 transform -translate-x-1/2 md:transform-none`}></span>
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-3">
              {quickLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={scrollToTop}
                  className={`text-gray-200 hover:text-dental-gold transition-all duration-300 ease-in-out text-sm block hover:translate-x-1 transform ${isRTL ? 'md:text-right hover:-translate-x-1' : 'md:text-left'}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="space-y-6 text-center md:text-start"
            variants={itemVariants}
          >
            <div className="relative">
              <h3 className={`text-xl font-bold text-white mb-4 relative inline-block ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                {t.services}
                <span className={`absolute -bottom-2 w-12 h-0.5 bg-dental-gold ${isRTL ? 'md:right-0' : 'md:left-0'} left-1/2 transform -translate-x-1/2 md:transform-none`}></span>
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-3">
              {serviceLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={scrollToTop}
                  className={`text-gray-200 hover:text-dental-gold transition-all duration-300 ease-in-out text-sm block hover:translate-x-1 transform ${isRTL ? 'md:text-right hover:-translate-x-1' : 'md:text-left'}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6 text-center md:text-start"
            variants={itemVariants}
          >
            <div className="relative">
              <h3 className={`text-xl font-bold text-white mb-4 relative inline-block ${isRTL ? 'md:text-left' : 'md:text-right'}`}>
                {t.contact}
                <span className={`absolute -bottom-2 w-12 h-0.5 bg-dental-gold ${isRTL ? 'md:right-0' : 'md:left-0'} left-1/2 transform -translate-x-1/2 md:transform-none`}></span>
              </h3>
            </div>
            
            <ul className="space-y-4">
              {contactInfo.map(({ icon: Icon, text, href }, index) => (
                <li key={index} className={`flex items-start gap-3 ${isRTL ? 'justify-center md:justify-start' : 'justify-center md:justify-start'}`}>
                  {href ? (
                    <a
                      href={href}
                      className={`text-gray-200 hover:text-dental-gold transition-all duration-300 ease-in-out text-sm ${isRTL ? 'order-1 md:text-right' : 'order-2 md:text-left'}`}
                      aria-label={href.startsWith('tel:') ? (isRTL ? 'اتصل بنا' : 'Call us') : (isRTL ? 'أرسل بريدًا إلكترونيًا' : 'Send an email')}
                    >
                      {text}
                    </a>
                  ) : (
                    <span className={`text-gray-200 text-sm leading-relaxed ${isRTL ? 'order-1 md:text-right' : 'order-2 md:text-left'}`}>
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center md:justify-start"
            >
              <Button
                asChild
                variant="outline"
                className="sm:w-auto border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white transition-all duration-300 font-medium"
              >
                <Link to="/appointment" onClick={scrollToTop}>
                  {t.contactNow}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="border-t border-gray-700 mt-12 pt-4"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-1"
            >
              <img
                src="/logowhite1.png"
                alt={isRTL ? 'شعار عيادة د. محمد خشبة' : 'Dr. Mohamed Khashaba Clinic Logo'}
                className="h-20 w-auto object-contain"
                loading="lazy"
              />
            </motion.div>
            
            <p className="text-gray-400 text-sm text-center leading-relaxed max-w-2xl">
              {t.copyright}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;