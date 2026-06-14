'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // مراقبة السكرول لإظهار وإخفاء الزر ديناميكياً لراحة العين
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 p-3 sm:p-3.5 rounded-full bg-brand-navy-dark/80 backdrop-blur-md text-brand-gold border border-brand-gold/30 shadow-xl transition-all duration-300 hover:bg-brand-gold hover:text-brand-navy-dark hover:-translate-y-1 active:scale-95 cursor-pointer flex items-center justify-center group animate-fadeIn"
    >
      {/* سهم صاعد بحركة حركية ناعمة تنبض عند الوقوف عليه */}
      <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 sm:w-[18px] sm:h-[18px]" />
    </button>
  );
}