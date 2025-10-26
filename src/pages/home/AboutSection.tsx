import { Link } from "react-router-dom";
import { CheckCircle, Award, Users, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";


const getStatistics = (isRTL: boolean) => [
  {
    value: "8+",
    label: isRTL ? "سنوات خبرة" : "Years of Expertise",
    description: isRTL
      ? "في طب الأسنان التجميلي والعلاجي بتقنيات عالمية"
      : "In cosmetic and therapeutic dentistry with global techniques",
  },
  {
    value: "5K+",
    label: isRTL ? "مرضى راضين" : "Happy Patients",
    description: isRTL
      ? "حققوا أحلامهم مع ابتسامات متألقة"
      : "Achieved radiant smiles and their dreams",
  },
  {
    value: "5+",
    label: isRTL ? "أطباء متخصصين" : "Specialist Doctors",
    description: isRTL
      ? "خبرة عالية في العلاجات المتقدمة"
      : "Highly experienced in advanced treatments",
  },
  {
    value: "99%",
    label: isRTL ? "رضا المرضى" : "Patient Satisfaction",
    description: isRTL
      ? "تقييمات متميزة من عملائنا"
      : "Outstanding reviews from our clients",
  },
];

export default function AboutSection() {
  const { isRTL } = useApp();
  const statistics = getStatistics(isRTL);

  return (
    <>
      <section
        className="py-8 md:py-12  bg-gradient-to-t from-dental-gold/20 to-white dark:from-dental-gold/20 dark:to-dental-black"
        dir={isRTL ? "rtl" : "ltr"}
        aria-labelledby="about-section-title"
      >
        <div className="container mx-auto px-4  ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image Section with Parallax */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500"
              initial={{ opacity: 0, x: isRTL ? 50 : -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <img
                  src="/dr2.jpg"
                  alt={isRTL ? "د. محمد خشبة - استشاري طب الأسنان" : "Dr. Mohamed Khashaba - Dental Consultant"}
                  className="w-full h-[400px] md:h-[450px] object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width="600"
                  height="500"
                />
                {/* Statistics Overlay with Icons */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                  <div className="grid  grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {statistics.map((stat, index) => (
                      <motion.div
                        key={index}
                        className=" flex flex-col mb-2 text-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, duration: 0.6 }}
                        title={stat.description}
                      >
                        <p className="text-xl sm:text-2xl font-bold text-dental-gold" aria-label={`${stat.value} ${stat.label}`}>
                          {stat.value}
                        </p>
                        <p className={"text-xs text-center sm:text-sm text-white/90"}>
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="space-y-6"
            >
              <SectionTitle
                id="about-section-title"
                title={isRTL ? "بقيادة الدكتور محمد خشبة" : "Led by Dr. Mohamed Khashaba"}
                description={isRTL
                  ? "نحن نؤمن بأن كل ابتسامة فريدة تستحق عناية استثنائية تتجاوز التوقعات. في عيادة د. محمد خشبة، يجمع فريقنا الطبي المتخصص خبرة تزيد عن 8 سنوات في مجال طب الأسنان التجميلي والعلاجي باستخدام أحدث التقنيات العالمية، مثل الليزر والأشعة ثلاثية الأبعاد. نهدف إلى تقديم حلول شخصية مبتكرة تناسب احتياجاتك الصحية والجمالية، مع ضمان تجربة فاخرة تلبي رؤيتك لابتسامة مثالية تدوم مدى الحياة. انضم إلينا لنمنحك الثقة من خلال ابتسامة متألقة!"
                  : "We believe that every unique smile deserves exceptional care that exceeds expectations. At Dr. Mohamed Khashaba’s clinic, our specialized medical team combines over 8 years of expertise in cosmetic and therapeutic dentistry using the latest global technologies, such as laser and 3D imaging. Our mission is to deliver innovative, personalized solutions tailored to your health and beauty needs, ensuring a luxurious experience that fulfills your vision of a perfect, lifelong smile. Join us to gain confidence with a radiant smile!"}
              />
              <div className="flex flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-b from-dental-gold to-dental-darkGold/90 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-dental-gold/40 hover:shadow-dental-gold/50"
                  aria-label={isRTL ? "تعرف على المزيد عن الدكتور محمد خشبة وخدماتنا" : "Learn more about Dr. Mohamed Khashaba and our services"}
                >
                  <Link
                    to="/about"
                    className={"flex items-center gap-2"}
                  >
                    {isRTL ? "تعرف علينا " : "Learn More "}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-dental-gold  hover:bg-dental-gold/10 text-black dark:text-white hover:text-dental-gold  transition-all duration-300 px-4 py-3 rounded-lg"
                  aria-label={isRTL ? "تواصل معنا للحصول على استشارة مجانية" : "Contact us for a free consultation"}
                >
                  <Link
                    to="/contact"
                    className={"flex items-center gap-2"}
                  >
                    {isRTL ? "تواصل معنا" : "Contact Us"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": isRTL ? "د. محمد خشبة" : "Dr. Mohamed Khashaba",
            "jobTitle": isRTL
              ? "استشاري طب وجراحة الفم والأسنان"
              : "Oral & Maxillofacial Surgery Consultant",
            "description": isRTL
              ? "د. محمد خشبة - أفضل طبيب أسنان في مصر مع خبرة 8+ سنوات في زراعة الأسنان الفورية وتجميل الابتسامة بتقنيات ألمانية متطورة."
              : "Dr. Mohamed Khashaba - Egypt's top dentist with over 8 years of experience in immediate dental implants and smile enhancement using advanced German technologies.",
            "image": "/dr2.jpg",
            "url": typeof window !== "undefined" ? window.location.origin : "",
            "sameAs": [
              "https://www.facebook.com/khashabaclinics",
              "https://www.instagram.com/khashabaclinics",
              "https://www.linkedin.com/in/drmohamedkhashaba",
            ],
            "worksFor": {
              "@type": "Dentist",
              "name": isRTL ? "عيادة د. محمد خشبة لطب الأسنان" : "Dr. Mohamed Khashaba Dental Clinic",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "EG",
                "addressLocality": isRTL ? "المنصورة" : "Mansoura",
              
              },
              "telephone": "+201234567890",
              "priceRange": "$$$",
            },
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": isRTL ? "بكالوريوس طب الأسنان" : "Bachelor of Dental Surgery",
                "credentialCategory": "degree",
              },
              {
                "@type": "EducationalOccupationalCredential",
                "name": isRTL
                  ? "شهادات دولية في زراعة الأسنان"
                  : "International Dental Implant Certifications",
                "credentialCategory": "certification",
              },
            ],
            "knowsAbout": [
              isRTL ? "زراعة الأسنان" : "Dental Implants",
              isRTL ? "تجميل الأسنان" : "Cosmetic Dentistry",
              isRTL ? "ابتسامة هوليود" : "Hollywood Smile",
              isRTL ? "تقويم الأسنان" : "Orthodontics",
              isRTL ? "تبييض الأسنان" : "Teeth Whitening",
              isRTL ? "جراحة الفم" : "Oral Surgery",
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "750",
              "bestRating": "5",
            },
            "review": [
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                },
                "author": {
                  "@type": "Person",
                  "name": "Ahmed Khaled",
                },
                "reviewBody": isRTL
                  ? "خدمة ممتازة ونتائج مذهلة، شكرًا د. محمد!"
                  : "Excellent service and amazing results, thank you Dr. Mohamed!",
              },
            ],
          }),
        }}
      />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h2>
          {isRTL
            ? "د. محمد خشبة - أفضل طبيب أسنان في مصر والشرق الأوسط"
            : "Dr. Mohamed Khashaba - Best Dentist in Egypt & Middle East"}
        </h2>
        <p>
          {isRTL
            ? "خبرة 8+ سنوات في زراعة الأسنان الفورية، ابتسامة هوليود، تقويم الأسنان الشفاف، تبييض الأسنان بالليزر، وجراحات الفم بتقنيات ألمانية متطورة."
            : "Over 8 years of experience in immediate dental implants, Hollywood smile, clear aligners, laser teeth whitening, and oral surgeries with advanced German technologies."}
        </p>
        <ul>
          <li>{isRTL ? "5,000+ مريض راضٍ" : "5,000+ satisfied patients"}</li>
          <li>{isRTL ? "5+ طبيب متخصص" : "5+ specialized doctors"}</li>
          <li>{isRTL ? "99% نسبة نجاح" : "99% success rate"}</li>
          <li>{isRTL ? "ضمان مدى الحياة" : "Lifetime warranty"}</li>
          <li>{isRTL ? "تقنيات ألمانية متطورة" : "Advanced German technologies"}</li>
          <li>{isRTL ? "استشارات مجانية" : "Free consultations"}</li>
        </ul>
        <div>
          <strong>{isRTL ? "الخدمات:" : "Services:"}</strong>
          {isRTL
            ? "زراعة أسنان فورية، ابتسامة هوليود، فينير، لومينير، تقويم شفاف، تبييض ليزر، علاج عصب، جراحة لثة، تركيبات دائمة"
            : "immediate dental implants, Hollywood smile, veneers, lumineers, clear aligners, laser whitening, root canal, gum surgery, permanent restorations"}
        </div>
        <div>
          <strong>{isRTL ? "الموقع:" : "Location:"}</strong>
          {isRTL
            ? "المنصوره مصر - عيادة د. محمد خشبة لطب الأسنان"
            : "Cairo, Egypt - Dr. Mohamed Khashaba Dental Clinic"}
        </div>
        <div>
          <strong>{isRTL ? "التخصصات:" : "Specializations:"}</strong>
          {isRTL
            ? "طب الأسنان التجميلي، زراعة الأسنان، تقويم الأسنان، جراحة الفم والوجه والفكين، طب أسنان الأطفال"
            : "Cosmetic Dentistry, Dental Implantology, Orthodontics, Oral and Maxillofacial Surgery, Pediatric Dentistry"}
        </div>
        <div>
          <strong>{isRTL ? "الشهادات:" : "Certifications:"}</strong>
          {isRTL
            ? "بكالوريوس طب الأسنان، ماجستير زراعة الأسنان، شهادات دولية من ألمانيا وسويسرا وفرنسا"
            : "Bachelor of Dental Surgery, Master's in Dental Implantology, International certifications from Germany, Switzerland, and France"}
        </div>
        <div>
          <strong>{isRTL ? "المعدات:" : "Equipment:"}</strong>
          {isRTL
            ? "أحدث الأجهزة الألمانية، ليزر متطور، أشعة ثلاثية الأبعاد، تصميم ابتسامة رقمي"
            : "Latest German equipment, advanced laser, 3D X-ray, digital smile design"}
        </div>
        <div>
          <strong>{isRTL ? "المميزات:" : "Features:"}</strong>
          {isRTL
            ? "عيادة معقمة، فريق متخصص، أسعار تنافسية، ضمان شامل، متابعة دورية، خدمة عملاء فاخرة"
            : "Sterilized clinic, specialized team, competitive prices, comprehensive warranty, regular follow-up, luxurious customer service"}
        </div>
        <div>
          <strong>{isRTL ? "أوقات العمل:" : "Working Hours:"}</strong>
          {isRTL
            ? "السبت - الخميس: 9 صباحاً - 9 مساءً، الجمعة: 12 ظهراً - 8 مساءً"
            : "Saturday - Thursday: 9 AM - 9 PM, Friday: 12 PM - 8 PM"}
        </div>
        <div>
          <strong>{isRTL ? "طرق الدفع:" : "Payment Methods:"}</strong>
          {isRTL
            ? "نقدي، بطاقات ائتمان، تقسيط بدون فوائد، تأمين طبي"
            : "Cash, credit cards, interest-free installments, medical insurance"}
        </div>
      
      </div>

      {/* Additional SEO Meta Tags */}
      {typeof window !== "undefined" && (
        <>
          <meta
            name="description"
            content={isRTL
              ? "د. محمد خشبة - أفضل طبيب أسنان في مصر والشرق الأوسط. خبرة 8+ سنوات في زراعة الأسنان الفورية، ابتسامة هوليود، وتقويم الأسنان. 5,000+ مريض راضٍ. احجز استشارتك المجانية اليوم!"
              : "Dr. Mohamed Khashaba - Top dentist in Egypt & Middle East. 8+ years in immediate dental implants, Hollywood smile, and orthodontics. 5,000+ satisfied patients. Book your free consultation today!"}
          />
          <meta
            name="keywords"
            content={isRTL
              ? "طبيب أسنان, زراعة أسنان, ابتسامة هوليود, تقويم أسنان, تبييض أسنان, د محمد خشبة, عيادة أسنان القاهرة, أفضل طبيب أسنان مصر, زراعة أسنان فورية, تجميل أسنان, تقويم شفاف, ليزر أسنان"
              : "dentist, dental implants, Hollywood smile, orthodontics, teeth whitening, Dr Mohamed Khashaba, dental clinic Cairo, best dentist Egypt, immediate dental implants, cosmetic dentistry, clear aligners, laser dentistry"}
          />
          <meta
            property="og:title"
            content={isRTL
              ? "د. محمد خشبة - أفضل طبيب أسنان في مصر | زراعة أسنان فورية"
              : "Dr. Mohamed Khashaba - Best Dentist in Egypt | Immediate Dental Implants"}
          />
          <meta
            property="og:description"
            content={isRTL
              ? "خبرة 8+ سنة في طب الأسنان التجميلي والعلاجي. 5,000+ مريض راضٍ. تقنيات ألمانية متطورة. احجز استشارتك الآن!"
              : "8+ years experience in cosmetic and therapeutic dentistry. 5,000+ satisfied patients. Advanced German technologies. Book your consultation now!"}
          />
          <meta property="og:image" content="/dr2.jpg" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={isRTL
              ? "د. محمد خشبة - أفضل طبيب أسنان في مصر"
              : "Dr. Mohamed Khashaba - Best Dentist in Egypt"}
          />
          <meta
            name="twitter:description"
            content={isRTL
              ? "خبرة 8+ سنة في زراعة الأسنان وابتسامة هوليود. 5,000+ مريض راضٍ"
              : "8+ years experience in dental implants and Hollywood smile. 5,000+ satisfied patients"}
          />
          <meta name="twitter:image" content="/dr2.jpg" />
          <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
        </>
      )}
    </>
  );
}