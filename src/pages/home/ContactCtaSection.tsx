import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

export default function ContactCtaSection() {
  const { language, isRTL } = useApp();

  const content = {
    ar: {
      title: "هل لديك استفسار؟",
      description: "اتصل بنا الآن للحصول على استشارة مجانية",
      contact: "تواصل معنا",
      call: "اتصل الآن",
      address: "المنصورة، مصر",
      phone: "+201040659965",
      email: "info@drkhashabadental.com"
    },
    en: {
      title: "Do you have a question?",
      description: "Contact us now for a free consultation",
      contact: "Contact Us",
      call: "Call Now",
      address: "Mansoura, Egypt",
      phone: "+201040659965",
      email: "info@drkhashabadental.com"
    }
  };

  const t = content[language];

  return (
    <section
      className="py-10 bg-dental-gold text-white relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/15 rounded-full"></div>

      <div className="container-custom flex flex-col relative z-10">
        <div className={`flex flex-colitems-center justify-center `}>
          <motion.div
            className="mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold  mb-3">{t.title}</h3>
            <p className="text-white/90 text-lg mb-4">{t.description}</p>

            <div className={`flex flex-col sm:flex-row gap-6 mt-6 ${isRTL ? "text-right   " : " text-left "}`}>
              {[{
                icon: Phone,
                label: t.call,
                value: t.phone
              }, {
                icon: Mail,
                label: "Email",
                value: t.email
              }, {
                icon: MapPin,
                label: language === "ar" ? "العنوان" : "Address",
                value: t.address
              }].map(({ icon: Icon, label, value }, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`h-10 w-10 rounded-full bg-white/10 flex items-center justify-center ${isRTL ? "ml-3" : "mr-3"}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">{label}</p>
                    <p className="font-bold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={`flex hidden flex-row items-center justify-center gap-4 `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              className="bg-white text-dental-gold hover:bg-dental-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl py-6 px-8"
              size="lg"
            >
              <Link to="/contact">
                {t.contact}
              </Link>
            </Button>
            <Button
              asChild
              className="border-2 border-white bg-transparent hover:bg-white hover:text-dental-gold transition-all duration-300 py-6 px-8"
              size="lg"
            >
              <a href={`tel:${t.phone}`}>
                {t.call}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
