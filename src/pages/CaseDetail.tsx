

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Star, Calendar, Clock, Users, CheckCircle, Quote, Facebook, Instagram, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { Button, Badge, Card } from '@/components/ui';
import { useApp } from '@/contexts/AppContext';
import { galleryItems, GalleryItem } from '@/data/galleryData';
import LazyImage from '@/components/LazyImage';
import SimpleHeroSection from '@/components/CTA/SimpleHeroSection';
import FAQItem from '@/components/FAQItem';
import { cn } from '@/lib/utils';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// === Animation Variants ===
const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

// === SectionTitle Component ===
const SectionTitle: React.FC<{ subtitle: string; title: string; description: string; center?: boolean }> = ({
  subtitle,
  title,
  description,
  center,
}) => {
  const { isRTL } = useApp?.() || {};
  return (
    <div className={cn('text-center mb-10', center && 'mx-auto max-w-4xl')}>
      <p className="text-xs uppercase tracking-widest font-medium text-dental-gold">{subtitle}</p>
      <h2 className="text-xl md:text-2xl font-bold text-dental-dark dark:text-white mt-2">{title}</h2>
      <p className="text-dental-dark dark:text-white mt-3 text-xs md:text-sm leading-relaxed">{description}</p>
    </div>
  );
};

// === BeforeAfterSlider Component ===
const BeforeAfterSlider: React.FC<{ beforeImage: string; afterImage: string; altText: string }> = ({
  beforeImage,
  afterImage,
  altText,
}) => {
  const { language = 'ar', isRTL } = useApp?.() || {};
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setPosition(percent);
    },
    [isDragging]
  );

  const handleMouseDown = useCallback(() => setIsDragging(true), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove, handleMouseUp]);

  const openModal = useCallback((image: string) => {
    setModalImage(image);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalImage('');
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full">
      <div
        ref={sliderRef}
        className="relative rounded-lg w-full h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden shadow-xl bg-dental-dark cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
        role="slider"
        aria-label={isRTL ? 'مقارنة قبل وبعد' : 'Before and after comparison'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={position}
      >
        <LazyImage
          src={beforeImage}
          alt={isRTL ? `قبل - ${altText}` : `Before - ${altText}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0 z-10"
          style={{ clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)` }}
        >
          <LazyImage
            src={afterImage}
            alt={isRTL ? `بعد - ${altText}` : `After - ${altText}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md z-30"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        />
        <div
          className="absolute w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-30 hover:scale-105 transition-transform duration-200"
          style={{ left: `${position}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-4 h-4 rounded-full bg-dental-gold" />
        </div>
        <Button
          size="sm"
          className="absolute top-3 left-3 bg-dental-gold/90 text-white px-3 py-1.5 rounded-full text-xs font-medium z-30 hover:bg-dental-darkGold"
          aria-label={isRTL ? 'تكبير الصورة قبل العلاج' : 'Zoom before image'}
          onClick={() => openModal(beforeImage)}
        >
          {isRTL ? 'قبل' : 'Before'} <ZoomIn className={cn('h-4 w-4', isRTL ? 'mr-1' : 'ml-1')} />
        </Button>
        <Button
          size="sm"
          className="absolute top-3 right-3 bg-dental-gold/90 text-white px-3 py-1.5 rounded-full text-xs font-medium z-30 hover:bg-dental-darkGold"
          aria-label={isRTL ? 'تكبير الصورة بعد العلاج' : 'Zoom after image'}
          onClick={() => openModal(afterImage)}
        >
          <ZoomIn className={cn('h-4 w-4', isRTL ? 'mr-1' : 'ml-1')} /> {isRTL ? 'بعد' : 'After'}
        </Button>
      </div>
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
              className="relative max-w-5xl w-full max-h-[95vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md z-10"
                onClick={closeModal}
                aria-label={isRTL ? 'إغلاق' : 'Close'}
              >
                <X className="h-5 w-5" />
              </Button>
              <LazyImage
                src={modalImage}
                alt={isRTL ? `صورة مكبرة لـ ${altText}` : `Enlarged image of ${altText}`}
                className="w-full h-auto max-h-[95vh] object-contain rounded-xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// === Timeline Component (محسّن للشاشات الصغيرة + صور أكبر + متجاوب) ===
interface TimelineEntry {
  step: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  subtitle?: string;
  isRTL?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({
  data,
  title = "رحلة العلاج",
  subtitle = "خطوة بخطوة مع أفضل التقنيات.",
  isRTL = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={containerRef} className={cn("w-full font-amiri", isRTL ? "text-right" : "text-left")} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dental-dark dark:text-white mb-3">
          {title}
        </h2>
        <p className="text-dental-dark dark:text-white text-sm sm:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-16 px-4 sm:px-6">
        {/* الخط المتحرك (مخفي على الموبايل) */}
        <div
          className={cn(
            "absolute top-0 w-[2px] bg-gradient-to-b from-transparent via-dental-gold/50 to-transparent hidden md:block",
            isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"
          )}
          style={{ height: height + "px" }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-dental-gold rounded-full"
          />
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col gap-6 mb-12 last:mb-0",
              "md:flex-row md:items-center md:gap-8",
              index % 2 === 0
                ? isRTL
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
                : isRTL
                ? "md:flex-row"
                : "md:flex-row-reverse"
            )}
          >
            {/* النص */}
            <div className={cn("w-full md:w-1/2", isRTL ? "text-right" : "text-left")}>
              <h3 className="text-lg sm:text-xl font-bold text-dental-dark dark:text-white mb-2">
                {item.step}
              </h3>
              <p className="text-sm sm:text-base text-dental-dark/80 dark:text-white/80 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* النقطة */}
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-dental-gold rounded-full shadow-lg flex items-center justify-center z-10 text-white font-bold text-sm">
                {index + 1}
              </div>
            </div>

            {/* الصورة */}
            <div className="w-full md:w-1/2">
              {item.imageSrc && (
                <div className="relative group cursor-pointer">
                  <LazyImage
                    src={item.imageSrc}
                    alt={item.imageAlt || item.step}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dental-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-dental-gold" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// === CaseDetail Component ===
const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language = 'ar', isRTL } = useApp?.() || {};
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const caseItem = useMemo(() => galleryItems.find((item) => item.id === parseInt(id || '0')), [id]);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

  const openModal = useCallback((index: number) => {
    setInitialSlide(index);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const journeyData = useMemo(
    () => [
      {
        step: isRTL ? 'الاستشارة الأولية' : 'Initial Consultation',
        description: isRTL ? 'تقييم شامل لاحتياجاتك وتصميم خطة علاج مخصصة.' : 'Comprehensive assessment of your needs and a customized treatment plan.',
        imageSrc: caseItem?.beforeImage,
        imageAlt: isRTL ? 'صورة قبل العلاج' : 'Before treatment image',
      },
      {
        step: isRTL ? 'التخطيط الرقمي' : 'Digital Planning',
        description: isRTL ? 'استخدام تقنيات ثلاثية الأبعاد لتصميم العلاج بدقة.' : 'Using 3D technology for precise treatment design.',
        imageSrc: caseItem?.imageSrc,
        imageAlt: isRTL ? 'صورة التخطيط' : 'Planning image',
      },
      {
        step: isRTL ? 'تنفيذ العلاج' : 'Treatment Execution',
        description: isRTL ? 'إجراء العلاج بأحدث المعدات مع التركيز على راحتك.' : 'Performing treatment with state-of-the-art equipment, prioritizing your comfort.',
        imageSrc: caseItem?.imageSrc,
        imageAlt: isRTL ? 'صورة أثناء العلاج' : 'During treatment image',
      },
      {
        step: isRTL ? 'المتابعة والنتائج' : 'Follow-Up & Results',
        description: isRTL ? 'متابعة مستمرة لضمان نتائج دائمة ومبهرة.' : 'Ongoing follow-up to ensure lasting, stunning results.',
        imageSrc: caseItem?.afterImage,
        imageAlt: isRTL ? 'صورة بعد العلاج' : 'After treatment image',
      },
    ],
    [isRTL, caseItem]
  );

  const images = useMemo(() => [
    caseItem?.imageSrc,
    caseItem?.beforeImage,
    caseItem?.afterImage,
    ...(caseItem?.additionalImages || []),
  ].filter(Boolean), [caseItem]);

  const seoConfig = {
    title: {
      ar: `${caseItem?.title.ar} | د. محمد خشبة - أفضل عيادة أسنان في المنصورة`,
      en: `${caseItem?.title.en} | Dr. Mohamed Khashaba - Best Dental Clinic in Mansoura`,
    },
    description: {
      ar: `${caseItem?.fullDescription.ar} اكتشف خدمات زراعة الأسنان، تقويم الأسنان، فينيرز، تبييض الأسنان، وابتسامة هوليود في أفضل عيادة أسنان بالمنصورة مع د. محمد خشبة.`,
      en: `${caseItem?.fullDescription.en} Discover dental implants, orthodontics, veneers, teeth whitening, and Hollywood smile at the best dental clinic in Mansoura with Dr. Mohamed Khashaba.`,
    },
    keywords: caseItem?.keywords.join(', '),
  };

  const shareUrl = window.location.href;
  const shareTitle = seoConfig.title[language];
  const relatedCasesFiltered = useMemo(
    () => galleryItems.filter((item) => item.id !== caseItem?.id && item.category.id === caseItem?.category.id),
    [caseItem]
  );

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dental-gold/10 to-white text-center py-16 font-amiri" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.h3
          className="text-xl font-bold text-red-500 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isRTL ? 'الحالة غير موجودة' : 'Case Not Found'}
        </motion.h3>
        <Button
          asChild
          className="bg-gradient-to-r from-dental-gold to-dental-darkGold text-white hover:shadow-lg rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105"
        >
          <Link to="/portfolio">{isRTL ? 'رجوع إلى معرض الأعمال' : 'Back to Portfolio'}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dental-gold/5 to-dental-dark/5 font-amiri text-sm leading-relaxed" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{seoConfig.title[language]}</title>
        <meta name="description" content={seoConfig.description[language]} />
        <meta name="keywords" content={seoConfig.keywords} />
        <meta property="og:title" content={seoConfig.title[language]} />
        <meta property="og:description" content={seoConfig.description[language]} />
        <meta property="og:image" content={caseItem.imageSrc} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.title[language]} />
        <meta name="twitter:description" content={seoConfig.description[language]} />
        <meta name="twitter:image" content={caseItem.imageSrc} />
        <link rel="canonical" href={shareUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalCaseStudy',
            name: caseItem.title[language],
            description: caseItem.fullDescription[language],
            image: images,
            author: {
              '@type': 'Person',
              name: 'Dr. Mohamed Khashaba',
              jobTitle: 'Dentist',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Dr. Mohamed Khashaba Dental Clinic',
              logo: { '@type': 'ImageObject', url: '/logo.png' },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Dental Street',
                addressLocality: 'Mansoura',
                postalCode: '35511',
                addressCountry: 'EG',
              },
              telephone: '+20-100-123-4567',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: caseItem.rating.toString(),
              reviewCount: '200',
              bestRating: '5',
              worstRating: '1',
            },
            about: {
              '@type': 'MedicalProcedure',
              name: caseItem.category.label[language],
              procedureType: caseItem.procedures[language].join(', '),
              medicalSpecialty: 'Dentistry',
            },
            datePublished: caseItem.date[language],
            keywords: seoConfig.keywords,
            studySubject: {
              '@type': 'Person',
              age: caseItem.patientAge[language],
              healthCondition: { '@type': 'MedicalCondition', name: 'Dental Issue' },
            },
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <SimpleHeroSection
        title={caseItem.title[language]}
        subtitle={caseItem.description[language]}
        backgroundImage={caseItem.imageSrc}
        className="h-[280px] sm:h-[380px] md:h-[450px] bg-gradient-to-b from-dental-dark/80 to-dental-gold/20"
      />

      {/* Case Images Section */}
      <section className="py-12 bg-gradient-to-t from-transparent to-dental-gold/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle={isRTL ? 'نظرة عامة' : 'Overview'}
            title={isRTL ? 'رحلة تحويل الابتسامة' : 'Smile Transformation Journey'}
            description={
              isRTL
                ? `اكتشف كيف تحولت هذه الحالة باستخدام أحدث التقنيات في عيادة د. محمد خشبة. من الاستشارة إلى النتائج النهائية، نقدم تجربة شاملة لتحقيق ابتسامة أحلامك.`
                : `Discover how this case was transformed using cutting-edge technology at Dr. Mohamed Khashaba’s clinic. From consultation to final results, we provide a comprehensive experience to achieve your dream smile.`
            }
            center
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="flex flex-col md:flex-row justify-center gap-6 lg:gap-10 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full md:w-1/2 relative">
              <Swiper
                modules={[Pagination, Autoplay, EffectFade, Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                effect="fade"
                navigation={{
                  nextEl: '.case-swiper-button-next',
                  prevEl: '.case-swiper-button-prev',
                }}
                className="rounded-xl shadow-md"
                dir={isRTL ? 'rtl' : 'ltr'}
                onSwiper={setSwiperInstance}
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      className="relative cursor-pointer"
                      onClick={() => openModal(idx)}
                    >
                      <LazyImage
                        src={img}
                        alt={`${caseItem.title[language]} - Image ${idx + 1}`}
                        className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover rounded-xl"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-dental-dark/30 rounded-xl">
                        <ZoomIn className="w-8 h-8 text-dental-gold" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <motion.div
                    variants={buttonVariants}
                    className="case-swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 z-10"
                  >
                    <Button
                      size="sm"
                      className="bg-white/90 dark:bg-gray-800/90 text-dental-gold hover:bg-dental-gold hover:text-white p-2.5 rounded-full shadow-lg transition-all duration-300"
                      aria-label={isRTL ? 'الصورة السابقة' : 'Previous image'}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  </motion.div>
                  <motion.div
                    variants={buttonVariants}
                    className="case-swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 z-10"
                  >
                    <Button
                      size="sm"
                      className="bg-white/90 dark:bg-gray-800/90 text-dental-gold hover:bg-dental-gold hover:text-white p-2.5 rounded-full shadow-lg transition-all duration-300"
                      aria-label={isRTL ? 'الصورة التالية' : 'Next image'}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </>
              )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-center">
              <p className="text-dental-dark dark:text-white text-xs md:text-sm leading-relaxed">{caseItem.fullDescription[language]}</p>

              <div>
                <h4 className="font-semibold text-dental-dark dark:text-white flex items-center gap-2 text-base justify-center">
                  <CheckCircle className="w-5 h-5 text-dental-gold" />
                  {isRTL ? 'الإجراءات المستخدمة' : 'Procedures Performed'}
                </h4>
                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                  {caseItem.procedures[language].map((proc, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-dental-dark/10 dark:bg-dental-dark/20 text-dental-dark dark:text-white border-dental-gold/20 px-3 py-1 text-xs"
                    >
                      {proc}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-t from-dental-gold/5 border border-dental-gold/20 dark:bg-dental-dark/20 p-6 rounded-xl shadow-md">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-dental-dark dark:text-white text-base justify-center">
                  <Quote className="w-5 h-5 text-dental-gold" />
                  {isRTL ? 'شهادة المريض' : 'Patient Testimonial'}
                </h4>
                <blockquote className="italic text-dental-dark dark:text-white text-xs md:text-sm leading-relaxed">
                  "{caseItem.testimonial.content[language]}" — <span className="font-semibold">{isRTL ? 'المريض' : 'Patient'}</span>
                </blockquote>
                <div className="flex items-center gap-2 mt-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn('w-4 h-4', i < Math.round(caseItem.rating) ? 'text-dental-gold fill-dental-gold' : 'text-dental-dark/30 dark:text-white/30')}
                    />
                  ))}
                  <span className="text-xs text-dental-dark dark:text-white">({caseItem.rating}/5)</span>
                </div>
              </div>

              <div className={cn('flex gap-3 justify-center', isRTL ? 'flex-row-reverse' : '')}>
                <Button variant="outline" size="icon" className="rounded-full bg-dental-dark/10 dark:bg-dental-dark/20 text-dental-dark dark:text-white border-dental-gold/20 hover:bg-dental-gold hover:text-white transition-all duration-200" aria-label="Share on Facebook">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"><Facebook className="w-4 h-4" /></a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-dental-dark/10 dark:bg-dental-dark/20 text-dental-dark dark:text-white border-dental-gold/20 hover:bg-dental-gold hover:text-white transition-all duration-200" aria-label="Share on TikTok">
                  <a href={`https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`} target="_blank" rel="noopener noreferrer"><FaTiktok className="w-4 h-4" /></a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-dental-dark/10 dark:bg-dental-dark/20 text-dental-dark dark:text-white border-dental-gold/20 hover:bg-dental-gold hover:text-white transition-all duration-200" aria-label="Share on Instagram">
                  <a href={caseItem.instagramLink} target="_blank" rel="noopener noreferrer"><Instagram className="w-4 h-4" /></a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-dental-dark/10 dark:bg-dental-dark/20 text-dental-dark dark:text-white border-dental-gold/20 hover:bg-dental-gold hover:text-white transition-all duration-200" aria-label="Share on WhatsApp">
                  <a href={`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="w-4 h-4" /></a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Details Section */}
      <section id="case-details" className="py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/3">
            <motion.div
              className="bg-dental-dark/10 dark:bg-dental-dark/20 rounded-xl p-8 shadow-md"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-base font-semibold text-dental-dark dark:text-white flex items-center gap-2 justify-center">
                <Star className="w-5 h-5 text-dental-gold" />
                {isRTL ? 'معلومات سريعة' : 'Quick Facts'}
              </h3>
              <ul className="space-y-4 text-xs text-dental-dark dark:text-white text-center">
                <li className="flex items-center gap-2 justify-center"><Calendar className="w-4 h-4 text-dental-gold" /> {isRTL ? 'تاريخ العلاج: ' : 'Treatment Date: '}{caseItem.date[language]}</li>
                <li className="flex items-center gap-2 justify-center"><Users className="w-4 h-4 text-dental-gold" /> {isRTL ? 'عمر المريض: ' : 'Patient Age: '}{caseItem.patientAge[language]}</li>
                <li className="flex items-center gap-2 justify-center"><Clock className="w-4 h-4 text-dental-gold" /> {isRTL ? 'مدة العلاج: ' : 'Treatment Duration: '}{caseItem.duration[language]}</li>
                <li className="flex items-center gap-2 justify-center"><CheckCircle className="w-4 h-4 text-dental-gold" /> {isRTL ? 'تقييم المريض: ' : 'Patient Rating: '}{caseItem.rating}/5</li>
              </ul>
              <div className="flex flex-col gap-2 mt-6">
                <Button className="bg-gradient-to-r from-dental-gold to-dental-darkGold text-white hover:shadow-lg rounded-full py-2 text-sm font-semibold transition-all duration-200 hover:scale-105" asChild>
                  <Link to="/appointment">{isRTL ? 'احجز استشارتك الآن' : 'Book Your Consultation'}</Link>
                </Button>
                <Button className="bg-green-600 text-white hover:bg-green-700 rounded-full py-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105" asChild>
                  <a href="https://wa.me/+201001234567" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="w-4 h-4" /> {isRTL ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}</a>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-2/3">
            <BeforeAfterSlider beforeImage={caseItem.beforeImage} afterImage={caseItem.afterImage} altText={caseItem.title[language]} />
          </div>
        </div>
      </section>

      {/* Treatment Journey Section */}
      <section className="py-12 bg-gradient-to-b from-dental-dark/5 to-dental-gold/5">
        <Timeline
          data={journeyData}
          title={isRTL ? 'رحلة العلاج خطوة بخطوة' : 'Step-by-Step Treatment Journey'}
          subtitle={
            isRTL
              ? 'نرافقك في كل خطوة من رحلة علاجك لضمان أفضل النتائج بأحدث التقنيات.'
              : 'We guide you through every step of your treatment journey to ensure the best results with cutting-edge technology.'
          }
          isRTL={isRTL}
        />
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-12 bg-gradient-to-b from-dental-gold to-dental-darkGold text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{isRTL ? 'حوّل ابتسامتك اليوم!' : 'Transform Your Smile Today!'}</h2>
          <p className="mb-6 text-xs md:text-sm max-w-2xl mx-auto">
            {isRTL ? 'احجز استشارتك المجانية مع أفضل طبيب أسنان في المنصورة للحصول على ابتسامة أحلامك.' : 'Book your free consultation with the best dentist in Mansoura to achieve your dream smile.'}
          </p>
          <div className={cn('flex flex-col sm:flex-row gap-3 justify-center', isRTL ? 'flex-row' : '')}>
            <Button size="lg" className="bg-white text-dental-gold hover:text-dental-gold rounded-full px-6 py-2 text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105" asChild>
              <Link to="/appointment">{isRTL ? 'احجز استشارتك' : 'Book Consultation'}</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white hover:text-white rounded-full px-6 py-2 text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105" asChild>
              <a href="https://wa.me/+201001234567" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="w-4 h-4" /> {isRTL ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}</a>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Related Cases Section */}
      <section className="pt-10 bg-gradient-to-b from-dental-gold/10 to-gray-50 dark:bg-gradient-to-t dark:from-dental-black dark:to-dental-gold/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle={isRTL ? 'استكشف المزيد' : 'Explore More'}
            title={isRTL ? 'حالات مشابهة' : 'Similar Cases'}
            description={
              isRTL
                ? 'شاهد حالات أخرى مشابهة لتحويلات الابتسامة في عيادة د. محمد خشبة.'
                : 'View other similar smile transformation cases at Dr. Mohamed Khashaba’s clinic.'
            }
            center
          />
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-10"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {relatedCasesFiltered.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div className="group cursor-pointer" variants={containerVariants} initial="hidden" animate="visible" transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <Link to={`/case/${item.id}`}>
                    <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-dental-gold/10">
                      <LazyImage src={item.imageSrc} alt={`${item.title[language]} - عيادة د. محمد خشبة`} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className={cn('absolute bottom-0 w-full p-3 bg-gradient-to-t from-dental-dark/70 to-transparent text-white', isRTL ? 'text-right' : 'text-left')}>
                        <h3 className="text-sm font-semibold line-clamp-1">{item.title[language]}</h3>
                        <p className="text-xs line-clamp-2">{item.description[language]}</p>
                      </div>
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-dental-gold to-dental-darkGold text-white text-xs px-2 py-1 rounded-full">
                        {item.category.label[language]}
                      </Badge>
                    </Card>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="text-center mt-6">
            <Button asChild className="bg-gradient-to-r from-dental-gold to-dental-darkGold text-white hover:shadow-lg rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105">
              <Link to="/portfolio">{isRTL ? 'استكشف جميع الحالات' : 'Explore All Cases'}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-t from-dental-gold/10 to-gray-50 dark:bg-gradient-to-b dark:from-dental-black dark:to-dental-gold/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <SectionTitle
            subtitle={isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            title={isRTL ? `أسئلة شائعة حول ${caseItem.category.label[language]}` : `FAQs About ${caseItem.category.label[language]}`}
            description={
              isRTL
                ? 'إجابات لأكثر الأسئلة شيوعًا حول خدماتنا في عيادة د. محمد خشبة بالمنصورة.'
                : 'Answers to the most common questions about our services at Dr. Mohamed Khashaba’s clinic in Mansoura.'
            }
            center
          />
          <div className="mt-6 space-y-4">
            <AnimatePresence>
              {caseItem.faq.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <FAQItem question={item.question[language]} answer={item.answer[language]} isOpen={openFaqIndex === index} toggleOpen={() => toggleFaq(index)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Image Modal Gallery */}
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
            <div className="relative max-w-5xl w-full max-h-[95vh] overflow-hidden rounded-xl" onClick={(e) => e.stopPropagation()}>
              <Button size="sm" className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md z-10" onClick={closeModal} aria-label={isRTL ? 'إغلاق' : 'Close'}>
                <X className="h-5 w-5" />
              </Button>
              <Swiper
                modules={[Navigation, Pagination, EffectFade]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                effect="fade"
                initialSlide={initialSlide}
                className="w-full h-full"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center">
                    <LazyImage src={img} alt={`${caseItem.title[language]} - Image ${idx + 1}`} className="w-full h-auto max-h-[95vh] object-contain rounded-xl" loading="lazy" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseDetail;