import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";
import { useApp } from "@/contexts/AppContext";

interface BeforeAfterCase {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  before: string;
  after: string;
  category: { ar: string; en: string };
  patientAge?: number;
  treatmentTime: { ar: string; en: string };
  keywords: string[];
  procedureType?: string;
}

const getCases = (language: string): BeforeAfterCase[] => [
 {
    id: "restoration-case-1",
    title: { ar: "تغيير تركيبات قديمة وتجميل اللثة", en: "Replacing Old Restorations and Smile Line Correction" },
    description: {
      ar: "استبدال تركيبات قديمة بتركيبات إيماكس مع تجميل اللثة لتحسين  الابتسامة في وقت قياسي بجودة عالية في عيادة د. محمد خشبة بالمنصورة.",
      en: "Replaced old restorations with Emax veneers and gum contouring to enhance the smile line in record time with superior quality at Dr. Mohamed Khashaba’s clinic in Mansoura."
    },
    before: "/portfolio4.jpg",
    after: "/portfolio4after.jpg",
    category: { ar: "تجميل", en: "Cosmetic" },
    patientAge: 35,
    treatmentTime: { ar: "10 أيام", en: "10 days" },
    procedureType: "Emax Veneers, Gum Contouring",
    keywords: [
      "تركيبات إيماكس المنصورة",
      "تجميل اللثة المنصورة",
      "فينيرز كومبوزيت القاهرة",
      "أفضل دكتور تركيبات أسنان بالمنصورة",
      "أفضل دكتور أسنان تجميلي بالمنصورة",
      "تعديل ميل الابتسامة مصر",
      "تركيبات أسنان طبيعية الإسكندرية",
      "فينيرز إيماكس السعودية",
      "تجميل اللثة القاهرة",
      "د. محمد خشبة",
      "عيادة أسنان بالمنصورة",
      "هوليود سمايل مصر",
      "فينيرز كومبوزيت الإمارات",
      "تركيبات أسنان سريعة مصر",
      "أفضل عيادة أسنان بالمنصورة"
    ]
  }, {
    id: "cosmetic-case-1",
    title: { ar: "تجميل وتبييض الأسنان", en: "Cosmetic Whitening" },
    description: {
      ar: "تحويل ابتسامة بفينيرز وتبييض متقدم لنتائج طبيعية في عيادة د. محمد خشبة بالمنصورة.",
      en: "Transformed smile with veneers and advanced whitening for natural results at Dr. Mohamed Khashaba’s clinic in Mansoura."
    },
    before: "/portfolio1.jpg",
    after: "/portfolio1after.jpg",
    category: { ar: "تجميل", en: "Cosmetic" },
    patientAge: 32,
    treatmentTime: { ar: "أسبوعين", en: "2 weeks" },
    procedureType: "Veneers, Whitening",
    keywords: [
      "أفضل دكتور فينيرز بالمنصورة",
      "أفضل دكتور أسنان تجميلي بالمنصورة",
      "أفضل دكتور أسنان بالمنصورة",
      "تجميل الأسنان المنصورة",
      "فينيرز أسنان القاهرة",
      "هوليود سمايل مصر",
      "د. محمد خشبة",
      "تبييض أسنان الإسكندرية",
      "فينيرز السعودية",
      "عيادة أسنان بالمنصورة",
      "تجميل الأسنان الإمارات",
      "ابتسامة مشرقة مصر",
      "فينيرز إيماكس المنصورة",
      "أفضل عيادة أسنان بالمنصورة",
      "تجميل أسنان طبيعي القاهرة",
      "فينيرز كومبوزيت مصر",
      "تركيبات الأسنان المنصورة"
    ]
  },
  {
    id: "orthodontic-case-1",
    title: { ar: "تقويم الأسنان المتداخلة", en: "Overlapping Teeth Correction" },
    description: {
      ar: "تصحيح تداخل الأسنان بتقويم شفاف لابتسامة متناسقة في عيادة د. محمد خشبة بالمنصورة.",
      en: "Corrected crowding with clear aligners for a balanced smile at Dr. Mohamed Khashaba’s clinic in Mansoura."
    },
    before: "/portfolio2.jpg",
    after: "/portfolio2after.jpg",
    category: { ar: "تقويم", en: "Orthodontics" },
    patientAge: 26,
    treatmentTime: { ar: "8 أشهر", en: "8 months" },
    procedureType: "Clear Aligners",
    keywords: [
      "أفضل دكتور تقويم أسنان بالمنصورة",
      "أفضل دكتور أسنان بالمنصورة",
      "تقويم أسنان المنصورة",
      "تقويم أسنان شفاف القاهرة",
      "د. محمد خشبة",
      "عيادة أسنان بالمنصورة",
      "تقويم أسنان السعودية",
      "ابتسامة متناسقة مصر",
      "تقويم أسنان الإسكندرية",
      "تقويم شفاف الإمارات",
      "أفضل عيادة تقويم أسنان بالمنصورة",
      "تقويم أسنان حديث القاهرة",
      "تقويم أسنان مريح مصر",
      "أفضل تقويم أسنان السعودية",
      "تركيبات أسنان طبيعية القاهرة"
    ]
  },
  {
    id: "whitening-case-1",
    title: { ar: "تبييض أسنان متقدم", en: "Advanced Teeth Whitening" },
    description: {
      ar: "تبييض ليزر سريع وآمن لابتسامة بيضاء مشرقة في عيادة د. محمد خشبة بالمنصورة.",
      en: "Fast, safe laser whitening for a radiant smile at Dr. Mohamed Khashaba’s clinic in Mansoura."
    },
    before: "/portfolio3.jpg",
    after: "/portfolio3after.jpg",
    category: { ar: "تبييض", en: "Whitening" },
    patientAge: 29,
    treatmentTime: { ar: "جلستين", en: "2 sessions" },
    procedureType: "Laser Whitening",
    keywords: [
      "أفضل دكتور تبييض أسنان بالمنصورة",
      "أفضل دكتور أسنان بالمنصورة",
      "تبييض أسنان المنصورة",
      "تبييض أسنان الإسكندرية",
      "د. محمد خشبة",
      "عيادة أسنان بالمنصورة",
      "تبييض أسنان السعودية",
      "ابتسامة بيضاء مصر",
      "تبييض أسنان بالليزر القاهرة",
      "تبييض أسنان آمن الإمارات",
      "أفضل عيادة تبييض أسنان بالمنصورة",
      "تبييض أسنان طبيعي مصر",
      "تبييض أسنان سريع القاهرة",
      "أفضل تبييض أسنان السعودية",
      "تركيبات الأسنان المنصورة"
    ]
  },
  
];

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function BeforeAfterSection() {
  const { isRTL, language = 'ar' } = useApp() || {};
  const cases = useMemo(() => getCases(language), [language]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  // Reset activeCategory and activeIndex when language changes
  useEffect(() => {
    setActiveCategory(null);
    setActiveIndex(0);
  }, [language]);

  const categories = useMemo(
    () => Array.from(new Set(cases.map(c => c.category[language]))),
    [cases, language]
  );
  const filteredCases = useMemo(
    () => activeCategory ? cases.filter(c => c.category[language] === activeCategory) : cases,
    [cases, activeCategory, language]
  );
  const activeCase = filteredCases[activeIndex] || cases[0];

  const handleSliderMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, []);

  const filterByCategory = useCallback((category: string | null) => {
    setActiveCategory(category);
    setActiveIndex(0);
  }, []);

  const navigateCase = useCallback((direction: 'next' | 'prev') => {
    setActiveIndex(prevIndex => {
      if (direction === 'next') {
        return (prevIndex + 1) % filteredCases.length;
      }
      return (prevIndex - 1 + filteredCases.length) % filteredCases.length;
    });
  }, [filteredCases.length]);

  const openModal = useCallback((image: string) => {
    setModalImage(image);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalImage("");
  }, []);

  // Render category filters
  const renderCategoryFilters = () => (
    <div className={`flex flex-wrap gap-2 mb-6 justify-center ${isRTL ? 'flex-row' : ''}`}>
      <Button
        variant={activeCategory === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => filterByCategory(null)}
        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
          activeCategory === null
            ? 'bg-gradient-to-r from-dental-gold to-dental-darkGold text-white shadow-md'
            : 'border-dental-gold/20 hover:bg-dental-gold/10 hover:border-dental-gold text-gray-800 dark:text-gray-200'
        }`}
      >
        {isRTL ? 'عرض الكل' : 'Show All'}
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={category === activeCategory ? 'default' : 'outline'}
          size="sm"
          onClick={() => filterByCategory(category)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
            category === activeCategory
              ? 'bg-gradient-to-r from-dental-gold to-dental-darkGold text-white shadow-md'
              : 'border-dental-gold/20 hover:bg-dental-gold/10 hover:border-dental-gold text-gray-800 dark:text-gray-200'
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );

  // Render slider controls
  const renderSliderControls = () => (
    <div
      className="absolute inset-0 z-20 cursor-ew-resize select-none"
      onMouseMove={handleSliderMove}
      onTouchMove={handleSliderMove}
      role="slider"
      aria-label={isRTL ? "مقارنة قبل وبعد" : "Before and after comparison"}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={sliderPosition}
    >
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md z-30"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      />
      <div
        className="absolute w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center z-30 hover:scale-105 transition-transform"
        style={{ left: `${sliderPosition}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-3 h-3 rounded-full bg-dental-gold" />
      </div>
      <Button
        size="sm"
        className="absolute top-3 left-3 bg-dental-gold/90 text-white px-2.5 py-1 rounded-full text-xs font-medium z-30"
        aria-label={isRTL ? "تكبير الصورة قبل العلاج" : "Zoom before image"}
        onClick={() => openModal(activeCase.before)}
      >
        {isRTL ? "قبل" : "Before"} <ZoomIn className={`h-3 w-3 ${isRTL ? 'mr-1' : 'ml-1'}`} />
      </Button>
      <Button
        size="sm"
        className="absolute top-3 right-3 bg-dental-gold/90 text-white px-2.5 py-1 rounded-full text-xs font-medium z-30"
        aria-label={isRTL ? "تكبير الصورة بعد العلاج" : "Zoom after image"}
        onClick={() => openModal(activeCase.after)}
      >
        <ZoomIn className={`h-3 w-3 ${isRTL ? 'mr-1' : 'ml-1'}`} /> {isRTL ? "بعد" : "After"}
      </Button>
    </div>
  );

  // Render navigation buttons
   const renderNavigationButtons = () => (
    filteredCases.length > 1 && (
      <>
        <Button
          size="sm"
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 text-dental-gold hover:bg-dental-gold hover:text-white p-1.5 rounded-full shadow-md transition-all z-20"
          onClick={() => navigateCase('prev')}
          aria-label={isRTL ? "الحالة السابقة" : "Previous case"}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 text-dental-gold hover:bg-dental-gold hover:text-white p-1.5 rounded-full shadow-md transition-all z-20"
          onClick={() => navigateCase('next')}
          aria-label={isRTL ? "الحالة التالية" : "Next case"}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </>
    )
  );

  // Render case details
  const renderCaseDetails = () => (
    <motion.div
      className="bg-gradient-to-t from-dental-gold/5 border border-dental-gold/10 dark:bg-dental-dark/50 p-5 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.25 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
          {activeCase.title[language]}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {activeCase.description[language]}
        </p>
      </div>
      <div className={`flex flex-wrap justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-lg border border-dental-gold/10">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
              {isRTL ? "التصنيف" : "Category"}
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {activeCase.category[language]}
            </p>
          </div>
        </div>
        {activeCase.patientAge && (
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-lg border border-dental-gold/10">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                {isRTL ? "عمر المريض" : "Patient Age"}
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {activeCase.patientAge} {isRTL ? "سنة" : "years"}
              </p>
            </div>
          </div>
        )}
        {activeCase.treatmentTime && (
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-lg border border-dental-gold/10">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                {isRTL ? "مدة العلاج" : "Treatment Time"}
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {activeCase.treatmentTime[language]}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="sr-only">
        {Array.from(new Set(activeCase.keywords)).join(', ')}
      </div>
    </motion.div>
  );

  // Render pagination dots
  const renderPaginationDots = () => (
    filteredCases.length > 1 && (
      <div className={`flex justify-center mt-6 gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {filteredCases.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              index === activeIndex
                ? 'bg-dental-gold w-6 shadow-sm'
                : 'bg-gray-300 dark:bg-gray-600 w-2.5 hover:bg-dental-gold/50'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={isRTL ? `انتقال إلى الحالة ${index + 1}` : `Go to case ${index + 1}`}
          />
        ))}
      </div>
    )
  );

  // Render image modal
  const renderImageModal = () => (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="sm"
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md z-10"
              onClick={closeModal}
              aria-label={isRTL ? "إغلاق" : "Close"}
            >
              <X className="h-4 w-4" />
            </Button>
            <LazyImage
              src={modalImage}
              alt={isRTL ? `صورة مكبرة لعلاج ${activeCase.title[language]} في عيادة د. محمد خشبة بالمنصورة` : `Enlarged image of ${activeCase.title[language]} treatment at Dr. Mohamed Khashaba Dental Clinic in Mansoura`}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              loading="lazy"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render empty state
  const renderEmptyState = () => (
    <motion.div
      className="text-center p-10 bg-white dark:bg-gray-900 rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
        <X className="h-6 w-6 text-gray-400" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {isRTL ? "لا توجد حالات متاحة في هذا التصنيف." : "No cases available in this category."}
      </p>
    </motion.div>
  );

  return (
    <section
      className="py-6 bg-gradient-to-b from-dental-gold/20 to-white dark:from-dental-gold/20 dark:to-dental-gold/20 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      aria-labelledby="before-after-title"
    >
      <Helmet>
        <title>{isRTL ? "قبل وبعد | عيادة د. محمد خشبة بالمنصورة" : "Before & After | Dr. Mohamed Khashaba Clinic, Mansoura"}</title>
        <meta
          name="description"
          content={isRTL
            ? "شاهد نتائج علاج الأسنان المذهلة قبل وبعد في عيادة د. محمد خشبة، أفضل عيادة أسنان في المنصورة لتجميل الأسنان، تقويم الأسنان، تبييض الأسنان، تركيبات إيماكس، فينيرز كومبوزيت، وتجميل اللثة."
            : "View stunning dental treatment before and after results at Dr. Mohamed Khashaba’s clinic, the best dental clinic in Mansoura for cosmetic dentistry, orthodontics, teeth whitening, Emax restorations, composite veneers, and gum contouring."
          }
        />
        <meta name="keywords" content={Array.from(new Set(cases.flatMap(c => c.keywords))).join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Mohamed Khashaba Clinic" />
        <link rel="alternate" href="https://drkhashaba.com/before-after" hreflang="ar" />
        <link rel="alternate" href="https://drkhashaba.com/en/before-after" hreflang="en" />
        <meta
          property="og:title"
          content={isRTL ? "قبل وبعد | عيادة د. محمد خشبة بالمنصورة" : "Before & After | Dr. Mohamed Khashaba Clinic, Mansoura"}
        />
        <meta
          property="og:description"
          content={isRTL
            ? "شاهد نتائج علاج الأسنان المذهلة قبل وبعد في عيادة د. محمد خشبة، أفضل عيادة أسنان في المنصورة لتجميل الأسنان، تركيبات إيماكس، وتجميل اللثة."
            : "View stunning dental treatment before and after results at Dr. Mohamed Khashaba’s clinic, the best dental clinic in Mansoura for cosmetic dentistry, Emax restorations, and gum contouring."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drkhashaba.com/before-after" />
        <meta property="og:image" content="https://drkhashaba.com/assets/images/clinic-before-after.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={isRTL ? "قبل وبعد | عيادة د. محمد خشبة بالمنصورة" : "Before & After | Dr. Mohamed Khashaba Clinic, Mansoura"}
        />
        <meta
          name="twitter:description"
          content={isRTL
            ? "شاهد نتائج علاج الأسنان المذهلة قبل وبعد في عيادة د. محمد خشبة، أفضل عيادة أسنان في المنصورة لتجميل الأسنان وتركيبات إيماكس."
            : "View stunning dental treatment before and after results at Dr. Mohamed Khashaba’s clinic, the best dental clinic in Mansoura for cosmetic dentistry and Emax restorations."
          }
        />
        <meta name="twitter:image" content="https://drkhashaba.com/assets/images/clinic-before-after.jpg" />
      </Helmet>

      <div className="container-xl mx-auto px-4">
        <SectionTitle
          subtitle={isRTL ? "قبل وبعد" : "Before and After"}
          title={isRTL ? "نتائج مذهلة في عيادة د. محمد خشبة بالمنصورة" : "Amazing Results at Dr. Mohamed Khashaba Dental Clinic in Mansoura"}
          description={isRTL
            ? "شاهد التحول الرائع في ابتسامة مرضانا مع أفضل دكتور أسنان في المنصورة باستخدام أحدث تقنيات تجميل الأسنان، تركيبات إيماكس، وتجميل اللثة."
            : "Witness the remarkable transformation in our patients' smiles with the best dentist in Mansoura using the latest cosmetic dentistry, Emax restorations, and gum contouring techniques."
          }
        />

        <div className="mt-4 max-w-6xl mx-auto">
          {renderCategoryFilters()}
          {filteredCases.length > 0 ? (
            <div className="space-y-6">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCase.id}
                    className="relative rounded-lg w-full min-h-[300px] max-h-[450px] overflow-hidden aspect-[16/10] shadow-lg bg-gray-900 dark:bg-gray-800"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="absolute inset-0 z-0">
                      <LazyImage
                        src={activeCase.before}
                        alt={isRTL ? `قبل العلاج - ${activeCase.title[language]} في عيادة د. محمد خشبة بالمنصورة` : `Before treatment - ${activeCase.title[language]} at Dr. Mohamed Khashaba Dental Clinic in Mansoura`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="absolute inset-0 z-10"
                      style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                    >
                      <LazyImage
                        src={activeCase.after}
                        alt={isRTL ? `بعد العلاج - ${activeCase.title[language]} في عيادة د. محمد خشبة بالمنصورة` : `After treatment - ${activeCase.title[language]} at Dr. Mohamed Khashaba Dental Clinic in Mansoura`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {renderSliderControls()}
                    {renderNavigationButtons()}
                  </motion.div>
                </AnimatePresence>
                {renderPaginationDots()}
              </div>
              {renderCaseDetails()}
            </div>
          ) : (
            renderEmptyState()
          )}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-dental-gold to-dental-darkGold text-white px-5 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Link to="/portfolio" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {isRTL ? "معرض أعمالنا" : "Our Portfolio"}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {renderImageModal()}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": isRTL ? "عيادة د. محمد خشبة لطب الأسنان" : "Dr. Mohamed Khashaba Dental Clinic",
          "description": isRTL
            ? "أفضل عيادة أسنان في المنصورة بقيادة د. محمد خشبة، تقدم نتائج مذهلة في تجميل الأسنان، تقويم الأسنان، زراعة الأسنان، تبييض الأسنان، تركيبات إيماكس، وتجميل اللثة بأحدث التقنيات."
            : "Best dental clinic in Mansoura led by Dr. Mohamed Khashaba, delivering stunning results in cosmetic dentistry, orthodontics, dental implants, teeth whitening, Emax restorations, and gum contouring with advanced technology.",
          "image": cases.flatMap(case_ => [
            {
              "@type": "ImageObject",
              "url": `https://drkhashaba.com${case_.before}`,
              "caption": isRTL ? `قبل العلاج - ${case_.title[language]} في عيادة د. محمد خشبة بالمنصورة` : `Before treatment - ${case_.title[language]} at Dr. Mohamed Khashaba Dental Clinic in Mansoura`,
              "contentUrl": `https://drkhashaba.com${case_.before}`
            },
            {
              "@type": "ImageObject",
              "url": `https://drkhashaba.com${case_.after}`,
              "caption": isRTL ? `بعد العلاج - ${case_.title[language]} في عيادة د. محمد خشبة بالمنصورة` : `After treatment - ${case_.title[language]} at Dr. Mohamed Khashaba Dental Clinic in Mansoura`,
              "contentUrl": `https://drkhashaba.com${case_.after}`
            }
          ]),
          "medicalSpecialty": [
            isRTL ? "طب الأسنان التجميلي" : "Cosmetic Dentistry",
            isRTL ? "تقويم الأسنان" : "Orthodontics",
            isRTL ? "زراعة الأسنان" : "Dental Implants",
            isRTL ? "تبييض الأسنان" : "Teeth Whitening",
            isRTL ? "تركيبات الأسنان" : "Dental Restorations"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": isRTL ? "خدمات طب الأسنان" : "Dental Services",
            "itemListElement": cases.map(case_ => ({
              "@type": "Offer",
              "name": case_.title[language],
              "description": case_.description[language],
              "category": case_.category[language],
              "procedureType": case_.procedureType,
              "keywords": Array.from(new Set(case_.keywords))
            }))
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500",
            "bestRating": "5"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mansoura",
            "addressCountry": "EG"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+201234567890",
            "contactType": "customer service"
          },
          "keywords": Array.from(new Set(cases.flatMap(c => c.keywords))).join(', ')
        })}
      </script>

      <div className="sr-only">
        <h2>{isRTL ? "أفضل عيادة أسنان في المنصورة بقيادة د. محمد خشبة" : "Best Dental Clinic in Mansoura Led by Dr. Mohamed Khashaba"}</h2>
        <p>
          {isRTL
            ? "اكتشف نتائج علاج الأسنان المذهلة قبل وبعد في عيادة د. محمد خشبة، أفضل عيادة أسنان في المنصورة ومصر، مع أفضل دكتور أسنان لتجميل الأسنان، تقويم الأسنان، زراعة الأسنان، تبييض الأسنان، تركيبات إيماكس، وتجميل اللثة."
            : "Discover stunning dental treatment before and after results at Dr. Mohamed Khashaba’s clinic, the best dental clinic in Mansoura and Egypt, with the best dentist for cosmetic dentistry, orthodontics, dental implants, teeth whitening, Emax restorations, and gum contouring."
          }
        </p>
        <ul>
          {cases.map(case_ => (
            <li key={case_.id}>
              <strong>{case_.title[language]}:</strong> {case_.description[language]}
              <div>{Array.from(new Set(case_.keywords)).join(', ')}</div>
            </li>
          ))}
        </ul>
        <div>{Array.from(new Set(cases.flatMap(c => c.keywords))).join(', ')}</div>
      </div>
    </section>
  );
}
