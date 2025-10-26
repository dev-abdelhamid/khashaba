import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import { motion } from "framer-motion";
import { Calendar, Smile, Phone } from "lucide-react";
import { coffeeColors } from "@/lib/colors";
import { useApp } from "@/contexts/AppContext";

export default function ConsultationCTA() {
  const { isRTL } = useApp();

  const content = isRTL
    ? {
        badge: "للأطباء والمرضى المهتمين",
        title: (
          <>
            <span className="text-dental-gold">استشارة طبية احترافية</span> مع الدكتور محمد خشبة
          </>
        ),
        description:
          "هل أنت طبيب ترغب في تعلم أحدث تقنيات العلاج والتجميل من أحد رواد المجال؟ أو مريض تبحث عن رأي متخصص في حالتك؟ احجز الآن استشارتك مع الدكتور محمد، لتأخذ خطوة واثقة نحو القرار الأفضل لحالتك أو لتطوير مهاراتك الطبية.",
        callNow: "تحدث معنا الآن",
        bookNow: "احجز استشارتك الآن",
        trust: "أكثر من 1000 مريض وطبيب يثقون بنا",
        alt: "استشارة طبية"
      }
    : {
        badge: "For doctors and patients",
        title: (
          <>
            <span className="text-dental-gold">Professional Consultation</span> with Dr. Mohamed Khashaba
          </>
        ),
        description:
          "Are you a doctor seeking to learn the latest techniques from a field leader? Or a patient in need of expert guidance for your dental condition? Book your consultation now with Dr. Mohamed and take a confident step forward.",
        callNow: "Call now",
        bookNow: "Book your consultation",
        trust: "Over 1000 satisfied patients & doctors",
        alt: "Consultation image"
      };

  return (
    <section className="pt-10  overflow-hidden">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between  md:max-w-7xl">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between rounded-3xl overflow-hidden "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* النص والمحتوى */}
          <div
            className={`p-8 md:p-12 text-gray-800 p-2 bg dark:text-white md:w-1/2 text-center ${
              isRTL ? "md:text-right" : "md:text-left"
            }`}
          >
            <span
              className="inline-block bg-dental-gold/20 border border-dental-gold text-sm font-medium px-3 py-1 rounded-full mb-4"
            
            >
              {content.badge}
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-4">{content.title}</h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6 text-base">{content.description}</p>

            {/* الأزرار */}
            <div
              className={`flex flex-row gap-4 justify-center md:justify-start items-center`}
            >
              <Button
                asChild
                variant="outline"
                className="border-dental-gold text-dental-gold hover:bg-dental-gold hover:text-white"
              >
                <a href="tel:+201040659965" className="flex items-center gap-2">
                  {isRTL ? (
                    <>
                      {content.callNow}
                    </>
                  ) : (
                    <>
                      {content.callNow}
                    </>
                  )}
                </a>
              </Button>

              <Button
                asChild
                className="bg-gradient-to-b from-dental-gold to-dental-darkGold hover:bg-dental-darkGold text-white"
              >
                <Link to="/consultation" className="flex items-center gap-2">
                  {isRTL ? (
                    <>
                      {content.bookNow}
                    </>
                  ) : (
                    <>
                      {content.bookNow}
                    </>
                  )}
                </Link>
              </Button>
            </div>

            {/* المؤشرات الاجتماعية */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div
                className={`flex items-center flex-col md:flex-row gap-4 `}
              >
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-dental-black overflow-hidden"
                    >
                      <LazyImage
                        src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`}
                        alt="صورة مريض"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-900 dark:text-gray-100 ">
                    {content.trust}
                  </span>
                </div>
              </div>
            </div>
          </div>

        {/* الصورة */}
<div className="md:w-1/2 w-full flex justify-center items-center ">
  <div className="relative w-full aspect-[4/3] max-h-[400px] rounded-b-xl md:rounded-xl overflow-hidden shadow-lg">
    <LazyImage
      src="/new-doc.jpg"
      alt={content.alt}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-1/2 pointer-events-none" />
  </div>
</div>

        </motion.div>
      </div>
    </section>
  );
}
