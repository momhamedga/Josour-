'use client';

import { siteContent, Language } from '@/config/josour-content';
import { Target, Eye, Compass, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

// دالة مساعدة لربط أيقونات لوكاسيد ديناميكياً مع مصفوفة القيم المستلمة من السيرفر
const getValueIcon = (index: number) => {
  const iconClasses = "w-5 h-5 transition-transform duration-300 md:group-hover:scale-110";
  switch (index) {
    case 0: return <Target className={iconClasses} />;
    case 1: return <Eye className={iconClasses} />;
    case 2: return <Compass className={iconClasses} />;
    default: return <Target className={iconClasses} />;
  }
};

export default function AboutSection({ lang }: AboutProps) {
  // جلب البيانات الأساسية من ملف الـ Config الموحد لضمان التوافق مع تعديلات الاسم الرسمي
  const content = siteContent[lang];
  const tAbout = content.aboutSection;
  const tModal = content.consultationModal;
  const isRtl = lang === 'ar';

  return (
    <section 
      id="about" 
      className="py-16 md:py-32 bg-brand-light-bg relative overflow-hidden px-4 sm:px-6 border-t border-brand-gold/15 font-cairo"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 🔮 توهج محيطي ناعم ولؤلؤي للغاية بلون ذهبي مطفأ مريح للعين (Light Theme Luxury Glow) */}
      <div className="absolute top-1/3 left-[-10%] w-[45vw] h-[45vw] bg-brand-gold/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-[-10%] w-[40vw] h-[40vw] bg-brand-navy-dark/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      {/* خطوط الشبكة الهندسية الفاخرة الهادئة والخفيفة لتعزيز الطابع العصري */}
      <div className="absolute inset-0 bg-[radial-gradient(oklch(0.18_0.04_250_/_0.015)_1px,transparent_1px)] [background-size:28px_28px] opacity-100 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">
        
        {/* 📑 الشق النصي التعريفي: محاذاة متناسقة وتكامل تام مع الهوية الرسمية المحدثة */}
        <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-start space-y-5 md:space-y-6 w-full">
          
          {/* شارة علوية زجاجية متفاعلة ناصعة */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-brand-gold/20 text-brand-gold text-[10px] md:text-xs font-black tracking-wide shadow-3xs animate-fadeIn">
            <Sparkles size={12} className="text-brand-gold animate-pulse" />
            <span>{tAbout.badge}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-brand-navy-dark leading-[1.25] tracking-tight text-center lg:text-start w-full px-1 capitalize">
            {isRtl ? "شريكك الاستراتيجي:" : "Your Strategic Ally:"}{" "}
            <span className="bg-gradient-to-r from-brand-navy-dark via-brand-navy-light to-brand-navy-dark bg-clip-text text-transparent">
              {tAbout.title}
            </span>
          </h2>
          
          <div className="w-16 md:w-24 h-[3px] bg-gradient-to-r from-brand-gold to-brand-gold-hover rounded-full mx-auto lg:mx-0" />
          
          <div className="space-y-4 pt-1">
            <p className="text-brand-navy-dark/85 text-xs sm:text-sm md:text-base leading-relaxed font-bold text-center lg:text-start px-2 lg:px-0">
              {tAbout.desc1}
            </p>
            <p className="text-brand-navy-dark/60 text-[11px] sm:text-xs md:text-sm leading-relaxed font-medium text-center lg:text-start px-2 lg:px-0">
              {tAbout.desc2}
            </p>
          </div>

          {/* كبسولات إحصائية رقمية متجاوبة تعزز المصداقية وسرعة الرد الاستشاري */}
          <div className="grid grid-cols-2 gap-4 w-full pt-4 max-w-sm sm:max-w-md mx-auto lg:mx-0">
            <div className="bg-white border border-brand-navy-dark/[0.04] p-3.5 rounded-2xl shadow-3xs text-center lg:text-start transition-all hover:shadow-xs">
              <span className="block text-xl md:text-2xl font-mono font-black text-brand-gold">100%</span>
              <span className="block text-[10px] text-brand-navy-dark/50 font-black mt-0.5">
                {isRtl ? "حماية وامتثال مؤسسي" : "Corporate Compliance"}
              </span>
            </div>
            <div className="bg-white border border-brand-navy-dark/[0.04] p-3.5 rounded-2xl shadow-3xs text-center lg:text-start transition-all hover:shadow-xs">
              <span className="block text-xl md:text-2xl font-mono font-black text-brand-gold">&lt; 15m</span>
              <span className="block text-[10px] text-brand-navy-dark/50 font-black mt-0.5">
                {isRtl ? "زمن الاستجابة الفورية" : "Response Framework"}
              </span>
            </div>
          </div>
        </div>

        {/* 🏛️ شق كروت الرؤية والقيم: تصميم بلوري منبثق متجاوب ومريح للعين على الموبايلات */}
        <div className="lg:col-span-6 w-full max-w-xl lg:max-w-none mx-auto text-center lg:text-start flex flex-col items-center lg:items-start space-y-6">
          
          <div className="w-full bg-gradient-to-br from-white to-white/[0.6] border border-brand-gold/15 rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-6 md:p-8 space-y-5 shadow-sm backdrop-blur-md">
            
            {/* عنوان حاوية الكروت المستنتج من لعنوان المسار الاستشاري الفخم */}
            <h4 className="w-full text-[11px] md:text-xs font-black text-brand-navy-dark/40 tracking-widest uppercase border-b border-brand-navy-dark/[0.04] pb-4 text-center lg:text-start flex items-center justify-center lg:justify-start gap-2 select-none">
              <ShieldCheck size={14} className="text-brand-gold shrink-0" />
              <span>{tModal.title}</span>
            </h4>
            
            <div className="space-y-4 w-full flex flex-col items-center">
              {/* خريطة مصفوفة الخطوات الاستشارية من الحاوية لضمان قراءة ديناميكية مرنة */}
              {tModal.steps.map((stepTitle, idx) => {
                // توليد تفاصيل ووصف فرعي متناسق ومطابق لمراحل التأسيس في الإمارات
                const fallbackDescsAr = [
                  "تحديد طبيعة الكيان التجاري واختيار حزمة الاستشارات الإدارية المثالية لنشاطكم.",
                  "إعداد قنوات التواصل الآمنة وتنسيق البيانات لربطكم بالمستشار المسؤول فورا.",
                  "مراجعة التدقيق المبدئي وبدء البث اللحظي للمعاملة عبر السحابة الذكية."
                ];
                const fallbackDescsEn = [
                  "Identifying your corporate layout and selecting the optimum consulting asset.",
                  "Setting up secure parameters to immediately bridge you with your consultant.",
                  "Reviewing pre-flight compliance data to launch your direct workflow registry."
                ];
                
                const stepDesc = isRtl ? fallbackDescsAr[idx] : fallbackDescsEn[idx];

                return (
                  <div 
                    key={idx} 
                    className="group w-full flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-start gap-4 p-4 md:p-5 bg-white/70 border border-brand-navy-dark/[0.03] rounded-2xl md:hover:border-brand-gold/40 md:hover:bg-white md:hover:shadow-md md:hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                  >
                    {/* وعاء الأيقونة المتفاعل المضيء */}
                    <div className="w-10 h-10 rounded-xl bg-brand-navy-dark text-brand-gold flex items-center justify-center shrink-0 shadow-3xs transition-all duration-300 md:group-hover:bg-brand-gold md:group-hover:text-brand-navy-dark md:group-hover:scale-105 mx-auto sm:mx-0">
                      {getValueIcon(idx)}
                    </div>
                    
                    {/* نصوص الكروت الاستشارية المتوافقة تماماً مع شاشات الجوال والـ Desktop */}
                    <div className="space-y-1 flex-1 min-w-0 w-full text-center sm:text-start">
                      <h5 className="font-black text-sm md:text-base text-brand-navy-dark transition-colors duration-300 md:group-hover:text-brand-gold text-center sm:text-start">
                        {stepTitle}
                      </h5>
                      <p className="text-[11px] sm:text-xs md:text-sm text-brand-navy-dark/60 leading-relaxed font-semibold text-center sm:text-start px-1 sm:px-0">
                        {stepDesc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}