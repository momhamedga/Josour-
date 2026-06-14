'use client';

import Link from 'next/link';
import { siteContent, Language } from '@/config/josour-content';
import { ArrowLeft, ArrowRight, Briefcase, FileText } from 'lucide-react';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = siteContent[lang];
  const isRtl = lang === 'ar';
  
  // 📸 صورة فخمة وثابتة كخلفية بديلة (Poster) لحماية تباين الحروف ومنع أي سواد مفاجئ
  const posterBackupUrl = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920&auto=format&fit=crop";

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-28 px-4 sm:px-6 text-white bg-brand-navy-dark select-none" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 🎬 حاوية الميديا المزدوجة المحقونة بملف الـ webm الخاص بك مباشرة من الـ public */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-brand-navy-dark bg-cover bg-center"
        style={{ backgroundImage: `url(${posterBackupUrl})` }}
      >
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          preload="auto"
          poster={posterBackupUrl}
          className="w-full h-full object-cover scale-105 animate-[subtleZoom_30s_ease-out_infinite]"
        >
          <source src="/videos/hero-bg.webm" type="video/webm" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* 🎭 طبقة التعتيم والمزج السيادية (Overlay) لضمان تباين ونقاء خط القاهرة الملكي */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark/95 via-brand-navy-dark/85 to-brand-navy-dark/95 backdrop-blur-[1px]" />
      </div>

      {/* 🔮 المؤثرات الضوئية المحيطية بمعيار OKLCH للعمق اللوني لثيم 2026 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-brand-gold/10 rounded-full blur-[160px] pointer-events-none z-1" />
      
      {/* 📐 نقش الشبكة الهندسي لمفهوم الجسور والاستثمار المستدام */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] z-1" />

      {/* 🎯 الحاوية المركزية الصارمة - إجبار التمركز المطلق في المنتصف تماماً لجميع الشاشات */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10 font-cairo">
        
        {/* 🏅 البادج العلوي المطور بالخلفية البلورية الشفافة المستدامة */}
        <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-brand-gold/30 bg-white/5 backdrop-blur-md text-brand-gold text-[11px] sm:text-xs font-bold mb-6 sm:mb-8 shadow-lg tracking-wide max-w-[90vw] mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse shrink-0" />
          <span className="truncate">{t.hero.badge}</span>
        </div>

        {/* 👑 العنوان الاستشاري الضخم - تأمين النص في السنتر بالملي وإلغاء كود الكليب المتعارض مع المحاذاة */}
        <h1 className="w-full text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.3] sm:leading-[1.2] md:leading-tight text-white mb-6 tracking-tight drop-shadow-2xl px-2 text-center block">
          {t.hero.title}
        </h1>

        {/* 📄 النص الفرعي الأنيق بتباين ناصع وتمركز هندسي مطلق بدون ترحيل لغوي */}
        <p className="w-full text-white/85 text-xs sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed sm:leading-loose font-medium px-4 text-center block">
          {t.hero.subtitle}
        </p>

        {/* ⚡ أزرار الـ CTA المتفاعلة: تتمركز وتصطف بدقة متناهية بالمنتصف */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0 max-w-md sm:max-w-none mx-auto">
          
          <Link 
            href={`/${lang}/services`}
            target="_self"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-gold text-brand-navy-dark font-black px-8 py-4 rounded-xl shadow-xl shadow-brand-gold/5 transition-all duration-300 md:hover:bg-white md:hover:text-brand-navy-dark md:hover:-translate-y-0.5 active:scale-[0.98] text-sm cursor-pointer text-center"
          >
            <Briefcase size={16} className="text-brand-navy-dark shrink-0" />
            <span className="leading-none">{t.hero.buttons.request}</span>
            {isRtl ? (
              <ArrowLeft size={14} className="transition-transform md:group-hover:-translate-x-0.5 shrink-0" />
            ) : (
              <ArrowRight size={14} className="transition-transform md:group-hover:translate-x-0.5 shrink-0" />
            )}
          </Link>

          <Link 
            href={`/${lang}?consult=open`}
            scroll={false}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/5 backdrop-blur-md text-white border border-white/10 font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 md:hover:border-brand-gold md:hover:bg-white/10 md:hover:-translate-y-0.5 active:scale-[0.98] text-sm cursor-pointer text-center"
          >
            <FileText size={16} className="text-brand-gold shrink-0" />
            <span className="leading-none">{t.hero.buttons.consult}</span>
          </Link>

        </div>

      </div>
    </section>
  );
}