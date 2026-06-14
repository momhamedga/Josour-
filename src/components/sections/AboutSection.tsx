'use client';

import { siteContent, Language } from '@/config/josour-content';
import { Target, Eye, Compass } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

export default function AboutSection({ lang }: AboutProps) {
  const t = siteContent[lang];
  const isRtl = lang === 'ar';

  // نصوص داعمة محلية معالجة ومطهرة لغوياً وبصرياً لعام 2026
  const aboutTexts = {
    ar: {
      tag: '🛡️ شريكك الاستراتيجي في الخليج',
      title: 'جسور لتمكين وتأسيس الاستثمارات الدولية',
      desc1: 'تأسست جسور إنترناشيونال لتقدم مفهوماً جديداً في عالم الاستشارات الإدارية وتأسيس الشركات في دولة الإمارات العربية المتحدة. نحن لا نقدم خدمات إجرائية فحسب، بل نبني جسوراً من الثقة والأمان البرمجي والقانوني لرجال الأعمال والمستثمرين حول العالم.',
      desc2: 'من خلال فريقنا من الخبراء القانونيين والمستشارين الإداريين، نضمن لك حماية تامة لـ خدماتك وتأشيراتك، وتدقيقاً مستمراً يطابق أعلى المعايير الحكومية لتوفير بيئة استثمارية خالية من العقبات.',
      valuesTitle: 'لماذا يختار رجال الأعمال "جسور"؟',
      values: [
        { icon: <Target size={20} />, title: 'رؤيتنا', desc: 'تمكين المستثمر الأجنبي والمحلي وتسهيل رحلته من الصفر.' },
        { icon: <Eye size={20} />, title: 'مهمتنا', desc: 'تقديم دعم قانوني وإداري لحظي يتجاوز تطلعات عملائنا.' },
        { icon: <Compass size={20} />, title: 'الامتثال الكامل', desc: 'تدقيق صارم يطابق كافة لوائح الـ SLA والجهات الحكومية.' }
      ]
    },
    en: {
      tag: '🛡️ Your Strategic Gulf Partner',
      title: 'Josour International for Corporate Setup & Growth',
      desc1: 'Josour International was established to introduce a modern standard in management consultancy and corporate structuring across the UAE. We do not just process documents; we build bridges of corporate trust and legal stability for global entrepreneurs.',
      desc2: 'With our premium team of legal consultants and government relations experts, we secure your operational workflows, corporate visas, and licensing pipelines with continuous tracking aligned with strict SLA goals.',
      valuesTitle: 'Why Global Entrepreneurs Choose Josour?',
      values: [
        { icon: <Target size={20} />, title: 'Our Vision', desc: 'To empower foreign & local entities, optimizing their corporate paths from day one.' },
        { icon: <Eye size={20} />, title: 'Our Mission', desc: 'Providing secure, compliant, and real-time advisory that bypasses bureaucratic delays.' },
        { icon: <Compass size={20} />, title: 'Total Compliance', desc: 'Strict regulatory alignments keeping your legal profiles flawless and audit-ready.' }
      ]
    }
  }[lang];

  return (
    <section 
      id="about" 
      className="py-20 md:py-28 bg-brand-light-bg relative overflow-hidden px-4 sm:px-6 border-t border-brand-gold/10 font-cairo"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">
        
        {/* 📑 شق النصوص التعريفية: تمركز مطلق على الموبايل ومحاذاة جانبية أنيقة على الشاشات الكبيرة */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-start space-y-6 w-full">
          
          <span className="text-[11px] md:text-xs font-bold text-brand-gold tracking-wide bg-brand-navy-dark px-4 py-2 rounded-lg inline-block shadow-sm text-center">
            {aboutTexts.tag}
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-brand-navy-dark leading-[1.3] lg:leading-[1.2] tracking-tight text-center lg:text-start w-full px-2">
            {aboutTexts.title}
          </h2>
          
          <div className="w-20 h-1 bg-brand-gold rounded-full mx-auto lg:mx-0" />
          
          <p className="text-brand-navy-dark/75 text-xs sm:text-sm md:text-base leading-relaxed font-medium pt-2 text-center lg:text-start px-4 lg:px-0">
            {aboutTexts.desc1}
          </p>
          
          <p className="text-brand-navy-dark/60 text-[11px] sm:text-xs md:text-sm leading-relaxed text-center lg:text-start px-4 lg:px-0">
            {aboutTexts.desc2}
          </p>
        </div>

        {/* 🏛️ شق كروت الرؤية والقيم: تصميم مصفوفي متزن يتمركز بالكامل على الموبايل */}
        <div className="lg:col-span-5 bg-brand-light-bg border border-brand-gold/10 rounded-[2rem] p-5 sm:p-6 md:p-10 space-y-6 shadow-xs w-full max-w-md lg:max-w-none mx-auto text-center lg:text-start flex flex-col items-center lg:items-start">
          
          <h4 className="w-full text-xs sm:text-sm font-black text-brand-navy-dark tracking-wide border-b border-brand-navy-dark/5 pb-4 text-center lg:text-start">
            {aboutTexts.valuesTitle}
          </h4>
          
          <div className="space-y-4 w-full flex flex-col items-center">
            {aboutTexts.values.map((val, idx) => (
              <div 
                key={idx} 
                className="group w-full flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-start gap-4 p-5 bg-white border border-brand-navy-dark/[0.03] rounded-2xl md:hover:border-brand-gold/30 md:hover:shadow-md md:hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                {/* صندوق الأيقونة المتمركز */}
                <div className="w-11 h-11 rounded-xl bg-brand-navy-dark text-brand-gold flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 md:group-hover:bg-brand-gold md:group-hover:text-brand-navy-dark md:group-hover:scale-105 mx-auto sm:mx-0">
                  {val.icon}
                </div>
                
                {/* حاوية النصوص المتمركزة بدقة على الموبايل وجانبية على الكمبيوتر */}
                <div className="space-y-1 flex-1 min-w-0 w-full text-center sm:text-start">
                  <h5 className="font-black text-xs sm:text-sm md:text-base text-brand-navy-dark transition-colors duration-300 md:group-hover:text-brand-gold text-center sm:text-start">
                    {val.title}
                  </h5>
                  <p className="text-[11px] sm:text-xs md:text-sm text-brand-navy-dark/60 leading-relaxed font-medium text-center sm:text-start px-2 sm:px-0">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}