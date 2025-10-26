import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smile, Award } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const DentalCareCTA = () => {
  const { isRTL } = useApp();

  const content = isRTL
    ? {
        title: "رعاية أسنان استثنائية تستحقها",
        description:
          "في عيادة د. محمد خشبة نقدم خدمات طب أسنان متميزة بأيدي نخبة من الأطباء المتخصصين وبأحدث التقنيات العالمية.",
        features: [
          {
            icon: <Smile className="text-white w-6 h-6" />,
            title: "ابتسامة مثالية",
            desc: "نصمم لك ابتسامة مثالية تناسب ملامح وجهك بأحدث التقنيات.",
          },
          {
            icon: <Award className="text-white w-6 h-6" />,
            title: "ضمان الجودة",
            desc: "نقدم ضمان على جميع خدماتنا ونلتزم بأعلى معايير الجودة العالمية.",
          },
        ],
        cta1: "احجز موعد الآن",
        cta2: "تصفح خدماتنا",
      }
    : {
        title: "Exceptional Dental Care You Deserve",
        description:
          "At Dr. Mohamed Khashaba Clinic, we provide exceptional dental services by top specialists using the latest global technologies.",
        features: [
          {
            icon: <Smile className="text-white w-6 h-6" />,
            title: "Perfect Smile",
            desc: "We craft the ideal smile that fits your facial features using advanced techniques.",
          },
          {
            icon: <Award className="text-white w-6 h-6" />,
            title: "Quality Assurance",
            desc: "We offer guarantees on all services, committed to the highest global standards.",
          },
        ],
        cta1: "Book an Appointment",
        cta2: "Explore Our Services",
      };

  return (
    <section
      className="py-12 relative bg-gradient-to-b from-dental-gold to-dental-darkGold overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0  z-0" />

      <div className="container-custom mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {content.title}
            </h2>
            <p className="text-white/80 text-base mb-8">{content.description}</p>

            <div className="grid  grid-cols-2 gap-6 mb-10">
              {content.features.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-md"
                >
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="sm"
                className="bg-white text-dental-gold hover:bg-gray-100"
              >
                <Link to="/appointment">{content.cta1}</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-white  text-white bg-transparent"
              >
                <Link to="/services">{content.cta2}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DentalCareCTA;
