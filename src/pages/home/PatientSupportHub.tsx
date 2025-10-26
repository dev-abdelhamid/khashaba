import React from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  MessageCircle,
  VideoIcon,
  Calendar,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useApp } from "@/contexts/AppContext";

export default function PatientSupportHub() {
  const { language, isRTL } = useApp();
  
  const content = {
    ar: {
      section: {
        subtitle: "مركز دعم المرضى",
        title: "دائماً بجانبك في كل خطوة",
        description: "نوفر العديد من قنوات الدعم والتواصل لنكون بجانبك في كل مرحلة من رحلة العلاج"
      },
      supportChannels: [
        {
          icon: <PhoneCall />,
          title: "اتصال هاتفي",
          description: "تحدث مباشرة مع فريق الدعم المتخصص على مدار الساعة",
          action: "اتصل الآن",
          link: "tel:+201040659965"
        },
        {
          icon: <MessageCircle />,
          title: "دردشة مباشرة",
          description: "تواصل معنا فوراً للحصول على إجابات سريعة ومفيدة",
          action: "ابدأ الدردشة",
          link: "#chat"
        },
        {
          icon: <VideoIcon />,
          title: "استشارة بالفيديو",
          description: "احصل على استشارة طبية متخصصة عبر مكالمة فيديو آمنة",
          action: "حجز استشارة",
          link: "/consultation"
        },
        {
          icon: <Calendar />,
          title: "حجز موعد",
          description: "احجز موعدك القادم بسهولة واختر الوقت المناسب لك",
          action: "حجز موعد",
          link: "/appointment"
        }
      ]
    },
    en: {
      section: {
        subtitle: "Patient Support Hub",
        title: "Always by your side at every step",
        description: "We provide multiple support and communication channels to be with you at every stage of your treatment journey"
      },
      supportChannels: [
        {
          icon: <PhoneCall />,
          title: "Phone Call",
          description: "Speak directly with our specialized support team available 24/7",
          action: "Call Now",
          link: "tel:+201040659965"
        },
        {
          icon: <MessageCircle />,
          title: "Live Chat",
          description: "Connect with us instantly for quick answers and helpful support",
          action: "Start Chat",
          link: "#chat"
        },
        {
          icon: <VideoIcon />,
          title: "Video Consultation",
          description: "Get specialized medical consultation via secure video call",
          action: "Book Now",
          link: "/consultation"
        },
        {
          icon: <Calendar />,
          title: "Book Appointment",
          description: "Easily book your next appointment and choose the time that suits you",
          action: "Book Now",
          link: "/appointment"
        }
      ]
    }
  };

  const t = content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      dir={isRTL ? "rtl" : "ltr"}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-dental-gold/5 to-white dark:from-dental-gold/10 dark:to-dental-black/90 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-dental-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-dental-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16 max-w-4xl mx-auto"
        >
          <SectionTitle
            subtitle={t.section.subtitle}
            title={t.section.title}
            description={t.section.description}
            center
          />
        </motion.div>

        {/* Support Channels Grid - Centered */}
        <motion.div
          className="max-w-6xl mx-auto"
      
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
            {t.supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                className="group relative w-full max-w-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon - Centered */}
                <motion.div
                  className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-dental-gold/90 to-dental-darkGold/70 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg mx-auto"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: isRTL ? -5 : 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {React.cloneElement(channel.icon, { 
                    className: "h-6 w-6 sm:h-8 sm:w-8 text-white"
                  })}
                </motion.div>

                {/* Content - Centered */}
                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-md sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white group-hover:text-dental-gold transition-colors leading-tight">
                    {channel.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-xs  leading-relaxed flex-1 min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center">
                    {channel.description}
                  </p>

                  {/* Action Button - Centered */}
                  <Button
                    asChild
                    size="sm"
                    className="w-full gold-gradient  text-dental-darkGold border border-dental-gold/30 hover:bg-gradient-to-r hover:from-dental-gold hover:to-dental-darkGold text-white hover:border-dental-gold transition-all duration-300 text-xs py-1.5"
                  >
                    <a 
                      href={channel.link} 
                      className="flex items-center  px-1  mx-autojustify-center gap-2 sm:gap-3"
                    >
                      <span>{channel.action}</span>
                      {isRTL ? (
                        <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      )}
                    </a>
                  </Button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-dental-gold/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-dental-gold/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Status Indicator - Centered */}
        <motion.div
          className="mt-10 sm:mt-12 lg:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 bg-dental-gold/10 rounded-full border border-dental-gold/20 backdrop-blur-sm">
            <div className="relative">
              <div className="w-3 h-3 bg-dental-gold rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-dental-gold rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-dental-darkGold text-sm sm:text-base font-medium">
              {language === 'ar' ? 'متاح 24/7 لخدمتك' : 'Available 24/7 to serve you'}
            </span>
          </div>
        </motion.div>

        {/* Additional centered info */}
        <motion.div
          className="mt-8 sm:mt-10 text-center max-w-7xl mx-auto"
  
        >
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-xs sm:text-sm">
            {language === 'ar' 
              ? 'فريقنا المتخصص جاهز لمساعدتك في أي وقت. اختر الطريقة الأنسب للتواصل معنا.'
              : 'Our specialized team is ready to help you anytime. Choose the most convenient way to contact us.'
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
}
