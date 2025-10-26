import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button, Input, Tabs, TabsList, TabsTrigger, TabsContent, Dialog, DialogContent, DialogTitle } from '@/components/ui';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';
import { Search, ZoomIn, Award, Users, Star, Smile } from 'lucide-react';
import SimpleHeroSection from '@/components/CTA/SimpleHeroSection';
import LazyImage from '@/components/LazyImage';
import { Helmet } from 'react-helmet-async';
import { galleryItems } from '@/data/galleryData';
import FAQSection from './home/FAQSection';
import ServiceTestimonials from '@/components/ServiceTestimonials';
import CTASection from '@/components/CTASection';
import SectionTitle from '@/components/SectionTitle';

// SEO Configuration
const seoConfig = {
  title: {
    ar: 'أفضل دكتور أسنان تجميلي بالمنصورة | د. محمد خشبة',
    en: 'Best Cosmetic Dentist in Mansoura | Dr. Mohamed Khashaba',
  },
  description: {
    ar: 'استعرض أحدث حالات النجاح في فينيرز، كومبوزيت فينيرز، زراعة الأسنان، تقويم شفاف، تبييض الأسنان، وتجميل الابتسامة مع د. محمد خشبة، أفضل دكتور أسنان تجميلي بالمنصورة، مصر!',
    en: 'Explore the latest success cases in veneers, composite veneers, dental implants, clear orthodontics, teeth whitening, and smile makeovers with Dr. Mohamed Khashaba, the best cosmetic dentist in Mansoura, Egypt!',
  },
  keywords: [
    'أفضل دكتور أسنان تجميلي بالمنصورة',
    'عيادة د. محمد خشبة',
    'فينيرز المنصورة',
    'كومبوزيت فينيرز المنصورة',
    'زراعة الأسنان المنصورة',
    'تقويم شفاف المنصورة',
    'تبييض الأسنان المنصورة',
    'هوليود سمايل المنصورة',
    'تجميل الابتسامة مصر',
    'طب أسنان تجميلي المنصورة',
    'رعاية أسنان متقدمة المنصورة',
    'طب أسنان القاهرة',
    'تجميل الأسنان الإسكندرية',
    'خدمات أسنان السعودية',
    'طب أسنان الإمارات',
    'استشارة أسنان أونلاين المنصورة',
    'تشخيص أسنان أونلاين مصر',
    'حالات نجاح أسنان المنصورة',
    'أفضل عيادة أسنان بالمنصورة',
    'طبيب أسنان تجميلي مصر',
    'هوليود سمايل مصر',
  ],
};

const hiddenKeywords = [
  'أفضل دكتور أسنان تجميلي بالمنصورة',
  'فينيرز المنصورة',
  'كومبوزيت فينيرز مصر',
  'زراعة أسنان المنصورة',
  'تقويم شفاف المنصورة',
  'تبييض الأسنان المنصورة',
  'هوليود سمايل المنصورة',
  'عيادة أسنان متقدمة المنصورة',
  'تجميل الأسنان المنصورة',
  'رعاية أسنان المنصورة',
  'طب أسنان المنصورة',
  'أفضل عيادة أسنان مصر',
  'خدمات أسنان المنصورة',
  'طبيب أسنان تجميلي مصر',
  'هوليود سمايل مصر',
];

const content = {
  ar: {
    heroTitle: 'قصص نجاح تحوّل ابتسامتك',
    heroDescription: 'اكتشف أجمل حالات النجاح في فينيرز، كومبوزيت فينيرز، زراعة الأسنان، تقويم شفاف، وتبييض الأسنان مع د. محمد خشبة بالمنصورة.',
    portfolioSubtitle: 'حالات النجاح',
    portfolioTitle: 'استعرض حالات نجاحنا لابتسامة مثالية',
    portfolioDescription: 'من فينيرز وكومبوزيت فينيرز إلى زراعة الأسنان وتقويم شفاف، شاهد نتائجنا المذهلة في المنصورة مع فريق د. محمد خشبة.',
    searchPlaceholder: 'ابحث عن حالة (مثل: فينيرز، تقويم شفاف)...',
    whyChooseUs: 'لماذا عيادة د. محمد خشبة؟',
    whyTitle: 'رعاية أسنان بمعايير عالمية',
    whyDescription: 'في عيادة د. محمد خشبة بالمنصورة، نجمع بين التقنيات الحديثة والخبرة لتحقيق ابتسامة أحلامك براحة تامة.',
    advancedTech: 'تكنولوجيا متطورة',
    advancedTechDesc: 'نعتمد على أجهزة ليزر وتصوير ثلاثي الأبعاد لنتائج دقيقة ومبهرة.',
    expertTeam: 'فريق متخصص',
    expertTeamDesc: 'د. محمد خشبة وفريقه يقدمون تجربة علاجية احترافية بكل شغف.',
    comfortableEnv: 'بيئة مريحة',
    comfortableEnvDesc: 'عيادتنا مصممة لتوفير الراحة والاسترخاء أثناء العلاج.',
    personalizedCare: 'رعاية مخصصة',
    personalizedCareDesc: 'خطط علاج مصممة خصيصاً لتلبية احتياجاتك بأفضل صورة.',
    onlineConsultationTitle: 'احجز استشارتك الأونلاين الآن',
    onlineConsultationSubtitle: 'تواصل مع د. محمد خشبة عبر الإنترنت لتشخيص حالتك بسرعة وراحة، واستلم خطة علاج مخصصة.',
    onlineConsultationButton: 'احجز الآن',
    onlineConsultationHighlight: 'تشخيص سريع، راحة تامة، وخطة علاج مخصصة من منزلك!',
    showMore: 'إظهار المزيد',
    noMoreItems: 'لا توجد حالات أخرى لعرضها',
  },
  en: {
    heroTitle: 'Success Stories Transforming Your Smile',
    heroDescription: 'Discover the finest success cases in veneers, composite veneers, dental implants, clear orthodontics, and teeth whitening with Dr. Mohamed Khashaba in Mansoura.',
    portfolioSubtitle: 'Success Cases',
    portfolioTitle: 'Explore Our Success Cases for a Perfect Smile',
    portfolioDescription: 'From veneers and composite veneers to dental implants and clear orthodontics, see our stunning results in Mansoura with Dr. Mohamed Khashaba’s team.',
    searchPlaceholder: 'Search for a case (e.g., veneers, clear orthodontics)...',
    whyChooseUs: 'Why Choose Dr. Mohamed Khashaba’s Clinic?',
    whyTitle: 'World-Class Dental Care',
    whyDescription: 'At Dr. Mohamed Khashaba’s clinic in Mansoura, we combine modern technology and expertise to deliver your dream smile with complete comfort.',
    advancedTech: 'Cutting-Edge Technology',
    advancedTechDesc: 'We rely on laser devices and 3D imaging for precise, impressive results.',
    expertTeam: 'Expert Team',
    expertTeamDesc: 'Dr. Mohamed Khashaba and his team provide a professional treatment experience with passion.',
    comfortableEnv: 'Relaxing Environment',
    comfortableEnvDesc: 'Our clinic is designed for comfort and relaxation during your treatment.',
    personalizedCare: 'Personalized Care',
    personalizedCareDesc: 'Customized treatment plans tailored to meet your needs perfectly.',
    onlineConsultationTitle: 'Book Your Online Consultation Now',
    onlineConsultationSubtitle: 'Connect with Dr. Mohamed Khashaba online for a quick and convenient diagnosis, and receive a personalized treatment plan.',
    onlineConsultationButton: 'Book Now',
    onlineConsultationHighlight: 'Quick diagnosis, ultimate convenience, and a tailored treatment plan from the comfort of your home!',
    showMore: 'Show More',
    noMoreItems: 'No more cases to display',
  },
};

const categories = [
  { id: 'all', label: { ar: 'جميع الحالات', en: 'All Cases' } },
  { id: 'veneers', label: { ar: 'فينيرز', en: 'Veneers' } },
  { id: 'composite-veneers', label: { ar: 'كومبوزيت فينيرز', en: 'Composite Veneers' } },
  { id: 'implants', label: { ar: 'زراعة الأسنان', en: 'Dental Implants' } },
  { id: 'orthodontics', label: { ar: 'تقويم الأسنان', en: 'Orthodontics' } },
  { id: 'clear-orthodontics', label: { ar: 'تقويم شفاف', en: 'Clear Orthodontics' } },
  { id: 'whitening', label: { ar: 'تبييض الأسنان', en: 'Teeth Whitening' } },
];

const Portfolio: React.FC = () => {
  const { language = 'ar' } = useApp?.() || {};
  const isRTL = language === 'ar';
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [visibleItems, setVisibleItems] = useState(6);
  const dialogRef = useRef<boolean>(false);
  const t = content[language];

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveCategory('all');
    setVisibleItems(6);
  }, [language]);

  useEffect(() => {
    if (!selectedCase && dialogRef.current) {
      setActiveCategory((prev) => prev);
    }
    dialogRef.current = !!selectedCase;
  }, [selectedCase]);

  const filteredData = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category.id === activeCategory;
      const matchesSearch =
        item.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullDescription[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.keywords || []).some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, language]);

  const handleShowMore = useCallback(() => {
    const isLargeScreen = window.innerWidth >= 1024;
    setVisibleItems((prev) => prev + (isLargeScreen ? 6 : 3));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  const CaseCardEnhanced: React.FC<{ item: typeof galleryItems[0] }> = ({ item }) => (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white dark:bg-dental-black rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-dental-gold/20"
      itemScope
      itemType="https://schema.org/MedicalProcedure"
    >
      <Link to={`/case/${item.id}`} className="block">
        <div className="relative overflow-hidden">
          <LazyImage
            src={item.imageSrc}
            alt={`${item.title[language]} - أفضل دكتور أسنان تجميلي بالمنصورة، مصر - ${item.category.label[language]}`}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            itemProp="image"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white text-base font-bold mb-1" itemProp="name">
              {item.title[language]}
            </h3>
            <p className="text-gray-200 text-sm line-clamp-2" itemProp="description">
              {item.description[language]}
            </p>
          </div>
        </div>
      </Link>
      <button
        className="absolute top-3 right-3 bg-dental-gold/80 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedCase(item);
        }}
        aria-label={language === 'ar' ? 'عرض تفاصيل الحالة' : 'View case details'}
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <div className="sr-only" itemProp="keywords">
        {(item.keywords || []).concat(hiddenKeywords).join(', ')}
      </div>
    </motion.div>
  );

  const WhyChooseUsSection: React.FC = () => (
    <section className="pb-16 pt-2 bg-gradient-to-t from-dental-gold/20 to-gray-50 dark:bg-gradient-to-t dark:from-dental-gold/20 dark:to-dental-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-dental-gold font-medium mb-2 block text-sm">{t.whyChooseUs}</span>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{t.whyTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-lg mx-auto">{t.whyDescription}</p>
          <div className="sr-only">{hiddenKeywords.join(', ')}</div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          {[
            { icon: Award, title: t.advancedTech, description: t.advancedTechDesc },
            { icon: Users, title: t.expertTeam, description: t.expertTeamDesc },
            { icon: Star, title: t.comfortableEnv, description: t.comfortableEnvDesc },
            { icon: Smile, title: t.personalizedCare, description: t.personalizedCareDesc },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center border border-dental-gold/20 p-4 bg-white dark:bg-dental-black rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 text-dental-gold" />
              </div>
              <h3 className="text-sm font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
        <Helmet>
          <meta name="keywords" content={seoConfig.keywords.join(', ')} />
          <meta name="description" content={t.whyDescription} />
        </Helmet>
      </div>
    </section>
  );

  const OnlineConsultationCTA: React.FC = () => (
    <section className="py-10 px-2 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-dental-black dark:via-dental-darkGold/20 dark:to-dental-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/consultation-pattern.svg')] bg-cover bg-center opacity-10 dark:opacity-20" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-dental-gold/10 to-dental-darkGold/20 dark:bg-dental-black rounded-2xl shadow-lg p-10 md:p-12 mx-auto text-center border border-dental-gold/20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-white">{t.onlineConsultationTitle}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-base mb-6 max-w-2xl mx-auto leading-relaxed">{t.onlineConsultationSubtitle}</p>
            <p className="font-semibold text-sm mb-6">{t.onlineConsultationHighlight}</p>
            <Button
              asChild
              className="bg-dental-gold hover:bg-dental-darkGold text-white px-10 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link to="/online-consultation">{t.onlineConsultationButton}</Link>
            </Button>
            <div className="sr-only">{hiddenKeywords.join(', ')}</div>
          </motion.div>
        </motion.div>
        <Helmet>
          <meta name="keywords" content={seoConfig.keywords.join(', ')} />
          <meta name="description" content={t.onlineConsultationSubtitle} />
        </Helmet>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dental-black font-amiri text-base" dir={isRTL ? 'rtl' : 'ltr'} itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>{seoConfig.title[language]}</title>
        <meta name="description" content={seoConfig.description[language]} />
        <meta name="keywords" content={seoConfig.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Mohamed Khashaba Clinic" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8" />
        <meta property="og:title" content={seoConfig.title[language]} />
        <meta property="og:description" content={seoConfig.description[language]} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drkhashaba.com/portfolio" />
        <meta property="og:image" content="/img1.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.title[language]} />
        <meta name="twitter:description" content={seoConfig.description[language]} />
        <meta name="twitter:image" content="/img1.jpg" />
        <link rel="canonical" href="https://drkhashaba.com/portfolio" />
      </Helmet>

      <div className="sr-only">{hiddenKeywords.join(', ')}</div>

      <SimpleHeroSection
        Badge={t.portfolioSubtitle}
        title={t.heroTitle}
        subtitle={t.heroDescription}
        backgroundImage="/img1.jpg"
      />

      <section className="py-12 bg-gradient-to-b from-dental-gold/10 to-white dark:bg-gradient-to-b dark:from-dental-gold/10 dark:bg-dental-black">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle={t.portfolioSubtitle} title={t.portfolioTitle} description={t.portfolioDescription} />
          <div className="mb-8">
            <div className="max-w-md mx-auto mb-6">
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11  pl-4 rounded-full text-sm border-gray-300 dark:border-gray-600 focus:ring-dental-gold focus:border-dental-gold shadow-sm"
                  aria-label={t.searchPlaceholder}
                />
              </div>
            </div>
            <Tabs dir={isRTL ? 'rtl' : 'ltr'} defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full mx-auto">
              <div className="overflow-x-auto pb-3">
                <TabsList className="bg-white dark:bg-dental-black p-1.5 rounded-full mx-auto inline-flex gap-1">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 data-[state=active]:bg-dental-gold data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:dark:bg-dental-darkGold/20"
                    >
                      {category.label[language]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <AnimatePresence>
                <TabsContent
                  key={activeCategory}
                  value={activeCategory}
                  className="space-y-6"
                  forceMount
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredData.slice(0, visibleItems).map((item) => (
                      <CaseCardEnhanced key={item.id} item={item} />
                    ))}
                  </motion.div>
                  {filteredData.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-10"
                    >
                      <Search className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                      <h3 className="text-base font-semibold mb-2">{language === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {language === 'ar' ? 'جرب كلمات مختلفة مثل "فينيرز" أو "تقويم شفاف"' : 'Try different keywords like "veneers" or "clear orthodontics"'}
                      </p>
                    </motion.div>
                  )}
                  {filteredData.length > visibleItems && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center mt-8"
                    >
                      <Button
                        onClick={handleShowMore}
                        className="bg-dental-gold hover:bg-dental-darkGold text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                      >
                        {t.showMore}
                      </Button>
                    </motion.div>
                  )}
                  {filteredData.length > 0 && filteredData.length <= visibleItems && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-10"
                    >
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{t.noMoreItems}</p>
                    </motion.div>
                  )}
                  <Helmet>
                    <meta name="keywords" content={seoConfig.keywords.join(', ')} />
                    <meta name="description" content={`${t.portfolioDescription} - أفضل دكتور أسنان تجميلي بالمنصورة`} />
                  </Helmet>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </section>

      <OnlineConsultationCTA />
      <WhyChooseUsSection />
      <CTASection />
      <ServiceTestimonials />
      <FAQSection />

      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent
          className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] rounded-2xl p-0 bg-transparent border-none overflow-y-auto"
          dir={isRTL ? 'rtl' : 'ltr'}
          itemScope
          itemType="https://schema.org/MedicalProcedure"
        >
          <VisuallyHidden>
            <DialogTitle>
              {selectedCase?.title[language] || (language === 'ar' ? 'تفاصيل حالة نجاح' : 'Success Case Details')}
            </DialogTitle>
          </VisuallyHidden>
          <AnimatePresence>
            {selectedCase && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white dark:bg-dental-black rounded-t-2xl">
                  <div>
                    <h4 className="text-center font-bold text-lg mb-2 text-dental-gold">{language === 'ar' ? 'قبل' : 'Before'}</h4>
                    <LazyImage
                      src={selectedCase.beforeImage}
                      alt={`صورة قبل العلاج لـ ${selectedCase.title[language]} - أفضل دكتور أسنان تجميلي بالمنصورة، مصر - ${selectedCase.category.label[language]}`}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      itemProp="image"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-center font-bold text-lg mb-2 text-dental-gold">{language === 'ar' ? 'بعد' : 'After'}</h4>
                    <LazyImage
                      src={selectedCase.afterImage}
                      alt={`صورة بعد العلاج لـ ${selectedCase.title[language]} - أفضل دكتور أسنان تجميلي بالمنصورة، مصر - ${selectedCase.category.label[language]}`}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      itemProp="image"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-dental-black rounded-b-2xl">
                  <h3 className="text-xl font-bold mb-2 text-dental-gold" itemProp="name">{selectedCase.title[language]}</h3>
                  <p className="text-gray-600 dark:text-gray-300" itemProp="description">{selectedCase.fullDescription[language]}</p>
                  <div className="sr-only" itemProp="keywords">{(selectedCase.keywords || []).concat(hiddenKeywords).join(', ')}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dentist',
            'name': language === 'ar' ? 'عيادة د. محمد خشبة - أفضل دكتور أسنان تجميلي بالمنصورة' : 'Dr. Mohamed Khashaba Clinic - Best Cosmetic Dentist in Mansoura',
            'image': '/img1.jpg',
            'description': seoConfig.description[language],
            'url': 'https://drkhashaba.com/portfolio',
            'telephone': '+201234567890',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': language === 'ar' ? 'شارع الجيش، المنصورة' : 'Al-Geish Street, Mansoura',
              'addressLocality': language === 'ar' ? 'المنصورة، وسط البلد' : 'Mansoura, Downtown',
              'addressRegion': 'Dakahlia',
              'postalCode': '35511',
              'addressCountry': 'EG',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': '31.0409',
              'longitude': '31.3785',
            },
            'openingHours': 'Mo-Sa 09:00-21:00',
            'priceRange': '$$',
            'medicalSpecialty': ['CosmeticDentistry', 'DentalImplant', 'Orthodontics', 'TeethWhitening', 'ClearOrthodontics'],
            'hasOfferCatalog': {
              '@type': 'OfferCatalog',
              'name': language === 'ar' ? 'حالات نجاح طب الأسنان التجميلي' : 'Cosmetic Dentistry Success Cases',
              'itemListElement': galleryItems.map((item) => ({
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'MedicalProcedure',
                  'name': `${item.title[language]} - أفضل دكتور أسنان تجميلي بالمنصورة`,
                  'description': `${item.description[language]} - تقدمه عيادة د. محمد خشبة`,
                  'keywords': (item.keywords || []).concat(hiddenKeywords),
                },
              })),
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '250',
            },
            'areaServed': [
              { '@type': 'City', 'name': 'Mansoura' },
              { '@type': 'City', 'name': 'Cairo' },
              { '@type': 'City', 'name': 'Alexandria' },
              { '@type': 'Country', 'name': 'Saudi Arabia' },
              { '@type': 'Country', 'name': 'United Arab Emirates' },
            ],
            'keywords': seoConfig.keywords.concat(hiddenKeywords),
          }),
        }}
      />
    </div>
  );
};

export default Portfolio;
