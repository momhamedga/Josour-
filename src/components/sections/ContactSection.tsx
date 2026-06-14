'use client';

import { useState } from 'react';
import { Language } from '@/config/josour-content';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface ContactProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isRtl = lang === 'ar';

  const tC = {
    ar: {
      title: 'اتصل بنا وابدأ استثمارك اليوم',
      subtitle: 'فريق المستشارين بانتظارك لتقديم موعد استشاري فوري ودراسة ملف تأسيس شركتك.',
      name: 'اسم المنشأة / المستثمر الكريم',
      email: 'البريد الإلكتروني الرسمي',
      phone: 'رقم الاتصال (واتساب)',
      msg: 'تفاصيل الخدمة المطلوبة',
      btn: 'إرسال طلب الاستشارة الحرة',
      success: 'تم إرسال طلبكم بنجاح! سيتصل بك مستشارك الإداري خلال ساعة واحدة. ✨',
    },
    en: {
      title: 'Contact Our Advisory Council',
      subtitle: 'Our management consultants are ready to audit your corporate files and launch your license.',
      name: 'Investor / Company Full Name',
      email: 'Official Business Email',
      phone: 'Contact Number (WhatsApp)',
      msg: 'Required Service Details',
      btn: 'Submit Consultancy Request',
      success: 'Request sent successfully! Your consultant will call you within 1 hour. ✨',
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  return (
    <section 
      id="contact" 
      className="py-14 md:py-24 bg-white relative overflow-hidden px-4 sm:px-6 border-t border-brand-gold/10 font-cairo"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 📐 هالة الإضاءة الخلفية المستقرة معيار OKLCH */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] md:max-w-[800px] h-[600px] md:h-[800px] bg-brand-gold/5 rounded-full blur-[140px] md:blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10 items-center w-full">
        
        {/* 🏛️ يسار القسم: معلومات المكاتب الرسمية - تمركز تام على الجوال وجانبي على الديسكتوب */}
        <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-start space-y-6 md:space-y-8 w-full">
          <div className="space-y-3 w-full flex flex-col items-center lg:items-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-brand-navy-dark tracking-tight leading-[1.3] lg:leading-[1.2] text-center lg:text-start px-2">
              {tC.title}
            </h2>
            <div className="w-14 md:w-16 h-1 bg-brand-gold rounded-full mx-auto lg:mx-0" />
            <p className="text-brand-navy-dark/75 text-xs sm:text-sm md:text-base leading-relaxed font-medium text-center lg:text-start px-4 lg:px-0">
              {tC.subtitle}
            </p>
          </div>

          {/* كبسولات معلومات التواصل ملمومة وناعمة الخط على الموبايل */}
          <div className="space-y-2.5 w-full max-w-md lg:max-w-none text-start text-[11px] sm:text-xs md:text-sm font-bold text-brand-navy-dark/80">
            <div className="flex items-center gap-2.5 p-3.5 bg-brand-light-bg border border-brand-navy-dark/[0.03] rounded-xl shadow-2xs">
              <MapPin size={15} className="text-brand-gold shrink-0 sm:w-[18px] sm:h-[18px]" />
              <span className="truncate">{isRtl ? 'الإمارات العربية المتحدة - دبي / أبوظبي' : 'United Arab Emirates - Dubai / Abu Dhabi'}</span>
            </div>
            
            <div className="flex items-center gap-2.5 p-3.5 bg-brand-light-bg border border-brand-navy-dark/[0.03] rounded-xl shadow-2xs">
              <Mail size={15} className="text-brand-gold shrink-0 sm:w-[18px] sm:h-[18px]" />
              <span className="select-all truncate">support@josour-international.com</span>
            </div>
            
            <div className="flex items-center gap-2.5 p-3.5 bg-brand-light-bg border border-brand-navy-dark/[0.03] rounded-xl shadow-2xs">
              <Phone size={15} className="text-brand-gold shrink-0 sm:w-[18px] sm:h-[18px]" />
              <span dir="ltr" className="select-all font-mono">+971 4 222 3333</span>
            </div>
          </div>
        </div>

        {/* 💎 يمين القسم: الفُورم الذهبي الفخم - بحجم ملموم وناعم الخطوط على الجوال */}
        <div className="lg:col-span-7 bg-brand-light-bg border border-brand-gold/10 rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 md:p-10 shadow-2xs w-full max-w-xl mx-auto">
          {sent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center font-bold flex items-center justify-center gap-2 animate-fadeIn">
              <CheckCircle size={18} className="text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm leading-relaxed">{tC.success}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-[11px] sm:text-xs md:text-sm font-bold text-brand-navy-dark/70 w-full text-start">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-start">
                <div className="space-y-1.5 flex flex-col items-start w-full text-start">
                  <label className="font-black text-brand-navy-dark text-start">{tC.name}</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-3.5 py-2.5 sm:py-3.5 text-brand-navy-dark font-medium focus:outline-hidden focus:border-brand-gold text-xs sm:text-sm text-start" 
                  />
                </div>
                <div className="space-y-1.5 flex flex-col items-start w-full text-start">
                  <label className="font-black text-brand-navy-dark text-start">{tC.email}</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-3.5 py-2.5 sm:py-3.5 text-brand-navy-dark font-medium focus:outline-hidden focus:border-brand-gold text-xs sm:text-sm text-start" 
                  />
                </div>
              </div>

              {/* 🛠️ حل رقم الهاتف: فرض اتجاه ltr ثابت ومحاذاة يسار كاملة لمنع شقلبة الـ + والأرقام */}
              <div className="space-y-1.5 flex flex-col items-start w-full text-start">
                <label className="font-black text-brand-navy-dark text-start">{tC.phone}</label>
                <input 
                  type="tel" 
                  required 
                  dir="ltr"
                  placeholder={isRtl ? "00971500000000" : "+971 50 000 0000"}
                  className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-3.5 py-2.5 sm:py-3.5 text-brand-navy-dark font-medium focus:outline-hidden focus:border-brand-gold text-xs sm:text-sm text-left tracking-wide placeholder:text-brand-navy-dark/20" 
                />
              </div>

              <div className="space-y-1.5 flex flex-col items-start w-full text-start">
                <label className="font-black text-brand-navy-dark text-start">{tC.msg}</label>
                <textarea 
                  rows={3} 
                  required 
                  className="w-full bg-white border border-brand-navy-dark/10 rounded-xl p-3 sm:p-4 text-brand-navy-dark font-medium focus:outline-hidden focus:border-brand-gold resize-none transition-all text-xs sm:text-sm text-start" 
                />
              </div>

              {/* 👑 زر الإرسال الملكي: فك الخنقة بمسافات مريحة وتجاوب تام */}
              <div className="pt-1 w-full">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full bg-brand-navy-dark text-white font-bold py-3.5 sm:py-4.5 rounded-xl shadow-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer md:hover:bg-brand-gold md:hover:text-brand-navy-dark active:scale-[0.98] disabled:opacity-40 select-none text-xs sm:text-sm md:text-base text-center"
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