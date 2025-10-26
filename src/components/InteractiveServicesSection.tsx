import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AUTO_SCROLL_INTERVAL = 7000;

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
}

export const InteractiveServicesSection = () => {
  const { language } = useApp();
  const isArabic = language === 'ar';
  const [activeService, setActiveService] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const navigate = useNavigate();

  const services: Service[] = useMemo(
    () => [
     {
      id: 'dental-implants',
      icon: '/ven-icon.png',
      title: isArabic ? 'زراعة الأسنان' : 'Dental Implants',
      description: isArabic
        ? 'استعد ابتسامتك بثقة من خلال حلول زراعة الأسنان المتطورة التي تمنحك نتائج طبيعية ودائمة.'
        : 'Restore your smile confidently with advanced dental implants that deliver natural, lasting results.',
      image: '/im.jpg',
    },
    {
      id: 'veneers',
      icon: '/ven.png',
      title: isArabic ? 'الفينيرز' : 'Veneers',
      description: isArabic
        ? 'ابتسامة ساحرة في جلسات معدودة! الفينيرز تمنحك مظهرًا مثاليًا يتناغم مع ملامحك الطبيعية.'
        : 'Get a flawless smile in just a few visits. Veneers designed to enhance your natural beauty.',
      image: '/case1.jpg',
    },
    {
      id: 'traditional-braces',
      icon: '/taqqq2.png',
      title: isArabic ? 'تقويم الأسنان' : 'Orthodontics',
      description: isArabic
        ? 'أسنان مستقيمة وابتسامة متناسقة باستخدام تقنيات التقويم الشفاف والمريح.'
        : 'Straighten your teeth discreetly with modern, comfortable orthodontic solutions.',
      image: '/orttt.jpg',
    },
    {
    id: "composite-veneers",
      icon: '/crowns-icpn.png',
          title: isArabic ? 'كومبوزيت فينيرز' : 'Composite Veneers',
      description: isArabic
        ? 'احصل على ابتسامة طبيعية وجذابة بسرعة مع كومبوزيت فينيرز، الحل المثالي لتجميل أسنانك.'
        : 'Achieve a natural, attractive smile quickly with composite veneers, the perfect solution for enhancing your teeth.',
      image: '/Crowns.jpg',
    },
    ],
    [isArabic]
  );

  // Preload first service image
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = services[0].image;
    document.head.appendChild(link);
  }, [services]);

  // Auto-scroll effect
  useEffect(() => {
    if (hasUserInteracted) return;

    intervalRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hasUserInteracted, services.length]);

  // Swipe handling
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (touchStartX.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX.current - touchEndX;

      if (Math.abs(deltaX) > 30) {
        setHasUserInteracted(true);
        if (deltaX > 0) {
          setActiveService((prev) => (prev + 1) % services.length);
        } else {
          setActiveService((prev) => (prev - 1 + services.length) % services.length);
        }
      }
      touchStartX.current = null;
    },
    [services.length]
  );

  const handleTabClick = useCallback(
    (index: number) => {
      setActiveService(index);
      setHasUserInteracted(true);
      setIsImageLoaded(false);
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    []
  );

  const handleViewDetails = useCallback(() => {
    navigate(`/services/${services[activeService].id}`);
  }, [activeService, navigate, services]);

  const navigateService = useCallback(
    (direction: 'next' | 'prev') => {
      setHasUserInteracted(true);
      setIsImageLoaded(false);
      setActiveService((prev) =>
        direction === 'next'
          ? (prev + 1) % services.length
          : (prev - 1 + services.length) % services.length
      );
    },
    [services.length]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <section
      className="py-8 bg-gradient-to-t from-dental-gold/10 to-white dark:from-dental-black dark:to-dental-gold/20 overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
      aria-labelledby="services-title"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-12"
        >
          <h2
            id="services-title"
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-dental-dark dark:text-white mb-4 font-alexandria"
          >
            {isArabic ? 'ابتسامتك، أولويتنا' : 'Your Smile, Our Priority'}
          </h2>
          <p className="max-w-xl mx-auto text-dental-dark/70 dark:text-gray-400 text-base font-alexandria">
            {isArabic ? 'حلول طب أسنان بجودة عالية لابتسامة تدوم.' : 'High-quality dental solutions for a lasting smile.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
           
          {/* Tabs */}
          <div className="flex flex-col">
            <div className="text-dental-dark/70 dark:text-gray-400 text-sm font-alexandria ">
         
          <p className="w-full pb-8 px-2  mx-auto text-dental-dark/80 dark:text-gray-300 text-base font-alexandria">
            {isArabic
              ? 'نحول أحلامك إلى ابتسامة مشرقة بتقنيات متقدمة ورعاية مخصصة تجمع بين الدقة والشغف.'
              : 'We transform your dreams into a radiant smile with advanced techniques and personalized care, blending precision with passion.'}
          </p>
             <div className="grid grid-cols-2 gap-3">
            
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full"
              >
                <Card
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    'cursor-pointer transition-all  border border-dental-gold/50 duration-300 rounded-2xl  bg-white/80 dark:bg-dental-black/80 dark:border-dental-gold/50 backdrop-blur-sm',
                    activeService === index
                      ? 'shadow-md bg-dental-gold/10'
                      : 'hover:shadow-sm hover:bg-dental-gold/10'
                  )}
                  role="tab"
                  aria-selected={activeService === index}
                  aria-label={service.title}
                >
                  <CardContent className="p-4 flex flex-col items-center gap-1 text-center align-center justify-center ">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="h-6 w-6   object-contain"
                      loading="lazy"
                    />
                    <h3 className="text-base  text-sm  md:text-md font-semibold text-dental-dark dark:text-white font-alexandria">
                      {service.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            </div>
          </div>
            <p className="w-full pt-6  mx-auto text-dental-dark/80 dark:text-gray-300 text-base font-alexandria">
            {isArabic
              ?" نحن نسعى جاهدين لتقديم تجربة رعاية أسنان متميزة تتجاوز توقعاتك. من خلال الجمع بين الفن والتكنولوجيا المتقدمة والدقه والشغف، نضمن حصولك على أفضل نتائج العلاج في بيئة مريحة ولطيفة" :
              "We strive to provide a unique dental experience that exceeds your expectations. By combining the art and advanced technology, we ensure a flawless and pleasant treatment experience."
              }
          </p>
          </div>

          {/* Preview */}
          <motion.div
            key={activeService}
            ref={previewRef}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative rounded-2xl overflow-hidden shadow-lg"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label={isArabic ? 'معاينة الخدمة' : 'Service Preview'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') navigateService(isArabic ? 'prev' : 'next');
              if (e.key === 'ArrowLeft') navigateService(isArabic ? 'next' : 'prev');
            }}
          >
            {/* Skeleton Loader */}
            <AnimatePresence>
              {!isImageLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer rounded-2xl"
                />
              )}
            </AnimatePresence>

            {/* Image */}
            <img
              src={services[activeService].image}
              alt={services[activeService].title}
              className={cn(
                'w-full h-[400px] object-cover transition-opacity duration-300',
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              loading={activeService === 0 ? 'eager' : 'lazy'}
              onLoad={() => setIsImageLoaded(true)}
            />

           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 font-alexandria">
                {services[activeService].title}
              </h3>
              <p className="text-white  mb-5 leading-relaxed">
                {services[activeService].description}
              </p>
              <Button
                onClick={handleViewDetails}
                className="bg-gradient-to-t from-dental-gold to-dental-darkGold text-white px-6 py-3 font-bold rounded-full bg-gradient-to-b dark:from-dental-gold dark:to-dental-darkGold dark:text-white dark:hover:bg-gold"
              >
                {isArabic ? 'عرض التفاصيل' : 'View Details'}
              </Button>
            </div>

            {/* Navigation Buttons */}
            {services.length > 1 && (
              <>
                <motion.div
                  variants={buttonVariants}
                  className="absolute top-1/2 left-3 -translate-y-1/2"
                >
                  <Button
                    size="sm"
                    className="bg-white/80 dark:bg-gray-800/80 text-dental-gold hover:bg-dental-gold hover:text-white p-2 rounded-full transition-all duration-300"
                    onClick={() => navigateService(isArabic ? 'next' : 'prev')}
                    aria-label={isArabic ? 'الخدمة السابقة' : 'Previous service'}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                >
                  <Button
                    size="sm"
                    className="bg-white/80 dark:bg-gray-800/80 text-dental-gold hover:bg-dental-gold hover:text-white p-2 rounded-full transition-all duration-300"
                    onClick={() => navigateService(isArabic ? 'prev' : 'next')}
                    aria-label={isArabic ? 'الخدمة التالية' : 'Next service'}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveServicesSection;