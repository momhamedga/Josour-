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
      return <Building2 size={24} className="transition-all duration-300" />;
    case "visa":
      return <UserCheck size={24} className="transition-all duration-300" />;
    case "vip":
      return <Crown size={24} className="transition-all duration-300" />;
    case "realestate":
      return <Home size={24} className="transition-all duration-300" />;
    case "track":
      return <Layers size={24} className="transition-all duration-300" />;
    case "iso":
      return <Award size={24} className="transition-all duration-300" />;
    case "icv":
      return <BarChart3 size={24} className="transition-all duration-300" />;
    case "vip_web":
      return <Laptop size={24} className="transition-all duration-300" />;
    default:
      return <Building2 size={24} className="transition-all duration-300" />;
  }
};

export default function Services({ lang }: ServicesProps) {
  const t = siteContent[lang].servicesSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="services"
      className="py-24 bg-brand-light-bg relative overflow-hidden px-6 border-t border-brand-gold/10 font-cairo"
    >
      {/* 📐 لمسة توهج خلفية محيطية ناعمة معتمدة على OKLCH لثيم لعام 2026 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 🏛️ رأس القسم: عنوان استشاري فخم مفرود بالكامل يتنفس بصرياً */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy-dark mb-4 tracking-tight">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold mb-6 rounded-full" />
          <p className="text-brand-navy-dark/70 text-base md:text-lg font-medium leading-relaxed px-4">
            {t.subtitle}
          </p>
        </div>

        {/* 💎 مصفوفة شبكة الخدمات (Grid System) المتزنة والموحدة الارتفاع كلياً */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
          {t.items.map((service) => {
            // بناء مسار التوجيه الدولي الذكي ليدعم لغات النطاقات والمسارات الداخلية
            const targetHref = service.href.startsWith("/")
              ? `/${lang}${service.href}`
              : service.href;

            return (
              <Link
                key={service.id}
                href={targetHref || "#contact"}
                target= "_self"
                rel="noopener noreferrer"
                className="group p-8 rounded-[2rem] bg-white border border-brand-gold/15 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-500 md:hover:shadow-2xl md:hover:border-brand-gold/40 md:hover:-translate-y-1.5 h-full pointer-events-auto min-h-[390px]"
              >
                {/* إشعاع سائل تفاعلي يظهر خفياً خلف محتوى الكارت عند تحويم ماوس الكمبيوتر */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.02] via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* المحتوى العلوي للبطاقة */}
                <div className="relative z-10 w-full flex flex-col items-start text-start flex-1">
                  {/* رأس الكارت: محاذاة أفقية مرنة وثابتة تمنع ركوب الأيقونة فوق الكلمات نهائياً */}
                  <div className="flex items-center justify-start gap-4 mb-6 w-full">
                    {/* صندوق الأيقونة المتفاعل: يتحول للذهب الملكي وتكبر الأيقونة بنعومة وسلاسة */}
                    <div className="bg-brand-navy-dark text-brand-gold p-3.5 rounded-xl shadow-md transition-all duration-500 shrink-0 md:group-hover:bg-brand-gold md:group-hover:text-brand-navy-dark md:group-hover:scale-105">
                      {getIcon(service.id)}
                    </div>
                    {/* 🛠️ الإصلاح الجوهري: تم تعديل قرائة المتغير لـ service.title ليعرض كل كارت اسم الخدمة الخاص به بدلاً من تكرار عنوان السيكشن */}
                    <h3 className="text-xl font-black text-brand-navy-dark transition-colors duration-300 md:group-hover:text-brand-gold leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* وصف الخدمة التفصيلي النظيف والمريح للقراءة */}
                  <p className="text-brand-navy-dark/70 text-sm leading-relaxed font-medium mb-6 w-full">
                    {service.desc}
                  </p>
                </div>

                {/* 🛠️ المحتوى السفلي: قائمة المميزات الصغرى مفرودة ومحمية ببادينج علوي يمنع الاختناق */}
                <div className="relative z-10 border-t border-brand-navy-dark/[0.04] pt-5 mt-auto w-full">
                  <ul className="grid grid-cols-2 gap-3 w-full">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-start gap-2 text-xs font-semibold text-brand-navy-dark/80 min-w-0"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-brand-gold shrink-0"
                        />
                        <span className="truncate w-full block select-none">
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
