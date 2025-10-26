import { useState, useEffect } from 'react';

type Language = 'en' | 'ar';

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check for saved language preference first
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'ar') {
      return savedLanguage;
    }
    
    // Fallback to browser language
    const browserLanguage = navigator.language.split('-')[0];
    return browserLanguage === 'ar' ? 'ar' : 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    // Update document attributes
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Save language preference
    localStorage.setItem('language', language);
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguageState(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  return { 
    language, 
    isRTL, 
    toggleLanguage, 
    setLanguage 
  };
};
