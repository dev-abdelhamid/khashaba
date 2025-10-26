import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useApp } from './AppContext';
import { servicesData } from '../data/services'; // تأكد من استيراد servicesData من الملف الصحيح

interface HeaderContextType {
  showTopHeader: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeDropdown: string | null;
  toggleDropdown: (path: string | null) => void;
  isActive: (path: string) => boolean;
  currentNavLinks: { name: string; path: string; dropdown?: { name: string; path: string }[] }[];
  scrolled: boolean;
  dropdownRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  headerRef: React.RefObject<HTMLElement>;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useApp();
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRefs = useRef<Record<string, HTMLElement | null>>({});
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  // إنشاء قائمة الخدمات ديناميكيًا من servicesData
  const servicesLinks = Object.values(servicesData).map((service) => ({
    name: service.title[language],
    path: `/services/${service.id}`,
  }));

  // تحديث navLinks لتضمين الخدمات ديناميكيًا
  const navLinks = {
    ar: [
      { name: "الرئيسية", path: "/" },
      {
        name: "خدماتنا",
        path: "/services",
        dropdown: [
          ...servicesLinks, // إضافة جميع الخدمات ديناميكيًا
          { name: "جميع الخدمات", path: "/services" },
        ],
      },
       { name: "كورس الكومبوزيت", path: "/courses" },
      { name: "معرض الأعمال", path: "/portfolio" },
      { name: "عن العيادة", path: "/about" },
      { name: "المدونة", path: "/blog" },
      { name: "تواصل معنا", path: "/contact" },
    ],
    en: [
      { name: "Home", path: "/" },
      {
        name: "Services",
        path: "/services",
        dropdown: [
          ...servicesLinks, // إضافة جميع الخدمات ديناميكيًا
          { name: "All Services", path: "/services" },
        ],
      },
      { name: "Composite Course", path: "/courses" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "About", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ],
  };

  const currentNavLinks = navLinks[language];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowTopHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowTopHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !Object.values(dropdownRefs.current).some(ref => ref?.contains(event.target as Node))) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const isActive = (path: string) => window.location.pathname === path;

  const toggleDropdown = (path: string | null) => {
    setActiveDropdown(activeDropdown === path ? null : path);
  };

  return (
    <HeaderContext.Provider
      value={{
        showTopHeader,
        isOpen,
        setIsOpen,
        activeDropdown,
        toggleDropdown,
        isActive,
        currentNavLinks,
        scrolled,
        dropdownRefs,
        headerRef,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) throw new Error('useHeader must be used within a HeaderProvider');
  return context;
};