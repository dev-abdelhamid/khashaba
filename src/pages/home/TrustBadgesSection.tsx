import { motion } from "framer-motion";
import { Shield, Award, ThumbsUp, Star, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";

export default function TrustBadgesSection() {
  const { isRTL } = useApp();

  const badges = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: isRTL ? "دقة وجودة" : "Precision & Quality",
      description: isRTL ? "دائماً نحن الأفضل في مجالنا" : "Always the best in our field"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: isRTL ? "خبرة 15+ سنة" : "15+ Years Experience",
      description: isRTL ? "في مجال طب الأسنان" : "In dental medicine"
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: isRTL ? "رضا العملاء" : "Customer Satisfaction",
      description: isRTL ? "أكثر من 5000 عميل سعيد" : "Over 5000 happy clients"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: isRTL ? "تقييم 4.9/5" : "4.9/5 Rating",
      description: isRTL ? "على جوجل وفيسبوك" : "On Google & Facebook"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: isRTL ? "فريق متخصص" : "Specialized Team",
      description: isRTL ? "أطباء ذوي خبرة عالية" : "Highly experienced doctors"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: isRTL ? "مواعيد مرنة" : "Flexible Appointments",
      description: isRTL ? "متاح 7 أيام في الأسبوع" : "Available 7 days a week"
    }
  ];

  return (
    <section 
      className="pb-4 bg-white dark:bg-dental-black text-dental-black dark:text-white overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className="w-1/2 md:w-1/3 lg:w-1/6 px-3 mb-6 lg:mb-0"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5}}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center text-dental-gold mb-3 group-hover:bg-dental-gold/20 transition-colors duration-300">
                  {badge.icon}
                </div>
                <h3 className={cn(
                  "text-sm font-bold dark:text-white mb-1 group-hover:text-dental-gold transition-colors duration-300",
                )}>
                  {badge.title}
                </h3>
                <p className={cn(
                  "text-xs text-gray-500 dark:text-gray-400",
                )}>
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
