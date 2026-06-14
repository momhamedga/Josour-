'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, Crown, Briefcase, Building2, TrendingUp, BarChart3, Radio, ArrowUpRight } from 'lucide-react';

export default function VipServicesPage({ params }: { params: { lang: 'ar' | 'en' } }) {
  const { lang } = params;
  const isRtl = lang === 'ar';
  
  const t = {
    ar: {
      badge: 'بروتوكول خدمات النخبة 2026 // الاستثمار السيادي',
      title: 'خدمات رجال الأعمال والاستثمارات الاستراتيجية',
      subtitle: 'نقدم حلولاً متكاملة للنخبة، من تأسيس الشركات في المناطق الحرة إلى إدارة العلاقات المصرفية وتطوير دراسات الجدوى. نحن بوابتك نحو الريادة في سوق الإمارات.',
      backBtn: 'العودة للمركز الرئيسي',
      ctaBtn: 'طلب استشارة استثمارية خاصة'
    },
    en: {
      badge: 'ELITE PROTOCOL 2026 // SOVEREIGN INVESTMENT',
      title: 'Investor & Elite VIP Business Services',
      subtitle: 'Comprehensive solutions for top-tier clients, from Freezone company formation to banking relationship management and feasibility studies. Your gateway to market leadership in the UAE.',
      backBtn: 'Return to Command Center',
      ctaBtn: 'Request Private Investment Consultation'
    }
  }[lang];

  return (
    <div className="w-full bg-brand-light-bg min-h-screen text-brand-navy-dark font-cairo" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* المخطط الفخم - مساحة الهيرو */}
      <nav className="max-w-7xl mx-auto px-6 pt-8">
        <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-xs font-bold px-6 py-4 rounded-xl bg-white border border-brand-navy-dark/10">
          {isRtl ? <ArrowRight size={15}/> : <ArrowLeft size={15}/>}
          {t.backBtn}
        </Link>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-gold/30 shadow-2xs mb-8">
          <Crown size={14} className="text-brand-gold" />
          <span className="text-[10px] font-bold tracking-widest uppercase">{t.badge}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-brand-navy-dark leading-tight mb-6">{t.title}</h1>
        <p className="text-lg text-brand-navy-dark/70 max-w-2xl leading-relaxed mb-10">{t.subtitle}</p>
        
        <Link href="#contact" className="bg-brand-navy-dark text-white px-12 py-5 rounded-xl font-bold hover:bg-brand-gold transition-colors">
          {t.ctaBtn}
        </Link>
      </section>

      {/* مصفوفة المميزات - استمرارية لنمط الـ Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
        {[
          { icon: <Building2 />, title: isRtl ? "تأسيس المناطق الحرة" : "Freezone Setup" },
          { icon: <Briefcase />, title: isRtl ? "حسابات بنكية" : "Bank Accounts" },
          { icon: <TrendingUp />, title: isRtl ? "دراسات جدوى" : "Feasibility Studies" },
          { icon: <Crown />, title: isRtl ? "مدير علاقات خاص" : "Dedicated Manager" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-brand-navy-dark/5 shadow-sm hover:border-brand-gold/30 transition-all">
            <div className="text-brand-gold mb-6">{item.icon}</div>
            <h3 className="font-bold text-lg">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}