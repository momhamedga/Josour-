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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-6 text-white font-cairo bg-brand-navy-dark">
      
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
  {/* 🚀 المسار النسبي القياسي لعام 2026 بعد إصلاح الـ proxy واستثناء مجلد الفيديوهات */}
  <source src="/videos/hero-bg.webm" type="video/webm" />
  <source src="/videos/hero-bg.mp4" type="video/mp4" />
</video>
        
        {/* 🎭 طبقة التعتيم والمزج السيادية (Overlay) لضمان تباين ونقاء خط القاهرة الملكي */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark/90 via-brand-navy-dark/80 to-brand-navy-dark/95 backdrop-blur-[1px]" />
      </div>

      {/* 🔮 المؤثرات الضوئية المحيطية بمعيار OKLCH للعمق اللوني لثيم 2026 */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/15 rounded-full blur-[150px] pointer-events-none z-1" />
      
      {/* 📐 نقش الشبكة الهندسي لمفهوم الجسور والاستثمار المستدام */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-1" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* 🏅 البادج العلوي المطور بالخلفية البلورية الشفافة المستدامة */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/30 bg-white/5 backdrop-blur-md text-brand-gold text-xs font-semibold mb-8 shadow-lg tracking-wide">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          {t.hero.badge}
        </div>

        {/* 👑 العنوان الاستشاري الضخم المفرود بالكامل لتنفس الحروف */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.2] md:leading-tight bg-gradient-to-r from-white via-white to-brand-gold bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-xl">
          {t.hero.title}
        </h1>

        {/* 📄 النص الفرعي الأنيق بتباين ناصع ومحاذاة مرنة في اللغتين */}
        <p className="text-white/80 text-base md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          {t.hero.subtitle}
        </p>

        {/* ⚡ أزرار الـ CTA المتفاعلة لفتح نفس الصفحة بطلاقة وسلاسة للديسكتوب (_self) وبدون خنقة */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
          <Link 
            href={`/${lang}/services`}
            target="_self"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-gold text-brand-navy-dark font-black px-10 py-5 rounded-xl shadow-xl shadow-brand-gold/10 transition-all duration-300 md:hover:bg-white md:hover:text-brand-navy-dark md:hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Briefcase size={18} className="text-brand-navy-dark shrink-0" />
            <span className="leading-none">{t.hero.buttons.request}</span>
            {isRtl ? (
              <ArrowLeft size={16} className="transition-transform md:group-hover:-translate-x-1 shrink-0" />
            ) : (
              <ArrowRight size={16} className="transition-transform md:group-hover:translate-x-1 shrink-0" />
            )}
          </Link>
<Link 
  href={`/${lang}?consult=open`}
  scroll={false}
  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-md text-white border border-white/10 font-semibold px-10 py-5 rounded-xl shadow-lg transition-all duration-300 md:hover:border-brand-gold md:hover:bg-white/20 md:hover:-translate-y-0.5 active:scale-[0.98]"
>
  <FileText size={18} className="text-brand-gold shrink-0" />
  <span className="leading-none">{t.hero.buttons.consult}</span>
</Link>
        </div>

      </div>
    </section>
  );
}