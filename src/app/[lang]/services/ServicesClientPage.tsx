"use client";

import { useState } from 'react';
import { siteContent, Language } from '@/config/josour-content';
import { 
  Building2, Smartphone, FileCheck, Briefcase, 
  ArrowLeft, ArrowRight, ShieldCheck, Sparkles, 
  Clock, Laptop
} from 'lucide-react';
import Link from 'next/link';

interface ServicesClientPageProps {
  // 🌟 استقبال كائن عادي ومفكوك بالكامل لمنع تعارض الخادم والعميل
  params: { lang: Language };
}

export default function ServicesClientPage({ params }: ServicesClientPageProps) {
  const lang = params.lang;
  const isRtl = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'all' | 'corporate' | 'visas' | 'iso' | 'digital'>('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'mainland' | 'freezone' | null>(null);

  const pageTexts = {
    ar: {
      badge: "منظومة الجيل القادم للخدمات الاستشارية",
      title: "صمم مسارك الاستثماري في الإمارات",
      subtitle: "استخدم المهندس الذكي لتحديد نوع الخدمة ونطاق التأسيس، وشاهد هيكلة رخصتك وإقامتك تتشكل في ثوانٍ.",
      filterTitle: "1. حدد التوجه الاستراتيجي",
      configTitle: "2. نطاق وحجم العمل",
      blueprintTitle: "المخطط الاستثماري الفوري",
      mainland: "داخل الدولة (Mainland)",
      freezone: "منطقة حرة (Freezone)",
      timeEst: "الوقت المتوقع لإنجاز المعاملة:",
      cta: "اعتماد المخطط وبدء التنفيذ فوراً",
      backBtn: "العودة للمركز الرئيسي"
    },
    en: {
      badge: "Next-Gen Advisory Architecture",
      title: "Architect Your UAE Investment Path",
      subtitle: "Use our interactive configurator to specify your legal form and scope, and watch your corporate blueprint generate instantly.",
      filterTitle: "1. Select Strategic Direction",
      configTitle: "2. Operation & Scale",
      blueprintTitle: "Instant Corporate Blueprint",
      mainland: "Mainland (Onshore)",
      freezone: "Freezone (Offshore)",
      timeEst: "Estimated Completion Time:",
      cta: "Approve Blueprint & Execute",
      backBtn: "Return to Command Center"
    }
  }[lang];

// 📐 مصفوفة التخطيط الاستراتيجي المعجمية الفائقة لعام 2026
  const getDynamicBlueprint = () => {
    // تحديد مفتاح الحالة التشغيلية بناءً على التبويب والنطاق القانوني لضمان دقة الاستهداف
    const registryKey = (activeTab === 'corporate' && selectedJurisdiction)
      ? `corporate_${selectedJurisdiction}`
      : activeTab;

    const blueprintRegistry: Record<string, {
      title: string;
      time: string;
      steps: string[];
      link: string;
      isScroll?: boolean; // علامة حوكمة للتحكم في الانزلاق الداخلي بدلاً من الانتقال الخارجي
    }> = {
      // 🏢 حزمة التأسيس - داخل الدولة (Mainland) -> البوابة الرقمية
      corporate_mainland: {
        title: isRtl ? "تأسيس شركة داخل الدولة (Mainland)" : "Onshore Mainland Enterprise Setup",
        time: isRtl ? "4 - 5 أيام عمل" : "4 - 5 Working Days",
        steps: isRtl 
          ? ["الموافقة المبدئية وحجز الاسم التجاري", "توثيق عقد التأسيس لدى الكاتب العدل", "إصدار الرخصة التجارية وعضوية الغرفة"]
          : ["Initial Approval & Trade Name Reservation", "MOA Notarization & Legal Authentication", "Commercial License & Chamber Membership Issuance"],
        link: `/${lang}/portal`
      },
      // 🏛️ حزمة التأسيس - مناطق حرة (Freezone) -> محادثة مشفرة مخصصة
      corporate_freezone: {
        title: isRtl ? "تأسيس شركة منطقة حرة متكاملة" : "Complete Freezone Setup",
        time: isRtl ? "2 - 3 أيام عمل" : "2 - 3 Working Days",
        steps: isRtl 
          ? ["حجز الاسم التجاري والموافقة المبدئية", "صياغة عقد التأسيس الإلكتروني الفوري", "إصدار الرخصة وفتح الملفات التنفيذية"]
          : ["Trade Name & Initial Approval", "Electronic MOA Drafting", "License Issuance & File Setup"],
        link: `https://wa.me/971557983500?text=${encodeURIComponent(isRtl ? 'مرحباً جسور، أريد تأسيس شركة منطقة حرة متكاملة عبر المخطط الفوري' : 'Hello, I want to initiate a Freezone corporate establishment workflow.')}`
      },
      // 🎖️ حزمة الإقامات والتأشيرات والخدمات الحكومية -> البوابة الرقمية الموحدة Portal
      visas: {
        title: isRtl ? "منظومة الإقامات السيادية والخدمات الحكومية" : "Sovereign Residency & Gov Services System",
        time: isRtl ? "4 - 7 أيام عمل" : "4 - 7 Working Days",
        steps: isRtl 
          ? ["تحميل المستندات عبر بوابة الموظف الموحدة", "الفحص الطبي وبصمة الهوية الإماراتية", "إصدار وتثبيت الإقامة الذهبية أو الاستثمارية"]
          : ["Document Upload via Unified Portal", "Medical Test & Emirates ID Biometrics", "Sovereign Visa Stamping & Activation"],
        link: `/${lang}/portal`
      },
      // 🛡️ حزمة التدقيق والامتثال الدولي ISO -> صفحة الـ VIP ISO الحية
      iso: {
        title: isRtl ? "تأهيل شهادات الأيزو والحوكمة الدولية" : "International ISO Certification Matrix",
        time: isRtl ? "10 - 15 يوم عمل" : "10 - 15 Working Days",
        steps: isRtl
          ? ["تحليل الفجوات والعمليات الحالية", "صياغة وتعديل وثائق الامتثال القياسية", "التدقيق النهائي وإصدار الشهادة المعمدة"]
          : ["Gap Analysis & Operations Review", "Compliance Documentation Drafting", "Final Audit & Certification"],
        link: `/${lang}/services/vipiso`
      },
      // ⚡ حزمة التطوير البرمجي وهندسة النظم للويب الفاخر -> صفحة الـ VIP WEB
      digital: {
        title: isRtl ? "هندسة المنصات والأصول الرقمية الفاخرة" : "VIP Custom Web Systems Architecture",
        time: isRtl ? "7 - 14 يوم عمل" : "7 - 14 Working Days",
        steps: isRtl
          ? ["تخطيط عمارة المعالجات وحوسبة الحافة", "تطوير الشيفرة البرمجية السيادية الخالية من الهدر", "البث الحي المتكامل للأصل الرقمي المستدام"]
          : ["Distributed Compute & Edge Architecture Planning", "Sovereign Waste-Free Clean Code Development", "Live Asset Activation & System Validation"],
        link: `/${lang}/services/vip-web`
      },
      // 📊 حزمة القيمة الوطنية المضافة ICV -> صفحة الـ ICV المخصصة
      icv: {
        title: isRtl ? "برنامج القيمة الوطنية المضافة (ICV)" : "In-Country Value (ICV) Optimization",
        time: isRtl ? "5 - 7 أيام عمل" : "5 - 7 Working Days",
        steps: isRtl 
          ? ["إعداد القوائم المالية المراجعة وتدقيقها", "تحليل وحساب نقاط مساهمة الموردين", "إصدار شهادة ICV المعتمدة من الهيئة"]
          : ["Audited Financial Statements Preparation", "Supplier Contribution Metrics Analysis", "Certified ICV Certificate Generation"],
        link: `/${lang}/services/icv`
      },
      // 👑 حزمة كبار المستثمرين VIP النخبوية -> صفحة الـ VIP المخصصة
      vip: {
        title: isRtl ? "باقة كبار العملاء والنخبة الاستثمارية VIP" : "Elite VIP Investor Concierge",
        time: isRtl ? "مستدام / أولوية قصوى" : "Continuous / Ultra Priority",
        steps: isRtl 
          ? ["تعيين مستشار سيادي خاص متاح على مدار الساعة", "تخليص كافة المعاملات عبر القنوات السريعة", "إدارة وتأمين المحفظة الاستثمارية الشاملة"]
          : ["Dedicated 24/7 Sovereign Advisor Assignment", "Fast-Track Transaction Execution via VIP Channels", "Comprehensive Investment Portfolio Security Management"],
        link: `/${lang}/services/vip`
      },
      // 🏡 حزمة العقارات الفاخرة والاستثمار العقاري -> صفحة الـ Real Estate
      realestate: {
        title: isRtl ? "الاستثمار وإدارة العقارات الفاخرة" : "Premium Real Estate Investment & Management",
        time: isRtl ? "حسب العقد" : "Contract Dependent",
        steps: isRtl 
          ? ["البحث والتحليل المالي للأصول المستهدفة", "التدقيق القانوني ونقل الملكية الآمن", "إدارة عوائد الأصول والتأجير الذكي"]
          : ["Target Asset Financial Analytics & Sourcing", "Legal Due Diligence & Secure Title Transfer", "Asset Yield Maximization & Smart Leasing Management"],
        link: `/${lang}/services/realestate`
      }
    };

    // استدعاء المخطط المستهدف أو العودة للمخطط الافتراضي الذكي لحماية الصفحة
    return blueprintRegistry[registryKey] || {
      title: isRtl ? "استشارة استثمارية سيادية شاملة" : "Sovereign Corporate Consultation",
      time: isRtl ? "حسب النطاق العملياتي" : "Dependent on Scope",
      steps: isRtl 
        ? ["تحليل النشاط التجاري المطلوب", "تحديد النطاق القانوني والتشغيلي الأنسب", "إعداد خطة وجدول زمني مخصص لعام 2026"]
        : ["Commercial Activity Analysis", "Legal & Operational Framework Determination", "Custom 2026 Timeline Preparation"],
      link: `https://wa.me/971557983500?text=${encodeURIComponent(isRtl ? 'مرحباً جسور، نود طلب استشارة استثمارية شاملة لتحديد مسار التأسيس' : 'Hello Josour, I would like to lock down a premium strategic consultation session.')}`
    };
  };

  const blueprint = getDynamicBlueprint();
  return (
    <div className="w-full bg-brand-light-bg min-h-screen text-brand-navy-dark font-cairo py-12 px-4 sm:px-6 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <nav className="max-w-7xl mx-auto mb-8 relative z-50">
        <Link 
          href={`/${lang}`} 
          className="inline-flex items-center gap-3 text-xs font-black px-6 py-3.5 rounded-xl bg-white border border-brand-navy-dark/10 shadow-xs transition-all duration-300 hover:border-brand-gold/40 hover:shadow-md active:translate-y-0.5 group cursor-pointer"
        >
          {isRtl ? <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />}
          <span>{pageTexts.backBtn}</span>
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-white text-brand-gold text-[10px] font-black tracking-wide uppercase mb-6 shadow-xs">
          <Sparkles size={12} className="animate-spin" />
          <span>{pageTexts.badge}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-brand-navy-dark tracking-tight mb-4">
          {pageTexts.title}
        </h1>
        <p className="text-brand-navy-dark/70 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
          {pageTexts.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start pb-16">
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-[2rem] border border-brand-navy-dark/[0.03] shadow-xs">
          <div>
            <label className="text-xs font-black text-brand-navy-dark/40 uppercase tracking-wider block mb-4">
              {pageTexts.filterTitle}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { id: 'all', label: isRtl ? "كل الخدمات" : "All Solutions", icon: <Briefcase size={16} /> },
                { id: 'corporate', label: isRtl ? "التأسيس" : "Setup", icon: <Building2 size={16} /> },
                { id: 'visas', label: isRtl ? "الإقامات" : "Visas", icon: <Smartphone size={16} /> },
                { id: 'iso', label: isRtl ? "الأيزو" : "ISO", icon: <FileCheck size={16} /> },
                { id: 'digital', label: isRtl ? "الويب الفاخر" : "VIP Web", icon: <Laptop size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border-2 transition-all cursor-pointer active:scale-98 text-center ${
                    activeTab === tab.id 
                      ? 'border-brand-gold bg-brand-gold/5 text-brand-navy-dark font-black shadow-xs' 
                      : 'border-brand-light-bg bg-brand-light-bg/40 text-brand-navy-dark/70 hover:border-brand-navy-dark/10 hover:bg-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-brand-gold text-brand-navy-dark' : 'bg-white text-brand-gold shadow-xs'}`}>
                    {tab.icon}
                  </div>
                  <span className="text-[11px] font-bold leading-none">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'corporate' && (
            <div className="animate-fade-in space-y-4 pt-4 border-t border-brand-light-bg">
              <label className="text-xs font-black text-brand-navy-dark/40 uppercase tracking-wider block">
                {pageTexts.configTitle}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div onClick={() => setSelectedJurisdiction('mainland')} className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedJurisdiction === 'mainland' ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-light-bg bg-brand-light-bg/20'}`}>
                  <span className="block text-sm font-black mb-1">{pageTexts.mainland}</span>
                  <span className="block text-[11px] opacity-60 leading-normal">تتيح لك التجارة والتعاقد مباشرة داخل السوق المحلي الإماراتي وبدون قيود.</span>
                </div>
                <div onClick={() => setSelectedJurisdiction('freezone')} className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedJurisdiction === 'freezone' ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-light-bg bg-brand-light-bg/20'}`}>
                  <span className="block text-sm font-black mb-1">{pageTexts.freezone}</span>
                  <span className="block text-[11px] opacity-60 leading-normal">إعفاء ضريبي 100%، ملكية أجنبية كاملة، ومثالية للشركات التقنية والدولية.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 sticky top-28 bg-brand-navy-dark text-white p-6 sm:p-8 rounded-[2.5rem] border border-white/[0.05] shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-black tracking-widest text-brand-gold uppercase">{pageTexts.blueprintTitle}</span>
              <ShieldCheck size={18} className="text-brand-gold" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-brand-gold transition-colors duration-300">
                {blueprint.title}
              </h3>
              <div className="flex items-center gap-2 mt-3 text-xs text-white/70 bg-white/5 px-3 py-2 rounded-lg inline-flex">
                <Clock size={13} className="text-brand-gold" />
                <span>{pageTexts.timeEst} <strong className="text-white font-bold">{blueprint.time}</strong></span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {blueprint.steps.map((stepText, index) => (
                <div key={index} className="flex items-start gap-3 text-xs sm:text-sm animate-fade-in">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold text-[10px] mt-0.5 shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-white/80 leading-relaxed font-medium">{stepText}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
      <Link 
  href={blueprint.link}
target={blueprint.link.startsWith("/") ? "_self" : "_blank"}
  className="w-full py-4 rounded-xl bg-brand-gold text-brand-navy-dark font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/5 transition-all md:hover:bg-white md:hover:text-brand-navy-dark active:scale-98 cursor-pointer"
>
  <span>{pageTexts.cta}</span>
  {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}