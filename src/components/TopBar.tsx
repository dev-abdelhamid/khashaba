import React, { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin,
  Facebook, Instagram, Twitter, Youtube,
  Globe, Moon, Sun
} from 'lucide-react';


import { FaLinkedin , FaTiktok } from 'react-icons/fa';

import { cn } from '@/lib/utils';
import { useHeader } from '@/contexts/HeaderContext';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { contact } from '@/data/contact';

const topBarVariants = {
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};


export const TopBar: React.FC = memo(() => {
  const { showTopHeader } = useHeader();
  const { isRTL, theme, toggleTheme, toggleLanguage } = useApp();
  const { t } = useTranslation();

  // Memoized social links
  const socialLinks = useMemo(() => [
    {
      icon: Facebook,
      href: contact.social.facebook,
      label: "Facebook",
      color: "hover:text-blue-500"
    },
      {
      icon: FaTiktok,
      href: contact.social.tiktok,
      label: "Tiktok",
      color: "hover:text-pink-600"
    },
    {
      icon: Instagram,
      href: contact.social.instagram,
      label: "Instagram",
      color: "hover:text-pink-500"
    },
  
  
  ], []);

  return (
    <AnimatePresence>
      {showTopHeader && (
        <motion.div
          variants={topBarVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
          className="bg-white/95 dark:bg-dental-black/95 backdrop-blur-md border-b border-dental-gold/20 text-dental-black dark:text-white text-xs z-50 fixed top-0 left-0 right-0 overflow-hidden"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-center py-2">
              
              {/* Contact Info */}
              <div className={cn(
                "flex items-center gap-2 md:space-x-4 space-x-0 overflow-x-auto scrollbar-hide",
                isRTL ? "" : ""
              )}>
                
                {/* Location */}
                <motion.div
                  className="flex items-center whitespace-nowrap hidden md:flex"
                  custom={0}
                  
                >
                  <MapPin className={cn(
                    "h-3 w-3 text-dental-gold flex-shrink-0",
                    isRTL ? "ml-1" : "mr-1"
                  )} />
                  <span className="text-xs">
                    {isRTL ? contact.locationAr : contact.location}
                  </span>
                </motion.div>

                {/* Phone */}
                <motion.a
                  href={`tel:${contact.phone}`}
                  className={`flex   items-center  hover:text-dental-gold transition-colors whitespace-nowrap group`}
                  custom={1}
           
                >
                  <Phone className={cn(
                    "h-3 w-3 text-dental-gold     group-hover:animate-pulse",
                    isRTL ? "ml-1 " : "mr-1"
                  )} />
                  <div className={`text-xs block md:flex  font-medium`}>
                    {isRTL ? contact.phoneAr : contact.phone}
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href={`mailto:${contact.email}`}
                  className="flex items-center hover:text-dental-gold transition-colors  whitespace-nowrap hidden sm:flex group"
                  aria-label="Email Us"
                  custom={2}
                
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail className={cn(
                    "h-3 w-3 text-dental-gold  flex-shrink-0",
                    isRTL ? "ml-1" : "mr-1"
                  )} />
                  <span className="text-xs">{contact.email}</span>
                </motion.a>

              </div>

              {/* Right Side - Social and Controls */}
              <div className={cn(
                "flex items-center space-x-3",
                isRTL ? "space-x-reverse" : ""
              )}>
                
                {/* Social Icons */}
                <div className={cn(
                  "hidden sm:flex items-center space-x-2",
                  isRTL ? "space-x-reverse" : ""
                )}>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "transition-colors duration-200",
                        social.color
                      )}
                      aria-label={social.label}
                      custom={4 + index}
                  
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="h-3.5 w-3.5" />
                    </motion.a>
                  ))}
                </div>

                {/* Divider */}
                <motion.div
                  className="hidden sm:block h-3 w-px bg-gray-300 dark:bg-gray-600"
                  custom={8}
               
                />

                {/* Language Toggle */}
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center hover:text-dental-gold transition-all duration-200 group"
                  aria-label={isRTL ? "Switch to English" : "التبديل إلى العربية"}
                  custom={9}
             
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className={cn(
                    "h-3.5 w-3.5 group-hover:rotate-12 transition-transform flex-shrink-0",
                    isRTL ? "ml-1" : "mr-1"
                  )} />
                  <span className="inline text-xs font-medium">
                    {isRTL ? t('switchToEnglish') : t('switchToArabic')}
                  </span>
                </motion.button>

                {/* Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  className="flex items-center hover:text-dental-gold transition-all duration-200 group"
                  aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                  custom={10}
             
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    <div
                      key={theme}
                  
                      className="flex items-center"
                    >
                      {theme === "light" ? (
                        <>
                          <Moon className={cn(
                            "h-4 w-4 flex-shrink-0",
                            isRTL ? "ml-1" : "mr-1"
                          )} />
                          <span className="hidden sm:inline text-xs font-medium">
                            {t('darkMode')}
                          </span>
                        </>
                      ) : (
                        <>
                          <Sun className={cn(
                            "h-4 w-4 flex-shrink-0",
                            isRTL ? "ml-1" : "mr-1"
                          )} />
                          <span className="hidden sm:inline text-xs font-medium">
                            {t('lightMode')}
                          </span>
                        </>
                      )}
                    </div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

TopBar.displayName = 'TopBar';
