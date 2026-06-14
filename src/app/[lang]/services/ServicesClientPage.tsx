'use client';

import { useState } from 'react';
import { siteContent, Language } from '@/config/josour-content';
import { 
  Building2, Smartphone, FileCheck, Briefcase, 
  ArrowLeft, ArrowRight, ShieldCheck, Sparkles, 
  Clock
} from 'lucide-react';
import Link from 'next/link';

interface ServicesClientPageProps {
  params: { lang: Language };
}

export default function ServicesClientPage({ params }: ServicesClientPageProps) {
  const { lang } = params;
  const isRtl = lang === 'ar';

  // 1. حالات التفاعل الذكي للمهندس الاستثماري
  const [activeTab, setActiveTab] = useState<'all' | 'corporate' | 'visas' | 'iso' | 'digital'>('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'mainland' | 'freezone' | null>(null);

  // نصوص الصفحة الموزونة والمحمية
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

  // 2. مصفوفة البناء الحي والمخطط التفاعلي (Live Blueprint)
  const getDynamicBlueprint = () => {
    if (activeTab === 'corporate' && selectedJurisdiction === 'freezone') {
      return {
        title: isRtl ? "تأسيس شركة منطقة حرة متكاملة" : "Complete Freezone Setup",
        time: isRtl ? "2 - 3 أيام عمل" : "2 - 3 Working Days",
        steps: isRtl 
          ? ["حجز الاسم التجاري والموافقة المبدئية", "صياغة عقد التأسيس الإلكتروني", "إصدار الرخصة وفتح الملفات"]
          : ["Trade Name & Initial Approval", "Electronic MOA Drafting", "License Issuance & File Setup"]
      };
    }
    if (activeTab === 'visas') {
      return {
        title: isRtl ? "منظومة إقامة المستثمر الملكية" : "Elite Investor Visa System",
        time: isRtl ? "4 - 7 أيام عمل" : "4 - 7 Working Days",
        steps: isRtl 
          ? ["الفحص الطبي وبصمة الهوية الإماراتية", "إصدار الفيزا الإلكترونية الاستثمارية", "تثبيت الإقامة السيادية"]
          : ["Medical Test & Emirates ID Biometrics", "Electronic Investor Visa", "Sovereign Residency Stamping"]
      };
    }
    return {
      title: isRtl ? "استشارة استثمارية عامة ومفتوحة" : "Open Corporate Consultation",
      time: isRtl ? "حسب نوع المعاملة" : "Dependent on Scope",
      steps: isRtl 
        ? ["تحليل النشاط التجاري المطلوب", "تحديد النطاق القانوني الأنسب", "إعداد خطة وجدول زمني مخصص"]
        : ["Commercial Activity Analysis", "Legal Framework Determination", "Custom Timeline Preparation"]
    };
  };

  const blueprint = getDynamicBlueprint();

  return (
    <div className="w-full bg-brand-light-bg min-h-screen text-brand-navy-dark font-cairo py-12 px-4 sm:px-6 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 🔮 مؤثرات بلورية دافئة لخلفية سيادية */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 🧭 زر العودة للرئيسية الفاخر المهرب هندسياً */}
      <nav className="max-w-7xl mx-auto mb-8 relative z-50">
        <Link 
          href={`/${lang}`} 
          className="inline-flex items-center gap-3 text-xs font-black px-6 py-3.5 rounded-xl bg-white border border-brand-navy-dark/10 shadow-xs transition-all duration-300 hover:border-brand-gold/40 hover:shadow-md active:translate-y-0.5 group cursor-pointer"
        >
          {isRtl ? (
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          ) : (
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          )}
          <span>{pageTexts.backBtn}</span>
        </Link>
      </nav>

      {/* 🏆 رأس الصفحة (Hero Header) */}
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-white text-brand-gold text-[10px] font-black tracking-wide uppercase mb-6 shadow-xs">
          <Sparkles size={12} className="animate-spin" />
          <span>{pageTexts.badge}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-din font-bold leading-tight text-brand-navy-dark tracking-tight mb-4">
          {pageTexts.title}
        </h1>
        <p className="text-brand-navy-dark/70 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
          {pageTexts.subtitle}
        </p>
      </div>

      {/* 📐 شبكة التفاعل الكبرى (Main Configurator Grid) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start pb-16">
        
        {/* 🛠️ الجانب الأيمن: لوحة التحكم واختيارات العميل */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-[2rem] border border-brand-navy-dark/[0.03] shadow-xs">
          
          <div>
            <label className="text-xs font-black text-brand-navy-dark/40 uppercase tracking-wider block mb-4">
              {pageTexts.filterTitle}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'all', label: isRtl ? "كل الخدمات" : "All Solutions", icon: <Briefcase size={16} /> },
                { id: 'corporate', label: isRtl ? "التأسيس" : "Setup", icon: <Building2 size={16} /> },
                { id: 'visas', label: isRtl ? "الإقامات" : "Visas", icon: <Smartphone size={16} /> },
                { id: 'iso', label: isRtl ? "الأيزو" : "ISO", icon: <FileCheck size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer active:scale-98 text-center ${
                    activeTab === tab.id 
                      ? 'border-brand-gold bg-brand-gold/5 text-brand-navy-dark font-black shadow-xs' 
                      : 'border-brand-light-bg bg-brand-light-bg/40 text-brand-navy-dark/70 hover:border-brand-navy-dark/10 hover:bg-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-brand-gold text-brand-navy-dark' : 'bg-white text-brand-gold shadow-xs'}`}>
                    {tab.icon}
                  </div>
                  <span className="text-xs font-bold leading-none">{tab.label}</span>
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
                <div 
                  onClick={() => setSelectedJurisdiction('mainland')}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedJurisdiction === 'mainland' ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-light-bg bg-brand-light-bg/20'
                  }`}
                >
                  <span className="block text-sm font-black mb-1">{pageTexts.mainland}</span>
                  <span className="block text-[11px] opacity-60 leading-normal">تتيح لك التجارة والتعاقد مباشرة داخل السوق المحلي الإماراتي وبدون قيود.</span>
                </div>
                <div 
                  onClick={() => setSelectedJurisdiction('freezone')}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedJurisdiction === 'freezone' ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-light-bg bg-brand-light-bg/20'
                  }`}
                >
                  <span className="block text-sm font-black mb-1">{pageTexts.freezone}</span>
                  <span className="block text-[11px] opacity-60 leading-normal">إعفاء ضريبي 100%، ملكية أجنبية كاملة، ومثالية للشركات التقنية والدولية.</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 💎 الجانب الأيسر: المخطط الهندي الاستثماري الفوري (Live Blueprint) */}
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
                href={`/${lang}?consult=open`}
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