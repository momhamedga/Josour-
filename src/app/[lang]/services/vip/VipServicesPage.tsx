'use client';

import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, 
  Crown, Briefcase, Building2, 
  TrendingUp, Radio, ArrowUpRight 
} from 'lucide-react';

interface Pillar {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Spec {
  label: string;
  value: string;
}

interface ProcessStep {
  title: string;
  desc: string;
}

interface VipServicesPageProps {
  params: {
    lang: 'ar' | 'en';
  };
}

export default function VipServicesPage({ params }: VipServicesPageProps) {
  const lang = params.lang;
  const isRtl = lang === 'ar';
  
  const t = {
    ar: {
      badge: 'بروتوكول خدمات النخبة 2026 // الاستثمار السيادي',
      title: 'خدمات رجال الأعمال والاستثمارات الاستراتيجية VIP',
      subtitle: 'نقدم حلولاً متكاملة لنخبة المستثمرين، من هندسة وتأسيس الشركات في المناطق الحرة الفاخرة إلى إدارة العلاقات المصرفية وتطوير دراسات الجدوى المتكاملة لضمان الريادة في سوق الإمارات لعام 2026.',
      backBtn: 'العودة للمركز الرئيسي',
      ctaBtn: 'طلب استشارة استثمارية خاصة عبر الواتساب',
      philosophyTitle: 'محاور الحوكمة ورعاية المستثمرين VIP',
      philosophyDesc: 'معايير صارمة مصممة لحماية تدفقات رؤوس الأموال وتوفير أعلى درجات الخصوصية والسرية التشغيلية.',
      processTitle: 'بروتوكول إدارة المعاملات النخبوية',
      processDesc: 'خطوات تشغيلية متكاملة تدار بالكامل عبر مدير علاقاتك الخاص لضمان تنفيذ رخصتك الاستثمارية بدون عوائق.',
      systemStatus: 'بوابة كبار المستثمرين: نشطة ومؤمنة بالكامل (100%)',
      frameworkLabel: 'بروتوكول المناطق الحرة وهيئات الاستثمار // معايير 2026',
      pillars: [
        { icon: <Building2 size={26} />, title: 'هندسة شركات المناطق الحرة', desc: 'تأسيس متكامل للكيانات التجارية الأجنبية والمحلية في أرقى السلطات والمناطق الحرة الاستراتيجية بدولة الإمارات.' },
        { icon: <Briefcase size={26} />, title: 'تسهيل العلاقات المصرفية VIP', desc: 'إعداد وتجهيز مستندات الامتثال لفتح الحسابات البنكية الاستثمارية وجلب التسهيلات المالية للمؤسسات.' },
        { icon: <TrendingUp size={26} />, title: 'دراسات الجدوى والخطط', desc: 'صياغة تقارير اقتصادية معززة تعكس حقيقة الفرص الاستثمارية لتحقيق أعلى معدلات العائد على الاستثمار.' },
        { icon: <Crown size={26} />, title: 'مدير علاقات سيادي خاص', desc: 'تخصيص مستشار إداري من كبار خبراء جسور لمرافقتكم وإنهاء المعاملات الحكومية والمصرفية بالكامل دون عناء.' }
      ] as Pillar[],
      steps: [
        { title: 'التخطيط وهيكلة رأس المال', desc: 'جلسة استشارية مغلقة لتحديد الشكل القانوني الأنسب للمنشأة واختيار البيئة الاستثمارية الأكثر توافقاً مع خططكم.' },
        { title: 'التدقيق الأمني وحجز التراخيص', desc: 'إنهاء متطلبات الموافقات المبدئية وحجز الأسماء التجارية والاعتمادات الرسمية عبر بوابات الهيئات التنظيمية.' },
        { title: 'تكامل الحسابات البنكية والامتثال', desc: 'صياغة الهيكل المالي للشركة وعرضه على البنوك الشريكة من الفئة الأولى (Tier-1) لتسريع وتيرة فتح الحساب المصرفي.' },
        { title: 'التسليم والتشغيل والربط الرقمي', desc: 'إصدار التراخيص وعقود التأسيس الرسمية وتفعيل الملف الاستثماري الإلكتروني للمنشأة لبدء النشاط فورا.' }
      ] as ProcessStep[],
      techSpecsTitle: 'مؤشرات أداء الاستثمار والاعتماد السيادي',
      specs: [
        { label: 'نسبة تمرير المراجعات المصرفية', value: '100% قبول وامتثال معتمد' },
        { label: 'سرعة إنهاء تراخيص الشركات', value: '72 ساعة عمل بروتوكولية' },
        { label: 'تخصيص المستشار الفني والميداني', value: 'دعم فوري على مدار الساعة' },
        { label: 'المرونة القانونية للأطر الهيكلية', value: 'أعلى حماية للمستثمر الأجنبي' }
      ] as Spec[]
    },
    en: {
      badge: 'ELITE PROTOCOL 2026 // SOVEREIGN INVESTMENT',
      title: 'Investor & Elite VIP Business Services',
      subtitle: 'Comprehensive architectural solutions for top-tier clients, spanning from foreign Freezone corporate structuring to corporate banking relationship engineering and advanced validation studies for 2026.',
      backBtn: 'Return to Command Center',
      ctaBtn: 'Request Private Investment Consultation',
      philosophyTitle: 'Strategic Foundations for VIP Corporate Care',
      philosophyDesc: 'Strict confidentiality directives engineered to protect high-net-worth capital flows and secure operational safety.',
      processTitle: 'The Elite Corporate Registry Pipeline',
      processDesc: 'Rigorous operating procedures executed entirely by your assigned manager to streamline licensing with zero friction.',
      systemStatus: 'Investor VIP Gateway: Fully Secured & Active (100%)',
      frameworkLabel: 'UAE Investment Authority Protocol // 2026 Global Standards',
      pillars: [
        { icon: <Building2 size={26} />, title: 'Freezone Corporate Structuring', desc: 'Deploying high-tier setups and corporate vehicles in premium financial Freezone jurisdictions across the UAE.' },
        { icon: <Briefcase size={26} />, title: 'VIP Banking Relationships', desc: 'Structuring compliance dossiers to secure elite tier-1 corporate banking pipelines and asset accounts.' },
        { icon: <TrendingUp size={26} />, title: 'Feasibility & Market Analytics', desc: 'Crafting advanced financial forecasts designed to optimize investment scalability and ROI parameters.' },
        { icon: <Crown size={26} />, title: 'Dedicated Executive Concierge', desc: 'Full-time assignment of a senior consultant to handle complex sovereign registries and banking nodes seamlessly.' }
      ] as Pillar[],
      steps: [
        { title: 'Corporate Identity Mapping', desc: 'Private strategic alignment to blueprint the ideal legal entity architecture matching your global tax and trade goals.' },
        { title: 'Sovereign Clearance & Approvals', desc: 'Expediting preliminary security approvals and trade name registries across digital government pipelines.' },
        { title: 'Banking Compliance Integration', desc: 'Optimizing corporate profiles to fit rigid internal audit parameters at partner tier-1 banking houses.' },
        { title: 'Deployment & Gateway Synchronization', desc: 'Securing the live trade license and deploying the operational enterprise infrastructure for immediate trade.' }
      ] as ProcessStep[],
      techSpecsTitle: 'Elite Performance Indicators & Success Specs',
      specs: [
        { label: 'Corporate Bank Approval Coefficient', value: '100% Audit Compliance' },
        { label: 'Average Corporate Turnaround Phase', value: '72 Protocol Business Hours' },
        { label: 'Executive Relationship Coverage', value: '24/7 Dedicated Support' },
        { label: 'Asset Structure Flexibility Vector', value: 'Maximum Owner Protection' }
      ] as Spec[]
    }
  }[lang];

  // تشفير وحقن رسالة الواتساب السحابية المباشرة لقطاع الـ VIP لعام 2026
  const whatsappUrl = `https://wa.me/971557983500?text=${encodeURIComponent(isRtl ? 'مرحباً جسور انترناشيونال، نود الاستفسار وطلب حزمة الاستشارات الإدارية الفاخرة لتأسيس أعمالنا وكبار العملاء VIP' : 'Hello Josour International, I want to request a private investment concierge strategy session.')}`;

  return (
    <div 
      className="w-full bg-brand-light-bg text-brand-navy-dark relative min-h-screen font-cairo selection:bg-brand-gold/30 selection:text-brand-navy-dark overflow-x-hidden flex flex-col items-center"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[75vw] h-[50vh] rounded-full blur-[150px] pointer-events-none z-0 opacity-20 bg-brand-gold" />
      
      <nav className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pt-8 relative z-10 flex flex-col items-center">
        <div className="w-full flex justify-start">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center justify-center gap-2.5 text-xs font-bold px-6 py-4 rounded-xl bg-white border border-brand-navy-dark/10 shadow-3xs text-brand-navy-dark/70 transition-all duration-300 md:hover:text-brand-gold md:hover:border-brand-gold/40 md:hover:shadow-md md:hover:-translate-y-0.5 group cursor-pointer"
          >
            {isRtl ? <ArrowRight size={15} className="md:group-hover:-translate-x-1 transition-transform duration-300 shrink-0" /> : <ArrowLeft size={15} className="md:group-hover:translate-x-1 transition-transform duration-300 shrink-0" />}
            <span>{t.backBtn}</span>
          </Link>
        </div>
      </nav>

      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 flex flex-col items-center text-center relative z-10 border-b border-brand-navy-dark/[0.03] justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-gold/30 shadow-3xs">
            <Radio size={12} className="text-brand-gold animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-navy-dark rtl:text-right ltr:text-left">
              {t.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-navy-dark leading-[1.15] tracking-tight max-w-4xl text-center">
            {t.title}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-brand-navy-light/80 font-medium leading-relaxed max-w-3xl px-2 text-center">
            {t.subtitle}
          </p>

          <div className="pt-8 w-full sm:w-auto flex justify-center px-4">
            <Link 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-brand-navy-dark text-white px-12 py-5 rounded-xl font-bold text-base tracking-wide shadow-xl shadow-brand-navy-dark/20 transition-all duration-300 cursor-pointer md:hover:bg-brand-gold md:hover:text-brand-navy-dark md:hover:-translate-y-1 md:hover:shadow-brand-gold/30 active:scale-[0.98]"
            >
              <span className="transition-colors duration-300 select-none text-center">{t.ctaBtn}</span>
              <Crown size={22} className="text-brand-gold transition-all duration-300 shrink-0 md:group-hover:text-brand-navy-dark md:group-hover:scale-105" />
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32 relative z-10 border-b border-brand-navy-dark/[0.03]">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy-dark text-center">{t.philosophyTitle}</h2>
          <p className="text-xs md:text-sm font-semibold text-brand-navy-light/50 max-w-xl mx-auto text-center">{t.philosophyDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {t.pillars.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-brand-navy-dark/[0.04] p-8 md:p-12 rounded-[2rem] shadow-3xs flex flex-col justify-between min-h-[390px] md:min-h-[380px] relative overflow-hidden transition-all duration-300 md:hover:border-brand-gold/40 md:hover:shadow-xl md:hover:-translate-y-1 group cursor-default"
            >
              <div className="w-full flex flex-col items-center md:items-start text-center md:text-start">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-8 border bg-brand-light-bg border-brand-gold/20 text-brand-gold shadow-inner md:group-hover:scale-110 md:group-hover:bg-brand-gold/10 transition-all duration-300 shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-navy-dark group-hover:text-brand-gold transition-colors duration-300 text-start w-full rtl:text-right ltr:text-left">{item.title}</h3>
                <p className="text-sm md:text-base leading-relaxed font-medium text-brand-navy-light/60 text-start w-full rtl:text-right ltr:text-left">{item.desc}</p>
              </div>
              <div className="w-full border-t border-brand-navy-dark/[0.03] pt-5 mt-8 flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold">VIP_MATRIX_0{idx+1}</span>
                <span className="w-0 h-[2px] bg-brand-gold md:group-hover:w-16 transition-all duration-500 hidden md:block" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32 relative z-10 border-b border-brand-navy-dark/[0.03]">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy-dark text-center">{t.processTitle}</h2>
          <p className="text-xs md:text-sm font-semibold text-brand-navy-light/50 max-w-xl mx-auto text-center">{t.processDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {t.steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white/95 backdrop-blur-xl border border-brand-navy-dark/[0.04] p-8 md:p-12 rounded-[2rem] shadow-3xs flex flex-col justify-between items-start text-start relative overflow-hidden min-h-[300px] md:min-h-[260px] transition-all duration-500 md:hover:border-brand-gold/40 md:hover:shadow-2xl md:hover:-translate-y-1.5 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.02] via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-full flex flex-col items-start">
                <div className="w-full flex items-center justify-between mb-6">
                  <div className="text-xs font-bold tracking-widest text-brand-gold bg-brand-gold/5 border border-brand-gold/15 px-4 py-2 rounded-xl font-mono">
                    REGISTRY_0{idx + 1}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-light-bg border border-brand-navy-dark/[0.03] flex items-center justify-center text-brand-navy-dark/30 md:group-hover:text-brand-gold transition-colors duration-300">
                    <ShieldCheck size={15} />
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-brand-navy-dark mb-3 group-hover:text-brand-gold transition-colors duration-300 text-start w-full rtl:text-right ltr:text-left">
                  {step.title}
                </h3>
                
                <p className="text-xs md:text-sm leading-relaxed font-medium text-brand-navy-light/70 text-start w-full rtl:text-right ltr:text-left">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="bg-white border border-brand-navy-dark/[0.04] rounded-[2.5rem] p-8 md:p-14 shadow-3xs relative overflow-hidden w-full">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 text-center md:text-start">
            <div className="space-y-1.5 flex flex-col items-center md:items-start text-center md:text-start w-full">
              <h3 className="text-xl md:text-3xl font-black text-brand-navy-dark flex items-center justify-center md:justify-start gap-2.5 w-full rtl:text-right ltr:text-left">
                <ShieldCheck size={28} className="text-brand-gold shrink-0" />
                <span>{t.techSpecsTitle}</span>
              </h3>
              <p className="text-[10px] tracking-widest uppercase font-bold text-brand-navy-light/40 w-full rtl:text-right ltr:text-left">{t.frameworkLabel}</p>
            </div>
            <div className="flex items-center gap-2.5 bg-emerald-50 px-4.5 py-2.5 rounded-full border border-emerald-100/60 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 tracking-wide">{t.systemStatus}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {t.specs.map((spec, i) => (
              <div key={i} className="bg-brand-light-bg/50 border border-brand-navy-dark/5 rounded-2xl p-6 flex flex-col gap-3 shadow-3xs justify-between min-h-[130px] transition-all duration-300 md:hover:bg-white md:hover:border-brand-gold/30 md:hover:shadow-md group">
                <span className="text-[10px] md:text-[11px] font-bold text-brand-navy-light/50 uppercase tracking-wider text-start w-full rtl:text-right ltr:text-left">
                  {spec.label}
                </span>
                <span className="font-bold text-sm text-brand-navy-dark flex items-center justify-between gap-1 pt-2 w-full rtl:text-right ltr:text-left">
                  {spec.value}
                  <ArrowUpRight size={14} className="text-brand-gold opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 transition-all duration-300" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}