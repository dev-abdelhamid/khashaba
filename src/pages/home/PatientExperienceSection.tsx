
import { motion } from "framer-motion";
import { Heart, Coffee, Music, Wifi, Monitor, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PatientExperienceSection() {
  const experiences = [
    {
      icon: <Heart className="h-6 w-6 text-dental-gold" />,
      title: "رعاية شخصية",
      description: "نقدم رعاية مخصصة لكل مريض مع الاهتمام بكافة التفاصيل والاحتياجات الفردية"
    },
    {
      icon: <Coffee className="h-6 w-6 text-dental-gold" />,
      title: "منطقة استراحة",
      description: "استمتع بالقهوة والمشروبات المجانية في منطقة الانتظار المريحة"
    },
    {
      icon: <Music className="h-6 w-6 text-dental-gold" />,
      title: "موسيقى هادئة",
      description: "أجواء مريحة مع موسيقى هادئة تساعد على الاسترخاء خلال الانتظار والعلاج"
    },
    {
      icon: <Wifi className="h-6 w-6 text-dental-gold" />,
      title: "واي فاي مجاني",
      description: "اتصال إنترنت عالي السرعة متاح مجانًا لجميع المرضى"
    },
    {
      icon: <Monitor className="h-6 w-6 text-dental-gold" />,
      title: "شاشات ترفيهية",
      description: "شاشات تلفزيون في غرف العلاج لمشاهدة المحتوى المفضل لديك أثناء الإجراءات"
    }
  ];

  const testimonials = [
    {
      content: "تجربة رائعة من البداية للنهاية. شعرت بالراحة والاطمئنان طوال فترة العلاج.",
      author: "أحمد محمد"
    },
    {
      content: "فريق ودود للغاية والاهتمام بالتفاصيل كان مذهلاً. أنصح الجميع بزيارة العيادة.",
      author: "سارة علي"
    },
    {
      content: "لأول مرة أزور طبيب أسنان دون قلق. الأجواء المريحة والفريق اللطيف جعلا التجربة إيجابية.",
      author: "محمود عبدالله"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dental-black/20 dark:to-dental-black">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="تجربة المريض"
          title="تجربة علاجية مميزة ومريحة"
          description="نحرص على توفير تجربة علاجية مريحة وخالية من القلق لجميع مرضانا من خلال الاهتمام بأدق التفاصيل"
          center
        />
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-dental-darkGray rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-dental-gold/10 rounded-full w-14 h-14 flex items-center justify-center">
                  {experience.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-center">{experience.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm">{experience.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-dental-gold/5 rounded-xl p-8 border border-dental-gold/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">التغلب على خوف طبيب الأسنان</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                نتفهم قلق الكثيرين من زيارة طبيب الأسنان، لذلك صممنا عيادتنا وطورنا إجراءاتنا لجعل تجربتك مريحة وإيجابية. فريقنا مدرب على التعامل مع المرضى القلقين وتقديم الدعم اللازم طوال الزيارة.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-dental-gold mr-3 flex-shrink-0"></div>
                  <p>تقنيات استرخاء وتنفس لتقليل القلق</p>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-dental-gold mr-3 flex-shrink-0"></div>
                  <p>شرح مفصل لكل إجراء قبل البدء</p>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-dental-gold mr-3 flex-shrink-0"></div>
                  <p>تقنيات تخدير متطورة وغير مؤلمة</p>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-dental-gold mr-3 flex-shrink-0"></div>
                  <p>إمكانية استخدام التخدير الواعي للحالات الصعبة</p>
                </div>
              </div>
              
              <Button
                asChild
                className="bg-dental-gold hover:bg-dental-darkGold text-white"
              >
                <Link to="/patient-experience">
                  تعرف على تجربة المرضى
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-dental-darkGray p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="italic text-gray-600 dark:text-gray-300 mb-3">"{testimonial.content}"</p>
                  <p className="text-sm font-bold">- {testimonial.author}</p>
                </motion.div>
              ))}
              
              <div className="text-center">
                <Link to="/testimonials" className="inline-flex items-center text-dental-gold hover:text-dental-darkGold transition-colors">
                  <span>المزيد من آراء المرضى</span>
                  <ArrowRight className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
