
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import LazyImage from "@/components/LazyImage";


const services = [
  {
    id: 1,
    title: "زراعة الأسنان",
    description: "استعد ابتسامتك الكاملة مع زراعة الأسنان المتطورة وأحدث التقنيات.",
    icon: "/icons/implant.svg",
    image: "https://images.unsplash.com/photo-1579776333035-1191ab56ff36?q=80&w=2574&auto=format&fit=crop",
    link: "/services/dental-implants",
  },
  {
    id: 2,
    title: "تقويم الأسنان",
    description: "أحصل على أسنان مستقيمة وابتسامة جميلة مع خدمات تقويم الأسنان المتميزة.",
    icon: "/icons/orthodontics.svg",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2574&auto=format&fit=crop",
    link: "/services/orthodontics",
  },
  {
    id: 3,
    title: "تبييض الأسنان",
    description: "احصل على ابتسامة أكثر إشراقًا مع خدمات تبييض الأسنان الاحترافية لدينا.",
    icon: "/icons/whitening.svg",
    image: "https://images.unsplash.com/photo-1581585375182-99e0a8fbdb61?q=80&w=2574&auto=format&fit=crop",
    link: "/services/teeth-whitening",
  },
  {
    id: 4,
    title: "طب الأسنان التجميلي",
    description: "نقدم خدمات طب الأسنان التجميلي لتحسين مظهر ابتسامتك بشكل طبيعي وجذاب.",
    icon: "/icons/cosmetic.svg",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2670&auto=format&fit=crop",
    link: "/services/cosmetic-dentistry",
  },
  {
    id: 5,
    title: "علاج جذور الأسنان",
    description: "علاج قنوات الجذور بتقنيات متطورة وخبرة عالية لإنقاذ الأسنان المتضررة.",
    icon: "/icons/root-canal.svg",
    image: "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?q=80&w=2574&auto=format&fit=crop",
    link: "/services/root-canal",
  },
  {
    id: 6,
    title: "طب أسنان الأطفال",
    description: "رعاية خاصة لأسنان الأطفال في بيئة مريحة وودية لتأسيس عادات صحية مبكرة.",
    icon: "/icons/pediatric.svg",
    image: "https://images.unsplash.com/photo-1595110045545-4e7952f9bec8?q=80&w=2574&auto=format&fit=crop",
    link: "/services/pediatric-dentistry",
  },
  {
    id: 7,
    title: "تركيبات الأسنان",
    description: "تركيبات أسنان عالية الجودة تجمع بين المتانة والمظهر الطبيعي الجميل.",
    icon: "/icons/prosthetics.svg",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=2670&auto=format&fit=crop",
    link: "/services/dental-prosthetics",
  },
  {
    id: 8,
    title: "جراحة الفم والوجه والفكين",
    description: "علاجات جراحية متخصصة لمشاكل الفم والوجه والفكين بأحدث التقنيات.",
    icon: "/icons/surgery.svg",
    image: "https://images.unsplash.com/photo-1622905810727-78b8c1c2aed9?q=80&w=2574&auto=format&fit=crop",
    link: "/services/oral-surgery",
  },
];

const additionalServices = [
  "فحص وتنظيف الأسنان",
  "علاج اللثة",
  "حشوات الأسنان التجميلية",
  "تركيب العدسات والقشرة",
  "علاج آلام المفصل الصدغي الفكي",
  "علاج مشاكل الانسجة الرخوة",
  "علاج حساسية الأسنان",
  "تجبير الأسنان",
  "خلع الأسنان",
  "علاج أمراض اللثة",
  "علاج تسوس الأسنان",
  "زراعة العظام"
];

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "خدماتنا - عيادة د. محمد خشبة";
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-dental-black">
        <div className="absolute mt-20 inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dental-black/90 to-transparent z-10" />
          <LazyImage
            src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2574&auto=format&fit=crop"
            alt="خدمات عيادة د. محمد خشبة"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-6xl">
            <span className="inline-block text-dental-gold border border-dental-gold px-4 py-1 rounded-full text-sm font-medium mb-4">
              خدمات متكاملة
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              خدمات طب الأسنان
              <span className="text-dental-gold block mt-2">المتخصصة</span>
            </h1>
            <p className="text-gray-200 text-lg mb-8 max-w-lg">
              نقدم مجموعة شاملة من خدمات طب الأسنان العلاجية والتجميلية والوقائية لمساعدتك على الحفاظ على صحة فمك وجمال ابتسامتك.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20">
        <div className="container-custom">
          <SectionTitle
            subtitle="خدماتنا الرئيسية"
            title="خدمات طب الأسنان المتخصصة"
            description="نقدم مجموعة شاملة من خدمات طب الأسنان المتخصصة باستخدام أحدث التقنيات وبواسطة فريق طبي متميز."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {services.slice(0, 4).map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                link={service.link}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${service.id * 0.2}s`, animationFillMode: "forwards" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-dental-black/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                subtitle="لماذا تختارنا"
                title="خدمات عالية الجودة لرعاية أسنانك"
                description="نلتزم بتقديم أفضل رعاية لصحة الفم والأسنان من خلال فريق طبي متخصص وتقنيات حديثة."
              />
              <div className="mt-6 space-y-4">
                <div className="flex">
                  <div className="mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                    <div className="h-10 w-10 rounded-full bg-dental-gold/20 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-dental-gold rtl:rotate-180" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">فريق طبي متخصص</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      يضم فريقنا نخبة من أطباء الأسنان المتخصصين في مختلف مجالات طب الأسنان.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                    <div className="h-10 w-10 rounded-full bg-dental-gold/20 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-dental-gold rtl:rotate-180" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">أحدث التقنيات</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      نستخدم أحدث التقنيات والمعدات لضمان دقة التشخيص وفعالية العلاج.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                    <div className="h-10 w-10 rounded-full bg-dental-gold/20 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-dental-gold rtl:rotate-180" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">بيئة مريحة وآمنة</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      تم تصميم عيادتنا لتوفير بيئة مريحة وآمنة لجميع المرضى.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                    <div className="h-10 w-10 rounded-full bg-dental-gold/20 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-dental-gold rtl:rotate-180" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">رعاية شخصية</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      نقدم خدمات مخصصة لتلبية الاحتياجات الفردية لكل مريض.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild className="btn-primary">
                  <Link to="/about">تعرف علينا أكثر</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <LazyImage
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop"
                  alt="عيادة د. باسم خشبة"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-dental-gold text-white p-6 rounded-lg shadow-xl">
                <p className="text-2xl font-bold font-playfair mb-1">15+</p>
                <p className="text-sm">سنوات من الخبرة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Services Section */}
      <section className="py-20">
        <div className="container-custom">
          <SectionTitle
            subtitle="المزيد من خدماتنا"
            title="خدمات طب الأسنان الإضافية"
            description="نقدم مجموعة متنوعة من خدمات طب الأسنان الإضافية لتلبية جميع احتياجاتك."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {services.slice(4).map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                link={service.link}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${(service.id - 4) * 0.2}s`, animationFillMode: "forwards" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50 dark:bg-dental-black/20">
        <div className="container-custom">
          <SectionTitle
            subtitle="الخدمات الإضافية"
            title="خدمات أخرى"
            description="بالإضافة إلى خدماتنا الرئيسية، نقدم مجموعة متنوعة من الخدمات الإضافية."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mt-12 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <div key={index} className="flex items-center">
                <div className="h-2 w-2 bg-dental-gold rounded-full mr-2 rtl:ml-2"></div>
                <span className="text-gray-700 dark:text-gray-200">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dental-gold text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              هل تحتاج إلى مساعدة في اختيار الخدمة المناسبة؟
            </h2>
            <p className="text-xl mb-8">
              احجز موعدًا الآن للحصول على استشارة مجانية وتقييم شامل لاحتياجاتك.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-dental-gold hover:bg-dental-black hover:text-white">
                <Link to="/appointment">
                  حجز موعد
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white hover:bg-white hover:text-dental-gold">
                <Link to="/contact">
                  تواصل معنا
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
