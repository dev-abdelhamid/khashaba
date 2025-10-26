
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Smile, Baby, Sparkles, Flame, Replace, Activity } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { cn } from "@/lib/utils";
import LazyImage from "@/components/LazyImage";

// Define the dental services with their details
const dentalServices = [
  {
    id: "teeth-whitening",
    title: "تبييض الأسنان",
    description: "استعد ابتسامة أكثر إشراقاً وجاذبية مع تقنيات تبييض الأسنان المتطورة لدينا.",
    icon: <Sparkles className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1581585375182-99e0a8fbdb61?q=80&w=2574&auto=format&fit=crop",
    benefits: ["نتائج فورية وملحوظة", "تقنيات آمنة بدون أضرار", "جلسات سريعة وفعالة"],
    link: "/services/teeth-whitening",
    color: "from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10",
    iconBg: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    id: "dental-implants",
    title: "زراعة الأسنان",
    description: "استعد أسنانك المفقودة بأحدث تقنيات زراعة الأسنان التي توفر حلاً دائماً وطبيعياً.",
    icon: <Replace className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1579776333035-1191ab56ff36?q=80&w=2574&auto=format&fit=crop",
    benefits: ["استعادة الوظائف الطبيعية للأسنان", "مظهر طبيعي ودائم", "حل نهائي لفقدان الأسنان"],
    link: "/services/dental-implants",
    color: "from-emerald-100 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-800/10",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30"
  },
  {
    id: "orthodontics",
    title: "تقويم الأسنان",
    description: "حصول على ابتسامة متناسقة ومثالية مع خيارات تقويم الأسنان المتنوعة لجميع الأعمار.",
    icon: <Smile className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2574&auto=format&fit=crop",
    benefits: ["تقويم شفاف غير مرئي", "تقويم سريع للحالات البسيطة", "نتائج دائمة وفعالة"],
    link: "/services/orthodontics",
    color: "from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10",
    iconBg: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    id: "cosmetic-dentistry",
    title: "طب الأسنان التجميلي",
    description: "حول ابتسامتك بإجراءات تجميلية متطورة تمنحك مظهراً طبيعياً جذاباً يناسب ملامح وجهك.",
    icon: <Flame className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2670&auto=format&fit=crop",
    benefits: ["فينير وعدسات أسنان طبيعية", "تصميم ابتسامة رقمي", "نتائج فورية وملحوظة"],
    link: "/services/cosmetic-dentistry",
    color: "from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/10",
    iconBg: "bg-amber-100 dark:bg-amber-900/30"
  },
  {
    id: "pediatric-dentistry",
    title: "طب أسنان الأطفال",
    description: "رعاية متخصصة لأسنان الأطفال في بيئة مريحة وممتعة تساعدهم على بناء علاقة إيجابية مع طب الأسنان.",
    icon: <Baby className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1595110045545-4e7952f9bec8?q=80&w=2574&auto=format&fit=crop",
    benefits: ["تجربة علاج خالية من الخوف", "وقاية فعالة من تسوس الأسنان", "متابعة نمو الأسنان بشكل صحيح"],
    link: "/services/pediatric-dentistry",
    color: "from-pink-100 to-pink-50 dark:from-pink-900/20 dark:to-pink-800/10",
    iconBg: "bg-pink-100 dark:bg-pink-900/30"
  },
  {
    id: "root-canal",
    title: "علاج قنوات الجذور",
    description: "علاج متطور لإنقاذ الأسنان المتضررة بتقنيات دقيقة تضمن راحة المريض والحفاظ على الأسنان الطبيعية.",
    icon: <Activity className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?q=80&w=2574&auto=format&fit=crop",
    benefits: ["تخفيف الألم بشكل فوري", "إنقاذ السن الطبيعي", "تقنيات حديثة بدون ألم"],
    link: "/services/root-canal",
    color: "from-teal-100 to-teal-50 dark:from-teal-900/20 dark:to-teal-800/10",
    iconBg: "bg-teal-100 dark:bg-teal-900/30"
  }
];

export default function DentalServicesSection() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const currentService = dentalServices[currentServiceIndex];

  const nextService = () => {
    setCurrentServiceIndex((prev) => 
      prev === dentalServices.length - 1 ? 0 : prev + 1
    );
  };

  const prevService = () => {
    setCurrentServiceIndex((prev) => 
      prev === 0 ? dentalServices.length - 1 : prev - 1
    );
  };

  const goToService = (index: number) => {
    setCurrentServiceIndex(index);
  };

  return (
    <section className="py-20 bg-white dark:bg-dental-black/40">
      <div className="container-custom">
        <SectionTitle
          subtitle="خدماتنا المتخصصة"
          title="العلاجات والخدمات المتميزة"
          description="نقدم مجموعة متكاملة من الخدمات العلاجية والتجميلية لمنحك ابتسامة صحية وجذابة"
          center
        />

        <div className="mt-16 relative">
          {/* Main Service Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Service Image Column */}
            <motion.div
              key={`image-${currentServiceIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <LazyImage
                src={currentService.image}
                alt={currentService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dental-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-dental-gold text-white mb-3">
                  خدمة متميزة
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">{currentService.title}</h3>
                <Link 
                  to={currentService.link}
                  className="text-white hover:text-dental-gold inline-flex items-center text-sm mt-2 transition-colors duration-300"
                >
                  <span>اكتشف المزيد</span>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                </Link>
              </div>
            </motion.div>

            {/* Service Details Column */}
            <motion.div
              key={`details-${currentServiceIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className={cn("p-1 rounded-full w-16 h-16 flex items-center justify-center mb-6", currentService.iconBg)}>
                {currentService.icon}
              </div>
              
              <h3 className="text-3xl font-bold mb-4 font-playfair">{currentService.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">{currentService.description}</p>
              
              <div className="mb-8">
                <h4 className="font-bold mb-4 text-lg">مميزات الخدمة:</h4>
                <ul className="space-y-2">
                  {currentService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-dental-gold/20 flex items-center justify-center text-dental-gold mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                to={currentService.link}
                className="inline-flex items-center bg-dental-gold text-white px-6 py-3 rounded-lg transition-all hover:bg-dental-darkGold hover:scale-105 font-medium"
              >
                <span>تفاصيل الخدمة</span>
                <ArrowRight className="h-5 w-5 mr-2 rtl:rotate-180" />
              </Link>
            </motion.div>
          </div>

          {/* Service Navigation */}
          <div className="mt-12">
            <div className="flex justify-between items-center">
              <button 
                onClick={prevService}
                className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-dental-gold hover:border-dental-gold hover:text-white transition-all"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <div className="flex space-x-2 rtl:space-x-reverse">
                {dentalServices.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => goToService(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentServiceIndex 
                        ? "w-8 bg-dental-gold" 
                        : "w-2 bg-gray-300 dark:bg-gray-700"
                    }`}
                    aria-label={`Go to ${service.title}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextService}
                className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-dental-gold hover:border-dental-gold hover:text-white transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Small Cards for All Services */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dentalServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => goToService(index)}
                className={cn(
                  `p-4 rounded-lg cursor-pointer transition-all hover:scale-105 bg-gradient-to-br ${service.color}`,
                  index === currentServiceIndex ? "ring-2 ring-dental-gold ring-offset-2 dark:ring-offset-dental-black" : ""
                )}
              >
                <div className={cn("p-1 rounded-full w-10 h-10 flex items-center justify-center mb-3", service.iconBg)}>
                  {service.icon}
                </div>
                <h3 className="font-bold text-sm mb-1">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
