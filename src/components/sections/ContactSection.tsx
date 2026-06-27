'use client';

import { useState } from 'react';
import { Language } from '@/config/josour-content';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link'; // 👈 الالتزام المطلق بـ Link لمكونات التنقل الآمنة والسريعة

interface ContactProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isRtl = lang === 'ar';

  // الهواتف الرسمية بدون مفتاح الدولة للعرض البصري المريح للمستثمر المحلي بالخليج
  const displayPhone1 = "055 798 3500";
  const displayPhone2 = "054 477 0987";
  
  // الروابط العميقة مدمج بها الكود الدولي لتعمل بنجاح عند الضغط
  const linkPhone1 = "tel:+971557983500";
  const linkPhone2 = "tel:+971544770987";
  const emailCompany = "info.jusoorint@gmail.com";

  const tC = {
    ar: {
      tag: '✨ مكتب المستشار الإداري المباشر',
      title: 'ابدأ مسارك الاستثماري في الإمارات اليوم',
      subtitle: 'فريق خبراء ومستشاري جسور انترناشيونال بانتظاركم لمراجعة ملف منشأتكم وتنسيق إجراءات التأسيس فوراً.',
      name: 'اسم الكيان التجاري / المستثمر الكريم',
      email: 'البريد الإلكتروني الرسمي للمنشأة',
      phone: 'رقم الهاتف الإماراتي',
      msg: 'تفاصيل المشروع الاستشاري أو التأسيسي المطلوب',
      btn: 'إرسال طلب الاستشارة والاعتماد',
      success: 'تم إرسال مسار طلبكم بنجاح! سيتواصل معكم مستشاركم الإداري عبر الهاتف أو الواتساب خلال أقل من 15 دقيقة. ✨',
    },
    en: {
      tag: '✨ Direct Management Consultant Office',
      title: 'Initiate Your UAE Investment Track Today',
      subtitle: 'Jusoor International strategic advisors are ready to audit your corporate records and execute your trade license blueprints.',
      name: 'Investor / Corporate Entity Full Name',
      email: 'Official Business Email Address',
      phone: 'UAE Contact Number',
      msg: 'Required Advisory or Corporate Setup Details',
      btn: 'Submit Strategy & Consult Request',
      success: 'Your request profile has been deployed! Your designated consultant will reach out via call or WhatsApp within 15 minutes. ✨',
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setTimeout(() => setSent(false), 6000);
    }, 1100);
  };

  return (
    <section 
      id="contact" 
      className="py-24 md:py-36 bg-gradient-to-b from-brand-light-bg via-white to-brand-light-bg relative overflow-hidden px-4 sm:px-6 border-t border-brand-gold/15 font-cairo"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 🔮 توهج لؤلؤي محيطي فخم ومريح للعين */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[700px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(oklch(0.18_0.04_250_/_0.012)_1px,transparent_1px)] [background-size:28px_28px] opacity-100 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 items-center w-full">
        
        {/* 🏛️ يسار القسم: شق القنوات الاستشارية الرسمية المحدثة بالكامل */}
        <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-start space-y-6 md:space-y-8 w-full">
          
          <div className="space-y-4 w-full flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-brand-gold/20 text-brand-gold text-[10px] md:text-xs font-black tracking-wide shadow-3xs animate-fadeIn">
              <Sparkles size={11} className="text-brand-gold animate-pulse" />
              <span>{tC.tag}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-brand-navy-dark tracking-tight leading-[1.25] text-center lg:text-start px-1 w-full">
              {tC.title}
            </h2>
            <div className="w-16 md:w-20 h-[3px] bg-gradient-to-r from-brand-gold to-brand-gold-hover rounded-full mx-auto lg:mx-0" />
            <p className="text-brand-navy-dark/70 text-xs sm:text-sm md:text-base leading-relaxed font-medium text-center lg:text-start px-2 lg:px-0">
              {tC.subtitle}
            </p>
          </div>

          <div className="space-y-3 w-full max-w-md lg:max-w-none text-start text-[11px] sm:text-xs md:text-sm font-bold text-brand-navy-dark/80">
            
            {/* بطاقة الموقع الجغرافي */}
            <div className="flex items-center gap-3 p-4 bg-white border border-brand-navy-dark/[0.04] rounded-2xl shadow-3xs hover:border-brand-gold/20 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 shadow-3xs">
                <MapPin size={15} />
              </div>
              <span className="truncate w-full rtl:text-right ltr:text-left">{isRtl ? 'دولة الإمارات العربية المتحدة - دبي' : 'United Arab Emirates - Dubai'}</span>
            </div>
            
            {/* بطاقة البريد الإلكتروني السحابي عبر Link */}
            <div className="flex items-center gap-3 p-4 bg-white border border-brand-navy-dark/[0.04] rounded-2xl shadow-3xs hover:border-brand-gold/20 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 shadow-3xs">
                <Mail size={15} />
              </div>
              <Link href={`mailto:${emailCompany}`} className="select-all truncate text-gray-600 hover:text-brand-gold transition-colors w-full rtl:text-right ltr:text-left">{emailCompany}</Link>
            </div>
            
    {/* الهواتف المحلية المطهّرة تفاعلياً عبر Link لمنع شقلبة الأرقام نهائياً */}
<div className="flex flex-col sm:flex-row gap-3 w-full font-mono text-[11px] sm:text-xs">
  
  <Link href={linkPhone1} className="flex-1 flex items-center gap-3 p-4 bg-white border border-brand-navy-dark/[0.04] rounded-2xl shadow-3xs hover:border-emerald-500/20 hover:shadow-xs transition-all duration-300 text-start group">
    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-3xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
      <Phone size={14} />
    </div>
    <div className="flex flex-col text-start">
      {/* 🌟 الحل السحري: حقن dir="ltr" لتثبيت قراءة وترتيب الأرقام والمسافات بدقة */}
      <span className="text-brand-navy-dark/80 font-mono tracking-wide block w-full text-left" dir="ltr">
        {displayPhone1}
      </span>
      <span className="text-[9px] text-emerald-500 font-black font-cairo mt-0.5 w-full rtl:text-right ltr:text-left">
        {isRtl ? 'اتصال مباشر / واتساب' : 'Call / WhatsApp Live'}
      </span>
    </div>
  </Link>

  <Link href={linkPhone2} className="flex-1 flex items-center gap-3 p-4 bg-white border border-brand-navy-dark/[0.04] rounded-2xl shadow-3xs hover:border-emerald-500/20 hover:shadow-xs transition-all duration-300 text-start group">
    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-3xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
      <Phone size={14} />
    </div>
    <div className="flex flex-col text-start">
      {/* 🌟 نفس الإصلاح هنا لثبات وتطابق المحاذاة */}
      <span className="text-brand-navy-dark/80 font-mono tracking-wide block w-full text-left" dir="ltr">
        {displayPhone2}
      </span>
      <span className="text-[9px] text-emerald-500 font-black font-cairo mt-0.5 w-full rtl:text-right ltr:text-left">
        {isRtl ? 'المستشار المناوب' : 'Secondary Registry'}
      </span>
    </div>
  </Link>

</div>

          </div>
        </div>

        {/* 💎 يمين القسم: حقل الاستمارات المعزز بأحكام التوجيه التام (RTL) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-white to-white/[0.6] border border-brand-gold/15 rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-lg backdrop-blur-md w-full max-w-xl mx-auto">
          {sent ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center font-black flex flex-col items-center justify-center gap-3 shadow-inner animate-fadeIn">
              <CheckCircle size={28} className="text-emerald-600 shrink-0 animate-bounce" />
              <p className="text-xs sm:text-sm leading-relaxed max-w-sm font-semibold text-center">{tC.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-[11px] sm:text-xs md:text-sm font-bold text-brand-navy-dark/70 w-full">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-2 flex flex-col items-start w-full">
                  <label className="font-black text-brand-navy-dark px-0.5 rtl:text-right ltr:text-left w-full">{tC.name}</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-4 py-3 text-brand-navy-dark font-semibold focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-3xs text-xs sm:text-sm transition-all text-start rtl:text-right ltr:text-left" 
                  />
                </div>
                <div className="space-y-2 flex flex-col items-start w-full">
                  <label className="font-black text-brand-navy-dark px-0.5 rtl:text-right ltr:text-left w-full">{tC.email}</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-4 py-3 text-brand-navy-dark font-semibold focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-3xs text-xs sm:text-sm transition-all text-start rtl:text-left ltr:text-left font-mono" 
                  />
                </div>
              </div>

              {/* حقل إدخال الهاتف الذكي */}
              <div className="space-y-2 flex flex-col items-start w-full">
                <label className="font-black text-brand-navy-dark px-0.5 rtl:text-right ltr:text-left w-full">{tC.phone}</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-4 py-3 text-brand-navy-dark font-semibold focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-3xs text-xs sm:text-sm transition-all text-start rtl:text-right ltr:text-left placeholder:text-brand-navy-dark/20" 
                  placeholder={isRtl ? "مثال: 0557983500" : "e.g., 0557983500"}
                />
              </div>

              {/* حقل الرسالة والمشروع */}
              <div className="space-y-2 flex flex-col items-start w-full">
                <label className="font-black text-brand-navy-dark px-0.5 rtl:text-right ltr:text-left w-full">{tC.msg}</label>
                <textarea 
                  rows={4} 
                  required 
                  className="w-full bg-white border border-brand-navy-dark/10 rounded-xl p-4 text-brand-navy-dark font-semibold focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-3xs resize-none text-xs sm:text-sm transition-all leading-relaxed text-start rtl:text-right ltr:text-left" 
                />
              </div>

              <div className="pt-2 w-full">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full bg-brand-navy-dark text-white font-black py-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer md:hover:bg-brand-gold md:hover:text-brand-navy-dark active:scale-[0.99] disabled:opacity-40 select-none text-xs sm:text-sm text-center tracking-wide"
                >
                  <Send size={14} className="text-brand-gold transition-colors duration-300 shrink-0 group-hover:text-brand-navy-dark" />
                  <span>{submitting ? '...' : tC.btn}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}