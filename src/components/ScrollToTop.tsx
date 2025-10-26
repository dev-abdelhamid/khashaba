import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext"; // للحصول على isLoading من السياق

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const { isLoading } = useApp();

  const lastPathRef = useRef(pathname);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // ما تعملش أي scroll لو الصفحة لسه في حالة تحميل
    if (isLoading) return;

    const scrollToHash = (hash: string) => {
      const element = document.querySelector(hash);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const isPathChanged = pathname !== lastPathRef.current;

    if (hash) {
      // scroll to hash after short delay to ensure element is rendered
      setTimeout(() => scrollToHash(hash), 100);
    } else if (isFirstLoad.current || isPathChanged) {
      scrollToTop();
      lastPathRef.current = pathname;
      isFirstLoad.current = false;
    }

  }, [pathname, hash, isLoading]);

  return null;
}
