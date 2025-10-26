import React from "react";
import { motion } from "framer-motion";
import { Award, Shield, ThumbsUp, Star } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export default function TrustCTA() {
  const { isRTL } = useApp();

  const trustPoints = isRTL
    ? [
        {
          icon: <Shield className="h-6 w-6" />,
          title: "أعلى معايير السلامة",
          description: "نلتزم بأعلى معايير السلامة والتعقيم لحماية صحتك.",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: "فريق طبي معتمد",
          description: "جميع أطبائنا معتمدون من أفضل الجامعات والهيئات الطبية.",
        },
        {
          icon: <ThumbsUp className="h-6 w-6" />,
          title: "ضمان الجودة",
          description: "نقدم ضمان على جميع إجراءاتنا لراحة بالك.",
        },
        {
          icon: <Star className="h-6 w-6" />,
          title: "تقييم 4.9/5",
          description: "بناءً على أكثر من 500 تقييم من مرضانا.",
        },
      ]
    : [
        {
          icon: <Shield className="h-6 w-6" />,
          title: "Top Safety Standards",
          description: "We follow the highest standards of hygiene and sterilization to protect your health.",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: "Certified Medical Team",
          description: "All our doctors are certified by top universities and medical institutions.",
        },
        {
          icon: <ThumbsUp className="h-6 w-6" />,
          title: "Quality Assurance",
          description: "We offer guarantees on all procedures for your peace of mind.",
        },
        {
          icon: <Star className="h-6 w-6" />,
          title: "Rated 4.9/5",
          description: "Based on over 500 patient reviews.",
        },
      ];

  return (
    <section
      className="py-14 bg-gradient-to-b from-dental-gold/15 to-gray-50 dark:from-dental-gold/15 dark:to-dental-black/80"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold dark:text-white leading-relaxed mb-4",
                isRTL ? "font-arabic" : "font-english"
              )}
            >
              {isRTL ? (
                <>
                  لماذا يثق بنا <span className="text-dental-gold">آلاف المرضى؟</span>
                </>
              ) : (
                <>
                  Why Do <span className="text-dental-gold ">Thousands of Patients</span> Trust Us?
                </>
              )}
            </h2>
            <p
              className={cn(
                "text-gray-600 dark:text-w-300",
                isRTL ? "font-arabic" : "font-english"
              )}
            >
              {isRTL
                ? "نحن نفخر بتقديم رعاية استثنائية منذ أكثر من 12 عامًا، مع التزامنا التام بصحة وراحة مرضانا."
                : "We’ve been delivering exceptional dental care for over 12 years, fully committed to our patients’ health and comfort."}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              className="bg-dental-gold/5   flex flex-col items-center dark:text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border-t-2 border-b-2 border-dental-gold"
           
            >
              <div className="mb-4 w-10 h-10 rounded-full  gold-gradient text-white dark:bg-gray-800 flex items-center justify-center">
                {point.icon}
              </div>
              <h3 className="text-md lg:text-xl font-bold mb-2">{point.title}</h3>
              <p className=" text-sm lg:text-md text-gray-600 dark:text-gray-300">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
