'use client';

import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, 
  Award, Layers, ExternalLink, Building2, 
  FolderLock, RefreshCw, ArrowUpRight, Radio
} from 'lucide-react';

interface IsoCard {
  code: string;
  title: string;
  category: string;
  desc: string;
  scope: string;
  status: string;
}

interface Pillar {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Metric {
  label: string;
  value: string;
}

interface VipIsoSectionProps {
  lang: 'ar' | 'en';
}

export default function VipIsoSection({ lang }: VipIsoSectionProps) {
  const isRtl = lang === 'ar';

  const t = {
    ar: {
      badge: 'إطار الامتثال الدولي 2026 // معايير السيادة',
      title: 'شهادات ISO العالمية والامتثال المؤسسي',
      subtitle: 'توثيق الحوكمة وبناء نظم إدارة الجودة والأمن السيبراني وفقاً لأعلى المعايير الدولية الصارمة لعام 2026 لتأمين الأصول الرقمية والمؤسسية.',
      backBtn: 'العودة للمركز الرئيسي',
      ctaBtn: 'طلب تدقيق الامتثال الفوري',
      section2Title: 'محاور الحوكمة والجودة الشاملة',
      section2Desc: 'ركائز استراتيجية تضمن تطابق العمليات التشغيلية والبرمجية مع النظم القياسية الدولية.',
      section3Title: 'سجل الشهادات والمعايير الدولية المعمدة',
      section3Desc: 'استعرض وثائق الامتثال والشهادات القياسية القابلة للتدقيق الفوري لإدارة المخاطر والجودة.',
      systemStatus: 'مؤشر الامتثال القياسي: معتمد بالكامل (100%)',
      frameworkLabel: 'نظام الحوكمة الموحد // بروتوكول الأيزو الدولي',
      viewDetails: 'استعراض وثيقة الامتثال الكاملة',
      scopeLabel: 'نطاق التطبيق:',
      pillars: [
        { icon: <Award size={28} className="text-brand-gold" />, title: 'تأصيل الجودة المستدامة', desc: 'تطوير أدلة الجودة التشغيلية بما يضمن استقرار الأداء ومنع الهدر العملياتي في البنى التحتية.' },
        { icon: <FolderLock size={28} className="text-brand-gold" />, title: 'الحصانة السيبرانية', desc: 'تطبيق مصفوفة أمن المعلومات القياسية لحماية تداول البيانات الحساسة وسجلات العملاء السيادية.' },
        { icon: <Layers size={28} className="text-brand-gold" />, title: 'إدارة المخاطر الوقائية', desc: 'تحليل استباقي للثغرات التشغيلية ووضع سيناريوهات التعافي الفوري لضمان استمرارية الأعمال.' },
        { icon: <RefreshCw size={28} className="text-brand-gold" />, title: 'التدقيق والتحسين المستمر', desc: 'دورات فحص ربع سنوية لضمان مواكبة التحديثات القياسية العالمية الصادرة لعام 2026.' }
      ] as Pillar[],
      isoCards: [
        { code: 'ISO 9001:2015', title: 'نظام إدارة الجودة العالمي', category: 'Quality Management', desc: 'المعيار الدولي الأهم لضمان كفاءة وفعالية العمليات التشغيلية وتقديم خدمات تفوق تطلعات النخبة.', scope: 'تطوير البرمجيات، الأنظمة الذكية، وإدارة الأصول الرقمية للمؤسسات.', status: 'Active / Audited' },
        { code: 'ISO/IEC 27001:2022', title: 'معيار أمن وسرية المعلومات الرقمية', category: 'Information Security', desc: 'الحصن القياسي لحماية البيانات الحساسة، إدارة المخاطر السيبرانية، وضمان سرية شيفرات النظم السيادية.', scope: 'البنية التحتية السحابية، قواعد البيانات المعزولة، وإدارة بروتوكولات التشفير.', status: 'Active / Audited' },
        { code: 'ISO 20000-1:2018', title: 'إدارة جودة خدمات تكنولوجيا المعلومات', category: 'IT Service Management', desc: 'هندسة تسليم الخدمات الرقمية والبث الحي للمنصات بمتوسط زمن استجابة صفري لضمان استمرارية التشغيل.', scope: 'عمليات صيانة الخوادم، الدعم الفني اللحظي، وأتمتة خطوط الإمداد التكنولوجي.', status: 'Active / Audited' },
        { code: 'ISO 22301:2019', title: 'نظام إدارة استمرارية الأعمال', category: 'Business Continuity', desc: 'الاستجابة الفورية وضمان صمود النظم ضد الكوارث الرقمية والانقطاعات التشغيلية المفاجئة في شبكات الحافة.', scope: 'النسخ الاحتياطي اللحظي، خوادم الطوارئ المعزولة، والتعافي من الكوارث الرقمية.', status: 'Active / Audited' },
        { code: 'ISO 31000:2018', title: 'إطار الحوكمة وإدارة المخاطر المؤسسية', category: 'Risk Management', desc: 'توفير المبادئ التوجيهية لاتخاذ القرارات الاستراتيجية المحمية وتحديد الفرص والتهديدات في السوق التكنولوجي.', scope: 'التخطيط الاستراتيجي للمشاريع، تقييم الأصول الرقمية، وحوكمة الشراكات.', status: 'Compliant' }
      ] as IsoCard[],
      metricsTitle: 'سجل مؤشرات الامتثال الفوري (بروتوكول 2026)',
      metrics: [
        { label: 'نسبة التطابق التشغيلي', value: '100% تطابق كامل' },
        { label: 'زمن رصد وتحليل المخاطر', value: 'لحظي (Zero-Delay)' },
        { label: 'جاهزية خوادم الطوارئ', value: 'مستدامة ومستقلة تماماً' },
        { label: 'تقييم الحصانة السيبرانية', value: 'تصنيف سيادي فائق (AAA)' }
      ] as Metric[]
    },
    en: {
      badge: 'INTERNATIONAL COMPLIANCE CORE 2026 // SOVEREIGN METRICS',
      title: 'Global ISO Standards & Corporate Governance',
      subtitle: 'Documenting corporate frameworks and building robust quality and cybersecurity management systems under strict 2026 international regulations to safeguard institutional assets.',
      backBtn: 'Return to Command Center',
      ctaBtn: 'Request Immediate Compliance Audit',
      section2Title: 'Governance & Total Quality Pillars',
      section2Desc: 'Strategic pillars ensuring that development operations and system execution meet certified international matrices.',
      section3Title: 'Sovereign Certificate Ledger & Standards',
      section3Desc: 'Review verified compliance layouts and auditable international documents engineered for corporate risk control.',
      systemStatus: 'Compliance Index: Fully Certified (100%)',
      frameworkLabel: 'Unified Governance Matrix // International ISO Protocol',
      viewDetails: 'Review Compliance Document',
      scopeLabel: 'Scope of Application:',
      pillars: [
        { icon: <Award size={28} className="text-brand-gold" />, title: 'Sustainable Quality Operations', desc: 'Crafting comprehensive QA matrices to guarantee performance stabilization and eliminate operational waste.' },
        { icon: <FolderLock size={28} className="text-brand-gold" />, title: 'Cyber-Immunization Core', desc: 'Enforcing standardized security models to wrap critical file assets and protect sovereign partner communications.' },
        { icon: <Layers size={28} className="text-brand-gold" />, title: 'Preventative Risk Engineering', desc: 'Proactive analysis of structural vulnerabilities backed by isolation strategies to keep operations seamless.' },
        { icon: <RefreshCw size={28} className="text-brand-gold" />, title: 'Continuous Loop Audit', desc: 'Quarterly optimization protocols deployed to track newly minted 2026 global framework rules.' }
      ] as Pillar[],
      isoCards: [
        { code: 'ISO 9001:2015', title: 'Global Quality Management System', category: 'Quality Management', desc: 'The elite international standard for operational consistency, driving delivery performance that surpasses client horizons.', scope: 'Software engineering, smart architectures, and enterprise digital asset orchestration.', status: 'Active / Audited' },
        { code: 'ISO/IEC 27001:2022', title: 'Information Security & Encryption Core', category: 'Information Security', desc: 'The sovereign protective layer guarding high-sensitivity databases, mitigation of cyber threats, and source-code integrity.', scope: 'Cloud core topologies, isolated server nodes, and dual-layer encryption protocols.', status: 'Active / Audited' },
        { code: 'ISO 20000-1:2018', title: 'IT Service Quality Architecture', category: 'IT Service Management', desc: 'Engineering dynamic service delivery pipelines with zero latency, maximizing continuous platform runtimes.', scope: 'Edge infrastructure maintenance, live support automation, and technological supply chains.', status: 'Active / Audited' },
        { code: 'ISO 22301:2019', title: 'Business Continuity Management', category: 'Business Continuity', desc: 'Instant recovery routing and infrastructure endurance built against structural failures or digital disasters.', scope: 'Real-time backup synthesis, fallback runtime instances, and disaster recovery execution.', status: 'Active / Audited' },
        { code: 'ISO 31000:2018', title: 'Corporate Governance & Risk Matrix', category: 'Risk Management', desc: 'Providing tactical principles to ensure fully protected decision loops and accurate market threat mitigation.', scope: 'Strategic workflow planning, digital capital assessment, and enterprise partnership governance.', status: 'Compliant' }
      ] as IsoCard[],
      metricsTitle: 'Live Compliance Metrics (2026 Framework)',
      metrics: [
        { label: 'Operational Alignment', value: '100% Perfect Concordance' },
        { label: 'Vulnerability Detection Time', value: 'Real-Time (Zero-Delay)' },
        { label: 'Emergency Backup State', value: 'Fully Autonomous Nodes' },
        { label: 'Cyber Protection Rating', value: 'AAA Sovereign Grade' }
      ] as Metric[]
    }
  }[lang];

  return (
    <div 
      className="w-full bg-brand-light-bg text-brand-navy-dark relative min-h-screen font-cairo selection:bg-brand-gold/30 selection:text-brand-navy-dark overflow-x-hidden flex flex-col items-center"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 📐 المخطط الهندسي القياسي المتنفس لعام 2026 */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-[gridSmoothMove_40s_linear_infinite]" />
      
      {/* 🔮 هالات الإضاءة المحيطية المستمرة المتوازنة تمنع بهتان الخلفية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[75vw] h-[50vh] rounded-full blur-[150px] pointer-events-none z-0 mix-blend-multiply animate-pulse" style={{ backgroundColor: 'oklch(0.76 0.11 85 / 0.14)' }} />
      <div className="absolute top-[35%] right-[-10%] w-[60vw] h-[60vh] rounded-full blur-[180px] pointer-events-none z-0 mix-blend-multiply" style={{ backgroundColor: 'oklch(0.24 0.05 250 / 0.05)' }} />
      <div className="absolute bottom-0 left-[-5%] w-[65vw] h-[65vh] rounded-full blur-[190px] pointer-events-none z-0 mix-blend-multiply" style={{ backgroundColor: 'oklch(0.76 0.11 85 / 0.08)' }} />

      {/* [Top Navigation Section]: زر العودة المستقل الخالي تماماً من الخنقة */}
      <nav className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pt-8 relative z-10 flex flex-col items-center">
        <div className="w-full flex justify-start">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center justify-center gap-2.5 text-xs font-bold px-6 py-4 rounded-xl bg-white border border-brand-navy-dark/10 shadow-sm text-brand-navy-dark/70 transition-all duration-300 md:hover:text-brand-gold md:hover:border-brand-gold/40 md:hover:shadow-md md:hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
          >
            {isRtl ? <ArrowRight size={15} className="md:group-hover:-translate-x-1 transition-transform duration-300 shrink-0" /> : <ArrowLeft size={15} className="md:group-hover:translate-x-1 transition-transform duration-300 shrink-0" />}
            <span>{t.backBtn}</span>
          </Link>
        </div>
      </nav>

      {/* 👑 [Section 1]: الهيرو سيكشن الحوكمي الفاخر - متمركز ومستقر بدون أي كلاسات leading عاصرة لحروف القاهرة */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 flex flex-col items-center text-center relative z-10 border-b border-brand-navy-dark/[0.03] justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-8 max-w-4xl animate-fadeInUp">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-gold/30 shadow-2xs">
            <Radio size={12} className="text-brand-gold animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-navy-dark">
              {t.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black text-brand-navy-dark leading-[1.15] tracking-tight max-w-4xl">
            {t.title}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-brand-navy-light/80 font-medium leading-relaxed max-w-3xl px-2">
            {t.subtitle}
          </p>

          {/* 👑 زر الهيرو الرئيسي المعالج: مساحة بادينج عمودية وأفقية ملكية سخية px-12 py-5 تمنع الاختناق وتدعم الـ Hover الانسيابي الفاخر بالكمبيوتر */}
          <div className="pt-8 w-full sm:w-auto flex justify-center px-4">
            <Link 
              href="#contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-brand-navy-dark text-white px-12 py-5 rounded-xl font-bold text-base tracking-wide shadow-xl shadow-brand-navy-dark/20 transition-all duration-300 cursor-pointer md:hover:bg-brand-gold md:hover:text-brand-navy-dark md:hover:-translate-y-1 md:hover:shadow-brand-gold/30 active:scale-[0.98]"
            >
              <span className="transition-colors duration-300 select-none">{t.ctaBtn}</span>
              <Building2 size={22} className="text-brand-gold transition-all duration-300 shrink-0 md:group-hover:text-brand-navy-dark md:group-hover:rotate-6" />
            </Link>
          </div>

        </div>
      </section>

      {/* 🏛️ [Section 2]: ركائز التميز والفلسفة - كروت متزنة الارتفاع ومحاذاة طرفية تمنع تداخل النصوص على المحمول */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32 relative z-10 border-b border-brand-navy-dark/[0.03]">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy-dark">{t.section2Title}</h2>
          <p className="text-xs md:text-sm font-semibold text-brand-navy-light/50 max-w-xl mx-auto">{t.section2Desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {t.pillars.map((item, idx) => (
            <div 
              key={idx} 
              className={`bg-white border border-brand-navy-dark/[0.04] p-8 md:p-12 rounded-[2rem] shadow-sm flex flex-col text-center ${isRtl ? 'md:text-right md:items-start' : 'md:text-left md:items-start'} items-center justify-between min-h-[390px] md:min-h-[380px] relative overflow-hidden transition-all duration-300 md:hover:border-brand-gold/40 md:hover:shadow-xl md:hover:-translate-y-1 group cursor-default`}
            >
              <div className="w-full flex flex-col items-center md:items-start text-center md:text-start">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-8 border bg-brand-light-bg border-brand-gold/20 text-brand-gold shadow-inner md:group-hover:scale-110 md:group-hover:bg-brand-gold/10 transition-all duration-300 shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-navy-dark md:hover:text-brand-gold transition-colors duration-300">{item.title}</h3>
                <p className="text-sm md:text-base leading-relaxed font-medium text-brand-navy-light/60">{item.desc}</p>
              </div>
              <div className="w-full border-t border-brand-navy-dark/[0.03] pt-5 mt-8 text-start flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold">GOVERN_ACTIVE_0{idx+1}</span>
                <span className="w-0 h-[2px] bg-brand-gold md:group-hover:w-16 transition-all duration-500 hidden md:block" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💎 [Section 3]: سجل شهادات الأيزو العالمية (Bento Grid) - تم حقن كلاس group للأب لضمان تفعيل الـ Hover بطلاقة كاملة */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32 relative z-10 border-b border-brand-navy-dark/[0.03]">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy-dark">{t.section3Title}</h2>
          <p className="text-xs md:text-sm font-semibold text-brand-navy-light/50 max-w-xl mx-auto">{t.section3Desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {t.isoCards.map((iso, idx) => (
            <Link 
              key={idx} 
              href={`/${lang}/compliance/${iso.code.toLowerCase().replace(/[\s/:]/g, '-')}`}
              className="bg-white/95 backdrop-blur-xl border border-brand-navy-dark/[0.04] p-8 md:p-12 rounded-[2rem] shadow-sm flex flex-col justify-between items-start text-start relative overflow-hidden min-h-[460px] md:min-h-[440px] transition-all duration-500 md:hover:border-brand-gold/40 md:hover:shadow-2xl md:hover:-translate-y-1.5 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.02] via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-full">
                <div className="w-full flex items-center justify-between mb-8">
                  <div className="text-xs font-bold tracking-widest text-brand-gold bg-brand-gold/5 border border-brand-gold/15 px-4 py-2 rounded-xl">
                    {iso.code}
                  </div>
                  <div className="w-9 h-9 rounded-full bg-brand-light-bg border border-brand-navy-dark/[0.05] flex items-center justify-center text-brand-navy-dark/40 md:group-hover:text-brand-gold md:group-hover:border-brand-gold/20 transition-all duration-300 shrink-0">
                    <ExternalLink size={14} />
                  </div>
                </div>
                
                <span className="text-[10px] font-bold tracking-wider text-brand-navy-light/40 uppercase bg-brand-light-bg px-3 py-1 rounded-md inline-block mb-4 border border-brand-navy-dark/[0.02]">
                  {iso.category}
                </span>
                
                <h3 className="text-2xl font-black text-brand-navy-dark mb-3 md:group-hover:text-brand-gold transition-colors duration-300">
                  {iso.title}
                </h3>
                
                <p className="text-xs md:text-sm leading-relaxed font-medium text-brand-navy-light/70 mb-5">
                  {iso.desc}
                </p>

                <div className="space-y-1 bg-brand-light-bg/50 p-4 rounded-xl border border-brand-navy-dark/[0.02] mb-6">
                  <span className="text-[11px] font-bold text-brand-navy-dark/50 block">
                    {t.scopeLabel}
                  </span>
                  <p className="text-xs font-medium text-brand-navy-light/80 leading-relaxed">
                    {iso.scope}
                  </p>
                </div>
              </div>

              {/* كبسولة الرابط السفلي للمشاريع: تباعد مريح pb-3 وتفاعل حركي شغال بطلاقة مع الأب group */}
              <div className="w-full flex items-center justify-between gap-3 text-[11px] font-bold text-brand-navy-dark/50 border-t border-brand-navy-dark/[0.04] pt-6 mt-10 md:group-hover:text-brand-navy-dark transition-colors duration-300 pb-3">
                <span className="tracking-wide">{t.viewDetails}</span>
                <div className="w-8 h-8 rounded-full bg-brand-light-bg border border-brand-navy-dark/5 flex items-center justify-center md:group-hover:bg-brand-gold md:group-hover:border-brand-gold md:group-hover:text-brand-navy-dark transition-all duration-300 shrink-0 shadow-3xs">
                  {isRtl ? (
                    <ArrowLeft size={14} className="transition-transform md:group-hover:-translate-x-0.5 duration-300" />
                  ) : (
                    <ArrowRight size={14} className="transition-transform md:group-hover:translate-x-0.5 duration-300" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 📊 [Section 4]: لوحة مؤشرات الامتثال والفحص الجاري - مفرودة وواضحة كلياً ومنظمة أفقياً */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="bg-white border border-brand-navy-dark/[0.04] rounded-[2.5rem] p-8 md:p-14 shadow-sm relative overflow-hidden w-full">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 text-center md:text-start">
            <div className="space-y-1.5 flex flex-col items-center md:items-start">
              <h3 className="text-xl md:text-3xl font-black text-brand-navy-dark flex items-center gap-2.5">
                <ShieldCheck size={28} className="text-brand-gold" />
                {t.metricsTitle}
              </h3>
              <p className="text-[10px] tracking-widest uppercase font-bold text-brand-navy-light/40">{t.frameworkLabel}</p>
            </div>
            <div className="flex items-center gap-2.5 bg-emerald-50 px-4.5 py-2.5 rounded-full border border-emerald-100/60 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 tracking-wide">{t.systemStatus}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {t.metrics.map((metric, i) => (
              <div key={i} className="bg-brand-light-bg/50 border border-brand-navy-dark/5 rounded-2xl p-6 flex flex-col gap-3 shadow-sm justify-between min-h-[130px] transition-all duration-300 md:hover:bg-white md:hover:border-brand-gold/30 md:hover:shadow-md group">
                <span className="text-[10px] md:text-[11px] font-bold text-brand-navy-light/50 uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="font-bold text-sm text-brand-navy-dark flex items-center justify-between gap-1 pt-2">
                  {metric.value}
                  <ArrowUpRight size={14} className="text-brand-gold opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 transition-all duration-300" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ [Section 5]: تجميع مسار حجز الاستشارات والربط الهيكلي */}
      <section id="contact" className="w-full max-w-7xl mx-auto text-center py-12 border-t border-brand-navy-dark/[0.03] relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold/60 mb-2">
          {isRtl ? 'نهاية بروتوكول الامتثال // حوكمة النظم المعتمدة' : 'COMPLIANCE LOOP END // CERTIFIED GOVERNANCE'}
        </p>
        <p className="text-sm font-medium text-brand-navy-light/50">
          {isRtl ? 'جميع الحقوق محفوظة لنواة الجودة الدولية لعام 2026' : 'All Rights Reserved to International Quality Core © 2026'}
        </p>
      </section>

      {/* 🎬 مؤثرات الأنيميشن المعزولة والمتحركة لعام 2026 بسلاسة سينمائية حرة */}
      <style jsx global>{`
        @keyframes gridSmoothMove {
          from { background-position: 0 0; }
          to { background-position: 60px 60px; }
        }
        @keyframes fadeInUpCoreNode {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUpCoreNode 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}