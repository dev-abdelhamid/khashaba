import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Phone, Calendar, Star, Shield,
  CheckCircle, Sparkles, Award, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { contact } from '@/data/contact';
import { cn } from '@/lib/utils';

export const EnhancedCTASection: React.FC = memo(() => {
  const { isRTL } = useApp();

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const text = {
    heading: isRTL ? "استثمر في ابتسامتك اليوم" : "Invest in your smile today",
    description: isRTL
      ? "في عيادة الدكتور محمد خشبة، نقدم لك رعاية استثنائية بأحدث التقنيات لضمان ابتسامة صحية ومشرقة."
      : "At Dr. Khashaba’s clinic, we provide exceptional care using the latest technologies to ensure a healthy, bright smile.",
    badge: isRTL ? "ابتسامتك تبدأ من هنا" : "Your dream smile starts here",
    imageAlt: isRTL ? "صورة العيادة" : "Clinic image",
  
    bookNow: isRTL ? "احجز الآن" : "Book Now",
    yearsExp: isRTL ? "سنوات من الخبرة" : "Years of Experience",
    indicators: [
      isRTL ? "متاح الآن" : "Available now",
      isRTL ? "استشارة مجانية" : "Free consultation",
      isRTL ? "دفع مرن" : "Flexible payment"
    ],
    services: isRTL
      ? ["ابتسامة هوليوود", "زراعة الأسنان", "تقويم الأسنان", "تبييض الأسنان"]
      : ["Hollywood Smile", "Dental Implants", "Orthodontics", "Teeth Whitening"],
    benefits: isRTL
      ? ["خبرة استثنائية", "نتائج مضمونة", "تقنيات متقدمة", "أسعار تنافسية"]
      : ["Exceptional Experience", "Guaranteed Results", "Advanced Technologies", "Competitive Prices"]
  };

  const benefitIcons = [Star, Shield, Sparkles, CheckCircle];

  return (
    <section
      className="relative pt-14 pb-12 bg-dental-black text-white overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2  xl:gap-10 items-center">
          {/* Image */}
          <motion.div className={cn("relative order-2 lg:order-1", isRTL && "lg:order-2")}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-dental-gold/20 group">
              <img
                src="/cleanning.webp"
                alt={text.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dental-black/90 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
             
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
              
                <div className="flex flex-wrap gap-2">
                  {text.services.map((service, i) => (
                    <span key={i} className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>

          {/* Content */}
          <motion.div className={cn("order-1 lg:order-2", isRTL && "lg:order-1")}>
            <span className="inline-block px-4 py-2 bg-dental-gold/20 text-dental-gold rounded-full text-sm font-medium mb-6">
              {text.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {text.heading}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {text.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {text.benefits.map((b, i) => {
                const Icon = benefitIcons[i];
                return (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-dental-gold" />
                    </div>
                    <span className="text-white font-medium">{b}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col md:items-start justify-center sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-dental-gold via-dental-gold to-dental-gold text-dental-black font-bold  py-4 rounded-full"
              >
                <Link to="/appointment" className="flex items-center justify-center">
                  {text.bookNow}
                  <ArrowIcon className={cn("h-5 w-5", isRTL ? "mr-2 -translate-x-1" : "ml-2 translate-x-1")} />
                </Link>
              </Button>

            
            </div>

           
          </motion.div>
        </div>
      </div>
    </section>
  );
});

EnhancedCTASection.displayName = 'EnhancedCTASection';
