import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Phone, Clock, Star, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

export default function AppointmentCTA({ className = "" }) {
  const { language, isRTL } = useApp();
  
  const t = {
    ar: {
      title: "احجز موعدًا معنا اليوم",
      description:
        "نحن نقدم مجموعة متكاملة من خدمات طب الأسنان للبالغين والأطفال. احجز موعدًا معنا اليوم وابدأ رحلتك نحو ابتسامة صحية ومشرقة.",
      features: [
        { icon: <Clock />, text: "حجز سريع وسهل" },
        { icon: <Award />, text: "فريق طبي متخصص" },
        { icon: <Star />, text: "معدات وتقنيات حديثة" },
        { icon: <Shield />, text: "رعاية شخصية" }
      ],
      buttons: {
        appointment: "حجز موعد",
        call: "اتصل بنا"
      },
      available: "متاح",
      online: "حجز أونلاين",
      experience: "سنوات من الخبرة"
    },
    en: {
      title: "Book an appointment with us today",
      description:
        "We provide a comprehensive range of dental services for adults and children. Book an appointment with us today and start your journey towards a healthy and bright smile.",
      features: [
        { icon: <Clock />, text: "Quick and easy booking" },
        { icon: <Award />, text: "Specialized medical team" },
        { icon: <Star />, text: "Modern equipment and techniques" },
        { icon: <Shield />, text: "Personal care" }
      ],
      buttons: {
        appointment: "Book an Appointment",
        call: "Call Us"
      },
      available: "Available",
      online: "Online Booking",
      experience: "Years of Experience"
    }
  }[language];

  const [offsetY, setOffsetY] = useState(0);
  
  const handleScroll = () => setOffsetY(window.scrollY);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className={`py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-dental-gold/5 via-white to-dental-gold/10 dark:from-dental-gold/10 dark:via-dental-black/90 dark:to-dental-black relative overflow-hidden ${className}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-dental-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-dental-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className={`flex flex-col lg:flex-row ${isRTL ? "lg:flex-row-reverse" : ""} gap-8 lg:gap-12 xl:gap-16 items-center`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Content Section */}
          <motion.div
            className="  text-center "
            variants={itemVariants}
          >
            {/* Title */}
            <motion.h2
              className={`  text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 gap-2 flex flex-row items-center align-center  justify-center sm:mb-6 dark:text-white leading-relaxed  `}
              variants={itemVariants}
            >
              <motion.span
                className="text-dental-gold inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {t.title.split(" ")[0]}
              </motion.span>{" "}
              <span className="text-gray-700 ">
                {t.title.split(" ").slice(1).join(" ")}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className={`text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed max-w-2xl text-center  mx-auto lg:mx-0`}
              variants={itemVariants}
            >
              {t.description}
            </motion.p>

                {/* Call to Action Banner */}
        <motion.div
          className="mt-12    text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-dental-gold/10 via-dental-gold/5 to-dental-gold/10 rounded-2xl border border-dental-gold/20 w-full max-w-7xl backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4"
           
            >
              {language === 'ar' ? "جاهز للحصول علي ابتسامة احلامك ؟ " : "Ready to get your dream smile?"}
            </motion.h3>
            <motion.p
              className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto"
      
            >
              {language === 'ar' 
                ? "انضم إلى آلاف المرضى الذين وثقوا بنا لرعاية أسنانهم واحصل على ابتسامة أحلامك"
                : "Join thousands of patients who trusted us with their dental care and get your dream smile"
              }
            </motion.p>
            <motion.div
   
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-dental-gold to-dental-darkGold hover:from-dental-darkGold hover:to-dental-gold text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold"
              >
                <Link to="/appointment" className="flex items-center gap-3">
                  {language === 'ar' ? "احجز استشارتك الان" : "Book Now"}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
       
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                className="relative h-64 sm:h-80 lg:h-96 xl:h-[450px] rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/Khashaba Dental Clinic 10.jpg"
                  alt="حجز موعد"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-black/50 via-transparent to-transparent"></div>
              </motion.div>

             

     

              {/* Decorative Background Elements */}
              <motion.div
                className="absolute w-full h-full -z-10 top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 bg-gradient-to-br from-dental-gold/20 to-dental-gold/10 rounded-2xl"
    
              ></motion.div>
              
              <motion.div
                              className="absolute w-full h-full -z-10 -top-3 sm:-top-4 lg:-top-6 left-3 sm:left-4 lg:left-6 border-2 border-dental-gold/30 rounded-2xl"
          
              ></motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-dental-gold rounded-full shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 w-3 h-3 sm:w-5 sm:h-5 bg-dental-darkGold rounded-full shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>

              <motion.div
                className="absolute top-1/2 -right-4 w-2 h-2 sm:w-4 sm:h-4 bg-dental-gold/60 rounded-full shadow-lg"
                animate={{
                  x: [0, 15, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>

      

   
      </div>

     
    </section>
  );
}
