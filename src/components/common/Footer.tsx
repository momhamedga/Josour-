'use client';

import Image from 'next/image';
import { siteContent, Language } from '@/config/josour-content';
import { Mail, MapPin, PhoneCall } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = siteContent[lang];
  const isRtl = lang === 'ar';

  return (
    <footer 
      className="bg-gradient-to-b from-brand-navy-dark to-[#040912] border-t border-brand-gold/20 pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden font-cairo"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 🔮 لمسة إشعاع ذهبي سينمائي ناعم خلف اللوجو لعمق بصري ثلاثي الأبعاد */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10 space-y-8 w-full">
        
        {/* 👑 أولاً: حاوية اللوجو الدائرية الإبداعية بخلفية الـ OKLCH */}
        <div className="flex flex-col items-center justify-center animate-fadeIn w-full">
          
          {/* الإطار الدائري الإبداعي المطور بحلقات متباينة وظلال ذهبية */}
          <div 
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center relative p-4 shadow-xl border border-brand-gold/30 transition-transform duration-500 hover:scale-105"
            style={{ backgroundColor: 'oklch(0.98 0.01 240)' }} // 👈 حقن الخلفية الصافية المطلوبة بالملي
          >
            {/* حلقة داخلية مذهبة ناعمة تبرز اللوجو */}
            <div className="absolute inset-1.5 rounded-full border border-brand-navy-dark/5 pointer-events-none" />
            
            <div className="relative w-full h-full">
              <Image
                src="/images/logo.webp"
                alt="Josour International Logo"
                fill
                priority
                sizes="(max-width: 640px) 120px, 140px"
                className="object-contain p-1.5"
              />
            </div>
          </div>

          <p className="text-gray-400 text-[11px] sm:text-xs max-w-md mx-auto mt-5 leading-relaxed font-medium px-4">
            {t.footer.desc}
          </p>
        </div>

        {/* 🗺️ ثانياً: شريط قنوات التواصل السريع الملموم والمستقر */}
        <div className="w-full max-w-2xl border-t border-b border-white/5 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-[11px] sm:text-xs font-bold text-gray-400">
          
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-brand-gold shrink-0" />
            <span className="tracking-wide">{isRtl ? 'الإمارات - دبي / أبوظبي' : 'UAE - Dubai / Abu Dhabi'}</span>
          </div>

          <div className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />

          <div className="flex items-center gap-2">
            <PhoneCall size={14} className="text-brand-gold shrink-0" />
            <span dir="ltr" className="font-mono select-all">+971 4 222 3333</span>
          </div>

          <div className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />

          <div className="flex items-center gap-2">
            <Mail size={14} className="text-brand-gold shrink-0" />
            <span className="select-all tracking-wide text-gray-300">support@josour-international.com</span>
          </div>

        </div>

        {/* 🌐 ثالثاً: كبسولات السوشيال ميديا الرقمية بأيقونات SVG أصلية ومحمية من أخطاء الـ Build */}
        <div className="flex items-center justify-center gap-5 text-gray-400 text-xs font-bold">
          
          {/* LinkedIn */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold text-gray-400 transition-colors flex items-center gap-1.5 group">
            <svg className="w-3.5 h-3.5 fill-current text-brand-gold transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span className="font-mono text-[10px] tracking-widest">LINKEDIN</span>
          </a>
          
          <span className="text-white/10 select-none">|</span>
          
          {/* X (Twitter) */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold text-gray-400 transition-colors flex items-center gap-1.5 group">
            <svg className="w-3.5 h-3.5 fill-current text-brand-gold transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="font-mono text-[10px] tracking-widest">X.COM</span>
          </a>
          
          <span className="text-white/10 select-none">|</span>
          
          {/* Instagram */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold text-gray-400 transition-colors flex items-center gap-1.5 group">
            <svg className="w-3.5 h-3.5 fill-current text-brand-gold transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="font-mono text-[10px] tracking-widest">INSTAGRAM</span>
          </a>

        </div>

      </div>

      {/* 🏁 خط النهاية والحقوق السفلية الناعمة */}
      <div className="max-w-4xl mx-auto border-t border-white/5 mt-8 pt-6 text-center relative z-10 w-full">
        <p className="text-[10px] sm:text-xs text-gray-500 tracking-wide">
          {t.footer.rights}
        </p>
      </div>
    </footer> 
  );
}