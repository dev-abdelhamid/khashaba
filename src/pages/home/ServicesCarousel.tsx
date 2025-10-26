import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useApp } from '@/contexts/AppContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import { cn } from '@/lib/utils';
import { allServices, Service } from '@/data/allServices';
import { useEffect, useMemo, useRef, useState } from 'react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const ServicesCarousel = () => {
  const { language, isRTL } = useApp();
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoized Swiper settings
  const swiperSettings = useMemo(
    () => ({
      modules: [Autoplay],
      loop: true,
      speed: 4000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: isRTL,
      },
      dir: isRTL ? 'rtl' : 'ltr',
      slidesPerView: 'auto',
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
        swiper.changeLanguageDirection(isRTL ? 'rtl' : 'ltr');
        swiper.slideTo(0, 0, false);
        swiper.update();
        swiper.autoplay.start();
      }
    };
    updateSwiper(swiperRef.current?.swiper);
  }, [isRTL]);

  // Memoized keyword list for SEO
  const keywordList = useMemo(
    () =>
      allServices
        .flatMap((service) =>
          [
            service.title.ar,
            service.title.en,
            service.description.ar.split(' ').slice(0, 3).join(' '),
            service.description.en.split(' ').slice(0, 3).join(' '),
            'أفضل دكتور أسنان بالمنصورة',
            'أفضل دكتور أسنان تجميلي بالمنصورة',
            'هوليود سمايل مصر',
            'عيادة أسنان بالمنصورة',
          ].filter(Boolean)
        )
        .filter((value, index, self) => self.indexOf(value) === index),
    []
  );

  if (!mounted) return null;

  return (
    <section
      className="py-12 bg-dental-gold/20 dark:bg-gold/20 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={language === 'ar' ? 'خدمات طب الأسنان المميزة' : 'Premium Dental Services'}
    >
      <div className="">
        {/* Header */}
        <SectionTitle
          subtitle={language === 'ar' ? 'خدماتنا' : 'Our Services'}
          title={language === 'ar' ? 'خدمات طب الأسنان المتقدمة' : 'Advanced Dental Services'}
          description={
            language === 'ar'
              ? 'نقدم باقة شاملة من خدمات طب الأسنان بأعلى الجودة لصحة فمك وابتسامتك.'
              : 'Discover our comprehensive range of dental services for optimal oral health and a radiant smile.'
          }
          center
        />

        {/* Single Swiper */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Swiper
            key={isRTL ? 'rtl-single' : 'ltr-single'}
            {...swiperSettings}
            ref={swiperRef}
            className="w-full"
          >
            {allServices.map((service: Service) => (
              <SwiperSlide key={`service-${service.id}`} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <ServiceCard
                    title={language === 'ar' ? service.title.ar : service.title.en}
                    description={language === 'ar' ? service.description.ar : service.description.en}
                    image={service.image}
                    link={service.link}
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-dental-black rounded-2xl"
                    itemScope
                    itemType="https://schema.org/MedicalService"
                  >
                    <meta itemProp="name" content={language === 'ar' ? service.title.ar : service.title.en} />
                    <meta itemProp="description" content={language === 'ar' ? service.description.ar : service.description.en} />
                    <meta itemProp="image" content={service.image || '/fallback-service.jpg'} />
                    <meta itemProp="url" content={`https://dr-khashaba.tsd-education.com${service.link}`} />
                    <meta itemProp="serviceType" content={language === 'ar' ? service.title.ar : service.title.en} />
                    <meta itemProp="provider" content="Dr. Mohamed Khashaba Clinic" />
                  </ServiceCard>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Consultation Text */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p
            className={cn(
              'text-base mx-4 font-medium text-gray-600 dark:text-gray-300',
            )}
          >
            {language === 'ar'
              ? 'تواصل معنا للحصول على استشارة لتحديد الخدمة التي تحتاجها'
              : 'Contact us for a free consultation to determine the service you need'}
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            className="inline-flex items-center  px-6 py-3 bg-gradient-to-b from-dental-gold to-dental-darkGold/90 text-white hover:bg-dental-darkGold transition-colors duration-300 rounded-lg shadow-sm"
          >
            <Link to="/services" className="flex items-center">
              <span>{language === 'ar' ? 'جميع الخدمات' : 'All Services'}</span>
            </Link>
          </Button>
        </motion.div>

        {/* SEO Keywords */}
        <div className="sr-only">
          <h3>{language === 'ar' ? 'الكلمات المفتاحية' : 'SEO Keywords'}</h3>
          <ul>
            {keywordList.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>

        {/* Schema.org for Service List */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': language === 'ar' ? 'خدمات طب الأسنان' : 'Dental Services',
            'itemListElement': allServices.map((service, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'item': {
                '@type': 'MedicalService',
                'name': language === 'ar' ? service.title.ar : service.title.en,
                'description': language === 'ar' ? service.description.ar : service.description.en,
                'image': service.image || '/fallback-service.jpg',
                'url': `https://dr-khashaba.tsd-education.com${service.link}`,
                'provider': {
                  '@type': 'Dentist',
                  'name': 'Dr. Mohamed Khashaba Clinic',
                  'telephone': '+201040659965',
                  'address': {
                    '@type': 'PostalAddress',
                    'addressLocality': 'المنصورة',
                    'addressRegion': 'الدقهلية',
                    'addressCountry': 'مصر',
                  },
                },
              },
            })),
          })}
        </script>
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;700&family=Inter:wght@400;500;700&display=swap');
          .font-arabic { font-family: 'Noto Sans Arabic', sans-serif; }
          .font-english { font-family: 'Inter', sans-serif; }
        `}
      </style>
    </section>
  );
};

export default ServicesCarousel;
