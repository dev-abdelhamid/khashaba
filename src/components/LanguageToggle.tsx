import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

interface LanguageToggleProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'default' | 'minimal' | 'dropdown';
  languages?: { code: string; label: string }[];
}

// وظيفة مساعدة لدمج الأنماط
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = "",
  iconOnly = false,
  variant = 'default',
  languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' }
  ]
}) => {
  const { language, isRTL, toggleLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // الحصول على تسمية اللغة الحالية
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  
  // تبديل القائمة المنسدلة
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };
  
  // معالجة اختيار اللغة
  const handleLanguageSelect = (langCode: string) => {
    if (langCode !== language && (langCode === 'ar' || langCode === 'en')) {
      changeLanguage(langCode as 'ar' | 'en');
    }
    setIsOpen(false);
  };
  
  // متغيرات الرسوم المتحركة
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -5,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const iconVariants = {
    default: { rotate: 0 },
    rotated: { rotate: 180, transition: { duration: 0.2 } }
  };
  
  // عرض النمط البسيط
  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleLanguage}
        className={cn(
          "relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
          className
        )}
        aria-label={isRTL ? "Switch to English" : "التبديل إلى العربية"}
      >
        <Globe className="h-4 w-4" />
      </button>
    );
  }
  
  // عرض نمط القائمة المنسدلة
  if (variant === 'dropdown') {
    return (
      <div className={cn("relative", className)}>
        <button
          onClick={toggleDropdown}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md",
            "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            "border border-gray-200 dark:border-gray-700"
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Globe className="h-3.5 w-3.5" />
          {!iconOnly && <span>{currentLanguage.label}</span>}
          <motion.div
            variants={iconVariants}
            animate={isOpen ? 'rotated' : 'default'}
          >
            <ChevronDown className="h-3 w-3" />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={cn(
                "absolute z-50 mt-1 w-auto min-w-[120px]",
                "bg-white dark:bg-gray-900 rounded-md shadow-lg",
                "border border-gray-200 dark:border-gray-700",
                "py-1 overflow-hidden",
                isRTL ? "right-0" : "left-0"
              )}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={cn(
                    "w-full text-left px-3 py-1.5",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    "flex items-center gap-2",
                    lang.code === language && "text-dental-gold font-medium"
                  )}
                  onClick={() => handleLanguageSelect(lang.code)}
                  dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
                >
                  {lang.code === language && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-dental-gold"
                    />
                  )}
                  <span>{lang.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  // عرض النمط الافتراضي
  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 hover:text-dental-gold transition-colors",
        "relative overflow-hidden group",
        className
      )}
      aria-label={isRTL ? "Switch to English" : "التبديل إلى العربية"}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Globe className="h-3.5 w-3.5" />
      </motion.div>
      
      {!iconOnly && (
        <div className="relative overflow-hidden">
          <motion.span
            className="inline-block"
            initial={false}
            animate={{ y: isRTL ? 0 : -20, opacity: isRTL ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            English
          </motion.span>
          <motion.span
            className="inline-block absolute left-0 top-0"
            initial={false}
            animate={{ y: isRTL ? 20 : 0, opacity: isRTL ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            العربية
          </motion.span>
        </div>
      )}
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-dental-gold origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: isRTL ? 'right' : 'left' }}
      />
    </button>
  );
};
