"use client";

import Link from "next/link";
import { siteContent, Language } from "@/config/josour-content";
import {
  Building2,
  UserCheck,
  Crown,
  Home,
  Layers,
  Award,
  BarChart3,
  CheckCircle2,
  Laptop,
} from "lucide-react";

interface ServicesProps {
  lang: Language;
}

// دالة مساعدة نقية لربط الخدمات بالأيقونات دون حقن كلاسات ألوان تتعارض مع حركات الـ Hover
const getIcon = (id: string) => {
  switch (id) {
    case "gov":
      return <Building2 size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
    case "visa":
      return <UserCheck size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
    case "vip":
      return <Crown size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
    case "realestate":
      return <Home size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
    case "track":
      return <Layers size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
    case "iso":
      return <Award size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
    case "icv":
      return <BarChart3 size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
    case "vip_web":
      return <Laptop size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
    default:
      return <Building2 size={20} className="transition-all duration-300 md:w-[24px] md:h-[24px]" />;
  }
};

export default function Services({ lang }: ServicesProps) {
  const t = siteContent[lang].servicesSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-brand-light-bg relative overflow-hidden px-4 sm:px-6 border-t border-brand-gold/10 font-cairo"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 📐 لمسة توهج خلفية محيطية ناعمة معتمدة على OKLCH لثيم لعام 2026 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] md:max-w-[800px] h-[600px] md:h-[800px] bg-brand-gold/5 rounded-full blur-[140px] md:blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* 🏛️ رأس القسم: عنوان استشاري فخم مفرود ومتمركز تماماً في منتصف الشاشة */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-brand-navy-dark mb-4 tracking-tight px-2 text-center">
            {t.title}
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold mb-5 md:mb-6 rounded-full mx-auto" />
          <p className="text-brand-navy-dark/75 text-xs sm:text-sm md:text-lg font-medium leading-relaxed px-4 text-center">
            {t.subtitle}
          </p>
        </div>

        {/* 💎 مصفوفة شبكة الخدمات (Grid System) بنظام الحجم المرن الملموم للموبيلات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch w-full">
          {t.items.map((service) => {
            // بناء مسار التوجيه الدولي الذكي ليدعم لغات النطاقات والمسارات الداخلية
            const targetHref = service.href.startsWith("/")
              ? `/${lang}${service.href}`
              : service.href;

            return (
              <Link
                key={service.id}
                href={targetHref || "#contact"}
                target="_self"
                className="group p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-white border border-brand-gold/15 shadow-2xs flex flex-col justify-between relative overflow-hidden transition-all duration-500 md:hover:shadow-xl md:hover:border-brand-gold/40 md:hover:-translate-y-1 h-full pointer-events-auto min-h-[290px] sm:min-h-[340px] md:min-h-[360px]"
              >
                {/* إشعاع سائل تفاعلي يظهر خفياً خلف محتوى الكارت عند تحويم ماوس الكمبيوتر */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.015] via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* المحتوى العلوي للبطاقة */}
                <div className="relative z-10 w-full flex flex-col items-start text-start flex-1">
                  
                  {/* رأس الكارت: صندوق أيقونة ملموم وعنوان متناسق لخط القاهرة */}
                  <div className="flex items-center justify-start gap-3 sm:gap-4 mb-4 sm:mb-6 w-full text-start">
                    {/* صندوق الأيقونة المتفاعل: حجم متجاوب ذكي جداً لـ 2026 */}
                    <div className="bg-brand-navy-dark text-brand-gold p-2.5 sm:p-3.5 rounded-xl shadow-xs transition-all duration-500 shrink-0 md:group-hover:bg-brand-gold md:group-hover:text-brand-navy-dark md:group-hover:scale-105">
                      {getIcon(service.id)}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-brand-navy-dark transition-colors duration-300 md:group-hover:text-brand-gold leading-tight text-start">
                      {service.title}
                    </h3>
                  </div>

                  {/* وصف الخدمة التفصيلي النظيف والمريح للقراءة بحجم ملموم على الجوال */}
                  <p className="text-brand-navy-dark/70 text-[11px] sm:text-xs md:text-sm leading-relaxed font-medium mb-4 sm:mb-6 w-full text-start">
                    {service.desc}
                  </p>
                </div>

                {/* 🛠️ المحتوى السفلي: المميزات الفرعية ناعمة وصغيرة ومحاذية بدقة متناهية */}
                <div className="relative z-10 border-t border-brand-navy-dark/[0.04] pt-4 sm:pt-5 mt-auto w-full">
                  <ul className="grid grid-cols-2 gap-2 sm:gap-3 w-full text-start">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-start gap-1.5 text-[10px] sm:text-xs font-bold text-brand-navy-dark/75 min-w-0 text-start"
                      >
                        <CheckCircle2
                          size={11}
                          className="text-brand-gold shrink-0 sm:w-[13px] sm:h-[13px]"
                        />
                        <span className="truncate w-full block select-none text-start">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}