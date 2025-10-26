
import { motion } from 'framer-motion';
import { Play, Star, Users, Clock, Award, ArrowRight } from 'lucide-react';
import { useApp } from "@/contexts/AppContext";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const CoursePromotionSection = () => {
  const { isRTL } = useApp();
  const isArabic = isRTL;


  const courseFeatures = [
    {
      id: 'advanced',
      title: isArabic ? 'تقنيات متقدمة' : 'Advanced Techniques',
      description: isArabic ? 'أحدث تقنيات الكومبوزت فينيرز' : 'Latest composite veneer techniques',
      icon: <Award className="h-6 w-6 text-gold" />
    },
    {
      id: 'hands-on',
      title: isArabic ? 'تدريب عملي' : 'Hands-on Training',
      description: isArabic ? 'ورش عمل تطبيقية مع حالات حقيقية' : 'Practical workshops with real cases',
      icon: <Users className="h-6 w-6 text-gold" />
    },
    {
      id: 'certification',
      title: isArabic ? 'شهادة معتمدة' : 'Certified Course',
      description: isArabic ? 'شهادة معتمدة من د. محمد خشبة' : 'Certified by Dr. Mohamed Khashaba',
      icon: <Star className="h-6 w-6 text-gold" />
    }
  ];

  return (
    <section className="py-20  text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-gold/30">
              <CardContent className="p-8">
                <div className="relative aspect-video bg-gradient-to-br from-gold/20 to-dental-blue/20 rounded-xl overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1609840114035-3c981960dc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                    alt={isArabic ? 'دورة الكومبوزت فينيرز' : 'Composite Veneers Course'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gold" />
                      <span className="text-black dark:text-white font-alexandria">
                        {isArabic ? '32 ساعة تدريبية' : '32 Training Hours'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>

               
                </div>
              </CardContent>
            </Card>
          </motion.div>
           {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center border border-gold bg-gold/20 text-gold px-4 py-2 rounded-full mb-6">
              <span className="font-medium font-alexandria">
                {isArabic ? 'كورس حصري' : 'Exclusive Course'}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl text-black  dark:text-white font-bold mb-4 font-alexandria">
              {isArabic 
                ? 'دورة الكومبوزت فينيرز الاحترافية' 
                : 'Professional Composite Veneers Course'}
            </h2>

            <p className="text-xl text-gray-900 dark:text-gray-100 mb-6 leading-relaxed font-alexandria">
              {isArabic
                ? 'تعلم أحدث تقنيات الكومبوزت فينيرز من د. محمد خشبة وكن من الخبراء المعتمدين في هذا المجال'
                : 'Learn the latest composite veneer techniques from Dr. Mohamed Khashaba and become a certified expert in this field'}
            </p>

           

            <div className="flex justify-center flex-row gap-4">
              <Button className="bg-gold hover:bg-gold/90 text-dental-dark px-8 py-3 font-bold rounded-full font-alexandria group">
                {isArabic ? 'سجل الآن' : 'Register Now'}
              </Button>
              
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dental-dark px-8 py-3 font-bold rounded-full font-alexandria">
                <Play className={`h-5 w-5 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                {isArabic ? 'شاهد المقدمة' : 'Watch Preview'}
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CoursePromotionSection;