
import { motion } from "framer-motion";
import { Building, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export default function ClinicFacilitiesSection() {
  const facilities = [
    {
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2968&auto=format&fit=crop",
      title: "غرف علاج متطورة",
      description: "غرف علاج مجهزة بأحدث التقنيات والمعدات الطبية لضمان أعلى مستويات الرعاية"
    },
    {
      image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e3?q=80&w=2574&auto=format&fit=crop",
      title: "منطقة انتظار مريحة",
      description: "منطقة انتظار واسعة ومريحة مصممة لتوفير أقصى درجات الراحة خلال انتظار موعدك"
    },
    {
      image: "https://images.unsplash.com/photo-1666214280391-8ff5bd3d0afa?q=80&w=2670&auto=format&fit=crop",
      title: "معمل أشعة متكامل",
      description: "معمل أشعة مجهز بأحدث أجهزة التصوير الإشعاعي الرقمي ثنائي وثلاثي الأبعاد"
    },
    {
      image: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2670&auto=format&fit=crop",
      title: "معمل تركيبات",
      description: "معمل متخصص لتصنيع التركيبات السنية بأعلى دقة وجودة باستخدام أحدث التقنيات"
    }
  ];

  const features = [
    "تعقيم بمعايير عالمية",
    "مدخل خاص لذوي الاحتياجات الخاصة",
    "مواقف سيارات مجانية",
    "خدمة واي فاي مجانية",
    "نظام تهوية متطور",
    "شاشات تلفزيون لعرض التعليمات"
  ];

  return (
    <section className="py-24 bg-white dark:bg-dental-black/80">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="مرافق العيادة"
          title="بيئة علاجية متطورة ومريحة"
          description="تم تصميم عيادتنا وتجهيزها وفق أحدث المعايير العالمية لضمان تجربة علاجية متميزة في بيئة مريحة وآمنة"
          center
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={facility.image} 
                  alt={facility.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dental-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{facility.title}</h3>
                <p className="text-white/80">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 bg-dental-gold/5 rounded-xl p-8 border border-dental-gold/10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Building className="h-24 w-24 text-dental-gold mx-auto md:mx-0" />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">مميزات عيادتنا</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                حرصنا على توفير كافة وسائل الراحة والأمان في عيادتنا، بدءًا من سهولة الوصول والانتظار المريح وحتى غرف العلاج المجهزة بأحدث التقنيات والمعدات.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-dental-gold mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="mt-16 relative rounded-xl overflow-hidden h-80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.0345670495177!2d31.365292699999998!3d31.036889699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDAyJzEyLjgiTiAzMcKwMjEnNTUuMSJF!5e0!3m2!1sen!2seg!4v1638349115127!5m2!1sen!2seg" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Clinic location"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border-8 border-white dark:border-dental-darkGray rounded-xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
