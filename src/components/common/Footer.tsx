'use client';

import Image from 'next/image';
import { siteContent, Language } from '@/config/josour-content';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import Link from 'next/link'; // 👈 الالتزام الموحد بمكون التنقل السريع

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = siteContent[lang];
  const isRtl = lang === 'ar';

  // الهواتف الرسمية معروضة محلياً ونظيفاً دون شقلبة الرموز
  const displayPhone1 = "055 798 3500";
  const displayPhone2 = "054 477 0987";
  
  const linkPhone1 = "tel:+971557983500";
  const linkPhone2 = "tel:+971544770987";
  const emailCompany = "info.jusoorint@gmail.com";
  
  const facebookUrl = "https://facebook.com"; 
  const instagramUrl = "https://instagram.com"; 

  return (
    <footer 
      className="bg-gradient-to-b from-brand-navy-dark to-[#040912] border-t border-brand-gold/20 pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden font-cairo"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 🔮 إشعاع لؤلؤي ذهبي سينمائي ناعم لعمق بصري ثلاثي الأبعاد */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center relative z-10 space-y-8 w-full">
        
        {/* 👑 حاوية اللوجو الدائرية المحدثة الفخمة */}
        <div className="flex flex-col items-center justify-center animate-fadeIn w-full">
          <div 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center relative p-4 shadow-xl border border-brand-gold/30 transition-transform duration-500 hover:scale-105 bg-white"
          >
            <div className="absolute inset-1.5 rounded-full border border-brand-navy-dark/5 pointer-events-none" />
            <div className="relative w-full h-full">
              <Image
                src="/images/logo.webp"
                alt="Jusoor International Logo"
                fill
                priority
                sizes="(max-width: 640px) 100px, 120px"
                className="object-contain p-1"
              />
            </div>
          </div>

          <h2 className="text-brand-gold font-bold tracking-wide mt-5 text-sm sm:text-base uppercase font-din">
            {isRtl ? 'جسور انترناشيونال للاستشارات الإدارية' : 'jusoor international management consulting'}
          </h2>

          <p className="text-gray-400 text-[11px] sm:text-xs max-w-md mx-auto mt-3 leading-relaxed font-medium px-4">
            {t.footer.desc}
          </p>
        </div>
{/* 🗺️ قنوات التواصل السريعة والمحمية بالكامل من شقلبة الأرقام والمسافات */}
<div className="w-full border-t border-b border-white/5 py-6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 text-[11px] sm:text-xs font-bold text-gray-400">
  
  <div className="flex items-center gap-2">
    <MapPin size={14} className="text-brand-gold shrink-0" />
    <span className="tracking-wide rtl:text-right ltr:text-left">{isRtl ? 'دولة الإمارات العربية المتحدة - دبي' : 'UAE - Dubai'}</span>
  </div>

  <div className="hidden lg:block w-1 h-1 bg-white/20 rounded-full" />

  {/* خط الهاتف والواتساب الموحد الأول */}
  <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/5 transition-colors">
    <PhoneCall size={13} className="text-emerald-500 shrink-0" />
    <Link href={linkPhone1} className="font-mono text-gray-300 hover:text-brand-gold transition-colors" dir="ltr">{displayPhone1}</Link>
    <span className="text-white/20">|</span>
    {/* 🌟 الإصلاح هنا: استخدام كود الإمارات الدولي الصافي 971557983500 بدون أي مسافات أو رموز ليعمل لايف */}
    <Link href="https://wa.me/971557983500" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline text-[10px] tracking-wide font-cairo font-black">
      {isRtl ? 'واتساب' : 'WhatsApp'}
    </Link>
  </div>

  {/* خط الهاتف والواتساب الموحد الثاني */}
  <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/5 transition-colors">
    <PhoneCall size={13} className="text-emerald-500 shrink-0" />
    <Link href={linkPhone2} className="font-mono text-gray-300 hover:text-brand-gold transition-colors" dir="ltr">{displayPhone2}</Link>
    <span className="text-white/20">|</span>
    {/* 🌟 الإصلاح هنا أيضاً: استخدام رقم الواتساب الثاني الصافي 971544770987 */}
    <Link href="https://wa.me/971544770987" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline text-[10px] tracking-wide font-cairo font-black">
      {isRtl ? 'واتساب' : 'WhatsApp'}
    </Link>
  </div>

  <div className="hidden lg:block w-1 h-1 bg-white/20 rounded-full" />

  {/* البريد الموثق */}
  <div className="flex items-center gap-2">
    <Mail size={14} className="text-brand-gold shrink-0" />
    <Link href={`mailto:${emailCompany}`} className="tracking-wide text-gray-300 hover:text-brand-gold transition-colors select-all font-mono">{emailCompany}</Link>
  </div>

</div>

        {/* 🌐 منصات التواصل التفاعلية */}
        <div className="flex items-center justify-center gap-5 text-gray-400 text-xs font-bold">
          <Link href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold text-gray-400 transition-colors flex items-center gap-1.5 group">
            <svg className="w-4 h-4 fill-current text-brand-gold transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
            <span className="font-din text-[10px] tracking-widest">FACEBOOK</span>
          </Link>
          
          <span className="text-white/10 select-none">|</span>
          
          <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold text-gray-400 transition-colors flex items-center gap-1.5 group">
            <svg className="w-4 h-4 fill-current text-brand-gold transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="font-din text-[10px] tracking-widest">INSTAGRAM</span>
          </Link>
        </div>

      </div>

      <div className="max-w-5xl mx-auto border-t border-white/5 mt-8 pt-6 text-center relative z-10 w-full">
        <p className="text-[10px] sm:text-xs text-gray-500 tracking-wide">
          {t.footer.rights}
        </p>
      </div>
    </footer> 
  );
}