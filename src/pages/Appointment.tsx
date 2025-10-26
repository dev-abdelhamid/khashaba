import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

import {
  Clock, MapPin, Phone, Mail, Calendar, Users,
  ShieldCheck, Award, Star, Stethoscope, MessageCircle,
  CheckCircle, Heart, Zap, Shield, User, Timer
} from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import AppointmentForm from "@/components/AppointmentForm";
import { useApp } from "@/contexts/AppContext";
import SimpleBookingForm from "@/components/SimpleBookingForm";
import SimpleHeroSection from "@/components/CTA/SimpleHeroSection";
import { is } from "date-fns/locale";

const content = {
  ar: {
    meta: {
      title: "حجز موعد - عيادة د. محمد خشبة",
      description: "احجز موعدك مع د. محمد خشبة للحصول على أفضل رعاية لصحة أسنانك. كشف جديد، استشارة مجانية، مواعيد مرنة."
    },
    hero: {
      title: "حجز موعد كشف جديد",
      subtitle: "احجز موعدك مع د. محمد خشبة أو أحد أطباء فريقنا المتخصص",
      breadcrumb: {
        home: "الرئيسية",
        current: "حجز موعد"
      },
      cta:"احجز موعدك مع د. محمد خشبة",

    },
    form: {
      title: "حجز موعد جديد",
      subtitle: "احجز موعدك",
      description: "يرجى ملء النموذج التالي لحجز موعد كشف جديد",
      note: "سيتم تأكيد موعدك خلال 24 ساعة"
    },
    info: {
      title: "كل ما تحتاج معرفته",
      subtitle: "معلومات الموعد",
      description: "نحرص على تقديم تجربة مريحة وسلسة لمرضانا",
      workingHours: {
        title: "مواعيد العمل",
        subtitle: "نعمل لخدمتكم",
        schedule: [
          { days: "الاحد - الخميس", hours: "9:00 صباحًا - 9:00 مساءً" },
          { days: "  الجمعة - السبت", hours: "مغلق" }
        ]
      },
      location: {
        title: "موقعنا",
        subtitle: "نحن نقع في:",
        address: "123 المنصوره ",
        mapLink: "عرض على الخريطة"
      },
      contact: {
        title: "اتصل بنا",
        subtitle: "للاستفسارات العاجلة:",
        phone: "+20 104 065 9965",
        email: "info@example.com",
        whatsapp: "واتساب"
      }
    },
    features: {
      title: "لماذا تختار عيادتنا؟",
      items: [
        {
          title: "مواعيد مرنة",
          description: "نقدم مواعيد مرنة تناسب جدولك اليومي"
        },
        {
          title: "فريق متخصص",
          description: "فريق طبي مؤهل ومتخصص بخبرة واسعة"
        },
        {
          title: "معايير السلامة",
          description: "نلتزم بأعلى معايير السلامة والتعقيم"
        },
        {
          title: "كشف شامل",
          description: "كشف شامل ودقيق لحالة أسنانك ولثتك"
        },
        {
          title: "استشارة مجانية",
          description: "استشارة مجانية مع كل كشف جديد"
        },
        {
          title: "متابعة مستمرة",
          description: "متابعة مستمرة لحالتك الصحية"
        }
      ]
    },
    process: {
      title: "خطوات الحجز",
      subtitle: "عملية بسيطة وسريعة",
      steps: [
        {
          number: "01",
          title: "املأ النموذج",
          description: "املأ بياناتك الشخصية واختر الموعد المناسب"
        },
        {
          number: "02",
          title: "تأكيد الموعد",
          description: "سنتواصل معك لتأكيد الموعد خلال 24 ساعة"
        },
        {
          number: "03",
          title: "زيارة العيادة",
          description: "احضر في الموعد المحدد للكشف الشامل"
        },
        {
          number: "04",
          title: "خطة العلاج",
          description: "احصل على خطة علاجية مخصصة لحالتك"
        }
      ]
    },
    whatsapp: {
      button: "حجز عبر واتساب",
      message: "مرحباً، أريد حجز موعد كشف جديد مع د. محمد  خشبة"
    }
  },
  en: {
    meta: {
      title: "Book Appointment - Dr. mohamed Khashaba Clinic",
      description: "Book your appointment with Dr. mohamed Khashaba for the best dental care. New examination, free consultation, flexible appointments."
    },
    hero: {
      title: "Book New Examination Appointment",
      subtitle: "Book your appointment with Dr. mohamed Khashaba or one of our specialized doctors",
      breadcrumb: {
        home: "Home",
        current: "Book Appointment"
      },
      cta :"Book your appointment with Dr. mohamed Khashaba",

    },
    form: {
      title: "Book New Appointment",
      subtitle: "Book Your Appointment",
      description: "Please fill out the following form to book a new examination appointment",
      note: "Your appointment will be confirmed within 24 hours"
    },
    info: {
      title: "Everything You Need to Know",
      subtitle: "Appointment Information",
      description: "We ensure a comfortable and smooth experience for our patients",
      workingHours: {
        title: "Working Hours",
        subtitle: "We work to serve you",
        schedule: [
          { days: "sunday - Wednesday", hours: "9:00 AM - 9:00 PM" },
          { days: "Friday - Saturday", hours: "Closed" }
        ]
      },
      location: {
        title: "Our Location",
        subtitle: "We are located at:",
        address: "mansoura",
        mapLink: "View on Map"
      },
      contact: {
        title: "Contact Us",
        subtitle: "For urgent inquiries:",
        phone: "+20 104 065 9965",
        email: "info@example.com",
        whatsapp: "WhatsApp"
      }
    },
    features: {
      title: "Why Choose Our Clinic?",
      items: [
        {
          title: "Flexible Appointments",
          description: "We offer flexible appointments that fit your schedule"
        },
        {
          title: "Specialized Team",
          description: "Qualified and specialized medical team with extensive experience"
        },
        {
          title: "Safety Standards",
          description: "We adhere to the highest safety and sterilization standards"
        },
        {
          title: "Comprehensive Examination",
          description: "Comprehensive and accurate examination of your teeth and gums"
        },
        {
          title: "Free Consultation",
          description: "Free consultation with every new examination"
        },
        {
          title: "Continuous Follow-up",
          description: "Continuous follow-up of your health condition"
        }
      ]
    },
    process: {
      title: "Booking Steps",
      subtitle: "Simple and fast process",
      steps: [
        {
          number: "01",
          title: "Fill the Form",
          description: "Fill in your personal information and choose a suitable appointment"
        },
        {
          number: "02",
          title: "Confirm Appointment",
          description: "We will contact you to confirm the appointment within 24 hours"
        },
        {
          number: "03",
          title: "Visit Clinic",
          description: "Attend at the scheduled time for comprehensive examination"
        },
        {
          number: "04",
          title: "Treatment Plan",
          description: "Get a personalized treatment plan for your condition"
        }
      ]
    },
    whatsapp: {
      button: "Book via WhatsApp",
      message: "Hello, I want to book a new examination appointment with Dr. mohamed Khashaba"
    }
  }
};

const Appointment = () => {
  const { language = 'ar' } = useApp?.() || {};
  const t = content[language as keyof typeof content];
  const isRTL = language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppBooking = () => {
    const phoneNumber = "+201040659965"; // رقم الواتساب
    const message = encodeURIComponent(t.whatsapp.message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content="حجز موعد, طبيب أسنان, عيادة أسنان, كشف أسنان" />
        <link rel="canonical" href="/appointment" />
      </Helmet>

      <div className={` ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
       <SimpleHeroSection
         Badge={isRTL ? "تواصل معنا" : "Contact Us"}
          title={t.hero.title}
          subtitle={t.hero.subtitle}
          backgroundImage={"/doc11.jpg"}
        />

        {/* Main Content */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >



          <div className="flex flex-col align-items-center align-center justify-center   ">
             <SectionTitle
                subtitle={t.info.subtitle}
                title={t.info.title}
                description={t.info.description}
                className="mb-4"
              />

         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">


<div className="flex flex-col pt-10 align-items-center align-center justify-center">
<SimpleBookingForm/>

</div>
            {/* Info Section */}
            <motion.div variants={itemVariants}>
             
              <div className="space-y-6">
            

                {/* Location */}
                <motion.div 
                  className="bg-white dark:bg-dental-black rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-dental-gold/10 rounded-full flex items-center justify-center">
                      <MapPin className="text-dental-gold w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t.info.location.title}
                      </h3>
                    
                    </div>
                  </div>
                  <div className="mt-4 h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.0941421028033!2d31.370401899999997!3d31.0462747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79d0028848ff5%3A0xc6cf47ed2847b6e4!2z2K8uINmF2K3ZhdivINiu2LTYqNmHINmE2LfYqCDZiNis2LHYp9it2Kkg2KfZhNmB2YUg2YjYp9mE2KPYs9mG2KfZhg!5e1!3m2!1sar!2seg!4v1755000180723!5m2!1sar!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={isRTL ? 'خريطة عيادة المنصورة' : 'Mansoura Clinic Map'}
                aria-label={isRTL ? 'خريطة موقع عيادة د. محمد خشبة' : 'Map of Dr. Mohamed Khashaba Clinic'}
              />
            </div>
                </motion.div>
    {/* Working Hours */}
                <motion.div 
                  className="bg-white dark:bg-dental-black rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-12 h-12 bg-dental-gold/10 rounded-full flex items-center justify-center">
                      <Clock className="text-dental-gold w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl  font-bold text-left text-gray-900 dark:text-white">
                        {t.info.workingHours.title}
                      </h3>
                      <p className="text-gray-600 text-right dark:text-gray-300">
                        {t.info.workingHours.subtitle}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {t.info.workingHours.schedule.map((item, index) => (
                      <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {item.days}
                        </span>
                        <span className={`font-semibold ${item.hours === 'مغلق' || item.hours === 'Closed' ? 'text-red-500' : 'text-dental-gold'}`}>
                          {item.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
            
              </div>
              
            </motion.div>

            </div>

          </div>
        </motion.section>

        {/* Process Steps */}
        <motion.section 
          className="bg-gray-50 dark:bg-dental-darkGray py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t.process.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t.process.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {t.process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white dark:bg-dental-black rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 text-center hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-dental-gold text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <div className="pt-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </motion.section>

      </div>

      
      
    </>
  );
};

export default Appointment;
