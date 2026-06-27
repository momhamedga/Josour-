"use client";

import Link from "next/link";
import { siteContent, Language } from "@/config/josour-content";
import {
  Building2, UserCheck, Crown, Home, Layers,
  Award, BarChart3, Laptop, ArrowUpRight, Sparkles,
} from "lucide-react";

interface ServicesProps {
  lang: Language;
}

const getIcon = (id: string) => {
  const iconClasses = "transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 w-5 h-5 md:w-6 md:h-6";
  switch (id) {
    case "gov": return <Building2 className={iconClasses} />;
    case "visa": return <UserCheck className={iconClasses} />;
    case "vip": return <Crown className={iconClasses} />;
    case "realestate": return <Home className={iconClasses} />;
    case "track": return <Layers className={iconClasses} />;
    case "iso": return <Award className={iconClasses} />;
    case "icv": return <BarChart3 className={iconClasses} />;
    case "vip_web": return <Laptop className={iconClasses} />;
    default: return <Building2 className={iconClasses} />;
  }
};

export default function Services({ lang }: ServicesProps) {
  const t = siteContent[lang].servicesSection;
  const isRtl = lang === "ar";

  return (
    <section id="services" className="py-20 md:py-32 bg-[#040912] text-white relative overflow-hidden px-4 sm:px-6 border-t border-brand-gold/15 font-cairo" dir={isRtl ? "rtl" : "ltr"}>
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-navy-dark/40 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(oklch(0.76_0.11_85_/_0.04)_1px,transparent_1px)] [background-size:32px_32px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full space-y-16 md:space-y-24">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] md:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Sparkles size={12} className="animate-pulse" />
            <span>{isRtl ? "مستقبلك الاستثماري المضمون" : "Your Secure Investment Route"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight px-2 leading-[1.15] text-center">
            {isRtl ? "منظومة حلولنا" : "Our Advisory"}{" "}
            <span className="bg-gradient-to-r from-brand-gold via-[#fff] to-brand-gold bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)]">
              {t.title}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
          {t.items.map((service, index) => {
            // منطق التوجيه الذكي
            let targetHref = `https://wa.me/971557983500?text=${encodeURIComponent(isRtl ? `مرحباً، أود الاستفسار عن خدمة: ${service.title}` : `Hello, I want to inquire about: ${service.title}`)}`;
            let isInternalLink = false;

            const routeMap: Record<string, string> = {
              "gov": `/${lang}/portal`,
              "iso": `/${lang}/services/vipiso`,
              "vip_web": `/${lang}/services/vip-web`,
              "track": `/${lang}/#track`,
              "icv": `/${lang}/services/icv`,
              "vip": `/${lang}/services/vip`,
              "realestate": `/${lang}/services/realestate`
            };

            if (routeMap[service.id]) {
              targetHref = routeMap[service.id];
              isInternalLink = true;
            }

            return (
              <div key={service.id} className="group relative rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-6 flex flex-col justify-between transition-all duration-500 hover:border-brand-gold/50 overflow-hidden min-h-[360px]">
                <div className="relative z-10 w-full space-y-6">
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 text-brand-gold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy-dark">
                      {getIcon(service.id)}
                    </div>
                    <span className="text-4xl font-mono font-black text-white/5">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-brand-gold transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{service.desc}</p>
                </div>
                <div className="relative z-10 pt-6 mt-6 border-t border-white/5">
                  <Link href={targetHref} target={isInternalLink ? "_self" : "_blank"} rel={isInternalLink ? undefined : "noopener noreferrer"} className="w-full bg-white/[0.02] hover:bg-brand-gold hover:text-black text-white border border-white/10 py-3 rounded-xl text-center flex items-center justify-center gap-2 text-xs font-black transition-all">
                    <span>{isRtl ? "ابدأ الآن" : "Initiate Strategy"}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}