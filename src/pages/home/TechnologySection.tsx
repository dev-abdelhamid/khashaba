
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";

export default function TechnologySection() {
  return (
    <section className="py-20 bg-dental-black text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-dental-gold border border-dental-gold px-4 py-1 rounded-full text-sm font-medium mb-4">
              تكنولوجيا متطورة
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
              نستخدم أحدث التقنيات <span className="text-dental-gold">لعلاج أسنانك</span>
            </h2>
            <p className="text-gray-300 mb-8">
              في عيادة د. باسم خشبة، نستثمر في أحدث التقنيات والمعدات الطبية لضمان دقة التشخيص وفعالية العلاج وراحة المريض.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-dental-gold mt-1 ml-2 rtl:mr-2 rtl:ml-0">
                </span>
                <div>
                  <h3 className="font-bold mb-1">التصوير ثلاثي الأبعاد (CBCT)</h3>
                  <p className="text-gray-300 text-sm">
                    تقنية متطورة للتصوير الشعاعي توفر صوراً ثلاثية الأبعاد دقيقة للفكين والأسنان.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-dental-gold mt-1 ml-2 rtl:mr-2 rtl:ml-0">
                </span>
                <div>
                  <h3 className="font-bold mb-1">تقنية الليزر</h3>
                  <p className="text-gray-300 text-sm">
                    نستخدم الليزر في علاجات متنوعة للثة والأنسجة الرخوة بدقة عالية وتعافي أسرع.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-dental-gold mt-1 ml-2 rtl:mr-2 rtl:ml-0">
                </span>
                <div>
                  <h3 className="font-bold mb-1">تصميم الابتسامة الرقمي (DSD)</h3>
                  <p className="text-gray-300 text-sm">
                    تقنية تسمح لك برؤية نتائج التجميل قبل البدء بالعلاج من خلال محاكاة رقمية.
                  </p>
                </div>
              </li>
            </ul>
            
            <Button asChild className="bg-dental-gold hover:bg-dental-darkGold text-white">
              <Link to="/about#technology" className="flex items-center gap-2">
                <span>اكتشف المزيد عن تقنياتنا</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-lg overflow-hidden">
              <LazyImage
                src="https://images.unsplash.com/photo-1590424693420-78704450a47d?q=80&w=2574&auto=format&fit=crop"
                alt="تقنيات طب الأسنان"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden mt-8">
              <LazyImage
                src="https://images.unsplash.com/photo-1601945149392-9e34bc4cba68?q=80&w=2574&auto=format&fit=crop"
                alt="تقنيات طب الأسنان"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <LazyImage
                src="https://images.unsplash.com/photo-1624126677875-c42604df566e?q=80&w=2574&auto=format&fit=crop"
                alt="تقنيات طب الأسنان"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden mt-8">
              <LazyImage
                src="https://images.unsplash.com/photo-1574731305154-548ff22c0a4f?q=80&w=2574&auto=format&fit=crop"
                alt="تقنيات طب الأسنان"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
