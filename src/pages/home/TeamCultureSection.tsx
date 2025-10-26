
import { motion } from "framer-motion";
import { Heart, Shield, Users, Trophy, HeartHandshake } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export default function TeamCultureSection() {
  const values = [
    {
      icon: <Heart className="h-7 w-7 text-dental-gold" />,
      title: "رعاية متكاملة",
      description: "نضع صحتك ورفاهيتك في مقدمة أولوياتنا مع نهج كامل للرعاية الصحية"
    },
    {
      icon: <Shield className="h-7 w-7 text-dental-gold" />,
      title: "الأمان والثقة",
      description: "نطبق أعلى معايير السلامة والتعقيم لحماية مرضانا وفريقنا"
    },
    {
      icon: <Users className="h-7 w-7 text-dental-gold" />,
      title: "فريق متكامل",
      description: "يعمل فريقنا بروح الجماعة لتوفير تجربة علاجية استثنائية"
    },
    {
      icon: <Trophy className="h-7 w-7 text-dental-gold" />,
      title: "التميز المستمر",
      description: "نسعى دائماً للتطوير المستمر وتبني أحدث التقنيات والممارسات"
    },
    {
      icon: <HeartHandshake className="h-7 w-7 text-dental-gold" />,
      title: "التواصل الفعال",
      description: "نؤمن بأهمية التواصل المفتوح والصادق مع مرضانا طوال رحلة العلاج"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-dental-black/90 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="ثقافة فريقنا"
          title="قيمنا ومبادئنا"
          description="في عيادة د. محمد خشبة نلتزم بمجموعة من القيم الأساسية التي توجه عملنا وتعاملنا مع المرضى"
          center
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-dental-darkGray rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" 
              }}
            >
              <div className="bg-dental-gold/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-5">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-siwa">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 p-8 bg-dental-gold/10 rounded-2xl border border-dental-gold/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold mb-3 font-siwa">بيئة عمل إيجابية</h3>
              <p className="text-gray-600 dark:text-gray-300">
                نحن نؤمن بأن بيئة العمل الإيجابية والداعمة تنعكس بشكل مباشر على جودة الرعاية التي نقدمها لمرضانا. لذلك نحرص على بناء فريق متناغم يعمل بروح الفريق الواحد ويشارك نفس الرؤية والقيم.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div 
                  key={item} 
                  className="rounded-lg overflow-hidden aspect-square"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={`https://images.unsplash.com/photo-16511${40 + item}8564-6c38ad41f2${item}0?q=80&w=500&auto=format&fit=crop`} 
                    alt={`فريق العمل ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
