'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent, Language } from '@/config/josour-content';
import { Globe, User, Lock, Menu, X } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  isAdminLoggedIn?: boolean; // 👈 يتم تمريرها من السيرفر (Layout) بفحص cookie 'admin_session'
  isUserLoggedIn?: boolean;  // 👈 يتم تمريرها من السيرفر (Layout) بفحص cookie 'user_email'
}

export default function Header({ lang, isAdminLoggedIn = false, isUserLoggedIn = false }: HeaderProps) {
  const t = siteContent[lang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRtl = lang === 'ar';

  // نصوص ديناميكية مبدعة مخصصة للحالات الذكية
  const dynamicTexts = {
    ar: {
      clientDashboard: 'بوابتك الذكية',
      adminDashboard: 'لوحة المستشار',
    },
    en: {
      clientDashboard: 'Your Portal',
      adminDashboard: 'Consultant Desk',
    }
  }[lang];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-brand-navy-dark/95 border-b border-white/[0.05] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-22 flex items-center justify-between">
        
 {/* 🏢 الشعار الفخم الموزون بملفك المحلي logo.webp - تم تحرير الوضوح بنسبة 100% */}
<Link href={`/${lang}`} className="flex items-center gap-3 group cursor-pointer relative z-50">
  <div className="relative w-12 h-12 rounded-xl border-2 border-brand-gold/60 p-2 bg-white shadow-lg shadow-brand-gold/15 transition-all duration-500 group-hover:scale-105 group-hover:border-brand-gold group-hover:shadow-brand-gold/30 shrink-0 flex items-center justify-center overflow-hidden">
    
    {/* تأثير ضوئي داخلي ناعم جداً لعمق الأبيض */}
    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-50" />
    
    <Image 
      src="/images/logo.webp" 
      alt="Josour Logo" 
      width={40} 
      height={40} 
      priority
      className="object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
    />
    
    {/* توهج ذهبي فائق الوضوح خلف الشعار يظهر عند الـ Hover */}
    <div className="absolute inset-0 bg-brand-gold/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </div>
  <div className="flex flex-col">
    <span className="font-din font-black text-base sm:text-lg tracking-wider text-white block group-hover:text-brand-gold transition-colors duration-300 leading-none mb-1">
      {lang === 'ar' ? 'جـسـور' : 'JOSOUR'} <span className="text-brand-gold">{lang === 'ar' ? 'الدولية' : 'INTERNATIONAL'}</span>
    </span>
    <span className="text-[9px] text-gray-400 block font-cairo tracking-widest font-bold uppercase leading-none">
      {lang === 'ar' ? 'للاستشارات الإدارية' : 'Management Consultancy'}
    </span>
  </div>
</Link>

        {/* 🗺️ القائمة الرئيسية المحدثة بمسارات 2026 لشاشات الكمبيوتر */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          <Link href={`/${lang}/about`} className="text-xs lg:text-sm font-cairo font-semibold text-white/80 hover:text-brand-gold transition-colors duration-300">{t.nav.about}</Link>
          <Link href={`/${lang}/services`} className="text-xs lg:text-sm font-cairo font-semibold text-white/80 hover:text-brand-gold transition-colors duration-300">{t.nav.services}</Link>
          <Link href={`/${lang}/portal`} className="text-xs lg:text-sm font-cairo font-semibold text-white/80 hover:text-brand-gold transition-colors duration-300">{t.nav.track}</Link>
          <Link href={`/${lang}/services/vipiso`} className="text-xs lg:text-sm font-cairo font-semibold text-white/80 hover:text-brand-gold transition-colors duration-300">{t.nav.iso}</Link>
          <Link href={`/${lang}/#contact`} className="text-xs lg:text-sm font-cairo font-semibold text-white/80 hover:text-brand-gold transition-colors duration-300">{t.nav.contact}</Link>
        </nav>

        {/* 🛠️ أزرار التحكم والذكاء البرمجي لشاشات الكمبيوتر */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* 🌐 زر تحويل اللغات الأنيق */}
          <Link 
            href={lang === 'ar' ? '/en' : '/ar'} 
            className="flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-brand-gold border border-white/10 hover:border-brand-gold/40 px-3.5 py-2.5 rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-xs"
          >
            <Globe size={13} className="text-brand-gold" />
            <span className="font-din tracking-wide">{lang === 'ar' ? 'EN' : 'العربية'}</span>
          </Link>

          {/* 🔐 زرار الآدمن المحمي */}
          {!isUserLoggedIn && (
            <Link 
              href={`/${lang}/admin`}
              className={`flex items-center gap-1.5 text-xs font-black rounded-xl transition-all duration-300 border px-3.5 py-2.5 ${
                isAdminLoggedIn 
                  ? 'bg-brand-gold border-brand-gold text-brand-navy-dark shadow-md animate-pulse' 
                  : 'text-brand-gold border-brand-gold/20 hover:border-brand-gold/50 bg-brand-navy-dark/40'
              }`}
              title={lang === 'ar' ? 'لوحة تحكم المستشار الإداري' : 'Admin Dashboard'}
            >
              <Lock size={12} className={isAdminLoggedIn ? 'text-brand-navy-dark' : 'text-brand-gold'} />
              <span>{isAdminLoggedIn ? dynamicTexts.adminDashboard : (lang === 'ar' ? 'الإدارة' : 'Admin')}</span>
            </Link>
          )}

          {/* 👤 زر العميل الرئيسي */}
          {!isAdminLoggedIn && (
            <Link 
              href={`/${lang}/portal`}
              className="relative overflow-hidden flex items-center gap-1.5 bg-gradient-to-r from-brand-gold to-[#d4af37] text-brand-navy-dark font-cairo text-xs font-black px-5 py-2.5 rounded-xl shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <User size={13} />
              <span>{isUserLoggedIn ? dynamicTexts.clientDashboard : t.nav.cta}</span>
              {isUserLoggedIn && <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />}
            </Link>
          )}

        </div>

        {/* 📱 زر فتح قائمة الموبايل (Hamburger Button) */}
        <div className="flex md:hidden items-center gap-2 relative z-50">
          <Link href={lang === 'ar' ? '/en' : '/ar'} className="p-2 text-white/90 border border-white/5 bg-white/5 rounded-xl text-[11px] font-black font-din">
            {lang === 'ar' ? 'EN' : 'العربية'}
          </Link>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-white/90 hover:text-brand-gold transition-colors bg-white/5 border border-white/5 rounded-xl"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* 📱 القائمة المنزلقة للموبايل */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-22 bg-brand-navy-dark/95 backdrop-blur-xl border-b border-white/10 p-6 space-y-6 animate-fade-in z-40">
          <nav className="flex flex-col space-y-2 text-center">
            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${lang}/about`} className="text-sm font-cairo font-bold text-white/90 hover:text-brand-gold py-3 border-b border-white/[0.03]">{t.nav.about}</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${lang}/services`} className="text-sm font-cairo font-bold text-white/90 hover:text-brand-gold py-3 border-b border-white/[0.03]">{t.nav.services}</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${lang}/portal`} className="text-sm font-cairo font-bold text-white/90 hover:text-brand-gold py-3 border-b border-white/[0.03]">{t.nav.track}</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${lang}/services/vipiso`} className="text-sm font-cairo font-bold text-white/90 hover:text-brand-gold py-3 border-b border-white/[0.03]">{t.nav.iso}</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${lang}/#contact`} className="text-sm font-cairo font-bold text-white/90 hover:text-brand-gold py-3 border-b border-white/[0.03]">{t.nav.contact}</Link>
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            
            {/* زر الآدمن للموبايل */}
            {!isUserLoggedIn && (
              <Link 
                onClick={() => setIsMobileMenuOpen(false)}
                href={`/${lang}/admin`}
                className={`flex items-center justify-center gap-2 text-xs font-black py-4 rounded-xl border w-full transition-all ${
                  isAdminLoggedIn 
                    ? 'bg-brand-gold border-brand-gold text-brand-navy-dark' 
                    : 'text-brand-gold border-brand-gold/20 bg-white/5'
                }`}
              >
                <Lock size={14} />
                <span>{isAdminLoggedIn ? dynamicTexts.adminDashboard : (lang === 'ar' ? 'لوحة تحكم الإدارة' : 'Admin Area')}</span>
              </Link>
            )}

            {/* زر المستثمر للموبايل */}
            {!isAdminLoggedIn && (
              <Link 
                onClick={() => setIsMobileMenuOpen(false)}
                href={`/${lang}/portal`}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-[#d4af37] text-brand-navy-dark font-cairo text-xs font-black py-4 rounded-xl w-full shadow-md"
              >
                <User size={14} />
                <span>{isUserLoggedIn ? dynamicTexts.clientDashboard : t.nav.cta}</span>
              </Link>
            )}

          </div>
        </div>
      )}
    </header>
  );
}