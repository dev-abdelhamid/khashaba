import { useApp } from '@/contexts/AppContext';
import { translations, TranslationKey } from '@/constants/translations';

export const useTranslation = () => {
  const { language, isRTL } = useApp();
  
  const t = (key: TranslationKey): string => {
    try {
      return translations[language][key] || translations['ar'][key] || key;
    } catch (error) {
      console.warn(`Translation key "${key}" not found for language "${language}"`);
      return key;
    }
  };

  // Helper function for nested translations
  const tn = (obj: any, key: string): string => {
    try {
      const keys = key.split('.');
      let value = obj;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }
      
      return typeof value === 'string' ? value : key;
    } catch (error) {
      console.warn(`Nested translation key "${key}" not found`);
      return key;
    }
  };

  // Format text with variables
  const tf = (key: TranslationKey, variables?: Record<string, string | number>): string => {
    let text = t(key);
    
    if (variables) {
      Object.entries(variables).forEach(([varKey, value]) => {
        text = text.replace(new RegExp(`{{${varKey}}}`, 'g'), String(value));
      });
    }
    
    return text;
  };

  // Get direction-aware class names
  const getDirectionClass = (ltrClass: string, rtlClass: string = ''): string => {
    return isRTL ? rtlClass : ltrClass;
  };

  // Get margin/padding classes based on direction
  const getSpacingClass = (property: 'margin' | 'padding', side: 'left' | 'right', size: string): string => {
    const prefix = property === 'margin' ? 'm' : 'p';
    const actualSide = isRTL ? (side === 'left' ? 'right' : 'left') : side;
    return `${prefix}${actualSide[0]}-${size}`;
  };

  return { 
    t, 
    tn, 
    tf, 
    language, 
    isRTL, 
    getDirectionClass, 
    getSpacingClass 
  };
};
