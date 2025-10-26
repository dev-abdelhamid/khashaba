import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Search, Star, Award, Users, Smile, Calendar, Clock, Video } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LazyImage from "@/components/LazyImage";
import { useApp } from "@/contexts/AppContext";
import BeforeAfterSection from "./home/BeforeAfterSection";
import { allServices } from "@/data/allServices";
import SimpleHeroSection from "@/components/CTA/SimpleHeroSection";
import FAQSection from "./home/FAQSection";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import CTASection from "@/components/CTASection";

// Content translations
const content = {
  ar: {
    pageTitle: "خدمات طب الأسنان - عيادة د. محمد خشبة | المنصورة",
    metaDescription: "اكتشف خدمات طب الأسنان في عيادة د. محمد خشبة بالمنصورة، من فينيرز وكومبوزيت فينيرز إلى زراعة وتقويم وتبييض الأسنان بأحدث التقنيات.",
    heroTitle: "ابتسامة واثقة مع د. محمد خشبة",
    heroDescription: "في عيادة د. محمد خشبة بالمنصورة، بنقدم لك خدمات طب أسنان عالية الجودة بأحدث التقنيات عشان تحصل على ابتسامة تليق بيك.",
    freeConsultation: "استشارة مجانية",
    servicesSubtitle: "خدماتنا",
    servicesTitle: "اكتشف خدماتنا لابتسامة مثالية",
    servicesDescription: "من فينيرز وزراعة الأسنان إلى تقويم وتبييض الأسنان، نقدم كل اللي تحتاجه في المنصورة مع فريق د. محمد خشبة.",
    searchPlaceholder: "ابحث عن خدمة (مثل: فينيرز، تقويم)...",
    bookAppointment: "احجز موعدك الآن",
    whyChooseUs: "لماذا عيادة د. محمد خشبة؟",
    whyTitle: "رعاية أسنان بمعايير عالمية",
    whyDescription: "في عيادة د. محمد خشبة بالمنصورة، نجمع بين التقنيات الحديثة والخبرة لتحقيق ابتسامة أحلامك براحة تامة.",
    advancedTech: "تكنولوجيا متطورة",
    advancedTechDesc: "نعتمد على أجهزة ليزر وتصوير ثلاثي الأبعاد لنتائج دقيقة ومبهرة.",
    expertTeam: "فريق متخصص",
    expertTeamDesc: "د. محمد خشبة وفريقه يقدمون تجربة علاجية احترافية بكل شغف.",
    comfortableEnv: "بيئة مريحة",
    comfortableEnvDesc: "عيادتنا مصممة لتوفير الراحة والاسترخاء أثناء العلاج.",
    personalizedCare: "رعاية مخصصة",
    personalizedCareDesc: "خطط علاج مصممة خصيصاً لتلبية احتياجاتك بأفضل صورة.",
    ctaTitle: "جاهز لابتسامة مميزة؟",
    ctaDescription: "تواصل معنا واحجز موعدك مع د. محمد خشبة في المنصورة 'ابتسامتك تستاهل الأفضل مع د. محمد خشبة' اليوم وابدأ رحلتك نحو ابتسامة واثقة بأحدث التقنيات.",
    contactUs: "تواصل معنا",
    readMore: "اكتشف المزيد",
    onlineConsultationTitle: "احجز استشارتك الأونلاين الآن",
    onlineConsultationSubtitle: "تواصل مع د. محمد خشبة عبر الإنترنت لتشخيص حالتك بسرعة وراحة، واستلم خطة علاج مخصصة تناسب احتياجاتك للحصول على ابتسامة مثالية بأحدث التقنيات.",
    onlineConsultationButton: "احجز الأن  ",
    onlineConsultationHighlight: "تشخيص سريع، راحة تامة، وخطة علاج مخصصة من منزلك!"
  },
  en: {
    pageTitle: "Dental Services - Dr. Mohamed Khashaba Clinic | Mansoura",
    metaDescription: "Explore dental services at Dr. Mohamed Khashaba’s clinic in Mansoura, from veneers and composite veneers to implants, orthodontics, and teeth whitening with advanced technology.",
    heroTitle: "A Confident Smile with Dr. Mohamed Khashaba",
    heroDescription: "At Dr. Mohamed Khashaba’s clinic in Mansoura, we offer high-quality dental services with the latest technology to give you the smile you deserve.",
    freeConsultation: "Free Consultation",
    servicesSubtitle: "Our Services",
    servicesTitle: "Discover Our Services for a Perfect Smile",
    servicesDescription: "From veneers and dental implants to orthodontics and teeth whitening, we provide everything you need in Mansoura with Dr. Mohamed Khashaba’s team.",
    searchPlaceholder: "Search for a service (e.g., veneers, orthodontics)...",
    bookAppointment: "Book Your Appointment Now",
    whyChooseUs: "Why Choose Dr. Mohamed Khashaba’s Clinic?",
    whyTitle: "World-Class Dental Care",
    whyDescription: "At Dr. Mohamed Khashaba’s clinic in Mansoura, we combine modern technology and expertise to deliver your dream smile with complete comfort.",
    advancedTech: "Cutting-Edge Technology",
    advancedTechDesc: "We rely on laser devices and 3D imaging for precise, impressive results.",
    expertTeam: "Expert Team",
    expertTeamDesc: "Dr. Mohamed Khashaba and his team provide a professional treatment experience with passion.",
    comfortableEnv: "Relaxing Environment",
    comfortableEnvDesc: "Our clinic is designed for comfort and relaxation during your treatment.",
    personalizedCare: "Personalized Care",
    personalizedCareDesc: "Customized treatment plans tailored to meet your needs perfectly.",
    ctaTitle: "Ready for a Stunning Smile?",
    ctaDescription: "Contact Dr. Mohamed Khashaba’s clinic in Mansoura today and start your journey to a confident smile with cutting-edge technology.",
    contactUs: "Contact Us",
    readMore: "Discover More",
    onlineConsultationTitle: "Book Your Online Consultation Now",
    onlineConsultationSubtitle: "Connect with Dr. Mohamed Khashaba online for a quick and convenient diagnosis, and receive a personalized treatment plan tailored to your needs for a perfect smile using cutting-edge technology.",
    onlineConsultationButton: "Book now ",
    onlineConsultationHighlight: "Quick diagnosis, ultimate convenience, and a tailored treatment plan from the comfort of your home!"
  }
};

export default function AllServices() {
  const { language = 'ar' } = useApp?.() || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const t = content[language as keyof typeof content];
  const isRTL = language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(() => [
    {
      id: "all",
      label: { ar: "جميع الخدمات", en: "All Services" },
      keywords: [
        "أفضل دكتور أسنان بالمنصورة",
        "خدمات طب أسنان المنصورة",
        "د. محمد خشبة أفضل دكتور أسنان",
        "هوليود سمايل المنصورة",
        "تجميل الأسنان القاهرة",
        "عيادة أسنان بالمنصورة",
        "طب أسنان الإسكندرية",
        "خدمات أسنان السعودية",
        "طب أسنان الإمارات",
        "ابتسامة واثقة مصر",
        "فينيرز أسنان المنصورة",
        "تقويم شفاف المنصورة",
        "زراعة أسنان المنصورة",
        "تبييض أسنان بالليزر",
        "أفضل عيادة أسنان بالمنصورة",
        "استشارة أسنان أونلاين المنصورة",
        "تشخيص أسنان أونلاين مصر",
        "خدمات طب أسنان متقدمة",
        "علاج أسنان بدون ألم المنصورة"
      ]
    },
    {
      id: "cosmetic",
      label: { ar: "طب الأسنان التجميلي", en: "Cosmetic Dentistry" },
      keywords: [
        "أفضل دكتور أسنان بالمنصورة",
        "تجميل الأسنان المنصورة",
        "فينيرز أسنان المنصورة",
        "كومبوزيت فينيرز مصر",
        "تبييض أسنان بالليزر المنصورة",
        "هوليود سمايل المنصورة",
        "د. محمد خشبة أفضل دكتور أسنان",
        "تجميل الأسنان القاهرة",
        "تبييض أسنان الإسكندرية",
        "فينيرز السعودية",
        "كومبوزيت فينيرز الإمارات",
        "ابتسامة مشرقة المنصورة",
        "عيادة أسنان بالمنصورة",
        "طب أسنان تجميلي مصر",
        "أفضل عيادة تجميل أسنان",
        "استشارة فينيرز أونلاين المنصورة",
        "هوليود سمايل بدون ألم مصر",
        "تصميم ابتسامة رقمي المنصورة"
      ]
    },
    {
      id: "orthodontics",
      label: { ar: "تقويم الأسنان", en: "Orthodontics" },
      keywords: [
        "أفضل دكتور أسنان بالمنصورة",
        "تقويم أسنان المنصورة",
        "تقويم شفاف المنصورة",
        "أفضل دكتور تقويم أسنان بالمنصورة",
        "د. محمد خشبة أفضل دكتور أسنان",
        "تقويم أسنان القاهرة",
        "تقويم أسنان الإسكندرية",
        "تقويم شفاف السعودية",
        "تقويم أسنان الإمارات",
        "ابتسامة متناسقة مصر",
        "عيادة تقويم أسنان بالمنصورة",
        "تقويم أسنان حديث المنصورة",
        "تقويم شفاف مصر",
        "أفضل عيادة تقويم أسنان",
        "استشارة تقويم أونلاين المنصورة",
        "تشخيص تقويم أسنان مصر",
        "تقويم أسنان بدون ألم المنصورة"
      ]
    },
    {
      id: "implants",
      label: { ar: "زراعة الأسنان", en: "Dental Implants" },
      keywords: [
        "أفضل دكتور أسنان بالمنصورة",
        "زراعة أسنان المنصورة",
        "أفضل دكتور زراعة أسنان بالمنصورة",
        "د. محمد خشبة أفضل دكتور أسنان",
        "زراعة أسنان القاهرة",
        "زراعة أسنان الإسكندرية",
        "زراعة أسنان السعودية",
        "زراعة أسنان الإمارات",
        "ابتسامة قوية مصر",
        "عيادة زراعة أسنان بالمنصورة",
        "زراعة أسنان طبيعية المنصورة",
        "زراعة أسنان دائمة مصر",
        "طب أسنان المنصورة",
        "أفضل عيادة زراعة أسنان",
        "استشارة زراعة أسنان أونلاين المنصورة",
        "تشخيص زراعة أسنان مصر",
        "زراعة أسنان متقدمة مصر"
      ]
    },
  ], []);

  // Enhanced search functionality supporting both languages
  const filteredServices = useMemo(() => {
    if (!searchTerm) return allServices;
    return allServices.filter(service =>
      service.title.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const ServiceCardEnhanced = ({ service }: { service: typeof allServices[0] }) => (
    <div className="group bg-white dark:bg-dental-black rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gold/50 dark:border-gold/30">
      <Link to={service.link}>
        <div className="relative overflow-hidden">
          <LazyImage
            src={service.image}
            alt={`${service.title[language as keyof typeof service.title]} - أفضل دكتور أسنان بالمنصورة`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-5">
        <h3 className="text-base font-bold mb-2 group-hover:text-dental-gold transition-colors">
          {service.title[language as keyof typeof service.title]}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed line-clamp-3">
          {service.description[language as keyof typeof service.description]}
        </p>
        <div className="flex items-center justify-center">
          <Link
            to={service.link}
            className="inline-flex items-center gap-2 text-dental-gold hover:text-dental-gold/80 font-medium transition-colors text-sm"
          >
            {t.readMore}
          </Link>
        </div>
        <div className="hidden">
          {service.keywords.concat([
            "أفضل دكتور أسنان بالمنصورة",
            "د. محمد خشبة أفضل دكتور أسنان",
            "عيادة أسنان المنصورة",
            "خدمات طب أسنان مصر",
            "استشارة أسنان أونلاين المنصورة",
            "تشخيص أسنان متقدم مصر"
          ]).join(', ')}
        </div>
        <Helmet>
          <meta name="keywords" content={service.keywords.concat([
            "أفضل دكتور أسنان بالمنصورة",
            "د. محمد خشبة أفضل دكتور أسنان",
            "عيادة أسنان المنصورة",
            "خدمات طب أسنان مصر",
            "استشارة أسنان أونلاين المنصورة",
            "تشخيص أسنان متقدم مصر"
          ]).join(', ')} />
          <meta name="description" content={`${service.description[language as keyof typeof service.description].substring(0, 160)} - أفضل دكتور أسنان بالمنصورة`} />
          <link rel="canonical" href={`https://drkhashaba.com${service.link}`} />
        </Helmet>
      </div>
    </div>
  );

   const WhyChooseUsSection = () => (
    <section className="pb-8 pt-2 bg-gradient-to-t from-dental-gold/20 to-gray-50 dark:bg-gradient-to-t dark:from-dental-gold/20 dark:to-dental-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-dental-gold font-medium mb-2 block text-sm">{t.whyChooseUs}</span>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{t.whyTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-lg mx-auto">
            {t.whyDescription}
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          {[
            {
              icon: Award,
              title: t.advancedTech,
              description: t.advancedTechDesc
            },
            {
              icon: Users,
              title: t.expertTeam,
              description: t.expertTeamDesc
            },
            {
              icon: Star,
              title: t.comfortableEnv,
              description: t.comfortableEnvDesc
            },
            {
              icon: Smile,
              title: t.personalizedCare,
              description: t.personalizedCareDesc
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center border border-dental-darkGold/50 p-4 bg-white dark:bg-dental-black rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 text-dental-gold" />
              </div>
              <h3 className="text-sm font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="hidden">
          {[
            "أفضل دكتور أسنان بالمنصورة",
            "عيادة د. محمد خشبة",
            "رعاية أسنان المنصورة",
            "طب أسنان القاهرة",
            "هوليود سمايل مصر",
            "تجميل الأسنان الإسكندرية",
            "خدمات أسنان السعودية",
            "طب أسنان الإمارات",
            "ابتسامة واثقة مصر",
            "أفضل عيادة أسنان بالمنصورة",
            "استشارة أسنان أونلاين المنصورة",
            "تشخيص أسنان أونلاين مصر",
            "رعاية أسنان متقدمة مصر"
          ].join(', ')}
        </div>
        <Helmet>
          <meta name="keywords" content="أفضل دكتور أسنان بالمنصورة, عيادة د. محمد خشبة, رعاية أسنان المنصورة, طب أسنان القاهرة, هوليود سمايل مصر, تجميل الأسنان الإسكندرية, خدمات أسنان السعودية, طب أسنان الإمارات, ابتسامة واثقة مصر, أفضل عيادة أسنان بالمنصورة, استشارة أسنان أونلاين المنصورة, تشخيص أسنان أونلاين مصر, رعاية أسنان متقدمة مصر" />
          <meta name="description" content={t.whyDescription} />
        </Helmet>
      </div>
    </section>
  );

  const OnlineConsultationCTA = () => (
    <section className="py-10 px-2 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-dental-black via:dental-darkGold/20 dark:to-dental-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/consultation-pattern.svg')] bg-cover bg-center opacity-10 dark:opacity-20" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-dental-gold/10 to-dental-darkGold/20 dark:bg-dental-black dark:bg-dental-darkGold/20 rounded-2xl shadow-lg p-10 md:p-12  mx-auto text-center border border-dental-gold/20"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dental-gold/10 to-transparent opacity-60 dark:from-dental-gold/20 dark:to-dental-black/60" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              {t.onlineConsultationTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base mb-6 max-w-2xl mx-auto leading-relaxed">
              {t.onlineConsultationSubtitle}
            </p>
            
            <p className=" font-semibold text-sm mb-6">
              {t.onlineConsultationHighlight}
            </p>
            <Button
              asChild
              className="bg-dental-gold hover:bg-dental-gold/90 text-white px-10 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link to="/online-consultation">
                {t.onlineConsultationButton}
              </Link>
            </Button>
          </motion.div>
          <div className="hidden">
            {[
              "أفضل دكتور أسنان بالمنصورة",
              "استشارة أسنان أونلاين المنصورة",
              "د. محمد خشبة استشارة أونلاين",
              "تشخيص أسنان أونلاين مصر",
              "عيادة أسنان المنصورة",
              "استشارة تقويم شفاف المنصورة",
              "استشارة فينيرز المنصورة",
              "استشارة زراعة أسنان المنصورة",
              "طب أسنان القاهرة",
              "هوليود سمايل مصر",
              "أفضل عيادة أسنان بالمنصورة",
              "خدمات طب أسنان مصر",
              "تشخيص أسنان متقدم مصر",
              "استشارة أسنان بدون ألم المنصورة",
              "خطة علاج أسنان مخصصة مصر"
            ].join(', ')}
          </div>
          <Helmet>
            <meta name="keywords" content="أفضل دكتور أسنان بالمنصورة, استشارة أسنان أونلاين المنصورة, د. محمد خشبة استشارة أونلاين, تشخيص أسنان أونلاين مصر, عيادة أسنان المنصورة, استشارة تقويم شفاف المنصورة, استشارة فينيرز المنصورة, استشارة زراعة أسنان المنصورة, طب أسنان القاهرة, هوليود سمايل مصر, أفضل عيادة أسنان بالمنصورة, خدمات طب أسنان مصر, تشخيص أسنان متقدم مصر, استشارة أسنان بدون ألم المنصورة, خطة علاج أسنان مخصصة مصر" />
            <meta name="description" content={t.onlineConsultationSubtitle} />
            <link rel="canonical" href="https://drkhashaba.com/online-consultation" />
          </Helmet>
        </motion.div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content={[
          "أفضل دكتور أسنان بالمنصورة",
          "د. محمد خشبة أفضل دكتور أسنان",
          "فينيرز أسنان المنصورة",
          "تقويم شفاف المنصورة",
          "زراعة أسنان المنصورة",
          "تبييض أسنان بالليزر المنصورة",
          "هوليود سمايل المنصورة",
          "تجميل الأسنان القاهرة",
          "طب أسنان الإسكندرية",
          "خدمات أسنان السعودية",
          "طب أسنان الإمارات",
          "ابتسامة واثقة مصر",
          "عيادة أسنان بالمنصورة",
          "أفضل عيادة أسنان بالمنصورة",
          "كومبوزيت فينيرز مصر",
          "استشارة أسنان أونلاين المنصورة",
          "تشخيص أسنان أونلاين مصر",
          "خدمات طب أسنان متقدمة",
          "علاج أسنان بدون ألم المنصورة"
        ].join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Mohamed Khashaba Clinic" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8" />
        <meta property="og:title" content={t.pageTitle} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drkhashaba.com/services" />
        <meta property="og:image" content="/img1.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.pageTitle} />
        <meta name="twitter:description" content={t.metaDescription} />
        <meta name="twitter:image" content="/img1.jpg" />
        <link rel="canonical" href="https://drkhashaba.com/services" />
      </Helmet>

      <SimpleHeroSection
        Badge={isRTL ? " خدماتنا" : "Our Services"}
        title={t.heroTitle}
        subtitle={t.heroDescription}
        backgroundImage="/img1.jpg"
      />

      {/* Hidden SEO Keywords */}
      <div className="hidden">
        {[
          "أفضل دكتور أسنان بالمنصورة",
          "د. محمد خشبة أفضل دكتور أسنان",
          "فينيرز أسنان المنصورة",
          "تقويم شفاف المنصورة",
          "زراعة أسنان المنصورة",
          "تبييض أسنان بالليزر المنصورة",
          "هوليود سمايل المنصورة",
          "تجميل الأسنان القاهرة",
          "طب أسنان الإسكندرية",
          "خدمات أسنان السعودية",
          "طب أسنان الإمارات",
          "ابتسامة واثقة مصر",
          "عيادة أسنان بالمنصورة",
          "أفضل عيادة أسنان بالمنصورة",
          "كومبوزيت فينيرز مصر",
          "استشارة أسنان أونلاين المنصورة",
          "تشخيص أسنان أونلاين مصر",
          "خدمات طب أسنان متقدمة",
          "علاج أسنان بدون ألم المنصورة"
        ].join(', ')}
      </div>

      {/* Services Section */}
      <section className="py-12 bg-gray-50 dark:bg-dental-black/50">
        <div className="container mx-auto px-4">
          <SectionTitle
            subtitle={t.servicesSubtitle}
            title={t.servicesTitle}
            description={t.servicesDescription}
          />
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="max-w-md mx-auto mb-6">
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11  pr-4 rounded-full text-sm border-gray-300 dark:border-gray-600 focus:ring-dental-gold focus:border-dental-gold shadow-sm"
                />
              </div>
            </div>
            {/* Enhanced Category Tabs */}
            <Tabs dir={isRTL ? "rtl" : "ltr"} defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full mx-auto">
              <div className="overflow-x-auto pb-3">
                <TabsList className="bg-white dark:bg-dental-dark/30 p-1.5 rounded-full mx-auto inline-flex gap-1">
                  {categories.map(category => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 data-[state=active]:bg-dental-gold data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:dark:bg-dental-dark/50"
                    >
                      {category.label[language as keyof typeof category.label]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {(category.id === "all"
                      ? filteredServices
                      : filteredServices.filter(service => service.category === category.id)
                    ).map((service) => (
                      <ServiceCardEnhanced key={service.id} service={service} />
                    ))}
                  </motion.div>
                  {(category.id === "all"
                    ? filteredServices
                    : filteredServices.filter(service => service.category === category.id)
                  ).length === 0 && (
                    <div className="text-center py-10">
                      <Search className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                      <h3 className="text-base font-semibold mb-2">
                        {language === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {language === 'ar'
                          ? 'جرب كلمات مختلفة مثل "فينيرز" أو "تقويم"'
                          : 'Try different keywords like "veneers" or "orthodontics"'
                        }
                      </p>
                    </div>
                  )}
                  <div className="hidden">
                    {category.keywords.join(', ')}
                  </div>
                  <Helmet>
                    <meta name="keywords" content={category.keywords.join(', ')} />
                    <meta name="description" content={`${t.servicesDescription} - أفضل دكتور أسنان بالمنصورة`} />
                  </Helmet>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Online Consultation CTA Section */}
      <OnlineConsultationCTA />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />
      <BeforeAfterSection />
    
      <CTASection />  
      <ServiceTestimonials />
      <FAQSection />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": language === 'ar' ? "عيادة د. محمد خشبة - أفضل دكتور أسنان بالمنصورة" : "Dr. Mohamed Khashaba Clinic - Best Dentist in Mansoura",
            "image": "https://drkhashaba.com/images/og-image.jpg",
            "description": t.metaDescription,
            "url": "https://drkhashaba.com/services",
            "telephone": "+201234567890",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": language === 'ar' ? "المنصورة" : "Mansoura",
              "addressLocality": language === 'ar' ? "وسط البلد" : "Downtown",
              "addressCountry": "EG"
            },
            "openingHours": "Mo-Sa 09:00-21:00",
            "priceRange": "$$",
            "medicalSpecialty": ["CosmeticDentistry", "Orthodontics", "DentalImplant"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": language === 'ar' ? "خدمات طب الأسنان" : "Dental Services",
              "itemListElement": allServices.map(service => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "MedicalProcedure",
                  "name": `${service.title[language as keyof typeof service.title]} - أفضل دكتور أسنان بالمنصورة`,
                  "description": `${service.description[language as keyof typeof service.description]} - تقدمه عيادة د. محمد خشبة`,
                  "keywords": service.keywords.concat([
                    "أفضل دكتور أسنان بالمنصورة",
                    "د. محمد خشبة أفضل دكتور أسنان",
                    "عيادة أسنان المنصورة",
                    "خدمات طب أسنان مصر",
                    "استشارة أسنان أونلاين المنصورة",
                    "تشخيص أسنان متقدم مصر"
                  ])
                }
              }))
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "250"
            },
            "areaServed": [
              { "@type": "City", "name": "Mansoura" },
              { "@type": "City", "name": "Cairo" },
              { "@type": "City", "name": "Alexandria" },
              { "@type": "Country", "name": "Saudi Arabia" },
              { "@type": "Country", "name": "United Arab Emirates" }
            ],
            "keywords": [
              "أفضل دكتور أسنان بالمنصورة",
              "د. محمد خشبة أفضل دكتور أسنان",
              "فينيرز أسنان المنصورة",
              "تقويم شفاف المنصورة",
              "زراعة أسنان المنصورة",
              "تبييض أسنان بالليزر المنصورة",
              "هوليود سمايل المنصورة",
              "تجميل الأسنان القاهرة",
              "طب أسنان الإسكندرية",
              "خدمات أسنان السعودية",
              "طب أسنان الإمارات",
              "ابتسامة واثقة مصر",
              "عيادة أسنان بالمنصورة",
              "أفضل عيادة أسنان بالمنصورة",
              "كومبوزيت فينيرز مصر",
              "استشارة أسنان أونلاين المنصورة",
              "تشخيص أسنان أونلاين مصر",
              "خدمات طب أسنان متقدمة",
              "علاج أسنان بدون ألم المنصورة"
            ]
          })
        }}
      />
    </div>
  );
}