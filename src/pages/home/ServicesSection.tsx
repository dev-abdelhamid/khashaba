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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const ServicesCarousel = () => {
  const { language, isRTL } = useApp();
  const keywordList = allServices.flatMap((service) =>
    [
      service.title.ar,
      service.title.en,
      service.description.ar.split(' ').slice(0, 3).join(' '),
      service.description.en.split(' ').slice(0, 3).join(' '),
    ].filter(Boolean)
  );

  return (
    <section
      className="py-8 bg-gradient-to-b from-dental-gold/10 to-white dark:from-dental-gold/20 dark:to-dental-black "
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={language === 'ar' ? 'خدمات طب الأسنان المميزة' : 'Premium Dental Services'}
    >
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        {/* Header */}
        <SectionTitle
          subtitle={language === 'ar' ? 'خدماتنا' : 'Our Services'}
          title={language === 'ar' ? 'خدمات طب الأسنان المتقدمة' : 'Advanced Dental Services'}
          description={
            language === 'ar'
              ? 'نقدم باقة شاملة من خدمات طب الأسنان بأعلى معايير الجودة لصحة فمك وابتسامتك.'
              : 'Discover our comprehensive range of dental services for optimal oral health and a radiant smile.'
          }
          center
        />

        {/* Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-8 overflow-hidden"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            loop={true}
            
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="py-4 px-2   overflow-hidden"
          >
            {allServices.map((service: Service) => (
              <SwiperSlide key={service.id}>
                <motion.div variants={itemVariants}>
                  <ServiceCard
                    title={language === 'ar' ? service.title.ar : service.title.en}
                    description={language === 'ar' ? service.description.ar : service.description.en}
                    image={service.image || '/fallback-service.jpg'}
                    link={service.link}
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300  bg-white dark:bg-dental-black rounded-2xl"
                    itemScope
                    itemType="https://schema.org/MedicalService"
                  >
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 flex justify-between items-center px-4">
                    
                    </div>
                    <meta itemProp="name"  content={language === 'ar' ? service.title.ar : service.title.en} />
                    <meta itemProp="description" content={language === 'ar' ? service.description.ar : service.description.en} />
                    <meta itemProp="image" content={service.image || '/fallback-service.jpg'} />
                    <meta itemProp="url" content={`https://khashaba-clinics.tsd-education.com${service.link}`} />
                    <meta itemProp="serviceType" content={language === 'ar' ? service.title.ar : service.title.en} />
                    <meta itemProp="provider" content="Dr. Mohamed Khashaba Clinic" />
                    <meta
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                      content={JSON.stringify({
                        '@type': 'Offer',
                        priceCurrency: 'EGP',
                        price: service.price.en.match(/\d+/)?.[0] || '0',
                      })}
                    />
                  </ServiceCard>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            className="inline-flex items-center px-6 py-3 bg-gradient-to-b from-dental-gold to-dental-darkGold/90 text-white hover:bg-dental-darkGold transition-colors duration-300"
          >
            <Link to="/services" className="flex items-center">
              <span>{language === 'ar' ? 'جميع الخدمات' : 'All Services'}</span>
              <ArrowRight className="mr-2 rtl:ml-2 rtl:rotate-180 h-4 w-4" />
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
                'url': `https://khashaba-clinics.tsd-education.com${service.link}`,
                'offers': {
                  '@type': 'Offer',
                  'priceCurrency': 'EGP',
                  'price': service.price.en.match(/\d+/)?.[0] || '0',
                },
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
    </section>
  );
};

export default ServicesCarousel;