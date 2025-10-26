
import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Calendar, Users, Award, CheckCircle, ArrowRight, MapPin, Languages, Hourglass, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useApp } from "@/contexts/AppContext";

export default function CompositeCourseSection() {
  const location = useLocation();
  const { isRTL , language } = useApp();



  const texts = {
    subtitle: language === "ar" ? "دورة متخصصة متجددة" : "Specialized Recurring Course",
    title: language === "ar" ? "دورة الفينير المركب المتقدمة" : "Advanced Composite Veneers Course",
    description: language === "ar" 
      ? "دورة شاملة في تقنيات الفينير المركب (Composite Veneers) مع الدكتور محمد خشبة، تتجدد كل 3 شهور" 
      : "A comprehensive course in Composite Veneers techniques with Dr. Mohamed Khashaba, renewed every three months",
    learnProfessionally: language === "ar" ? "تعلم الفينير المركب بطريقة احترافية" : "Learn Composite Veneers Professionally",
    courseDetails: language === "ar" 
      ? "دورة متخصصة لأطباء الأسنان تقدم على يد د. محمد خشبة، استشاري تجميل وزراعة الأسنان. تهدف الدورة إلى تطوير مهاراتك في تطبيق تقنيات الفينير المركب باحترافية عالية." 
      : "A specialized course for dentists presented by Dr. Mohamed Khashaba, Cosmetic Dentistry and Implantology Consultant. The course aims to develop your skills in applying composite veneer techniques with high professionalism.",
    nextCourse: language === "ar" ? "الدورة القادمة:" : "Next Course:",
    seats: language === "ar" ? "عدد المقاعد:" : "Number of seats:",
    seatsCount: language === "ar" ? "10 مقاعد فقط" : "Only 10 seats",
    practicalTraining: language === "ar" ? "تدريب عملي في مجموعات صغيرة" : "Practical training in small groups",
    limitedTrainees: language === "ar" ? "عدد محدود من المتدربين لضمان جودة التدريب" : "Limited number of trainees to ensure quality training",
    trainingDays: language === "ar" ? "أيام تدريبية" : "Training days",
    traineesOnly: language === "ar" ? "متدربين فقط" : "Trainees only",
    hoursDaily: language === "ar" ? "ساعات يوميًا" : "Hours daily",
    bookYourSeat: language === "ar" ? "احجز مقعدك الآن" : "Book your seat now",
    courseDetails2: language === "ar" ? "تفاصيل الدورة" : "Course details",
    multipleCities: language === "ar" ? "تقام في القاهرة والإسكندرية والمنصورة" : "Held in Cairo, Alexandria and Mansoura",
    date: "15-17 august 2025",
    dateAr: "15-17 أغسطس 2025",
    location: language === "ar" ? "المكان: " : "Location: ",
    locationName: language === "ar" ? "القاهرة" : "Cairo",
    benefits: language === "ar" ? "مميزات الدورة" : "Course Benefits",
   
    duration: language === "ar" ? "مدة الدورة" : "Course Duration",
    durationDetails: language === "ar" ? "3 أيام (12+ ساعات يوميًا)" : "3 days (12+ hours daily)"
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-dental-black/20 overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          subtitle={texts.subtitle}
          title={texts.title}
          description={texts.description}
          center
        />
        
        <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden border  rounded-lg shadow-xl">
              <img 
                src="/dr.jpg" 
                alt="دورة الفينير المركب" 
                className="w-full h-[500px] object-cover md:object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dental-black/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-col space-y-2">
                
                  <div className="flex items-center text-white">
                    <MapPin className="h-5 w-5 rtl:ml-2 ltr:mr-2 text-dental-gold" />
                    <span>{texts.location} {texts.locationName}</span>
                  </div>
                
                </div>
              </div>
            </div>
            
            
          
            
            <div className="absolute -bottom-5 left-3 bg-gradient-to-b from-dental-gold to-dental-darkGold text-white py-2 px-4 rounded-md shadow-lg transform rotate-3">
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5  rtl:ml-2 ltr:mr-2" />
                <span className="font-bold">{language === "ar" ? "يتجدد كل 3 شهور" : "Renewed every 3 months"}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
          
            
            <p className="text-gray-600 dark:text-gray-300">
              {texts.courseDetails}
            </p>
           
            
            <div className="bg-white dark:bg-dental-darkGray p-4 rounded-lg shadow-md">
              <div className="flex items-center flex-col  mb-3">
                <div className="w-12 h-12 bg-dental-gold/10 rounded-full flex items-center justify-center ">
                  <Users className="h-6 w-6 text-dental-gold" />
                </div>
                <div>
                  <h4 className="font-bold">{texts.practicalTraining}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{texts.limitedTrainees}</p>
                </div>
              </div>
              
              <div className="flex justify-between text-center">
                <div>
                  <div className="text-2xl font-bold text-dental-gold">3</div>
                  <div className="text-sm">{texts.trainingDays}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-dental-gold">10</div>
                  <div className="text-sm">{texts.traineesOnly}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-dental-gold">12+</div>
                  <div className="text-sm">{texts.hoursDaily}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 pt-2">
              <Button asChild className="bg-gradient-to-b from-dental-gold to-dental-darkGold hover:bg-dental-darkGold text-white">
                <Link to={`/courses/composite-veneers${language === "en" ? "?lang=en" : ""}`} className="flex items-center gap-2">
                  {texts.bookYourSeat}
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white">
                <Link to={`/courses/composite-veneers${language === "en" ? "?lang=en" : ""}`} className="flex items-center gap-2">
                  {texts.courseDetails2}
                  <ArrowRight className="h-4 w-4 mr-1 rtl:ml-1 rtl:rotate-180 ltr:mr-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
