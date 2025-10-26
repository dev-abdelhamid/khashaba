
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

// Define props for the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Provider component that wraps parts of the app that need theme context
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if theme was previously set
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      // Apply saved dark theme
      setThemeState('dark');
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light' || !savedTheme) {
      // Apply saved light theme or default to light if no preference
      setThemeState('light');
      document.documentElement.classList.remove('dark');
      if (!savedTheme) {
        localStorage.setItem('theme', 'light');
      }
    } else {
      // If somehow no recognized theme, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (prefersDark) {
        // System prefers dark
        setThemeState('dark');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        // System prefers light or no preference
        setThemeState('light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        // Only change theme automatically if user hasn't set a preference
        if (e.matches) {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Set theme function
  const setTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      // Switch to dark theme
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setThemeState('dark');
    } else {
      // Switch to light theme
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setThemeState('light');
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);
