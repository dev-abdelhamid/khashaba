
import React from "react";
import { motion } from "framer-motion";
import { Phone, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmergencyCTA = () => {
  return (
    <section className="py-12 bg-white dark:bg-dental-black overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="bg-red-600 rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#emergency-pattern)" />
            </svg>
            <defs>
              <pattern id="emergency-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M0,5 L10,5 M5,0 L5,10" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
          </div>
          
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative z-10">
            <motion.div 
              className="text-white md:w-3/5 text-center md:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-white animate-pulse" />
                <h3 className="text-xl font-bold">طوارئ الأسنان</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
                هل تعاني من ألم حاد في أسنانك؟
              </h2>
              <p className="text-white/90 mb-6">
                نوفر خدمة طوارئ الأسنان على مدار الساعة. اتصل بنا الآن للحصول على مساعدة فورية من فريقنا الطبي المتخصص.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button size="lg" asChild className="bg-white text-red-600 hover:bg-white/90">
                  <a href="tel:+201040659965" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    اتصل الآن
                  </a>
                </Button>
                <div className="flex items-center text-white">
                  <Clock className="h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0" />
                  <span>متاح 24/7</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-1 rounded-full">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-1 bg-red-600/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                  <div className="relative z-10 text-center p-4">
                   
                    <div className="font-bold text-red-600 text-lg mt-2">طوارئ</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyCTA;
