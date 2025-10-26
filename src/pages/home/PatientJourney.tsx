import { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SimpleBookingForm from '@/components/SimpleBookingForm';
import { MapPin, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { FaLinkedin, FaTiktok } from 'react-icons/fa';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { contact } from '@/data/contact';

const ClinicLocation = memo(() => {
  const { isRTL, language } = useApp();

  const clinicDetails = {
    name: isRTL ? 'عيادة د. محمد خشبة' : 'Dr. Mohamed Khashaba Clinic',
    address: isRTL
      ? ' المشاية السفلية، أمام نادي جزيرة الورد، المنصورة، الدقهلية '
      : 'Mashaya Sefla, In front of Geziret Al-Ward Club, Mansoura, Dakahlia ',
    phone: '+201040659965', // Updated with actual phone number
  };

  const seoTitle = isRTL
    ? 'أفضل عيادة أسنان بالمنصورة - د. محمد خشبة | طب أسنان تجميلي وأطفال'
    : 'Best Dental Clinic in Mansoura - Dr. Mohamed Khashaba | Cosmetic Dentistry & Pediatrics';
  const seoDescription = isRTL
    ? 'أفضل دكتور أسنان تجميلي على المشاية وحي الجامعة بالمنصورة: زراعة أسنان، تركيبات، تبييض، تقويم، أسنان أطفال بأحدث التقنيات.'
    : 'Top cosmetic dentist in Mansoura on Mashaya and University District: implants, crowns, whitening, orthodontics, pediatric dentistry with cutting-edge technology.';
  const seoKeywords = isRTL
    ? 'أفضل دكتور أسنان تجميلي, أفضل عيادة أسنان بالمنصورة, أفضل دكتور أسنان على المشاية, أفضل دكتور أسنان أطفال, أحسن دكتور أسنان حي الجامعة, طب أسنان المنصورة, د. محمد خشبة, زراعة أسنان, تركيبات أسنان, تبييض أسنان, تقويم أسنان, طب أسنان الدقهلية'
    : 'best cosmetic dentist, best dental clinic Mansoura, best dentist on Mashaya, best pediatric dentist, top dentist University District, dentistry Mansoura, Dr. Mohamed Khashaba, dental implants, crowns, teeth whitening, orthodontics, dentistry Dakahlia';

  // Memoized social links
  const socialLinks = useMemo(
    () => [
      {
        icon: Facebook,
        href: contact.social.facebook,
        label: 'Facebook',
        color: 'hover:text-blue-500',
      },
      {
        icon: FaTiktok,
        href: contact.social.tiktok,
        label: 'TikTok',
        color: 'hover:text-pink-600',
      },
      {
        icon: Instagram,
        href: contact.social.instagram,
        label: 'Instagram',
        color: 'hover:text-pink-500',
      },
    ],
    []
  );

  return (
    <section
      className="py-10 bg-gradient-to-t from-dental-gold/10 to-white dark:from-dental-black dark:to-dental-darkGold/20"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="clinic-title"
    >
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/path/to/clinic-hero.jpg" /> {/* Replace with actual image path */}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dentist',
            'name': clinicDetails.name,
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Above Al-Siraj Showroom, Mashaya Sefla, In front of Geziret Al-Ward Club',
              'addressLocality': 'Mansoura',
              'addressRegion': 'Dakahlia',
              'postalCode': '53111',
              'addressCountry': 'EG',
            },
            'telephone': clinicDetails.phone,
            'openingHours': 'Mo-Su 09:00-21:00',
            'description': seoDescription,
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': '31.0364',
              'longitude': '31.3807',
            },
            'service': [
              {
                '@type': 'MedicalService',
                'name': isRTL ? 'طب أسنان تجميلي' : 'Cosmetic Dentistry',
              },
              {
                '@type': 'MedicalService',
                'name': isRTL ? 'أسنان أطفال' : 'Pediatric Dentistry',
              },
              // Add more services as needed
            ],
            'review': [
              {
                '@type': 'Review',
                'reviewRating': {
                  '@type': 'Rating',
                  'ratingValue': '5',
                  'bestRating': '5',
                },
                'author': {
                  '@type': 'Person',
                  'name': 'عميل راضٍ', // Replace with real data
                },
                'reviewBody': 'أفضل دكتور أسنان في المنصورة!', // Replace with real review
              },
              // Add more reviews as needed
            ],
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 id="clinic-title" className="text-2xl md:text-3xl font-extrabold leading-[1.7]">
            {isRTL ? 'زور عيادتنا في المنصورة' : 'Visit Our Mansoura Clinic'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 md:mt-5 max-w-2xl mx-auto">
            {isRTL
              ? 'رعاية أسنان احترافية بأحدث التقنيات في قلب المنصورة'
              : 'Professional dental care with cutting-edge technology in the heart of Mansoura'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SimpleBookingForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-dental-black rounded-xl shadow-md border border-dental-gold/20 p-6"
          >
            <h3 className="text-xl font-semibold text-dental-gold mb-2">{clinicDetails.name}</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <div className="flex text-center justify-center items-center gap-2">
                <p>{clinicDetails.address}</p>
              </div>
            </div>
            <div className="mt-4 h-[450px] rounded-lg overflow-hidden">
              <iframe
src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6836.56207139229!2d31.370402000000002!3d31.046275!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79d0028848ff5%3A0xc6cf47ed2847b6e4!2z2K8uINmF2K3ZhdivINiu2LTYqNmHINmE2LfYqCDZiNis2LHYp9it2Kkg2KfZhNmB2YUg2YjYp9mE2KPYs9mG2KfZhg!5e0!3m2!1sar!2seg!4v1761148941359!5m2!1sar!2seg"                 width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={isRTL ? 'خريطة أفضل عيادة أسنان بالمنصورة' : 'Map of Best Dental Clinic in Mansoura'}
                aria-label={isRTL ? 'خريطة موقع أفضل عيادة د. محمد خشبة بالمنصورة' : 'Map of Dr. Mohamed Khashaba Best Clinic in Mansoura'}
              />
            </div>
        
            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-6 flex justify-center items-center flex-col gap-4"
            >
              <h1 className="text-xl font-semibold text-dental-gold">
                {isRTL ? 'تابعنا على' : 'Follow us on'}
              </h1>
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'transition-colors duration-200',
                      social.color,
                      'p-2 rounded-full flex items-center justify-center bg-dental-gold/10 hover:bg-dental-gold/20'
                    )}
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon === FaTiktok || social.icon === FaLinkedin ? (
                      <social.icon className="h-5 w-5 text-dental-black dark:text-white" aria-hidden="true" />
                    ) : (
                      <social.icon className="h-5 w-5 text-dental-black dark:text-white" aria-hidden="true" />
                    )}
                    <span className="sr-only">{social.label}</span> {/* For better accessibility */}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ClinicLocation.displayName = 'ClinicLocation';

export default ClinicLocation;