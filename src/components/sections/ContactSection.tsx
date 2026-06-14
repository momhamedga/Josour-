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
      className="py-24 bg-white relative overflow-hidden px-6 border-t border-brand-gold/10 font-cairo"
    >
      {/* 📐 هالة الإضاءة الخلفية المستقرة معيار OKLCH */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 items-center">
        
        {/* 🏛️ يسار القسم: معلومات المكاتب الرسمية لجسور */}
        <div className="lg:col-span-5 space-y-8 text-start">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-navy-dark tracking-tight leading-[1.2]">
              {tC.title}
            </h2>
            <div className="w-16 h-1 bg-brand-gold rounded-full" />
            <p className="text-brand-navy-dark/70 text-sm md:text-base leading-relaxed font-medium">
              {tC.subtitle}
            </p>
          </div>

          <div className="space-y-4 text-xs md:text-sm font-semibold text-brand-navy-dark/80">
            <div className="flex items-center gap-3.5 p-4.5 bg-brand-light-bg border border-brand-navy-dark/[0.04] rounded-2xl shadow-xs">
              <MapPin size={18} className="text-brand-gold shrink-0" />
              <span>{isRtl ? 'الإمارات العربية المتحدة - دبي / أبوظبي' : 'United Arab Emirates - Dubai / Abu Dhabi'}</span>
            </div>
            
            <div className="flex items-center gap-3.5 p-4.5 bg-brand-light-bg border border-brand-navy-dark/[0.04] rounded-2xl shadow-xs">
              <Mail size={18} className="text-brand-gold shrink-0" />
              <span className="select-all">support@josour-international.com</span>
            </div>
            
            <div className="flex items-center gap-3.5 p-4.5 bg-brand-light-bg border border-brand-navy-dark/[0.04] rounded-2xl shadow-xs">
              <Phone size={18} className="text-brand-gold shrink-0" />
              <span dir="ltr" className="select-all">+971 4 222 3333</span>
            </div>
          </div>
        </div>

        {/* 💎 يمين القسم: الفُورم الذهبي الفخم الخالي تماماً من المشاكل والخنقة */}
        <div className="lg:col-span-7 bg-brand-light-bg border border-brand-gold/10 rounded-[2.5rem] p-6 md:p-10 shadow-sm">
          {sent ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center font-bold flex items-center justify-center gap-3 animate-fadeIn">
              <CheckCircle size={22} className="text-emerald-600 shrink-0" />
              <span className="text-sm md:text-base leading-relaxed">{tC.success}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs md:text-sm font-semibold text-brand-navy-dark/70 w-full text-start">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-2 flex flex-col items-start w-full">
                  <label className="font-black text-brand-navy-dark">{tC.name}</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-4 py-3.5 text-brand-navy-dark font-medium focus:outline-none focus:border-brand-gold/50 transition-all duration-300 text-sm" 
                  />
                </div>
                <div className="space-y-2 flex flex-col items-start w-full">
                  <label className="font-black text-brand-navy-dark">{tC.email}</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-4 py-3.5 text-brand-navy-dark font-medium focus:outline-none focus:border-brand-gold/50 transition-all duration-300 text-sm" 
                  />
                </div>
              </div>

              {/* 🛠️ حل كارثة رقم الهاتف: فرض اتجاه ltr ثابت ومحاذاة يسار كاملة لمنع شقلبة الـ + والأرقام نهائياً */}
              <div className="space-y-2 flex flex-col items-start w-full">
                <label className="font-black text-brand-navy-dark">{tC.phone}</label>
                <input 
                  type="tel" 
                  required 
                  dir="ltr"
                  placeholder={isRtl ? "مثال: 00971500000000" : "+971 50 000 0000"}
                  className="w-full bg-white border border-brand-navy-dark/10 rounded-xl px-4 py-3.5 text-brand-navy-dark font-medium focus:outline-none focus:border-brand-gold/50 transition-all duration-300 text-sm text-left tracking-wide placeholder:text-brand-navy-dark/30" 
                />
              </div>

              <div className="space-y-2 flex flex-col items-start w-full">
                <label className="font-black text-brand-navy-dark">{tC.msg}</label>
                <textarea 
                  rows={4} 
                  required 
                  className="w-full bg-white border border-brand-navy-dark/10 rounded-xl p-4 text-brand-navy-dark font-medium focus:outline-none focus:border-brand-gold/50 resize-none transition-all duration-300 text-sm" 
                />
              </div>

              {/* 👑 حل زر الإرسال الملكي: فك الخنقة بـ py-5 مع تفعيل كلاس الـ group والـ Hover المستقر ديسكتوب */}
              <div className="pt-2 w-full">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full bg-brand-navy-dark text-white font-bold py-5 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer md:hover:bg-brand-gold md:hover:text-brand-navy-dark md:hover:shadow-brand-gold/20 active:scale-[0.98] disabled:opacity-40 select-none text-sm md:text-base"
                >
                  <Send size={16} className="text-brand-gold transition-colors duration-300 shrink-0 group-hover:text-brand-navy-dark" />
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