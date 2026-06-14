'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { siteContent, Language } from '@/config/josour-content';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Building2, Briefcase, FileCheck, Check, Smartphone } from 'lucide-react';

export default function ConsultationModal({ lang }: { lang: Language }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get('consult') === 'open';
  const isRtl = lang === 'ar';
  
  const t = siteContent[lang].consultationModal;
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form States
  const [service, setService] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // إعادة ضبط المودال عند القفل لضمان انسيابية التجربة التالية
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
        setService('');
        setName('');
        setPhone('');
        setEmail('');
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    router.push(`/${lang}`, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4 font-cairo" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* الطبقة الشفافة الخلفية بنعومة سينمائية ومزج بلوري */}
      <div className="absolute inset-0 bg-brand-navy-dark/60 backdrop-blur-md transition-opacity animate-fade-in" onClick={handleClose} />

      {/* 👑 جسم المودال السيادي - تم نسف الاسكرول الخارجي ليتدفق بنعومة تامة */}
      <div className="relative w-full sm:max-w-xl bg-white text-brand-navy-dark rounded-t-[2rem] sm:rounded-[2rem] p-6 sm:p-8 max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl transition-all z-10 animate-[slideUp_0.4s_ease-out] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* زر قفل علوي سريع وسهل اللمس */}
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 rounded-full bg-brand-light-bg text-brand-navy-dark/60 hover:text-brand-navy-dark transition-colors cursor-pointer relative z-50">
          <X size={18} />
        </button>

        {!isSuccess ? (
          <div className="pb-4">
            {/* العناوين والبادج الإرشادي */}
            <div className="mb-6 mt-2">
              <h2 className="text-xl sm:text-2xl font-black text-brand-navy-dark tracking-tight">{t.title}</h2>
              <p className="text-xs sm:text-sm text-brand-navy-dark/60 mt-1">{t.subtitle}</p>
            </div>

            {/* خط الخطوات البصري المرن (Stepper) */}
            <div className="flex items-center justify-between mb-8 relative px-2">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-light-bg -translate-y-1/2 z-0" />
              {[1, 2, 3].map((s) => (
                <div key={s} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    step >= s ? 'bg-brand-gold text-brand-navy-dark shadow-md' : 'bg-brand-light-bg text-brand-navy-dark/40'
                  }`}>
                    {step > s ? <Check size={14} strokeWidth={3} /> : s}
                  </div>
                  <span className={`text-[10px] font-bold mt-1.5 transition-colors hidden sm:block ${step >= s ? 'text-brand-navy-dark' : 'text-brand-navy-dark/40'}`}>
                    {t.steps[s - 1]}
                  </span>
                </div>
              ))}
            </div>

            {/* محتوى الاستمارة */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* الخطوة 1: اختيار الخدمة بـ Cards كبار ومريحة للضغط */}
              {step === 1 && (
                <div className="space-y-3 animate-fade-in">
                  <label className="text-sm font-bold text-brand-navy-dark block mb-1">{t.fields.serviceType}</label>
                  {[
                    { id: 'corporate', label: t.fields.corporate, icon: <Building2 size={18} /> },
                    { id: 'visas', label: t.fields.visas, icon: <Smartphone size={18} /> },
                    { id: 'iso', label: t.fields.iso, icon: <FileCheck size={18} /> },
                    { id: 'web', label: t.fields.web, icon: <Briefcase size={18} /> },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setService(opt.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.99] ${
                        service === opt.id 
                          ? 'border-brand-gold bg-brand-gold/5 text-brand-navy-dark font-black' 
                          : 'border-brand-light-bg hover:border-brand-navy-dark/10 bg-brand-light-bg/40'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${service === opt.id ? 'bg-brand-gold text-brand-navy-dark' : 'bg-white text-brand-gold shadow-xs'}`}>
                        {opt.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-bold">{opt.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* الخطوة 2: بيانات الاتصال مدعومة بـ Input مريح لليد */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="text-xs font-bold text-brand-navy-dark/80 block mb-1.5">{t.fields.name}</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.fields.namePlaceholder}
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-light-bg/60 border border-brand-light-bg focus:border-brand-gold focus:bg-white outline-none transition-all font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-brand-navy-dark/80 block mb-1.5">{t.fields.phone}</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.fields.phonePlaceholder}
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-light-bg/60 border border-brand-light-bg focus:border-brand-gold focus:bg-white outline-none transition-all font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* الخطوة 3: البريد ومراجعة سريعة قبل الإرسال */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="text-xs font-bold text-brand-navy-dark/80 block mb-1.5">{t.fields.email}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.fields.emailPlaceholder}
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-brand-light-bg/60 border border-brand-light-bg focus:border-brand-gold focus:bg-white outline-none transition-all font-semibold"
                    />
                  </div>
                  
                  {/* صندوق المراجعة الفاخر */}
                  <div className="p-4 rounded-xl bg-brand-light-bg/50 border border-brand-light-bg text-xs space-y-2">
                    <div className="flex justify-between"><span className="opacity-60">{t.fields.name}:</span> <span className="font-bold">{name}</span></div>
                    <div className="flex justify-between"><span className="opacity-60">{t.fields.phone}:</span> <span className="font-bold">{phone}</span></div>
                  </div>
                </div>
              )}

              {/* أزرار التحكم والتنقل السفلي مريحة جداً للإبهام على الموبايل */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-light-bg">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-4 text-xs font-bold rounded-xl border border-brand-navy-dark/10 hover:bg-brand-light-bg active:scale-98 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                    {t.prev}
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    disabled={step === 1 && !service}
                    onClick={() => setStep(step + 1)}
                    className="flex-3 py-4 text-xs font-black rounded-xl bg-brand-navy-dark text-white disabled:opacity-40 disabled:pointer-events-none active:scale-98 shadow-md hover:bg-brand-gold hover:text-brand-navy-dark transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {t.next}
                    {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-3 py-4 text-xs font-black rounded-xl bg-brand-gold text-brand-navy-dark shadow-lg shadow-brand-gold/10 active:scale-98 hover:bg-brand-navy-dark hover:text-white transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "..." : t.submit}
                  </button>
                )}
              </div>

            </form>
          </div>
        ) : (
          /* واجهة النجاح المبهجة والبلورية السريعة */
          <div className="text-center py-10 flex flex-col items-center justify-center animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-black text-brand-navy-dark">{t.successTitle}</h3>
            <p className="text-sm text-brand-navy-dark/60 max-w-sm mt-2 leading-relaxed">{t.successDesc}</p>
            <button
              onClick={handleClose}
              className="mt-8 bg-brand-navy-dark text-white font-bold text-xs px-8 py-3.5 rounded-xl hover:bg-brand-gold hover:text-brand-navy-dark transition-all shadow-md cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}

      </div>
      
      {/* ستايلات الـ Animation لجمال ونعومة تشغيل الـ Bottom Sheet */}
      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @media (min-width: 640px) {
          @keyframes slideUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        }
      `}</style>
    </div>
  );
}