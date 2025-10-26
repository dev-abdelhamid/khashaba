               import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Award, Star, Users, Clock, Shield, Heart, Lightbulb, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import LazyImage from "@/components/LazyImage";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import SimpleHeroSection from "@/components/CTA/SimpleHeroSection";
import { Helmet } from "react-helmet";

const About = () => {
  const { language , isRTL } = useApp();
  
  const content = {
    ar: {
      pageTitle: "نبذة عنا",
      pageDescription: "تعرف على عيادة د. محمد خشبة وفريقنا المتخصص",
      breadcrumb: {
        home: "الرئيسية",
        about: "نبذة عنا"
      },
      intro: {
        subtitle: "من نحن",
        title: "عيادة د. محمد خشبة لطب الأسنان",
        description: "نحن عيادة رائدة في مجال طب الأسنان، نسعى لتقديم أعلى مستويات الرعاية الصحية باستخدام أحدث التقنيات.",
        paragraph: "تأسست عيادتنا منذ أكثر من 15 عامًا، ونحرص على استخدام أحدث التقنيات مع الاهتمام بتوفير بيئة مريحة وآمنة لجميع المرضى.",
        services: "خدماتنا",
        appointment: "احجز موعد"
      },
      vision: {
        subtitle: "رؤيتنا ورسالتنا",
        title: "نسعى لتقديم أفضل رعاية لأسنانك",
        description: "نهدف لأن نكون الخيار الأول للمرضى من خلال تقديم رعاية متميزة وشخصية.",
        vision: {
          title: "رؤيتنا",
          description: "أن نكون الرواد في تقديم خدمات طب الأسنان المتميزة والمساهمة في رفع مستوى الوعي بصحة الفم والأسنان."
        },
        mission: {
          title: "رسالتنا",
          description: "تقديم أفضل رعاية لصحة الفم والأسنان والالتزام بأعلى معايير الجودة والسلامة."
        }
      },
      whyUs: {
        subtitle: "لماذا تختارنا",
        title: "مميزات عيادتنا",
        description: "نقدم لك العديد من المميزات التي تجعلنا الخيار الأفضل.",
        features: [
          {
            icon: <Users />,
            title: "فريق طبي متخصص",
            description: "نخبة من الأطباء المتخصصين مع خبرة واسعة في مختلف مجالات طب الأسنان."
          },
          {
            icon: <CheckCircle />,
            title: "أحدث التقنيات",
            description: "نستخدم أحدث التقنيات والمعدات لضمان الدقة والفعالية في العلاج."
          },
          {
            icon: <Clock />,
            title: "مواعيد مرنة",
            description: "نقدم مواعيد مرنة تناسب جدولك مع إمكانية الحجز المسبق."
          },
          {
            icon: <Shield />,
            title: "أعلى معايير السلامة",
            description: "نلتزم بأعلى معايير السلامة والتعقيم لضمان بيئة آمنة."
          },
          {
            icon: <Star />,
            title: "خدمة متميزة",
            description: "نقدم خدمة عملاء متميزة ونهتم براحة المرضى."
          },
          {
            icon: <Heart />,
            title: "رعاية شخصية",
            description: "نهتم بتوفير رعاية شخصية لكل مريض حسب احتياجاته."
          }
        ]
      },
      values: {
        subtitle: "قيمنا",
        title: "القيم التي نؤمن بها",
        description: "نعمل وفق مجموعة من القيم الأساسية التي توجه عملنا.",
        valuesList: [
          {
            number: "01",
            title: "الاحترافية",
            description: "نلتزم بأعلى مستويات الاحترافية في جميع جوانب عملنا."
          },
          {
            number: "02",
            title: "الشفافية",
            description: "نؤمن بأهمية الشفافية في التعامل مع المرضى."
          },
          {
            number: "03",
            title: "الجودة",
            description: "نلتزم بتقديم أعلى مستويات الجودة في خدماتنا."
          }
        ]
      },
      patientEducation: {
        subtitle: "تثقيف المرضى",
        title: "نؤمن بأهمية التوعية",
        description: "نحرص على تثقيف مرضانا وزيادة وعيهم بأهمية صحة الفم والأسنان.",
        content: "نقدم برامج توعوية ونصائح مستمرة حول كيفية العناية بالأسنان والعادات الصحية السليمة.",
        quote: "نؤمن بأن المريض الواعي هو المريض القادر على الحفاظ على صحة أسنانه على المدى الطويل."
      },
      cta: {
        title: "هل أنت مستعد للحصول على ابتسامة مثالية؟",
        description: "احجز موعدًا الآن واستفد من استشارة مجانية.",
        appointment: "احجز موعد",
        contact: "تواصل معنا"
      }
    },
    en: {
      pageTitle: "About Us",
      pageDescription: "Learn about Dr. Mohamed Khashaba Clinic and our specialized team",
      breadcrumb: {
        home: "Home",
        about: "About Us"
      },
      intro: {
        subtitle: "Who We Are",
        title: "Dr. Mohamed Khashaba Dental Clinic",
        description: "We are a leading dental clinic, seeking to provide the highest levels of dental care using the latest techniques.",
        paragraph: "Our clinic was established more than 15 years ago, and we are keen to use the latest technologies while providing a comfortable and safe environment for all patients.",
        services: "Our Services",
        appointment: "Book Appointment"
      },
      vision: {
        subtitle: "Our Vision & Mission",
        title: "We strive to provide the best care for your teeth",
        description: "We aim to be the first choice for patients by providing distinguished and personalized care.",
        vision: {
          title: "Our Vision",
          description: "To be pioneers in providing distinguished dental services and contributing to raising awareness of oral and dental health."
        },
        mission: {
          title: "Our Mission",
          description: "Providing the best oral and dental health care and adhering to the highest standards of quality and safety."
        }
      },
      whyUs: {
        subtitle: "Why Choose Us",
        title: "Our Clinic Advantages",
        description: "We offer you many advantages that make us the best choice.",
        features: [
          {
            icon: <Users />,
            title: "Specialized Medical Team",
            description: "Elite specialized doctors with extensive experience in various fields of dentistry."
          },
          {
            icon: <CheckCircle />,
            title: "Latest Technologies",
            description: "We use the latest technologies and equipment to ensure accuracy and effectiveness in treatment."
          },
          {
            icon: <Clock />,
            title: "Flexible Appointments",
            description: "We offer flexible appointments that suit your schedule with advance booking options."
          },
          {
            icon: <Shield />,
            title: "Highest Safety Standards",
            description: "We adhere to the highest standards of safety and sterilization to ensure a safe environment."
          },
          {
            icon: <Star />,
            title: "Distinguished Service",
            description: "We provide distinguished customer service and care for patient comfort."
          },
          {
            icon: <Heart />,
            title: "Personal Care",
            description: "We care about providing personal care for each patient according to their needs."
          }
        ]
      },
      values: {
        subtitle: "Our Values",
        title: "The values we believe in",
        description: "We work according to a set of core values that guide our work.",
        valuesList: [
          {
            number: "01",
            title: "Professionalism",
            description: "We adhere to the highest levels of professionalism in all aspects of our work."
          },
          {
            number: "02",
            title: "Transparency",
            description: "We believe in the importance of transparency in dealing with patients."
          },
          {
            number: "03",
            title: "Quality",
            description: "We are committed to providing the highest levels of quality in our services."
          }
        ]
      },
      patientEducation: {
        subtitle: "Patient Education",
        title: "We believe in the importance of awareness",
        description: "We are keen to educate our patients and increase their awareness of the importance of oral and dental health.",
        content: "We provide awareness programs and continuous advice on how to care for teeth and healthy habits.",
        quote: "We believe that an aware patient is the one who can maintain their dental health in the long term."
      },
      cta: {
        title: "Are you ready for a perfect smile?",
        description: "Book an appointment now and benefit from a free consultation.",
        appointment: "Book Appointment",
        contact: "Contact Us"
      }
    }
  };

  const t = content[language];

  return (
    <div className="">
      <Helmet>
        <title>{isRTL ? "من نحن - د. محمد خشبة وفريقه المتخصص" : "About Us - Dr. Mohamed Khashaba & His Expert Team"}</title>
        <meta name="description" content={isRTL ? "تعرف على د. محمد خشبة وفريقه من أخصائيي طب الأسنان المتميزين. خبرة تزيد عن 15 عامًا في تقديم أفضل خدمات طب الأسنان التجميلي وزراعة الأسنان في مصر." : "Meet Dr. Mohamed Khashaba and his team of distinguished dental specialists. Over 15 years of expertise in providing the best cosmetic dentistry and dental implant services in Egypt."} />
        <meta name="keywords" content={isRTL ? "د محمد خشبة, طبيب أسنان, زراعة أسنان, تجميل أسنان, فريق طبي, القاهرة" : "Dr Mohamed Khashaba, dentist, dental implants, cosmetic dentistry, medical team, Cairo"} />
        <meta property="og:title" content={isRTL ? "من نحن - عيادة د. محمد خشبة لطب الأسنان" : "About Us - Dr. Mohamed Khashaba Dental Clinic"} />
        <meta property="og:description" content={isRTL ? "فريق من أفضل أخصائيي طب الأسنان في مصر مع خبرة تزيد عن 15 عامًا" : "A team of the best dental specialists in Egypt with over 15 years of experience"} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000" />
        <link rel="canonical" href="https://khashaba-clinics.tsd-education.com/about" />
      </Helmet>
      <SimpleHeroSection
        Badge={isRTL ? "رؤيتنا ورسالتنا" : "Our Vision & Mission"}
        title={isRTL ? "من نحن" : "About Us"}
        subtitle={isRTL ? "فريق من الخبراء المتخصصين في تقديم أفضل خدمات طب الأسنان مع أحدث التقنيات والرعاية الشخصية" : "A team of experts specialized in providing the best dental services with the latest technologies and personalized care"}
        backgroundImage="/gallery6 (2).jpg"
      />
      {/* About Us Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionTitle
              className="leading-relaxed md:leading-relaxed "
                subtitle={t.intro.subtitle}
                title={t.intro.title}
                description={t.intro.description}
              />
              <p className="text-gray-600  dark:text-gray-300 mb-6">
                {t.intro.paragraph}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Button asChild className="bg-transparent border border-dental-gold text-dental-gold hover:bg-dental-darkGold">
                  <Link to="/services">
                    {t.intro.services}
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-to-b from-dental-gold to-dental-darkGold text-white hover:bg-dental-darkGold">
                  <Link to="/appointment">
                    {t.intro.appointment}
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="rounded-lg overflow-hidden shadow-lg">
                <LazyImage
                  src="/team.jpg"
                  alt="د. محمد خشبة"
                  className="w-full h-[320px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patient Education Section */}
      <section className="py-12 bg-gray-50 dark:bg-dental-black/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="rounded-lg overflow-hidden shadow-lg">
                <LazyImage
                  src="/gallery14.jpg"
                  alt="تثقيف المرضى"
                  className="w-full h-[350px] object-cover"
                />
              <div className="absolute inset-0 bg-dental-gold/10 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-dental-black/90 p-4 rounded-full">
                  <Lightbulb className="w-8 h-8 text-dental-gold" />
                </div>
              </div>
            </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                subtitle={t.patientEducation.subtitle}
                title={t.patientEducation.title}
                description={t.patientEducation.description}
              />
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t.patientEducation.content}
              </p>
              <blockquote className=" pl-4 italic text-gray-700 dark:text-gray-300">
                "{t.patientEducation.quote}"
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-12">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              subtitle={t.vision.subtitle}
              title={t.vision.title}
              description={t.vision.description}
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white dark:bg-dental-black/40 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-dental-gold/10 p-3 rounded-full">
                  <Award className="w-6 h-6 text-dental-gold" />
                </div>
                <h3 className="text-xl font-bold mr-3">{t.vision.vision.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {t.vision.vision.description}
              </p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-dental-black/40 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-dental-gold/10 p-3 rounded-full">
                  <ThumbsUp className="w-6 h-6 text-dental-gold" />
                </div>
                <h3 className="text-xl font-bold mr-3">{t.vision.mission.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {t.vision.mission.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50 dark:bg-dental-black/20">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              subtitle={t.whyUs.subtitle}
              title={t.whyUs.title}
              description={t.whyUs.description}
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whyUs.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-dental-black/40  flex flex-col items-center justify-center p-6 rounded-lgshadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-dental-gold/10  p-3 rounded-full w-fit mb-4">
                  {React.cloneElement(feature.icon, { className: "w-6 h-6 text-dental-gold" })}
                </div>
                <h3 className="text-lg text-dental-gold   font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              subtitle={t.values.subtitle}
              title={t.values.title}
              description={t.values.description}
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.valuesList.map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-b from-dental-gold to-dental-darkGold dental-gold text-white   w-16  h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {value.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-b from-dental-gold to-dental-darkGold text-white">
        <div className="container-custom">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t.cta.title}
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <div className="flex flex-row justify-center gap-4">
              <Button asChild className="bg-white text-dental-gold hover:bg-gray-100">
                <Link to="/appointment">
                  {t.cta.appointment}
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-dental-gold">
                <Link to="/contact">
                  {t.cta.contact}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
