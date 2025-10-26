import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Play, Pause, ChevronLeft, ChevronRight, VolumeX, Volume2 } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import LazyImage from '@/components/LazyImage';
import { Helmet } from 'react-helmet-async';
import { Button, Dialog, DialogContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { testimonials, Testimonial } from '@/data/testimonialData';
import { Link } from 'react-router-dom';

// متغيرات الرسوم المتحركة
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.8, ease: 'easeInOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 10, rotateY: (isRTL: boolean) => (isRTL ? -10 : 10) },
  visible: { opacity: 1, scale: 1, y: 0, rotateY: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { scale: 1.05, y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.2)', transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.2, transition: { duration: 0.2, ease: 'easeOut' } },
  tap: { scale: 0.9 },
};

const textVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
};

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' },
  },
};

// SkeletonCard مبسط للفيديو فقط
const SkeletonCard = () => (
  <motion.div
    variants={skeletonVariants}
    initial="initial"
    animate="animate"
    className={cn(
      'relative bg-white/95 dark:bg-dental-black/90 backdrop-blur-lg rounded-3xl shadow-card overflow-hidden',
      'border border-dental-gold/40 dark:border-dental-gold/50 transition-all duration-300'
    )}
  >
    <div className="relative w-full h-[500px]">
      {/* Placeholder للفيديو فقط مع تأثير متدرج */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dental-gold/20 to-transparent opacity-0 animate-[pulse_2s_infinite]" />
    </div>
  </motion.div>
);

// MediaControls
const MediaControls: React.FC<{
  isPlaying: boolean;
  isMuted: boolean;
  isRTL: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
}> = React.memo(({ isPlaying, isMuted, isRTL, onPlayPause, onMuteToggle }) => (
  <div className="absolute top-3 right-3 flex gap-1.5 z-20">
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="bg-gradient-to-br from-dental-gold/80 to-dental-darkGold/80 text-white rounded-full p-2 shadow-md"
      onClick={onPlayPause}
      aria-label={isRTL ? 'تشغيل/إيقاف' : 'Play/Pause'}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onPlayPause()}
    >
      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
    </motion.div>
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="bg-gradient-to-br from-dental-gold/80 to-dental-darkGold/80 text-white rounded-full p-2 shadow-md"
      onClick={onMuteToggle}
      aria-label={isRTL ? 'كتم/تشغيل الصوت' : 'Mute/Unmute'}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onMuteToggle()}
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </motion.div>
  </div>
));

// TestimonialCard مع تحسين تحميل الفيديو
const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  isRTL: boolean;
  language: string;
  playingMedia: Map<number, boolean>;
  mutedMedia: Map<number, boolean>;
  handlePlayPause: (id: number) => void;
  handleMuteToggle: (id: number) => void;
  videoRefs: React.MutableRefObject<Map<number, HTMLVideoElement>>;
  audioRefs: React.MutableRefObject<Map<number, HTMLAudioElement>>;
  isLoading: boolean;
}> = React.memo(
  ({ testimonial, isRTL, language, playingMedia, mutedMedia, handlePlayPause, handleMuteToggle, videoRefs, audioRefs, isLoading }) => {
    const getShortQuote = useCallback((quote: string) => {
      const words = quote.split(' ');
      return words.length > 10 ? `${words.slice(0, 10).join(' ')}...` : quote;
    }, []);

    const isPlaying = playingMedia.get(testimonial.id) ?? false;
    const isMuted = mutedMedia.get(testimonial.id) ?? false;

    const onPlayPause = useCallback(() => handlePlayPause(testimonial.id), [handlePlayPause, testimonial.id]);
    const onMuteToggle = useCallback(() => handleMuteToggle(testimonial.id), [handleMuteToggle, testimonial.id]);

    if (isLoading && testimonial.media.type === 'video') {
      return <SkeletonCard />;
    }

    return (
      <motion.div
        variants={cardVariants}
        custom={isRTL}
        whileHover="hover"
        className={cn(
          'relative bg-white/95 dark:bg-dental-black/90 backdrop-blur-lg rounded-3xl shadow-card overflow-hidden',
          'border border-dental-gold/40 dark:border-dental-gold/50 transition-all duration-300',
          'hover:shadow-glow hover:border-dental-gold/70'
        )}
        itemScope
        itemType="https://schema.org/Review"
      >
        <meta itemProp="author" content={testimonial.name[language] || (isRTL ? 'مريض' : 'Patient')} />
        <meta itemProp="reviewBody" content={testimonial.quote[language] || (isRTL ? 'تجربة مريض' : 'Patient testimonial')} />
        <meta itemProp="reviewRating" content={testimonial.rating.toString()} />
        <div className="relative h-[500px] z-0">
          {testimonial.media.type === 'video' ? (
            <>
              <video
                ref={(el) => el && videoRefs.current.set(testimonial.id, el)}
                poster={testimonial.media.poster}
                className="w-full h-full object-cover rounded-3xl"
                muted={isMuted}
                playsInline
                preload="auto"
                onCanPlay={(e) => isPlaying && e.currentTarget.play().catch(console.error)}
                onClick={onPlayPause}
                aria-label={isRTL ? `فيديو شهادة ${testimonial.name[language] || 'مريض'}` : `Testimonial video for ${testimonial.name[language] || 'Patient'}`}
                style={{ zIndex: 10 }}
              >
                <source src={testimonial.media.src} type="video/mp4" />
              </video>
              <MediaControls isPlaying={isPlaying} isMuted={isMuted} isRTL={isRTL} onPlayPause={onPlayPause} onMuteToggle={onMuteToggle} />
            </>
          ) : testimonial.media.type === 'audio' ? (
            <>
              <LazyImage
                src={testimonial.media.poster}
                alt={testimonial.name[language] || (isRTL ? 'مريض' : 'Patient')}
                className="w-full h-full object-cover rounded-3xl"
                style={{ zIndex: 10 }}
              />
              <audio
                ref={(el) => el && audioRefs.current.set(testimonial.id, el)}
                src={testimonial.media.src}
                className="hidden"
                preload="auto"
              />
              <MediaControls isPlaying={isPlaying} isMuted={isMuted} isRTL={isRTL} onPlayPause={onPlayPause} onMuteToggle={onMuteToggle} />
            </>
          ) : (
            <LazyImage
              src={testimonial.media.src}
              alt={testimonial.name[language] || (isRTL ? 'مريض' : 'Patient')}
              className="w-full h-full object-cover rounded-3xl"
              onClick={() => handlePlayPause(testimonial.id)}
              style={{ zIndex: 10 }}
            />
          )}
          {testimonial.quote[language] && (
            <>
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-dental-black/90 to-transparent z-10" />
              <motion.div variants={textVariants} className="absolute bottom-4 left-4 right-4 z-20">
                <p className="font-bold text-dental-gold font-alexandria text-2xl">
                  {testimonial.name[language] || (isRTL ? 'مريض' : 'Patient')}
                </p>
                <p className="text-gray-100 dark:text-gray-200 text-lg font-alexandria line-clamp-2">
                  {getShortQuote(testimonial.quote[language])}
                </p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    );
  }
);

export default function ServiceTestimonials() {
  const { language = 'ar', isRTL } = useApp?.() || {};
  const [mounted, setMounted] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const swiperRef = useRef<any>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const audioRefs = useRef<Map<number, HTMLAudioElement>>(new Map());
  const [playingMedia, setPlayingMedia] = useState<Map<number, boolean>>(new Map());
  const [mutedMedia, setMutedMedia] = useState<Map<number, boolean>>(new Map());
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isMediaLoading, setIsMediaLoading] = useState<Map<number, boolean>>(new Map());

  // تهيئة الحالة وتحميل الوسائط مسبقًا
  useEffect(() => {
    setMounted(true);
    const initialLoading = new Map<number, boolean>();
    testimonials.forEach((t) => {
      if (t.media.type === 'video') {
        initialLoading.set(t.id, true);
        // تحميل بيانات الفيديو مسبقًا
        fetch(t.media.src, { method: 'GET', headers: { Range: 'bytes=0-1023' } })
          .then(() => {
            setIsMediaLoading((prev) => {
              const newMap = new Map(prev);
              newMap.set(t.id, false);
              return newMap;
            });
          })
          .catch(console.error);
      }
    });
    setIsMediaLoading(initialLoading);
  }, []);

  // إدارة تحميل الفيديوهات
  useEffect(() => {
    videoRefs.current.forEach((video, id) => {
      const handleCanPlay = () => {
        setIsMediaLoading((prev) => {
          const newMap = new Map(prev);
          newMap.set(id, false);
          return newMap;
        });
      };
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    });
  }, []);

  // إيقاف تشغيل الوسائط غير النشطة
  useEffect(() => {
    videoRefs.current.forEach((video, id) => {
      if (id !== testimonials[activeSlide]?.id && playingMedia.get(id)) {
        video.pause();
        setPlayingMedia((prev) => {
          const newMap = new Map(prev);
          newMap.set(id, false);
          return newMap;
        });
      }
    });
    audioRefs.current.forEach((audio, id) => {
      if (id !== testimonials[activeSlide]?.id && playingMedia.get(id)) {
        audio.pause();
        setPlayingMedia((prev) => {
          const newMap = new Map(prev);
          newMap.set(id, false);
          return newMap;
        });
      }
    });
  }, [activeSlide]);

  // إعدادات Swiper
  const swiperSettings = useMemo(
    () => ({
      modules: [Autoplay, Pagination, Navigation, EffectCoverflow],
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 15,
        stretch: 15,
        depth: 60,
        modifier: 1,
        slideShadows: false,
      },
      loop: true,
      speed: 800,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      dir: isRTL ? 'rtl' : 'ltr',
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 0,
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 16 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1280: { slidesPerView: 3, spaceBetween: 28 },
      },
      pagination: { clickable: true, el: '.swiper-pagination', bulletClass: 'swiper-bullet', bulletActiveClass: 'swiper-bullet-active' },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      onSlideChange: (swiper: any) => setActiveSlide(swiper.realIndex),
      style: { overflow: 'visible' },
    }),
    [isRTL]
  );

  // تحديث اتجاه Swiper عند تغيير RTL
  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.changeLanguageDirection(isRTL ? 'rtl' : 'ltr');
      swiperRef.current.swiper.slideTo(0, 0, false);
      swiperRef.current.swiper.update();
      swiperRef.current.swiper.autoplay.start();
    }
  }, [isRTL]);

  const handlePlayPause = useCallback(
    (testimonialId: number) => {
      const video = videoRefs.current.get(testimonialId);
      const audio = audioRefs.current.get(testimonialId);
      if (video) {
        if (playingMedia.get(testimonialId)) {
          video.pause();
        } else {
          video.play().catch(() => setSelectedMedia(video.src));
        }
        setPlayingMedia((prev) => {
          const newMap = new Map(prev);
          newMap.set(testimonialId, !prev.get(testimonialId));
          return newMap;
        });
      } else if (audio) {
        if (playingMedia.get(testimonialId)) {
          audio.pause();
        } else {
          audio.play().catch(() => setSelectedMedia(audio.src));
        }
        setPlayingMedia((prev) => {
          const newMap = new Map(prev);
          newMap.set(testimonialId, !prev.get(testimonialId));
          return newMap;
        });
      } else {
        const mediaSrc = testimonials.find((t) => t.id === testimonialId)?.media.src;
        if (mediaSrc) setSelectedMedia(mediaSrc);
      }
    },
    [playingMedia]
  );

  const handleMuteToggle = useCallback(
    (testimonialId: number) => {
      const video = videoRefs.current.get(testimonialId);
      const audio = audioRefs.current.get(testimonialId);
      if (video) {
        video.muted = !video.muted;
        setMutedMedia((prev) => {
          const newMap = new Map(prev);
          newMap.set(testimonialId, !prev.get(testimonialId));
          return newMap;
        });
      } else if (audio) {
        audio.muted = !audio.muted;
        setMutedMedia((prev) => {
          const newMap = new Map(prev);
          newMap.set(testimonialId, !prev.get(testimonialId));
          return newMap;
        });
      }
    },
    []
  );

  // الكلمات المفتاحية لـ SEO
  const keywordList = useMemo(
    () =>
      testimonials
        .flatMap((testimonial) =>
          [
            testimonial.name.ar,
            testimonial.name.en,
            testimonial.quote.ar.split(' ').slice(0, 4).join(' '),
            testimonial.quote.en.split(' ').slice(0, 4).join(' '),
            testimonial.occupation.ar,
            testimonial.occupation.en,
            isRTL ? 'أفضل عيادة أسنان في المنصورة' : 'best dental clinic Mansoura',
            isRTL ? 'ابتسامة هوليود المنصورة' : 'Hollywood smile Mansoura',
            isRTL ? 'زراعة الأسنان المنصورة' : 'dental implants Mansoura',
            isRTL ? 'طب أسنان الأطفال المنصورة' : 'pediatric dentistry Mansoura',
            isRTL ? 'تقويم الأسنان المنصورة' : 'orthodontics Mansoura',
            isRTL ? 'تركيبات الأسنان المنصورة' : 'dental crowns Mansoura',
            isRTL ? 'تقويم شفاف المنصورة' : 'clear aligners Mansoura',
            isRTL ? 'طب الأسنان التجميلي المنصورة' : 'cosmetic dentistry Mansoura',
            isRTL ? 'تبييض الأسنان المنصورة' : 'teeth whitening Mansoura',
            isRTL ? 'طب الأسنان التجميلي' : 'cosmetic dentistry',
            isRTL ? 'عيادة أسنان فاخرة' : 'luxury dental clinic',
            isRTL ? 'عيادة أسنان موثوقة' : 'trusted dental clinic',
            isRTL ? 'د. محمد خشبة' : 'Dr. Mohamed Khashaba',
          ].filter(Boolean)
        ),
    [isRTL]
  );

  if (!mounted) return null;

  return (
    <section
      className="relative py-14 bg-gradient-to-b from-dental-gold/10 to-gray-50 dark:bg-gradient-to-b dark:from-dental-black dark:to-dental-black overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={isRTL ? 'أفضل دكتور أسنان بالمنصورة - د. محمد خشبة' : 'Best Dentist in Mansoura - Dr. Mohamed Khashaba'}
    >
      {/* فيديو الخلفية */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        aria-hidden="true"
      >
        <source src="/videos/background-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" />

      <Helmet>
        <title>
          {isRTL ? 'أفضل دكتور أسنان بالمنصورة - د. محمد خشبة' : 'Best Dentist in Mansoura - Dr. Mohamed Khashaba'}
        </title>
        <meta
          name="description"
          content={
            isRTL
              ? 'اكتشف تجارب مرضى موثوقين في عيادة د. محمد خشبة الفاخرة بالمنصورة، من ابتسامات هوليود إلى زراعة الأسنان.'
              : 'Discover trusted patient experiences at Dr. Mohamed Khashaba’s luxury clinic in Mansoura, from Hollywood smiles to dental implants.'
          }
        />
        <meta name="author" content={isRTL ? 'د. محمد خشبة' : 'Dr. Mohamed Khashaba'} />
        <meta name="publisher" content={isRTL ? 'عيادة د. محمد خشبة' : 'Dr. Mohamed Khashaba Clinic'} />
        <meta name="date" content={new Date().toISOString()} />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywordList.join(', ')} />
        <meta
          property="og:title"
          content={isRTL ? 'أفضل دكتور أسنان بالمنصورة - د. محمد خشبة' : 'Best Dentist in Mansoura - Dr. Mohamed Khashaba'}
        />
        <meta
          property="og:description"
          content={
            isRTL
              ? 'شاهد تجارب مرضى عيادة د. محمد خشبة أفضل عيادة أسنان بالمنصورة.'
              : 'Watch trusted patient stories at Dr. Mohamed Khashaba’s luxury clinic in Mansoura.'
          }
        />
        <meta property="og:image" content="/im.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            'itemReviewed': {
              '@type': 'Dentist',
              'name': 'Dr. Mohamed Khashaba Dental Clinic',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': '123 Dental Street',
                'addressLocality': 'Mansoura',
                'addressRegion': 'Dakahlia',
                'postalCode': '35511',
                'addressCountry': 'EG',
              },
              'telephone': '+201040659965',
              'image': '/im.jpg',
            },
            'review': testimonials.map((t) => ({
              '@type': 'Review',
              'author': { '@type': 'Person', 'name': t.name[language] || (isRTL ? 'مريض' : 'Patient') },
              'reviewBody': t.quote[language] || (isRTL ? 'تجربة مريض' : 'Patient testimonial'),
              'reviewRating': { '@type': 'Rating', 'ratingValue': t.rating, 'bestRating': 5 },
            })),
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <SectionTitle
          subtitle={isRTL ? 'ثقة عملائنا' : 'Our Patients’ Trust'}
          title={isRTL ? 'تجارب موثوقة مع د. محمد خشبة' : 'Trusted Experiences with Dr. Mohamed Khashaba'}
          description={
            isRTL
              ? 'استمتع بقصص مرضانا الذين حققوا ابتساماتهم المثالية في عيادتنا الفاخرة والموثوقة.'
              : 'Discover trusted stories of patients who achieved their perfect smiles at our luxury clinic.'
          }
          center
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-4"
        >
          <Swiper key={isRTL ? 'rtl' : 'ltr'} {...swiperSettings} ref={swiperRef} className="w-full py-10">
            {testimonials.map((testimonial: Testimonial) => (
              <SwiperSlide key={testimonial.id} className="w-full max-w-[450px]">
                <TestimonialCard
                  testimonial={testimonial}
                  isRTL={isRTL}
                  language={language}
                  playingMedia={playingMedia}
                  mutedMedia={mutedMedia}
                  handlePlayPause={handlePlayPause}
                  handleMuteToggle={handleMuteToggle}
                  videoRefs={videoRefs}
                  audioRefs={audioRefs}
                  isLoading={isMediaLoading.get(testimonial.id) ?? false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={cn('swiper-pagination flex justify-center gap-2 mt-10', isRTL ? 'flex-row-reverse' : '')}
          >
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className={cn(
                  'swiper-bullet w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer transition-all duration-300',
                  activeSlide === index && 'bg-dental-gold scale-125 animate-pulse'
                )}
                onClick={() => swiperRef.current?.swiper.slideToLoop(index)}
                role="button"
                aria-label={isRTL ? `الانتقال إلى الشريحة ${index + 1}` : `Go to slide ${index + 1}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && swiperRef.current?.swiper.slideToLoop(index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-8 font-alexandria max-w-3xl mx-auto">
            {isRTL ? 'تواصلوا معنا للحصول على استشارة لتحقيق ابتسامتكم المثالية.' : 'Contact us for a free consultation to achieve your perfect smile.'}
          </p>
          <Button
            asChild
            className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-dental-gold to-dental-darkGold text-white hover:bg-dental-darkGold transition-colors duration-300 rounded-xl font-alexandria text-md shadow-lg hover:shadow-glow"
          >
            <Link to="/portfolio" className="flex items-center">
              <span>{isRTL ? 'شاهد أعمالنا' : 'Book Your Consultation Now'}</span>
              <ChevronRight className={cn('h-6 w-6', isRTL ? 'mr-1 rotate-180' : 'ml-1')} />
            </Link>
          </Button>
        </motion.div>

        {/* SEO Keywords */}
        <div className="sr-only">
          <h3>{isRTL ? 'الكلمات المفتاحية' : 'SEO Keywords'}</h3>
          <ul>
            {keywordList.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] rounded-3xl p-0 bg-transparent border-none">
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-dental-black/95 rounded-3xl overflow-hidden shadow-2xl"
            >
              {selectedMedia.endsWith('.mp4') ? (
                <video
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[80vh] object-contain rounded-3xl"
                  aria-label={isRTL ? 'فيديو شهادة' : 'Testimonial video'}
                >
                  <source src={selectedMedia} type="video/mp4" />
                </video>
              ) : selectedMedia.endsWith('.mp3') ? (
                <div className="p-10 bg-dental-black/90 flex flex-col items-center rounded-3xl">
                  <audio
                    controls
                    className="w-full max-w-lg"
                    aria-label={isRTL ? 'صوت شهادة' : 'Testimonial audio'}
                  >
                    <source src={selectedMedia} type="audio/mp3" />
                  </audio>
                </div>
              ) : (
                <LazyImage
                  src={selectedMedia}
                  alt={isRTL ? 'صورة شهادة' : 'Testimonial image'}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-3xl"
                />
              )}
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}