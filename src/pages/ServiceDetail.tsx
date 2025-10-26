import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { 
  ArrowLeft, Calendar, Check, ChevronDown, ChevronUp, 
  Clock, Star, Award, Shield, ThumbsUp, Medal, ListChecks,
  BadgeCheck, FileQuestion, Target, User, MessageCircle, Layers,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";
import SectionTitle from "@/components/SectionTitle";
import { servicesData } from "@/data/services";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import FAQItem from "@/components/FAQItem";
import { useApp } from "@/contexts/AppContext";

export default function ServiceDetail() {
  const { serviceId = "" } = useParams();
  const { isRTL, language } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("benefits");

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const service = servicesData[serviceId as keyof typeof servicesData];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="container-custom py-20 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <h2 className="text-2xl font-bold mb-4">{isRTL ? 'عذرًا، الخدمة غير موجودة' : 'Sorry, service not found'}</h2>
        <p className="mb-8">{isRTL ? 'لم نتمكن من العثور على الخدمة المطلوبة' : 'We could not find the requested service'}</p>
        <Button asChild>
          <Link to="/services">{isRTL ? 'العودة إلى الخدمات' : 'Back to Services'}</Link>
        </Button>
      </div>
    );
  }

  const seoTitle = `${service.title[isRTL ? 'ar' : 'en']} - عيادة د. محمد خشبة - أفضل عيادة أسنان في المنصورة مصر`;
  const seoDescription = `${service.longDescription[isRTL ? 'ar' : 'en']} في عيادة د. محمد خشبة، أفضل دكتور أسنان في المنصورة. خدمات زراعة أسنان، تركيبات أسنان، علاج اللثة، جراحة فم وأسنان، تبييض أسنان، تقويم أسنان بأحدث التقنيات في المنصورة، الدقهلية. Best dental clinic in Mansoura Egypt for implants, crowns, gum treatment, oral surgery.`;
  const seoKeywords = isRTL ? 
    'عيادة أسنان في المنصورة, أفضل دكتور أسنان المنصورة, زراعة أسنان المنصورة, تركيبات أسنان, علاج اللثة, جراحة فم وأسنان, تبييض أسنان, تقويم أسنان, طب أسنان أطفال, ابتسامة هوليود المنصورة, دكتور محمد خشبة' : 
    'dental clinic Mansoura, best dentist Mansoura Egypt, dental implants Mansoura, crowns, gum treatment, oral surgery, teeth whitening, orthodontics, pediatric dentistry, Hollywood smile Mansoura, Dr Mohamed Khashaba';

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "عيادة د. محمد خشبة لطب وجراحة الفم والأسنان",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "أعلى معرض السراج, المشاية السفلية - أمام بوابة نادى جزيرة الورد - بجوار سنجام",
              "addressLocality": "المنصورة",
              "addressRegion": "الدقهلية",
              "postalCode": "53111",
              "addressCountry": "EG"
            },
            "telephone": "+20-XXX-XXXXXXX", // Add actual phone if available
            "openingHours": "Mo-Su 09:00-21:00", // Example
            "description": seoDescription,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "31.0364", // Approximate for Mansoura
              "longitude": "31.3807"
            },
            "sameAs": ["https://www.facebook.com/clinic", "https://www.instagram.com/clinic"] // Add social if available
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": service.title[isRTL ? 'ar' : 'en'],
            "description": service.longDescription[isRTL ? 'ar' : 'en'],
            "procedureType": "Dental",
            "bodyLocation": "Mouth",
            "howPerformed": service.process ? service.process.map(step => step.title[isRTL ? 'ar' : 'en']).join(', ') : '',
            "provider": {
              "@type": "Dentist",
              "name": "د. محمد خشبة",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "أعلى معرض السراج, المشاية السفلية - أمام بوابة نادى جزيرة الورد - بجوار سنجام",
                "addressLocality": "المنصورة",
                "addressRegion": "الدقهلية",
                "postalCode": "53111",
                "addressCountry": "EG"
              }
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-dental-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dental-black/90 via-dental-black/70 to-dental-black/50 z-10" />
          <LazyImage
            src={service.image}
            alt={`${service.title[isRTL ? 'ar' : 'en']} - أفضل عيادة أسنان في المنصورة مصر`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-dental-black/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-dental-black/80 to-transparent z-10" />
        
        <div className="container-custom pt-32 relative z-10">
          <motion.div 
            className="max-w-7xl pt-8 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className=" text-3xl md:text-4xl leading-[1.6] font-extrabold text-white mb-3">
              {service.title[isRTL ? 'ar' : 'en']} 
            </h1>
            
            <p className="text-md  text-gray-200 mb-8">
              {service.subtitle[isRTL ? 'ar' : 'en']} {service.longDescription[isRTL ? 'ar' : 'en']}
            </p>
            
            <div className="flex flex-row flex-wrap justify-center items-center gap-4">
              <Button asChild size="sm" className="bg-dental-gold hover:bg-dental-darkGold text-white">
                <Link to="/appointment" className="flex items-center">
                  <Calendar className="h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0" />
                  <span>{isRTL ? 'حجز موعد' : 'Book Appointment'}</span>
                </Link>
              </Button>
              
              <Button asChild size="sm" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
                <Link to="/contact" className="flex items-center">
                  <span>{isRTL ? 'استشارة' : 'Consultation'}</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                subtitle={isRTL ? 'نظرة عامة' : 'Overview'}
                title={`${service.title[isRTL ? 'ar' : 'en']}  `}
                description={`${service.description[isRTL ? 'ar' : 'en']}${isRTL ? ' في عيادة د. محمد خشبة، أفضل دكتور أسنان في المنصورة.' : ' in Dental Clinic, the best dentist in Mansoura Egypt.'}`}
              />
              <div className="mt-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-md leading-relaxed">
                  {service.longDescription[isRTL ? 'ar' : 'en']}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-md leading-relaxed">
                  {isRTL ? 'عيادة د. محمد خشبة تقدم أفضل خدمات طب وجراحة الفم والأسنان في المنصورة، الدقهلية. مع خبرة واسعة في زراعة الأسنان، تركيبات الأسنان، علاج اللثة، جراحة الفم، تبييض الأسنان، تقويم الأسنان، وطب أسنان الأطفال. نحن نستخدم أحدث التقنيات لضمان ابتسامة هوليود مثالية..' 
                  : 'Dr. Mohamed Khashaba Clinic offers the best oral and dental surgery services in Mansoura, Dakahlia. With extensive experience in dental implants, crowns, gum treatment, oral surgery, teeth whitening, orthodontics, and pediatric dentistry. We use the latest technologies to ensure a perfect Hollywood smile. '}
                </p>
              
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <Button asChild size="lg" className="bg-dental-gold hover:bg-dental-darkGold text-white">
                    <Link to="/appointment" className="flex items-center">
                      <span>{isRTL ? 'حجز موعد' : 'Book Appointment'}</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl h-[400px]">
                <LazyImage
                  src={service.image}
                  alt={`${service.title[isRTL ? 'ar' : 'en']} - dental services in Mansoura Egypt`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-dental-black/70 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-dental-gold text-white p-3 rounded-lg shadow-lg">
                <p className="text-sm font-medium">{service.title[isRTL ? 'ar' : 'en']}</p>
              </div>
              
             
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-gray-50 dark:bg-dental-black/20">
        <div className="container-custom">
          <SectionTitle
            subtitle={isRTL ? 'المميزات والتفاصيل' : 'Features & Details'}
            title={isRTL ? `كل ما تحتاج معرفته عن ${service.title.ar} في المنصورة` : `All You Need to Know About ${service.title.en} in Mansoura`}
            description={isRTL ? "معلومات شاملة عن الخدمة ومميزاتها والخطوات والتوصيات في أفضل عيادة أسنان بالمنصورة" : "Comprehensive information about the service, benefits, steps, and recommendations in the best dental clinic in Mansoura"}
            center
          />
          
          <div className="max-w-5xl mx-auto mt-12">
            <div className="flex flex-wrap justify-center border-b border-gray-200 dark:border-gray-700 mb-8">
              {/* Existing tabs */}
              <button
                className={cn(
                  "py-3 px-5 text-base font-medium border-b-2 focus:outline-none",
                  activeTab === "benefits"
                    ? "border-dental-gold text-dental-gold"
                    : "border-transparent hover:border-dental-gold/30 hover:text-dental-gold/70"
                )}
                onClick={() => setActiveTab("benefits")}
              >
                <span className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {isRTL ? 'المميزات' : 'Benefits'}
                </span>
              </button>
              
              <button
                className={cn(
                  "py-3 px-5 text-base font-medium border-b-2 focus:outline-none",
                  activeTab === "process"
                    ? "border-dental-gold text-dental-gold"
                    : "border-transparent hover:border-dental-gold/30 hover:text-dental-gold/70"
                )}
                onClick={() => setActiveTab("process")}
              >
                <span className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  {isRTL ? 'خطوات العلاج' : 'Treatment Steps'}
                </span>
              </button>
              
              <button
                className={cn(
                  "py-3 px-5 text-base font-medium border-b-2 focus:outline-none",
                  activeTab === "materials"
                    ? "border-dental-gold text-dental-gold"
                    : "border-transparent hover:border-dental-gold/30 hover:text-dental-gold/70"
                )}
                onClick={() => setActiveTab("materials")}
              >
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  {isRTL ? 'المواد المستخدمة' : 'Materials Used'}
                </span>
              </button>
              
              <button
                className={cn(
                  "py-3 px-5 text-base font-medium border-b-2 focus:outline-none",
                  activeTab === "types"
                    ? "border-dental-gold text-dental-gold"
                    : "border-transparent hover:border-dental-gold/30 hover:text-dental-gold/70"
                )}
                onClick={() => setActiveTab("types")}
              >
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  {isRTL ? 'الأنواع' : 'Types'}
                </span>
              </button>
              
              <button
                className={cn(
                  "py-3 px-5 text-base font-medium border-b-2 focus:outline-none",
                  activeTab === "cases"
                    ? "border-dental-gold text-dental-gold"
                    : "border-transparent hover:border-dental-gold/30 hover:text-dental-gold/70"
                )}
                onClick={() => setActiveTab("cases")}
              >
                <span className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {isRTL ? 'الحالات' : 'Cases'}
                </span>
              </button>
              
              <button
                className={cn(
                  "py-3 px-5 text-base font-medium border-b-2 focus:outline-none",
                  activeTab === "recommendations"
                    ? "border-dental-gold text-dental-gold"
                    : "border-transparent hover:border-dental-gold/30 hover:text-dental-gold/70"
                )}
                onClick={() => setActiveTab("recommendations")}
              >
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  {isRTL ? 'التوصيات' : 'Recommendations'}
                </span>
              </button>
            </div>
            
            <div className="mt-8">
              {/* Benefits Tab */}
              {activeTab === "benefits" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {service.benefits.map((benefit: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="bg-white dark:bg-dental-black/40 p-4 border border-dental-gold/40 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-start">
                        <div className="mr-2 rtl:ml-2 rtl:mr-0 ">
                          <div className="h-8 w-8 rounded-full bg-dental-gold/20  border border-dental-gold flex items-center justify-center">
                            <Check className="h-4 w-4 text-dental-gold" />
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200 text-lg">
                          {benefit[isRTL ? 'ar' : 'en']}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Process Tab */}
              {activeTab === "process" && (
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-dental-gold/30 transform -translate-x-1/2 md:block hidden"></div>
                  {service.process.map((step: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className={`relative mb-12 ${index % 2 === 0 ? 'lg:text-right lg:mr-auto' : 'lg:text-left lg:ml-auto'} lg:w-[calc(50%-40px)] w-full`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} flex-col lg:flex-row`}>
                        <div 
                          className={`mx-auto lg:mx-0 order-1 lg:order-none mb-4 lg:mb-0 ${index % 2 === 0 ? 'lg:-right-20' : 'lg:-left-20'} h-12 w-12 rounded-full bg-dental-gold flex items-center justify-center z-10`}
                        >
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                        <div className="bg-white dark:bg-dental-black/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto lg:mx-0">
                          <h3 className="text-xl font-bold mb-3 text-dental-gold">{step.title[isRTL ? 'ar' : 'en']}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{step.description[isRTL ? 'ar' : 'en']}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Materials Tab (Optional) */}
              {activeTab === "materials" && service.materials && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.materials.map((material: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="bg-white dark:bg-dental-black/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold mb-3 text-dental-gold">{material.name[isRTL ? 'ar' : 'en']}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{material.description[isRTL ? 'ar' : 'en']}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Types Tab (Optional) */}
              {activeTab === "types" && service.types && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.types.map((type: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="bg-white dark:bg-dental-black/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold mb-3 text-dental-gold">{type.name[isRTL ? 'ar' : 'en']}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{type.description[isRTL ? 'ar' : 'en']}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Cases Tab (Optional) */}
              {activeTab === "cases" && service.cases && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.cases.map((item: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="bg-white dark:bg-dental-black/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold mb-3 text-dental-gold">{item.title[isRTL ? 'ar' : 'en']}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description[isRTL ? 'ar' : 'en']}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Recommendations Tab (Optional) */}
              {activeTab === "recommendations" && service.recommendations && (
                <div className="bg-white dark:bg-dental-black/40 p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-dental-gold text-center">{isRTL ? 'توصيات ما بعد العلاج' : 'Post-Treatment Recommendations'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {service.recommendations.map((recommendation: any, index: number) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="mr-3 rtl:ml-3 rtl:mr-0 mt-1">
                          <div className="h-6 w-6 rounded-full bg-dental-gold/20 flex items-center justify-center">
                            <Check className="h-3 w-3 text-dental-gold" />
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200">{recommendation[isRTL ? 'ar' : 'en']}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  {service.recovery && (
                    <div className="mt-10 p-6 bg-dental-gold/5 rounded-lg">
                      <h4 className="text-xl font-bold mb-4 text-dental-gold">{isRTL ? 'معلومات التعافي' : 'Recovery Information'}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full bg-dental-gold/20 flex items-center justify-center mx-auto mb-3">
                            <Clock className="h-6 w-6 text-dental-gold" />
                          </div>
                          <h5 className="font-bold mb-1">{isRTL ? 'مدة التعافي' : 'Recovery Time'}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{service.recovery.time}</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full bg-dental-gold/20 flex items-center justify-center mx-auto mb-3">
                            <Shield className="h-6 w-6 text-dental-gold" />
                          </div>
                          <h5 className="font-bold mb-1">{isRTL ? 'مستوى الألم' : 'Pain Level'}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{service.recovery.painLevel}</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full bg-dental-gold/20 flex items-center justify-center mx-auto mb-3">
                            <ListChecks className="h-6 w-6 text-dental-gold" />
                          </div>
                          <h5 className="font-bold mb-1">{isRTL ? 'القيود' : 'Restrictions' }</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{service.recovery.restrictions}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section for Latest Cases */}
      <section className="py-16 bg-gradient-to-t from-dental-gold/10 to-gray-50 dark:bg-gradient-to-b dark:from-dental-black dark:to-dental-gold/10">
        <div className="container-custom">
          <SectionTitle
            subtitle={isRTL ? 'معرض الحالات' : 'Cases Gallery'}
            title={isRTL ? `أحدث حالات العملاء في ${service.title.ar}` : `Latest Client Cases in ${service.title.en}`}
            description={isRTL ? 'شاهد التحولات الرائعة قبل وبعد في عيادة د. محمد خشبة، أفضل عيادة أسنان في المنصورة لزراعة الأسنان، تركيبات، وتجميل.' : 'See amazing transformations before and after at Dr. Mohamed Khashaba Clinic, best dental clinic in Mansoura for implants, crowns, and cosmetic dentistry.'}
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {service.gallery && service.gallery.map((caseItem: { before: string; after: string; description: { ar: string; en: string } }, index: number) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-dental-black/40 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2">
                  <div>
                    <LazyImage src={caseItem.before} alt={isRTL ? 'قبل' : 'Before'} className="w-full h-48 object-cover" />
                  </div>
                  <div>
                    <LazyImage src={caseItem.after} alt={isRTL ? 'بعد' : 'After'} className="w-full h-48 object-cover" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-dental-gold mb-2">{caseItem.description[isRTL ? 'ar' : 'en']}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {isRTL ? 'نتائج مذهلة في أفضل عيادة أسنان بالمنصورة.' : 'Amazing results in the best dental clinic in Mansoura.'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section className="py-16 bg-gradient-to-b from-dental-gold/10 to-white dark:from-dental-gold/10 dark:to-dental-black/90">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div 
                className="w-full md:w-1/3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full overflow-hidden border-4 border-dental-gold/30 shadow-xl aspect-square">
                  <LazyImage 
                    src={service.doctorProfile.image} 
                    alt="د. محمد خشبة - أفضل دكتور أسنان في المنصورة مصر"
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className={`w-full md:w-2/3 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-2">{isRTL ? 'د. محمد خشبة' : 'Dr. Mohamed Khashba'}</h3>
                <p className="text-dental-gold mb-4">{isRTL ? 'افضل دكتور اسنان في المنصورة' : 'Best Dentist in Mansoura'}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                  <div className="flex items-center gap-2 bg-dental-gold/10 px-3 py-1.5 rounded-full">
                    <User className="h-4 w-4 text-dental-gold" />
                    <span className="text-sm">{isRTL ? '8 سنوات' : '8 years'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-dental-gold/10 px-3 py-1.5 rounded-full">
                    <Medal className="h-4 w-4 text-dental-gold" />
                    <span className="text-sm">{isRTL ? 'خبرة متميزة' : 'Distinguished Experience'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-dental-gold/10 px-3 py-1.5 rounded-full">
                    <Award className="h-4 w-4 text-dental-gold" />
                    <span className="text-sm">{isRTL ? 'استشاري معتمد' : 'Certified Consultant'}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {isRTL ? 'د. محمد خشبة هو أفضل دكتور أسنان في المنصورة، مصر، مع خبرة 8 سنوات في طب وجراحة الفم والأسنان. حاصل على بكالوريوس في طب الأسنان من جامعة المنصورة بتقدير امتياز مع مرتبة الشرف، وماجستير في جراحة الفم والوجه والفكين من نفس الجامعة. د. خشبة متخصص في زراعة الأسنان، تركيبات الأسنان، علاج اللثة، جراحة الفم، تبييض الأسنان، تقويم الأسنان، وطب أسنان الأطفال.' 
                  : 'Dr. Mohamed Khashba is the best dentist in Mansoura, Egypt, with 8 years of experience in oral and dental surgery. He holds a Bachelor of Dental Surgery from Mansoura University with honors and a Master\'s degree in Oral and Maxillofacial Surgery from the same university. Dr. Khashba specializes in dental implants, crowns, gum treatment, oral surgery, teeth whitening, orthodontics, and pediatric dentistry.'}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isRTL ? 'العنوان: أعلى معرض السراج, المنصورة - المشاية السفلية - أمام بوابة نادى جزيرة الورد ' : 'Address: Above Al-Siraj Showroom, Mansoura - Mashaya Sefla - In front of Geziret Al-Ward Club Gate'}
                </p>
                
                <Button asChild className="bg-dental-gold hover:bg-dental-darkGold text-white mt-4">
                  <Link to="/about">
                    {isRTL ? 'التعرف على فريقنا الطبي' : 'Meet Our Medical Team'}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 bg-gradient-to-b from-dental-gold  to-dental-darkGold dark:from-dental-gold dark:to-dental-darkGold text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold leading-relaxed md:leading-relaxed mb-6">
              {isRTL ? 'هل أنت مستعد للحصول على ابتسامة أحلامك في أفضل عيادة أسنان بالمنصورة؟' : 'Are you ready for your dream smile in the best dental clinic in Mansoura?'}
            </h2>
            <p className="text-sm text-semibold md:leading-relaxed mb-8">
              {isRTL ? 'احجز موعدًا الآن واحصل على استشارة  لتقييم حالتك مع د. محمد خشبة.' : 'Book an appointment now and get a consultation to evaluate your case with Dr. Mohamed Khashaba.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-dental-gold hover:bg-dental-black hover:text-white">
                <Link to="/appointment">
                  {isRTL ? 'حجز موعد' : 'Book Appointment'}
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white hover:bg-white/10">
                <Link to="/contact">
                  {isRTL ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50 dark:bg-dental-black/20">
        <div className="container-custom">
          <SectionTitle
            subtitle={isRTL ? 'خدمات ذات صلة' : 'Related Services'}
            title={isRTL ? 'قد تهمك أيضًا في عيادة المنصورة' : 'You May Also Be Interested In at Mansoura Clinic'}
            description={isRTL ? 'استكشف المزيد من خدماتنا المتخصصة مثل زراعة الأسنان وتركيبات في أفضل عيادة بالمنصورة' : 'Explore more of our specialized services like dental implants and crowns in the best clinic in Mansoura'}
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Object.keys(servicesData)
              .filter(id => id !== serviceId)
              .slice(0, 4)
              .map((id) => (
                <motion.div 
                  key={id}
                  className="bg-white dark:bg-dental-black/40 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48">
                    <LazyImage
                      src={servicesData[id].image}
                      alt={`${servicesData[id].title[isRTL ? 'ar' : 'en']} - خدمات أسنان في المنصورة مصر`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dental-black/70 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-dental-gold">
                      {servicesData[id].title[isRTL ? 'ar' : 'en']}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
                      {servicesData[id].description[isRTL ? 'ar' : 'en']}
                    </p>
                    <Button asChild variant="outline" className="w-full border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white">
                      <Link to={`/services/${id}`}>
                        {isRTL ? 'عرض التفاصيل' : 'View Details'}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="bg-dental-gold hover:bg-dental-darkGold text-white">
              <Link to="/services">
                {isRTL ? 'عرض جميع الخدمات' : 'View All Services'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <SectionTitle
            subtitle={isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            title={isRTL ? `أسئلة متكررة عن ${service.title.ar} في المنصورة` : `Frequently Asked Questions About ${service.title.en} in Mansoura`}
            description={isRTL ? 'إجابات لأكثر الأسئلة شيوعًا حول الخدمة في أفضل عيادة أسنان بالمنصورة' : 'Answers to the most common questions about the service in the best dental clinic in Mansoura'}
            center
          />
          <div className="max-w-3xl mx-auto mt-12">
            {service.faq.map((item: any, index: number) => (
              <FAQItem
                key={index}
                question={item.question[isRTL ? 'ar' : 'en']}
                answer={item.answer[isRTL ? 'ar' : 'en']}
                isOpen={openFaqIndex === index}
                toggleOpen={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}