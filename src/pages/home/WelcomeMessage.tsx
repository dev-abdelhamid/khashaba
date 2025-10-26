import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "swiper/css";
import "yet-another-react-lightbox/styles.css";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

// Interface for ImageBox props
interface ImageBoxProps {
  src: string;
  index: number;
  alt: string;
  caption: string;
  onClick: (index: number) => void;
}

// ImageBox Component with Card Loader
function ImageBox({ src, index, alt, caption, onClick }: ImageBoxProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="aspect-[4/2] px-2 md:px-4  overflow-hidden cursor-pointer relative"
      onClick={() => onClick(index)}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-500/60 dark:bg-gray-400/40 animate-pulse  rounded-xl  flex items-center justify-center">
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "absolute inset-0 w-full h-full object-cover rounded-xl shadow-md transition-opacity duration-500",
        )}
        loading={index < 8 ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// WelcomeSection Component
export default function WelcomeSection() {
  const { isRTL } = useApp();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const topSwiperRef = useRef(null);
  const bottomSwiperRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoized gallery images
  const galleryImages = useMemo(
    () => [
  
      {
                src: "/img8.jpg",

        alt: isRTL
          ? "داخل عيادة د. محمد خشبة للأسنان بالمنصورة"
          : "Interior of Dr. Mohamed Khashaba Dental Clinic in Mansoura",
        caption: isRTL
          ? "غرفة علاج بتقنيات حديثة في المنصورة"
          : "Advanced treatment room in Mansoura",
      },
      {
        src: "/case1.jpg",
        alt: isRTL
          ? "نتائج علاج الأسنان قبل وبعد بالمنصورة"
          : "Before and after dental treatment results in Mansoura",
        caption: isRTL
          ? "تحويل الابتسامة بتقنيات متقدمة"
          : "Smile transformation with advanced techniques",
      },
      {
        src: "/gallery11 (2).jpg",
        alt: isRTL
          ? "داخل عيادة د. محمد خشبة للأسنان بالمنصورة"
          : "Interior of Dr. Mohamed Khashaba Dental Clinic in Mansoura",
        caption: isRTL
          ? "غرفة علاج بتقنيات حديثة في المنصورة"
          : "Advanced treatment room in Mansoura",
      },
      {
        src: "/after.jpg",
        alt: isRTL
          ? "نتائج علاج الأسنان قبل وبعد بالمنصورة"
          : "Before and after dental treatment results in Mansoura",
        caption: isRTL
          ? "تحويل الابتسامة بتقنيات متقدمة"
          : "Smile transformation with advanced techniques",
      },
      {
        src: "/doc11.jpg",
        alt: isRTL
          ? "نتائج علاج الأسنان قبل وبعد بالمنصورة"
          : "Before and after dental treatment results in Mansoura",
        caption: isRTL
          ? "تحويل الابتسامة بتقنيات متقدمة"
          : "Smile transformation with advanced techniques",
      },
          {
        src: "/img1.jpg",
        alt: isRTL
          ? "داخل عيادة د. محمد خشبة للأسنان بالمنصورة"
          : "Interior of Dr. Mohamed Khashaba Dental Clinic in Mansoura",
        caption: isRTL
          ? "غرفة علاج بتقنيات حديثة في المنصورة"
          : "Advanced treatment room in Mansoura",
      },
      {
        src: "/An artistic photo titled as “BEAUTY & PRECISION” 💫اثناء اختبار تركيبات الايماكس من حيث الشكل وا (1).jpg",
        alt: isRTL
          ? "أجهزة طب أسنان متطورة في المنصورة"
          : "Advanced dental equipment in Mansoura",
        caption: isRTL ? "أحدث أجهزة طب الأسنان" : "Cutting-edge dental equipment",
      },
      {
        src: "/gallery7 (2).jpg",
        alt: isRTL
          ? "داخل عيادة د. محمد خشبة للأسنان بالمنصورة"
          : "Interior of Dr. Mohamed Khashaba Dental Clinic in Mansoura",
        caption: isRTL
          ? "غرفة علاج بتقنيات حديثة في المنصورة"
          : "Advanced treatment room in Mansoura",
      },
      {
        src: "/portfolio3after.jpg",
        alt: isRTL
          ? "نتائج تجميل الأسنان في عيادة المنصورة"
          : "Cosmetic dentistry results at Mansoura clinic",
        caption: isRTL
          ? "ابتسامة مثالية مع تجميل الأسنان"
          : "Perfect smile with cosmetic dentistry",
      },
      {
        src: "/img2.jpg",
        alt: isRTL
          ? "غرفة انتظار عيادة د. محمد خشبة بالمنصورة"
          : "Waiting room at Dr. Mohamed Khashaba Clinic in Mansoura",
        caption: isRTL ? "بيئة مريحة للمرضى" : "Comfortable patient environment",
      },
      {
        src: "/Soft & hard tissue esthetics is my favourite game. 🎩تجميل اللثه بالليزر والاسنان بڤينيرز الايما.jpg",
        alt: isRTL
          ? "زراعة الأسنان المتقدمة في المنصورة"
          : "Advanced dental implants in Mansoura",
        caption: isRTL ? "زراعة أسنان بجودة عالية" : "High-quality dental implants",
      },
      {
        src: "/gallery10.jpg",
        alt: isRTL
          ? "داخل عيادة د. محمد خشبة للأسنان بالمنصورة"
          : "Interior of Dr. Mohamed Khashaba Dental Clinic in Mansoura",
        caption: isRTL
          ? "غرفة علاج بتقنيات حديثة في المنصورة"
          : "Advanced treatment room in Mansoura",
      },
      {
        src: "/Nothing different or new .. The well known E-Max veneers but in a process done with complete pas (3).jpg",
        alt: isRTL
          ? "تجميل الابتسامة بعيادة المنصورة"
          : "Smile makeover at Mansoura dental clinic",
        caption: isRTL ? "تصميم ابتسامة مخصصة" : "Custom smile design",
      },
      {
                src: "/portfolio1after.jpg",
        alt: isRTL
          ? "أدوات طب أسنان حديثة بالمنصورة"
          : "Modern dental tools in Mansoura",
        caption: isRTL ? "أدوات متقدمة لعلاج دقيق" : "Advanced tools for precise treatment",
      },
      {
        src: "/Khashaba Dental Clinic 20.jpg",
        alt: isRTL
          ? "فريق طبي متخصص بعيادة د. محمد خشبة"
          : "Specialized medical team at Dr. Mohamed Khashaba Clinic",
        caption: isRTL ? "فريق متخصص لرعاية المرضى" : "Dedicated team for patient care",
      },
         {
        src: "/img6.jpg",
        alt: isRTL
          ? "غرفة علاج الأسنان في عيادة د. محمد خشبة"
          : "Dental treatment room at Dr. Mohamed Khashaba Clinic",
        caption: isRTL
          ? "غرفة علاج متقدمة في المنصورة"
          : "Advanced treatment room in Mansoura",  
      },
      {
        src: "/single-crown.jpg",
        alt: isRTL
          ? "نتائج تبييض الأسنان بالمنصورة"
          : "Teeth whitening results in Mansoura",
        caption: isRTL
          ? "ابتسامة مشرقة مع تبييض الأسنان"
          : "Bright smile with teeth whitening",
      },
      {
        src: "/This is what “WORLD-CLASS quality” means .. 🎩✨.jpg",
        alt: isRTL
          ? "تصميم داخلي لعيادة أسنان بالمنصورة"
          : "Dental clinic interior design in Mansoura",
        caption: isRTL ? "تصميم عصري لتجربة مريحة" : "Modern design for comfort",
      },
      {
        src: "/gallery6 (2).jpg",},

        {
            src: "/gallery9 (2).jpg",
            alt: isRTL
              ? "غرفة علاج الأسنان في عيادة د. محمد خشبة"
              : "Dental treatment room at Dr. Mohamed Khashaba Clinic",
            caption: isRTL
              ? "غرفة علاج متقدمة في المنصورة"
              : "Advanced treatment room in Mansoura",

        }
   
    ],
    [isRTL]
  );

  // Memoized gallery splits and all images
  const { galleryTop, galleryBottom, allImages } = useMemo(
    () => ({
      galleryTop: galleryImages.slice(0, 5),
      galleryBottom: galleryImages.slice(5),
      allImages: galleryImages.map(({ src, alt, caption }) => ({
        src,
        alt,
        description: caption,
      })),
    }),
    [galleryImages]
  );

  // Memoized Swiper settings
  const swiperSettings = useMemo(
    () => (reverse = false) => ({
      modules: [Autoplay],
      loop: true,
      speed: 6000,
      autoplay: {
        disableOnInteraction: false,
        reverseDirection: reverse,
      },
      dir: isRTL ? "rtl" : "ltr",
      slidesPerView: "auto",
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 6 },
        640: { slidesPerView: 2, spaceBetween: 8 },
        1024: { slidesPerView: 3, spaceBetween: 10 },
      },
    }),
    [isRTL]
  );

  // Update Swiper direction on isRTL change
  useEffect(() => {
    const updateSwiper = (swiper) => {
      if (swiper) {
        swiper.changeLanguageDirection(isRTL ? "rtl" : "ltr");
        swiper.slideTo(0, 0, false);
        swiper.update();
        swiper.autoplay.start();
      }
    };
    updateSwiper(topSwiperRef.current?.swiper);
    updateSwiper(bottomSwiperRef.current?.swiper);
  }, [isRTL]);

  // Preload critical images
  useEffect(() => {
    galleryImages.slice(0, 3).forEach((img) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.src;
      document.head.appendChild(link);
    });
  }, []);

  if (!mounted) return null;

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative mx-auto w-full py-8 overflow-hidden bg-gradient-to-b from-dental-gold/20   to-dental-white dark:from-dental-darkGold/30  dark:bg-dental-black"
      itemScope
      itemType="https://schema.org/ImageGallery"
    >
    {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        viewport={{ once: true }}
        className="flex justify-center "
      >
        <img
          src="/logogold.png"
          alt="Clinic Logo"
          className="h-24 object-contain"
          style={{
            filter: "drop-shadow(0 0 15px rgba(245, 182, 24, 0.9)) brightness(1.1)",
          }}
        />
      </motion.div>

      {/* Title with Animated Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative text-center px-4 md:px-6 xl:px-8 mb-2"
      >
        <h1
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight "
          itemProp="name"
        >
          {isRTL
            ? "اكتشف الابتسامة المثالية مع د. محمد خشبة"
            : "Discover Your Perfect Smile with Dr. Mohamed Khashaba"}
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className={cn(
          "px-4 md:px-6 xl:px-8 text-center text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed",
        )}
        itemProp="description"
      >
        {isRTL
          ? "نقدم رعاية أسنان متميزة في المنصورة باستخدام أحدث التقنيات لضمان ابتسامة مشرقة وصحة فموية مستدامة."
          : "Experience exceptional dental care in Mansoura with cutting-edge technology for a radiant smile and lasting oral health."}
      </motion.p>

      {/* Swiper Galleries */}
      <div className="space-y-2  w-full" itemProp="associatedMedia" itemScope itemType="https://schema.org/ImageObject">
        <Swiper
          key={isRTL ? "rtl-top" : "ltr-top"}
          {...swiperSettings(false)}
          ref={topSwiperRef}
        >
          {galleryTop.map((img, idx) => (
            <SwiperSlide key={`top-${img.src}`} className="w-full p-2">
              <ImageBox
                src={img.src}
                index={idx}
                alt={img.alt}
                caption={img.caption}
                onClick={(i) => {
                  setCurrentIndex(i);
                  setLightboxOpen(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          key={isRTL ? "rtl-bottom" : "ltr-bottom"}
          {...swiperSettings(true)}
          ref={bottomSwiperRef}
          className="w-full"
        >
          {galleryBottom.map((img, idx) => (
            <SwiperSlide key={`bottom-${img.src}`} className="w-full p-2">
              <ImageBox
                src={img.src}
                index={idx + galleryTop.length}
                alt={img.alt}
                caption={img.caption}
                onClick={(i) => {
                  setCurrentIndex(i);
                  setLightboxOpen(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Inspirational Quote with Glow Effect */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-6 px-4 md:px-6 xl:px-8 text-center"
      >
        <div className="inline-block relative bg-dental-gold/15 border-2 border-dental-gold/30 px-4 py-3 rounded-lg text-gray-900 dark:text-white shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-dental-darkGold/50 dark:glow">
          <p
            className={cn(
              "italic text-lg font-extrabold",
              isRTL ? "font-arabic" : "font-english"
            )}
          >
            {`"${isRTL
              ? "ابتسامتك هي ثقتك، دعنا نصنعها معًا"
              : "Your smile is your confidence, let’s create it together"}"`}
          </p>
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-dental-gold/10 border-b border-r border-dental-gold/30 dark:bg-dental-darkGold/10" />
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={allImages}
            index={currentIndex}
            styles={{
              container: { backgroundColor: "rgba(0,0,0,0.95)" },
              arrow: { color: "white", fontSize: "2rem" },
            }}
            animation={{ fade: 300 }}
          />
        )}
      </AnimatePresence>

      {/* SEO Keywords (Screen Reader Only) */}
      <div className="sr-only">
        <h3>{isRTL ? "الكلمات المفتاحية" : "SEO Keywords"}</h3>
        <ul>
          {[
            "عيادة د. محمد خشبة للأسنان",
            "Dr. Mohamed Khashaba Dental Clinic",
            "أفضل عيادة أسنان بالمنصورة",
            "Best dental clinic in Mansoura",
            "زراعة الأسنان في المنصورة",
            "Dental implants in Mansoura",
            "تجميل الأسنان بالمنصورة",
            "Cosmetic dentistry Mansoura",
            "تبييض الأسنان في مصر",
            "Teeth whitening Egypt",
            "تقويم الأسنان بالمنصورة",
            "Orthodontics Mansoura",
            "نتائج علاج الأسنان",
            "Dental treatment results",
            "قشرة الأسنان في مصر",
            "Dental veneers Egypt",
            "طب أسنان أطفال المنصورة",
            "Pediatric dentistry Mansoura",
            "أحدث تقنيات طب الأسنان",
            "Advanced dental technology",
            "عيادات أسنان بالمنصورة",
            "Dental clinics Mansoura",
            "رعاية أسنان في المنصورة",
            "Dental care Mansoura",
            "دكتور أسنان بالمنصورة",
            "Dentist in Mansoura",
          ].map((keyword, idx) => (
            <li key={idx}>{keyword}</li>
          ))}
        </ul>
      </div>

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": isRTL
            ? "معرض صور عيادة د. محمد خشبة للأسنان"
            : "Dr. Mohamed Khashaba Dental Clinic Gallery",
          "description": isRTL
            ? "استعرض حالات المرضى، نتائج العلاجات، وداخل عيادة د. محمد خشبة للأسنان في المنصورة، مصر"
            : "Explore patient cases, treatment results, and the interior of Dr. Mohamed Khashaba Dental Clinic in Mansoura, Egypt",
          "datePublished": "2025-08-08",
          "license": "https://creativecommons.org/licenses/by-nc/4.0/",
          "associatedMedia": galleryImages.map((img, idx) => ({
            "@type": "ImageObject",
            "contentUrl": `https://khashaba-clinics.tsd-education.com${img.src}`,
            "caption": img.caption,
            "description": img.alt,
            "position": idx + 1,
            "thumbnail": `https://khashaba-clinics.tsd-education.com${img.src}`,
            "author": { "@type": "Person", "name": "Dr. Mohamed Khashaba" },
            "contentLocation": {
              "@type": "Place",
              "name": "المنصورة",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "المنصورة",
                "addressRegion": "الدقهلية",
                "addressCountry": "مصر",
              },
            },
          })),
          "publisher": {
            "@type": "Dentist",
            "name": "Dr. Mohamed Khashaba Dental Clinic",
            "telephone": "+201040659965",
            "url": "https://khashaba-clinics.tsd-education.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "المنصورة",
              "addressRegion": "الدقهلية",
              "addressCountry": "مصر",
            },
          },
          "keywords": [
            "Dental clinic Mansoura",
            "Dental implants Mansoura",
            "Cosmetic dentistry Egypt",
            "Teeth whitening Mansoura",
            "Orthodontics Egypt",
            "Dental veneers Mansoura",
            "Pediatric dentistry Egypt",
            "Advanced dental technology",
            "Best dentist Mansoura",
          ],
        })}
      </script>
    </section>
  );
}