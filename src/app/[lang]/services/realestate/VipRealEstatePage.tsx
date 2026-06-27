'use client';

import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, 
  Home, Layers, CheckCircle2, 
  Building, Key, 
  ArrowUpRight, Radio, Landmark
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

interface VipRealEstatePageProps {
  params: {
    lang: 'ar' | 'en';
  };
}

export default function VipRealEstatePage({ params }: VipRealEstatePageProps) {
  const lang = params.lang;
  const isRtl = lang === 'ar';

  const t = {
    ar: {
      badge: 'بروتوكول إدارة الأصول العقارية 2026 // العمارة السيادية',
      title: 'الخدمات العقارية الفاخرة وحوكمة إدارة الأملاك',
      subtitle: 'منظومة متكاملة لإدارة وتأجير الأصول العقارية والتجارية والسكنية في دولة الإمارات. نحن لا ندير مجرد عقارات؛ بل نحمي استثماراتكم ونضمن تعظيم العوائد الإيجارية وتحصيلها بأعلى معايير الحوكمة لعام 2026.',
      backBtn: 'العودة للمركز الرئيسي',
      ctaBtn: 'طلب تفويض إدارة محفظة عقارية عبر الواتساب',
      philosophyTitle: 'ركائز الحوكمة العقارية المستدامة',
      philosophyDesc: 'معايير تشغيلية صارمة تضمن الحفاظ على القيمة السوقية للأصول العقارية وتدفق العوائد بدون أي هدر.',
      processTitle: 'بروتوكول الإشراف والتشغيل العقاري',
      processDesc: 'خطوات تنظيمية مؤتمتة تبدأ من الفحص الفني والتعاقد وحتى التحصيل اللحظي لضمان راحة النخبة.',
      systemStatus: 'حالة محرك العقود الرقمي: مثالي (100%)',
      frameworkLabel: 'بروتوكول دائرة الأراضي والأملاك // معايير مؤسسية 2026',
      pillars: [
        { icon: <Landmark size={26} />, title: 'حوكمة تحصيل الإيجارات', desc: 'نظم أتمتة مالية متطورة تضمن تحصيل الإيجارات وإيداعها في حساباتكم بدقة متناهية وبدون أي تأخير عملياتي.' },
        { icon: <Building size={26} />, title: 'تسويق وإشغال استراتيجي', desc: 'استهدف النخبة من المستأجرين الأفراد والشركات لرفع نسب الإشغال وتقليل فترات خلو الأصول العقارية.' },
        { icon: <Key size={26} />, title: 'إدارة التعاقدات القانونية', desc: 'صياغة وتوثيق عقود الإيجار (إيجاري) ومتابعة الالتزامات القانونية واللوائح التنظيمية الحكومية المعمول بها.' },
        { icon: <Layers size={26} />, title: 'الصيانة الوقائية الفورية', desc: 'إشراف فني مستمر على العقارات وإدارة عمليات الصيانة الدورية للحفاظ على الهيكل الإنشائي والقيمة السوقية للأصل.' }
      ] as Pillar[],
      steps: [
        { title: 'تقييم وفحص الأصول العقارية', desc: 'إجراء فحص فني وقانوني شامل للعقار لتحديد القيمة الإيجارية العادلة ووضع خطة التشغيل المثالية.' },
        { title: 'التسويق واستقطاب المستأجرين', desc: 'إطلاق حملات تسويقية فاخرة عبر المنصات المتخصصة وعرض العقارات على شبكة عملائنا من النخبة.' },
        { title: 'توقيع العقود وحوكمة الضمانات', desc: 'إتمام التعاقدات الرسمية عبر الأنظمة المعتمدة، وتوثيق الشروط وصكوك الضمان لحماية حقوق الملاك بالكامل.' },
        { title: 'التحصيل اللحظي والتقارير الدورية', desc: 'متابعة تدفقات الإيجار وإرسال تقارير مالية وفنية شفافة للمالك توضح حالة المحفظة العقارية أولاً بأول.' }
      ] as ProcessStep[],
      techSpecsTitle: 'مؤشرات كفاءة التشغيل والعوائد الإيجارية',
      specs: [
        { label: 'متوسط درجات الإشغال السنوي', value: '98% إشغال مستدام' },
        { label: 'سرعة الاستجابة لطلبات الصيانة', value: 'لحظي (تحت بروتوكول SLA)' },
        { label: 'نسبة التطابق مع لوائح DLD', value: '100% امتثال قانوني كامل' },
        { label: 'استقرار التدفقات النقدية للملاك', value: 'أمان مالي وحماية سيادية' }
      ] as Spec[]
    },
    en: {
      badge: 'REAL ESTATE ASSET MANAGEMENT 2026 // SOVEREIGN ARCHITECTURE',
      title: 'Premium Real Estate Solutions & Property Governance',
      subtitle: 'An integrated ecosystem for managing and leasing premium commercial and residential real estate assets across the UAE. We secure your investments and guarantee optimized rental yields under strict 2026 governance.',
      backBtn: 'Return to Command Center',
      ctaBtn: 'Authorize Portfolio Management',
      philosophyTitle: 'Foundations of Sustainable Property Governance',
      philosophyDesc: 'Strict operational matrices engineered to safeguard the market valuation of your assets and streamline revenue vectors without leaks.',
      processTitle: 'The Real Estate Operational Pipeline',
      processDesc: 'Automated workflow blueprints scaling from physical technical auditing up to zero-latency rent collection matrices.',
      systemStatus: 'Digital Contract Ledger: Optimal (100%)',
      frameworkLabel: 'Dubai Land Department Framework Protocol // 2026 Standards',
      pillars: [
        { icon: <Landmark size={26} />, title: 'Automated Rent Collection', desc: 'Advanced fiscal pipelines tracking and executing lease payments straight into your bank accounts with zero manual delays.' },
        { icon: <Building size={26} />, title: 'Strategic Asset Placement', desc: 'Targeting top-tier corporate and high-net-worth individual lessees to optimize occupancy coefficients and minimize downtime.' },
        { icon: <Key size={26} />, title: 'Legal Framework Architecture', desc: 'Drafting and endorsing formal rental contracts (Ejari) while actively governing compliance models.' },
        { icon: <Layers size={26} />, title: 'Preventative Maintenance Core', desc: 'Continuous facility oversight paired with automated engineering iterations to secure structural longevity and asset equity.' }
      ] as Pillar[],
      steps: [
        { title: 'Technical Asset Assessment', desc: 'Conducting deep functional and structural property evaluations to determine legal valuation matrices and design layout setups.' },
        { title: 'Luxury Market Deployment', desc: 'Deploying custom visual campaigns across premium global platforms, exposing the asset to our corporate tenant network.' },
        { title: 'Contract Binding & Securitization', desc: 'Finalizing regulatory contracts through centralized portals and verifying corporate security deposits for total owner protection.' },
        { title: 'Runtime Collection & Reporting', desc: 'Overseeing live collection loops and dispatching translucent accounting ledgers directly to the investor.' }
      ] as ProcessStep[],
      techSpecsTitle: 'Property Operational Metrics & Yield Specs',
      specs: [
        { label: 'Average Annual Occupancy Rating', value: '98% Sustainable Load' },
        { label: 'Facility Maintenance Response Phase', value: 'Instant (Under SLA Protocol)' },
        { label: 'DLD Regulatory Concordance', value: '100% Flawless Legal Standing' },
        { label: 'Net Yield Inflow Stability', value: 'Sovereign Protected Revenue' }
      ] as Spec[]
    }
  }[lang];

  // تشفير وحقن رسالة الواتساب السحابية المباشرة بدقة للقسم العقاري
  const whatsappUrl = `https://wa.me/971557983500?text=${encodeURIComponent(isRtl ? 'مرحباً جسور انترناشيونال، نود الاستفسار وتفويضكم لإدارة وتشغيل محفظتنا العقارية في دولة الإمارات' : 'Hello Josour International, I want to request a premium property portfolio management asset auditing framework.')}`;

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
              <Home size={22} className="text-brand-gold transition-all duration-300 shrink-0 md:group-hover:text-brand-navy-dark md:group-hover:scale-105" />
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
                <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold">RE_MATRIX_0{idx+1}</span>
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
                    STAGE_0{idx + 1}
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