import React, { useEffect, useRef  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import {
  Menu, X, Calendar, Phone, Mail, MapPin, Clock, 
  ChevronDown, Globe, Moon, Sun, Wifi, Star,
  Facebook, Instagram, Twitter, Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useHeader } from '@/contexts/HeaderContext';
import { useApp } from '@/contexts/AppContext';
import { contact } from '@/data/contact';
import Logo from '@/components/Logo';

export const MobileHeader: React.FC = () => {
  const {
    showTopHeader,
    isOpen,
    setIsOpen,
    activeDropdown,
    toggleDropdown,
    isActive,
    currentNavLinks,
    scrolled,
    headerRef
  } = useHeader();
  
  const { 
    language, 
    isRTL, 
    theme, 
    toggleTheme, 
    toggleLanguage 
  } = useApp();


  const location = useLocation();   // 👈 نستخدم المسار الحالي
  const navigate = useNavigate();   // 👈 نستخدم التنقل البرمجي
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Spring animations for smooth interactions
  const menuSpring = useSpring(isOpen ? 1 : 0, { stiffness: 300, damping: 30 });
  const menuTranslateX = useTransform(
    menuSpring, 
    [0, 1], 
    [isRTL ? '100%' : '-100%', '0%']

    
  );



  const content = {
    ar: {
      menu: "القائمة",
      close: "إغلاق",
      bookAppointment: "حجز موعد",
      book: "حجز",
      callNow: "اتصل الآن",
      emailUs: "راسلنا",
      visitUs: "زورنا",
      workingHours: "ساعات العمل",
      followUs: "تابعنا",
      switchToEnglish: "English",
      lightMode: "الوضع المضيء",
      darkMode: "الوضع المظلم",
      onlineBooking: "حجز أونلاين",
      emergencyCall: "مكالمة طوارئ",
      rating: "تقييم 5 نجوم",
      homepage: "الصفحة الرئيسية",

    },
    en: {
      menu: "Menu",
      close: "Close",
      bookAppointment: "Book Appointment",
      book: "Book",
      callNow: "Call Now",
      emailUs: "Email Us",
      visitUs: "Visit Us",
      workingHours: "Working Hours",
      followUs: "Follow Us",
      switchToArabic: "العربية",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      onlineBooking: "Online Booking",
      emergencyCall: "Emergency Call",
      rating: "5 Star Rating",
      homepage: "Homepage"
    }
  };

  const t = content[language];

  // Animation variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: isRTL ? '100%' : '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeIn'
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.4,
        ease: 'easeOut',
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: isRTL ? '100%' : '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  const navItemVariants = {
    hidden: {
      opacity: 0,
      x: isRTL ? 30 : -30,
      y: 10
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: {
      opacity: 0,
      x: isRTL ? 20 : -20,
      transition: {
        duration: 0.2
      }
    }
  };


  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);



  return (
    <div className="md:hidden " dir={isRTL ? "rtl" : "ltr"}>
      {/* Mobile Header */}
      <motion.header
        ref={headerRef}
        className={cn(
          "w-full transition-all max-w-full duration-500 fixed top-0 left-0 right-0 z-40 backdrop-blur-md",
          scrolled
            ? "bg-white dark:bg-dental-black/95 shadow-lg py-2"
            : "bg-white dark:bg-dental-black/90 py-2.5",
          "border-b border-gray-100/50 dark:border-gray-800/50"
        )}
        style={{
          top: showTopHeader ? '32px' : 0,
          transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease, background-color 0.3s ease'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className=" mx-auto px-2">
          <div className="flex items-center align-center justify-between">
             {/* ✅ Logo */}
                        <button
                          onClick={() => {
                            if (location.pathname === '/') {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                              navigate('/');
                            }
                          }}
                          className="flex items-center  group"
                          aria-label={t.homepage}
                        >
                          <Logo scrolled={scrolled} isRTL={isRTL} />
                        </button>

            {/* Mobile Action Buttons */}
            <div className="flex items-center gap-2">
            

              {/* Book Appointment Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-dental-gold to-dental-darkGold hover:from-dental-darkGold hover:to-dental-gold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link to="/appointment">
                    <span className="text-xs font-medium">{t.book}</span>
                  </Link>
                </Button>
              </motion.div>

              {/* Menu Toggle Button */}
              <motion.button
                className="relative text-dental-black dark:text-white focus:outline-none rounded-xl w-10 h-10 flex items-center justify-center hover:bg-dental-gold/10 transition-all duration-300 group overflow-hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? t.close : t.menu}
                aria-expanded={isOpen}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-dental-gold/20 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Menu Icon Animation */}
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </motion.div>
                </div>

                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-dental-gold/30 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1.5, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              ref={overlayRef}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              ref={menuRef}
              className="fixed inset-y-0 z-50 w-full max-w-sm bg-white dark:bg-dental-black shadow-2xl overflow-y-auto"
              style={{
                [isRTL ? 'right' : 'left']: 0,
                top: showTopHeader ? '32px' : 0,
                height: showTopHeader ? 'calc(100% - 40px)' : '100%'
              }}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label={t.menu}
            >
              {/* Menu Header */}
              <div className="sticky top-0 z-10 bg-white/95 dark:bg-dental-black/95 backdrop-blur-md py-4 px-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <motion.div
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                      <Logo scrolled={true} isRTL={isRTL} isMobile={true} />
                    </Link>
                  </motion.div>

                  <motion.button
                    className="text-dental-black dark:text-white focus:outline-none rounded-full w-8 h-8 flex items-center justify-center hover:bg-dental-gold/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label={t.close}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                
              </div>

              <div className="flex-1 px-6 py-4">
                {/* Navigation Links */}
                <nav className="space-y-2">
                  {currentNavLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      className={`border-b ${isRTL ? "text-right" : "text-left"} border-gray-100/50 dark:border-gray-800/50 last:border-b-0 pb-1 last:pb-0`}
                      custom={index}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {link.dropdown ? (
                        <div>
                          <motion.button
                            onClick={() => toggleDropdown(link.path)}
                            className={cn(
                              "w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 group",
                              isActive(link.path)
                                ? "text-dental-gold bg-dental-gold/10 font-medium"
                                : "text-dental-black dark:text-white hover:bg-gray-50 dark:hover:bg-dental-dark/30"
                            )}
                            aria-expanded={activeDropdown === link.path}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="text-base  font-medium">{link.name}</span>
                            <motion.div
                              animate={{ rotate: activeDropdown === link.path ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-2 rtl:mr-2 rtl:ml-0"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </motion.button>

                          <AnimatePresence>
                            {activeDropdown === link.path && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden bg-gray-50/50 dark:bg-dental-dark/20 rounded-xl mt-2 ml-4 rtl:mr-4 rtl:ml-0"
                              >
                                {link.dropdown.map((item, idx) => (
                                  <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: isRTL ? -15 : 15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                  >
                                    <Link
                                      to={item.path}
                                      className={cn(
                                        `block py-2 px-4 text-sm ${isRTL ? "text-right" : "text-left"} rounded-lg transition-all duration-300 hover:bg-white dark:hover:bg-dental-black/50`,
                                        isActive(item.path)
                                          ? "text-dental-gold font-medium bg-white dark:bg-dental-black/30"
                                          : "text-dental-black/80 dark:text-white/80 hover:text-dental-gold"
                                      )}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to={link.path}
                            className={cn(
                              "text-base py-3 px-4 block rounded-xl transition-all duration-300 font-medium",
                              isActive(link.path)
                                                                ? "text-dental-gold bg-dental-gold/10 font-semibold"
                                : "text-dental-black dark:text-white hover:text-dental-gold hover:bg-gray-50 dark:hover:bg-dental-dark/30"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </nav>

               

              </div>

              {/* Mobile Footer Actions */}
              <div className="sticky bottom-0 bg-white/95 dark:bg-dental-black/95 backdrop-blur-md p-6 border-t border-gray-100 dark:border-gray-800">
                <div className="space-y-4">
                  {/* Primary CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <Button
                      asChild
                      className="w-full mx-auto bg-gradient-to-r from-dental-gold via-dental-gold to-dental-darkGold hover:from-dental-darkGold hover:via-dental-darkGold hover:to-dental-gold text-white shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group py-3"
                    >
                      <Link to="/appointment" onClick={() => setIsOpen(false)}>
                        {/* Animated Background */}
                        <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                        
                        {/* Button Content */}
                        <div className="relative z-10 flex items-center justify-center">
                          <span className="font-semibold">{t.bookAppointment}</span>
                        </div>

                        {/* Pulse Effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/10 rounded-lg"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </Link>
                    </Button>
                  </motion.div>

                  
                   
                
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
