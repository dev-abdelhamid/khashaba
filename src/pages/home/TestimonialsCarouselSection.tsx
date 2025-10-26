
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { QuoteIcon, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";

export default function TestimonialsCarouselSection() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const language = searchParams.get('lang') === 'en' ? 'en' : 'ar';
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      nameAr: "سارة أحمد",
      nameEn: "Sara Ahmed",
      roleAr: "مريضة الفينير المركب",
      roleEn: "Composite Veneers Patient",
      quoteAr: "لقد كنت قلقة بشأن ابتسامتي لسنوات، لكن د. محمد خشبة حول ابتسامتي تماماً باستخدام الفينير المركب. النتائج طبيعية ومذهلة، وكانت التجربة أسهل بكثير مما توقعت.",
      quoteEn: "I had been worried about my smile for years, but Dr. Mohamed Khashaba completely transformed my smile using composite veneers. The results are natural and amazing, and the experience was much easier than I expected.",
      imageUrl: "/lovable-uploads/a4133f53-5101-43f3-82db-98d385a26bbf.png",
      rating: 5
    },
    {
      nameAr: "محمد عبدالله",
      nameEn: "Mohamed Abdullah",
      roleAr: "مريض زراعة الأسنان",
      roleEn: "Dental Implant Patient",
      quoteAr: "بعد فقدان عدة أسنان، أوصاني أصدقائي بزيارة د. محمد خشبة. عملية زراعة الأسنان التي أجراها أعادت لي ثقتي وقدرتي على تناول الطعام بشكل طبيعي. أنا ممتن جداً للنتائج المذهلة!",
      quoteEn: "After losing several teeth, my friends recommended visiting Dr. Mohamed Khashaba. The dental implant procedure he performed restored my confidence and ability to eat normally. I'm very grateful for the amazing results!",
      imageUrl: "/lovable-uploads/a4133f53-5101-43f3-82db-98d385a26bbf.png",
      rating: 5
    },
    {
      nameAr: "فاطمة محمد",
      nameEn: "Fatima Mohamed",
      roleAr: "مريضة تجميل الأسنان",
      roleEn: "Cosmetic Dentistry Patient",
      quoteAr: "كانت تجربتي مع د. محمد خشبة استثنائية. لطالما كنت خائفة من زيارة طبيب الأسنان، لكن فريقه جعلني أشعر بالراحة والأمان. النتائج تجاوزت توقعاتي، وأصبحت الآن أحب ابتسامتي!",
      quoteEn: "My experience with Dr. Mohamed Khashaba was exceptional. I had always been afraid of visiting the dentist, but his team made me feel comfortable and safe. The results exceeded my expectations, and I now love my smile!",
      imageUrl: "/lovable-uploads/a4133f53-5101-43f3-82db-98d385a26bbf.png",
      rating: 5
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const texts = {
    subtitle: language === "ar" ? "آراء مرضانا" : "Our Patients' Opinions",
    title: language === "ar" ? "ماذا يقول مرضانا عنا" : "What Our Patients Say About Us",
    description: language === "ar" 
      ? "استمع إلى تجارب مرضانا الحقيقية واكتشف كيف ساعدناهم في تحسين ابتساماتهم وثقتهم بأنفسهم."
      : "Listen to our patients' real experiences and discover how we helped them improve their smiles and confidence.",
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-50 dark:bg-dental-black/20 overflow-hidden">
      <div className="container-custom relative">
        <SectionTitle
          subtitle={texts.subtitle}
          title={texts.title}
          description={texts.description}
          center
        />
        
        <div className="relative mt-16 px-4 md:px-10">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 text-dental-gold/10 dark:text-dental-gold/5">
            <QuoteIcon className="h-32 w-32" />
          </div>
          <div className="absolute bottom-0 right-0 text-dental-gold/10 dark:text-dental-gold/5 transform rotate-180">
            <QuoteIcon className="h-32 w-32" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <div className="bg-white dark:bg-dental-darkGray p-8 rounded-lg shadow-lg relative">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < currentTestimonial.rating 
                              ? "text-dental-gold fill-dental-gold" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed relative z-10">
                      "{language === 'ar' ? currentTestimonial.quoteAr : currentTestimonial.quoteEn}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 rtl:mr-0 rtl:ml-4">
                        <img 
                          src={currentTestimonial.imageUrl} 
                          alt={language === 'ar' ? currentTestimonial.nameAr : currentTestimonial.nameEn} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-dental-black dark:text-white">
                          {language === 'ar' ? currentTestimonial.nameAr : currentTestimonial.nameEn}
                        </h4>
                        <p className="text-sm text-dental-gold">
                          {language === 'ar' ? currentTestimonial.roleAr : currentTestimonial.roleEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-dental-gold">
                      <img 
                        src={currentTestimonial.imageUrl} 
                        alt={language === 'ar' ? currentTestimonial.nameAr : currentTestimonial.nameEn}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevTestimonial}
                  className="rounded-full border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextTestimonial}
                  className="rounded-full border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-dental-gold w-6" 
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
