import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';

interface ThemeToggleProps {
  className?: string;
  iconOnly?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = "", 
  iconOnly = false 
}) => {
  const { theme, toggleTheme, isRTL } = useHeader();
  
  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center hover:text-dental-gold transition-colors ${className}`}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <>
          <Moon className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {!iconOnly && <span>{isRTL ? "داكن" : "Dark"}</span>}
        </>
      ) : (
        <>
          <Sun className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
          {!iconOnly && <span>{isRTL ? "فاتح" : "Light"}</span>}
        </>
      )}
    </button>
  );
};
