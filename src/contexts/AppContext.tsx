import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Theme = 'light' | 'dark';

interface AppContextType {
  // Language
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
  
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  
  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Helper function to get saved language with Arabic as default
const getSavedLanguage = (): Language => {
  if (typeof window === 'undefined') return 'ar';
  
  try {
    const saved = localStorage.getItem('dental-language');
    return (saved as Language) || 'ar'; // Arabic as default
  } catch {
    return 'ar';
  }
};

// Helper function to get saved theme
const getSavedTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  try {
    const saved = localStorage.getItem('dental-theme');
    return (saved as Theme) || 'light';
  } catch {
    return 'light';
  }
};

// Helper function to safely save to localStorage
const safeLocalStorageSet = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getSavedLanguage);
  const [theme, setTheme] = useState<Theme>(getSavedTheme);
  const [isLoading, setIsLoading] = useState(true);

  const isRTL = language === 'ar';

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'ar' ? 'en' : 'ar';
      safeLocalStorageSet('dental-language', newLang);
      return newLang;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      safeLocalStorageSet('dental-theme', newTheme);
      return newTheme;
    });
  };

  // Apply language and theme changes to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Language and direction
    root.dir = isRTL ? 'rtl' : 'ltr';
    root.lang = language;
    
    // Theme
    root.classList.toggle('dark', theme === 'dark');
    
    // Body classes for additional styling
    document.body.className = `font-alexandria ${isRTL ? 'rtl' : 'ltr'} ${theme}`;
    
    // Meta tags for SEO
    let metaDir = document.querySelector('meta[name="direction"]');
    if (!metaDir) {
      metaDir = document.createElement('meta');
      metaDir.setAttribute('name', 'direction');
      document.head.appendChild(metaDir);
    }
    metaDir.setAttribute('content', isRTL ? 'rtl' : 'ltr');
    
    // Simulate loading completion after DOM updates
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [language, isRTL, theme]);

  const value: AppContextType = {
    language,
    isRTL,
    toggleLanguage,
    theme,
    toggleTheme,
    isLoading,
    setIsLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
