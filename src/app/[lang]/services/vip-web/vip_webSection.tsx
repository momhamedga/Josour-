'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, Code2, 
  Layers, Zap, TerminalSquare, 
  ShieldCheck, ArrowUpRight, ExternalLink,
  Globe, Landmark, User, ShieldAlert, GraduationCap,
  Cpu, Radio, Terminal, Sparkles
} from 'lucide-react';

export default function VipWebSection({ lang }: { lang: 'ar' | 'en' }) {
  const isRtl = lang === 'ar';
  
  // ⚡ حالات التحكم التفاعلية للجيل القادم
  const [selectedPillar, setSelectedPillar] = useState<number>(0);
  const [terminalLine, setTerminalLine] = useState<string>('INITIALIZING_CORE_NODE...');

  // محاكاة الأوامر الحية في الـ Terminal لثيم 2026
  useEffect(() => {
    const logs = [
      'FETCHING_EDGE_REPLICAS... OK',
      'SECURE_POST_QUANTUM_HANDSHAKE... LOCKED',
      'OPTIMIZING_HYDRATION_DOM... 100%',
      'ESTABLISHING_VIP_ROUTING_LAYER... ACTIVE',
      'TUNING_OKLCH_COLOR_PROFILES... READY'
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setTerminalLine(logs[idx % logs.length]);
      idx++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const t = {
    ar: {
      badge: 'النواة الهندسية 2026 // بروتوكول الجيل القادم',
      title: 'هندسة الويب ومعمارية النظم الفاخرة',
      subtitle: 'نحن لا نصمم مجرد واجهات تقليدية؛ نحن نكتب شيفرات برمجية خالية من الهدر ونبني بنية تحتية سحابية ذكية لتأسيس أصول رقمية سيادية تعكس هيبة علامتكم المؤسسية لعام 2026.',
      backBtn: 'العودة للمركز الرئيسي',
      ctaBtn: 'بدء بث استشارة النخبة',
      philosophyTitle: 'مختبر المعايير البرمجية المستدامة',
      philosophyDesc: 'انقر فوق أي ركيزة هندسية لتشاهد المخطط التنفيذي لمعايير الـ Edge-First لايف.',
      projectsTitle: 'روائع الأصول الرقمية السيادية',
      projectsDesc: 'منصات حية متكاملة تم برمجتها وهندستها لتتصدر الأسواق العالمية بأحدث تقنيات الـ Server-First والأداء اللحظي.',
      systemStatus: 'حالة العقدة السحابية: مثالي (100%)',
      frameworkLabel: 'بروتوكول السجل المؤسسي الموحد // معايير 2026',
      pillars: [
        { icon: <Cpu size={24} />, title: 'أداء معالج متطور', desc: 'توليد ديناميكي كامل يعتمد على خوادم الحافة (Edge Server Rendering) لضمان تحميل فوري يتخطى الأساليب القديمة.', code: 'const render = await edge.compile({ strategy: "Server-First" });' },
        { icon: <Code2 size={24} />, title: 'شيفرة برمجية سيادية', desc: 'تطوير كودي نظيف يدعم معايير 2026 الصارمة، لضمان استجابة لحظية وأمن فائق للملفات الحيوية.', code: 'export const config = { runtime: "edge", isolation: true };' },
        { icon: <Layers size={24} />, title: 'أتمتة ذكية متكاملة', desc: 'ربط مركزي لحظي مع أنظمة بوابات الدفع الدولية ومحركات إدارة الموارد والذكاء الاصطناعي دون أي تأخير.', code: 'await pipeline.trigger("payment_gateway", { secure: true });' },
        { icon: <Zap size={24} />, title: 'سيادة الأرشفة الذكية', desc: 'هندسة دلالية فائقة لمحركات البحث تعتمد على خوارزميات الاسترجاع الحديثة لضمان البقاء دائماً في الصدارة.', code: 'seo.injectMatrix({ coreWebVitals: "CLS: 0.0, LCP: 0.2s" });' }
      ],
      projects: [
        { icon: <GraduationCap size={20} className="text-brand-gold" />, title: 'الأكاديمية البريطانية', category: 'بنية تعليمية دولية 2026', desc: 'منصة متطورة للغاية لإدارة وتوصيل المحتوى التعليمي الفاخر بمعايير أمان وتجاوب عالمية سريعة.', url: 'https://britishacademyss.vercel.app/' },
        { icon: <User size={20} className="text-brand-gold" />, title: 'معرض أعمال جيمي الفاخر', category: 'الهوية الرقمية الفائقة', desc: 'مساحة رقمية سينمائية تستعرض المشاريع والأنظمة الذكية المطورة بأحدث بنية تكنولوجية لعام 2026.', url: 'https://mojimmy-portfolio.vercel.app/' },
        { icon: <Landmark size={20} className="text-brand-gold" />, title: 'مكتب الحارثي للمحاماة', category: 'منصة استشارات سيادية', desc: 'بيئة رقمية مخصصة لتقديم الخدمات القانونية وإدارة الجلسات والأتمتة الآمنة للبيانات الحساسة بأعلى معايير الحماية.', url: 'https://hhlawyer.vercel.app/' },
        { icon: <ShieldAlert size={20} className="text-brand-gold" />, title: 'المنصة الاتحادية المركزية', category: 'بوابة الأنظمة والربط الشبكي', desc: 'تكامل أنظمة متقدم وربط معزول بالكامل لبناء بيئة سحابية فائقة الأداء وعالية المرونة.', url: 'https://icfb.vercel.app/' },
        { icon: <Globe size={20} className="text-brand-gold" />, title: 'جوهرة الدانات العالمية', category: 'منصة استثمارية متكاملة', desc: 'عمارة تفاعلية متعددة اللغات مخصصة لعرض وإدارة المشاريع الفاخرة والاستثمارات العقارية في السوق الخليجي.', url: 'https://jawharat-al-danat.vercel.app/ar' }
      ],
      techSpecsTitle: 'سجل الأداء الهندسي الفوري (معايير 2026)',
      specs: [
        { label: 'زمن الاستجابة (LCP)', value: '0.2 ثانية (معالجة لحظية)' },
        { label: 'بروتوكول حماية الجلسات', value: 'تشفير كمي ثنائي مستدام' },
        { label: 'البيئة المستضيفة للشيفرة', value: 'عقد حافة منعزلة ديناميكياً' },
        { label: 'مصفوفة التكيف الهيكلي', value: 'استجابة تكيفية فائقة 100%' }
      ]
    },
    en: {
      badge: 'ENGINEERING CORE 2026 // NEXT-GEN PROTOCOL',
      title: 'VIP Web Architecture & Enterprise Core',
      subtitle: 'We do away with obsolete design methods; we engineer server-first, clean codebases and highly responsive cloud layers to deliver sovereign digital systems for 2026.',
      backBtn: 'Return to Command Center',
      ctaBtn: 'Stream Elite Consultation',
      philosophyTitle: 'Pragmatic Code Architecture Lab',
      philosophyDesc: 'Click on any structural matrix to view the deployment profile running live on the edge node.',
      projectsTitle: 'Sovereign Digital Masterpieces',
      projectsDesc: 'Live platform environments engineered to dominate worldwide markets using cutting-edge server-first structures and zero-latency core rendering.',
      systemStatus: 'Edge Node Status: Optimal (100%)',
      frameworkLabel: 'Unified Enterprise Framework Protocol // 2026 Standards',
      pillars: [
        { icon: <Cpu size={24} className="text-brand-gold" />, title: 'Next-Gen Core Compute', desc: 'Full dynamic compiling utilizing distributed Edge Server Rendering for loading phases that exceed legacy speeds.', code: 'const render = await edge.compile({ strategy: "Server-First" });' },
        { icon: <Code2 size={24} className="text-brand-gold" />, title: 'Sovereign Code Matrix', desc: 'Clean codebase layout supporting pristine 2026 regulations to lock down zero runtime vulnerabilities.', code: 'export const config = { runtime: "edge", isolation: true };' },
        { icon: <Layers size={24} className="text-brand-gold" />, title: 'Intelligent Automations', desc: 'Instant central pipelines linking payment vectors, internal analytics, and AI services with no overhead delay.', code: 'await pipeline.trigger("payment_gateway", { secure: true });' },
        { icon: <Zap size={24} className="text-brand-gold" />, title: 'Sovereign Algorithmic SEO', desc: 'Advanced technical data structure crafted for contemporary search loops to scale market authority.', code: 'seo.injectMatrix({ coreWebVitals: "CLS: 0.0, LCP: 0.2s" });' }
      ],
      projects: [
        { icon: <GraduationCap size={20} className="text-brand-gold" />, title: 'British Academy', category: 'International Education Core 2026', desc: 'Advanced cloud framework built to deploy top-tier educational assets under responsive global protection standards.', url: 'https://britishacademyss.vercel.app/' },
        { icon: <User size={20} className="text-brand-gold" />, title: 'Jimmy Prestige Portfolio', category: 'High-End Digital Identity', desc: 'A cinematic digital stage demonstrating absolute modern web engineering and elite automation logic for 2026.', url: 'https://mojimmy-portfolio.vercel.app/' },
        { icon: <Landmark size={20} className="text-brand-gold" />, title: 'Al-Harithi Law Firm', category: 'Sovereign Legal Ecosystem', desc: 'Secure platform dedicated to corporate juridical actions, automated user routing, and encrypted legal vaults.', url: 'https://hhlawyer.vercel.app/' },
        { icon: <ShieldAlert size={20} className="text-brand-gold" />, title: 'Central ICFB Portal', category: 'Ecosystem Matrix & Networks', desc: 'High-performance application pairing and dedicated isolation structures engineered for seamless continuous loadtimes.', url: 'https://icfb.vercel.app/' },
        { icon: <Globe size={20} className="text-brand-gold" />, title: 'Jawharat Al-Danat', category: 'Enterprise Commercial Engine', desc: 'An interactive cross-border multilingual interface displaying premium properties and regional investment frameworks.', url: 'https://jawharat-al-danat.vercel.app/ar' }
      ],
      techSpecsTitle: 'Runtime Performance Specs (2026 Protocol)',
      specs: [
        { label: 'Processing Speed (LCP)', value: '0.2 Seconds (Instantaneous)' },
        { label: 'Session Integrity Matrix', value: 'Post-Quantum Dual Encryption' },
        { label: 'Cloud Deployment Base', value: 'Isolated Dynamic Edge Nodes' },
        { label: 'Adaptive Layout Grid', value: '100% Hyper-Responsive Matrix' }
      ]
    }
  }[lang];

  return (
    <div className="w-full bg-brand-light-bg text-brand-navy-dark relative min-h-screen font-cairo selection:bg-brand-gold/30 overflow-x-hidden flex flex-col items-center pb-24" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 📐 خلفية المخطط الهندسي السيادي الرقمي */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* 🔮 المؤثرات اللونية العائمة الفخمة */}
      <div className="absolute top-[-5%] left-1/4 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      {/* 🧭 زر العودة للمركز الرئيسي بنعومة كاملة */}
      <nav className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pt-8 relative z-10 flex justify-start">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2.5 text-xs font-black px-6 py-4 rounded-xl bg-white border border-brand-navy-dark/10 shadow-xs text-brand-navy-dark hover:border-brand-gold/50 transition-all duration-300 active:scale-98 cursor-pointer"
        >
          {isRtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
          <span>{t.backBtn}</span>
        </Link>
      </nav>

      {/* 👑 [Section 1]: الهيرو الفاخر بتصميم معزول وسينمائي */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 flex flex-col items-center text-center relative z-10">
        <div className="space-y-6 max-w-4xl animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-gold/30 shadow-xs">
            <Radio size={12} className="text-brand-gold animate-pulse" />
            <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-brand-navy-dark/70">
              {t.badge}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-din font-black text-brand-navy-dark tracking-tight leading-[1.15]">
            {t.title}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-brand-navy-dark/70 font-medium leading-relaxed max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="pt-6">
            <Link 
              href={`/${lang}?consult=open`}
              className="group inline-flex items-center gap-3.5 bg-brand-navy-dark text-white px-10 py-5 rounded-xl font-bold text-sm tracking-wide shadow-xl transition-all duration-300 cursor-pointer hover:bg-brand-gold hover:text-brand-navy-dark active:scale-[0.98]"
            >
              <span>{t.ctaBtn}</span>
              <TerminalSquare size={18} className="text-brand-gold transition-transform group-hover:rotate-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🏛️ [Section 2]: مختبر المعايير البرمجية التفاعلي (Interactive Code Lab) */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy-dark">{t.philosophyTitle}</h2>
          <p className="text-xs md:text-sm font-bold text-brand-navy-dark/50 max-w-xl mx-auto">{t.philosophyDesc}</p>
        </div>

        {/* شبكة المعالجة التفاعلية (Split Screen Matrix) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          {/* الاختيارات الجانبية */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {t.pillars.map((pillar, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPillar(idx)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                  selectedPillar === idx 
                    ? 'border-brand-gold bg-white shadow-md shadow-brand-gold/5 font-black' 
                    : 'border-brand-navy-dark/[0.03] bg-white/60 hover:border-brand-navy-dark/10'
                }`}
              >
                <div className={`p-3 rounded-xl transition-colors ${selectedPillar === idx ? 'bg-brand-gold text-brand-navy-dark' : 'bg-brand-light-bg text-brand-gold'}`}>
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-brand-navy-dark">{pillar.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* لوحة العرض البرمجية والـ IDE التفاعلي لـ 2026 */}
          <div className="lg:col-span-7 bg-brand-navy-dark text-white p-6 sm:p-8 rounded-[2rem] border border-white/[0.06] shadow-xl flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05),transparent_70%) pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono tracking-widest text-brand-gold">
                <span>VIP_CORE_EXPLORER // NODE_0{selectedPillar + 1}</span>
                <Sparkles size={14} className="animate-spin text-brand-gold" />
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
                {t.pillars[selectedPillar].desc}
              </p>
            </div>

            {/* سطر الكود البرمجي التنفيذي التفاعلي */}
            <div className="mt-8 bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-[11px] sm:text-xs text-emerald-400 overflow-x-auto [scrollbar-width:none] relative z-10">
              <span className="text-white/40 select-none mr-2">❯</span> {t.pillars[selectedPillar].code}
            </div>
          </div>
        </div>
      </section>

      {/* 💎 [Section 3]: معرض روائع الأصول الرقمية (Bento Grid) بملامح فاخرة */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy-dark">{t.projectsTitle}</h2>
          <p className="text-xs md:text-sm font-bold text-brand-navy-dark/50 max-w-xl mx-auto">{t.projectsDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {t.projects.map((project, idx) => {
            const isLargeCard = idx === 0 || idx === 4;
            return (
              <Link 
                key={idx} 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white border border-brand-navy-dark/[0.03] p-6 sm:p-8 rounded-[2rem] shadow-xs flex flex-col justify-between items-start text-start relative overflow-hidden min-h-[380px] transition-all duration-500 md:hover:border-brand-gold/40 md:hover:shadow-lg md:hover:-translate-y-1 group cursor-pointer ${
                  isLargeCard ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div className="w-full">
                  <div className="w-full flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-brand-light-bg border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-3xs shrink-0">
                      {project.icon}
                    </div>
                    <div className="text-brand-navy-dark/20 group-hover:text-brand-gold transition-colors duration-300">
                      <ExternalLink size={15} />
                    </div>
                  </div>
                  
                  <span className="text-[9px] font-black tracking-wider text-brand-gold uppercase bg-brand-gold/5 px-3 py-1 rounded-full border border-brand-gold/10 inline-block mb-3">
                    {project.category}
                  </span>
                  
                  <h3 className="text-xl font-black text-brand-navy-dark mb-2 group-hover:text-brand-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm leading-relaxed font-medium text-brand-navy-dark/60 max-w-md">
                    {project.desc}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between gap-3 text-[10px] font-black border-t border-brand-navy-dark/[0.04] pt-5 mt-6 text-brand-navy-dark/40 group-hover:text-brand-navy-dark transition-colors duration-300">
                  <span>{isRtl ? 'معاينة البث الحي للمنصة' : 'Live Runtime Preview'}</span>
                  <div className="w-7 h-7 rounded-full bg-brand-light-bg flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy-dark transition-all duration-300 shrink-0">
                    {isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 📊 [Section 4]: لوحة المواصفات الفورية وشريط الأداء الحي التفاعلي */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-white border border-brand-navy-dark/[0.04] rounded-[2.5rem] p-6 sm:p-10 shadow-xs relative overflow-hidden w-full">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-gold to-brand-gold-hover" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-center md:text-start">
            <div className="space-y-1 flex flex-col items-center md:items-start">
              <h3 className="text-lg md:text-2xl font-black text-brand-navy-dark flex items-center gap-2">
                <ShieldCheck size={24} className="text-brand-gold" />
                {t.techSpecsTitle}
              </h3>
              <p className="text-[9px] tracking-widest uppercase font-bold text-brand-navy-dark/40">{t.frameworkLabel}</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-700 tracking-wide">{t.systemStatus}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8">
            {t.specs.map((spec, i) => (
              <div key={i} className="bg-brand-light-bg/40 border border-brand-navy-dark/5 rounded-xl p-5 flex flex-col gap-2 justify-between min-h-[110px] transition-all duration-300 hover:bg-white hover:border-brand-gold/30 hover:shadow-md group">
                <span className="text-[9px] md:text-[10px] font-bold text-brand-navy-dark/40 uppercase tracking-wider">
                  {spec.label}
                </span>
                <span className="font-black text-xs sm:text-sm text-brand-navy-dark flex items-center justify-between gap-1">
                  {spec.value}
                  <ArrowUpRight size={12} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-all" />
                </span>
              </div>
            ))}
          </div>

          {/* 📟 شريط الـ HUD والـ Live Process البصري لعام 2026 المذهل */}
          <div className="w-full bg-brand-navy-dark text-white rounded-xl p-3 px-4 font-mono text-[10px] flex items-center gap-3 border border-white/5 opacity-80 shadow-inner">
            <Terminal size={12} className="text-brand-gold animate-pulse shrink-0" />
            <span className="text-brand-gold/60 select-none">SYSTEM_MONITOR:</span>
            <span className="text-emerald-400 tracking-wider font-bold animate-pulse truncate">{terminalLine}</span>
          </div>

        </div>
      </section>

      {/* 🎬 مؤثرات الأنيميشن لعام 2026 */}
      <style jsx global>{`
        @keyframes fadeInUpCoreNode {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUpCoreNode 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}