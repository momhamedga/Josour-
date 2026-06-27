'use client';

import { useState } from 'react';
import { Search, Loader2, ArrowLeft, ArrowRight, ShieldCheck, Download, X, Layers, Sparkles } from 'lucide-react';
import { Language } from '@/config/josour-content';
import Link from 'next/navigation';

interface TrackProps {
  lang: Language;
}

export default function TrackSection({ lang }: TrackProps) {
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const isRtl = lang === 'ar';

  const tText = {
    ar: {
      tag: '⚡ نظام الاستعلام السحابي اللحظي',
      title: 'استعلام فوري ومباشر عن المعاملات',
      subtitle: 'تتبع المسار الإداري وحالة الرخص والتأشيرات الخاصة بمنشأتك مباشرة من سحابة جسور الآمنة دون الحاجة لتسجيل الدخول.',
      placeholder: 'أدخل رقم المعاملة السري والخاص بك (app_123)...',
      btn: 'فحص الحساب التتبعي',
      notFound: '⚠️ عذراً، لم نجد أي معاملة مسجلة بهذا السجل الموحد.',
      error: 'حدث خطأ في الاتصال بالسيرفر السحابي، يرجى إعادة المحاولة.',
      modalTitle: 'حالة الاعتماد والتدقيق اللحظي',
      company: 'المنشأة المستثمرة / الشريك:',
      service: 'نوع الخدمة والمستند الصادر:',
      progress: 'نسبة الإنجاز الفعلي:',
      notes: 'تحديث المستشار الإداري اللحظي:',
      downloadBtn: '👁️ معاينة وتحميل الوثيقة الرسمية الصادرة',
      close: 'إغلاق نافذة التتبع',
      statuses: {
        pending: 'قيد الانتظار',
        in_progress: 'جاري المعالجة',
        review: 'تحت التدقيق والمراجعة',
        approved: 'تم الاعتماد والإنهاء بنجاح 🎉',
        rejected: 'تعديلات ومراجعة مطلوبة ⚠️',
      }
    },
    en: {
      tag: '⚡ Instant Cloud Tracking Registry',
      title: 'Real-Time Application Registry Tracking',
      subtitle: 'Monitor the administrative pipeline of your corporate licenses and investment visas instantly from Josour secure cloud storage.',
      placeholder: 'Enter your secure transaction registry ID (e.g., app_123)...',
      btn: 'Track Secure Pipeline',
      notFound: '⚠️ Sorry, no application registry found matching this ID.',
      error: 'Cloud server gateway error occurred while fetching, please retry.',
      modalTitle: 'Live Review & Compliance Status',
      company: 'Investor Entity / Partner:',
      service: 'Service Category & Issued Asset:',
      progress: 'Completion Progress:',
      notes: 'Latest Consultant Strategic Note:',
      downloadBtn: '👁️ Preview & Download Issued Document',
      close: 'Close Registry Window',
      statuses: {
        pending: 'Pending Inquiry',
        in_progress: 'In Active Progress',
        review: 'Under Auditing & Review',
        approved: 'Approved, Issued & Completed 🎉',
        rejected: 'Revision & Actions Required ⚠️',
      }
    }
  }[lang];

  const handleQuickTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId.trim()) return;

    setLoading(true);
    setErrorText(null);
    setResult(null);

    try {
      const res = await fetch(`/api/quick-track?appId=${encodeURIComponent(appId.trim())}`);
      
      if (res.status === 404) {
        setErrorText(tText.notFound);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setErrorText(tText.error);
        setLoading(false);
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data.success && data.data) {
        setResult(data.data); 
      } else {
        setErrorText(tText.notFound);
      }
    } catch (err) {
      console.error(err);
      setErrorText(tText.error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: 'bg-amber-50/60 border-amber-300/40 text-amber-700',
    in_progress: 'bg-indigo-50/60 border-indigo-300/40 text-indigo-700',
    review: 'bg-orange-50/60 border-orange-300/40 text-orange-700',
    approved: 'bg-emerald-50 border-emerald-300/50 text-emerald-700 font-black',
    rejected: 'bg-rose-50 border-rose-300/50 text-rose-700',
  };

  return (
    <section 
      id="track" 
      className="py-24 md:py-36 bg-gradient-to-b from-brand-light-bg via-white to-brand-light-bg relative overflow-hidden px-4 sm:px-6 border-t border-brand-gold/15 font-cairo" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      
      {/* 🔮 توهجات ضوئية ذهبية ولؤلؤية فائقة النعومة متوافقة مع الـ Light Theme */}
      <div className="absolute top-1/4 right-[-5%] w-[40vw] h-[40vw] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-[-5%] w-[35vw] h-[35vw] bg-brand-navy-dark/[0.015] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* خطوط هندسية فخمة لعمق بصري متقدم */}
      <div className="absolute inset-0 bg-[radial-gradient(oklch(0.18_0.04_250_/_0.012)_1px,transparent_1px)] [background-size:28px_28px] opacity-100 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-10 w-full flex flex-col items-center justify-center">
        
        {/* رأس قسم التتبع الموسع والمبهر */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center justify-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-brand-gold/20 text-brand-gold text-[10px] md:text-xs font-black tracking-wide shadow-3xs">
            <Sparkles size={12} className="text-brand-gold animate-pulse" />
            <span>{tText.tag}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-brand-navy-dark tracking-tight px-2 leading-tight">
            {tText.title}
          </h2>
          
          <p className="text-brand-navy-dark/65 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed px-4 text-center">
            {tText.subtitle}
          </p>
        </div>

        {/* 🔍 شريط البحث السينمائي المطور والمحمي من الـ Overflow على أجهزة الموبايل */}
        <div className="w-full max-w-2xl p-2 sm:p-3 rounded-[2rem] bg-gradient-to-br from-white to-white/[0.6] border border-brand-gold/20 shadow-lg backdrop-blur-md animate-scaleUp">
          <form 
            onSubmit={handleQuickTrack} 
            className="bg-white border border-brand-navy-dark/[0.05] rounded-[1.5rem] p-2 flex flex-col sm:flex-row gap-2.5 items-center w-full"
          >
            <div className="relative w-full flex-1 flex items-center">
              <Layers size={16} className={`absolute text-brand-navy-dark/30 pointer-events-none ${isRtl ? 'right-4' : 'left-4'}`} />
              <input 
                type="text"
                required
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder={tText.placeholder}
                className={`w-full bg-transparent border-0 text-xs md:text-sm text-brand-navy-dark font-semibold focus:outline-hidden placeholder-brand-navy-dark/30 h-11 md:h-12 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-brand-navy-dark hover:bg-brand-navy-light text-white font-black text-xs px-6 h-11 md:h-12 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md select-none group"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : null}
              <span>{tText.btn}</span>
              {isRtl ? (
                <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1 duration-200" />
              ) : (
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 duration-200" />
              )}
            </button>
          </form>
        </div>

        {errorText && (
          <div className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl py-3 px-6 max-w-md mx-auto shadow-3xs animate-fadeIn">
            {errorText}
          </div>
        )}
      </div>

      {/* 📟 النافذة المنبثقة البلورية اللؤلؤية الفاخرة (Premium Light Glass Modal) */}
      {result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-dark/20 backdrop-blur-md animate-fadeIn" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="bg-gradient-to-br from-white to-white/[0.9] border border-brand-gold/25 rounded-[2.2rem] max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-5 transform transition-all scale-100 font-cairo">
            
            {/* زر الإغلاق الدائري الناعم */}
            <button 
              onClick={() => setResult(null)}
              className={`absolute top-4 p-1.5 rounded-xl text-brand-navy-dark/40 hover:text-brand-navy-dark bg-brand-light-bg hover:bg-brand-navy-dark/[0.04] transition-all cursor-pointer shadow-3xs ${isRtl ? 'left-4' : 'right-4'}`}
            >
              <X size={14} />
            </button>

            {/* رأس المودال الفخم المذهب */}
            <div className="flex items-center gap-3 border-b border-brand-navy-dark/[0.06] pb-4">
              <div className="w-10 h-10 bg-brand-gold/10 border border-brand-gold/20 rounded-xl text-brand-gold flex items-center justify-center shrink-0 shadow-3xs">
                <ShieldCheck size={18} />
              </div>
              <div className="text-start">
                <h3 className="font-black text-sm md:text-base text-brand-navy-dark leading-tight">{tText.modalTitle}</h3>
                <span className="text-[10px] text-brand-gold font-mono tracking-wider font-black block uppercase mt-0.5 select-all">{result.id}</span>
              </div>
            </div>

            {/* تفاصيل الهيكلة والبيانات المعززة */}
            <div className="space-y-4 text-start w-full">
              <div className="flex justify-between items-center bg-white border border-brand-navy-dark/[0.04] p-3 rounded-xl gap-3 w-full shadow-3xs">
                <div className="min-w-0 flex-1 text-start">
                  <span className="text-[9px] text-brand-navy-dark/40 block mb-0.5 font-bold uppercase tracking-wider">{tText.company}</span>
                  <span className="font-black text-brand-navy-dark text-xs sm:text-sm truncate block">{result.company_name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black border tracking-wide shrink-0 whitespace-nowrap shadow-3xs ${statusColors[result.status as keyof typeof statusColors] || statusColors.pending}`}>
                  {tText.statuses[result.status as keyof typeof tText.statuses] || result.status}
                </span>
              </div>

              <div className="text-start w-full">
                <span className="text-[9px] text-brand-navy-dark/40 block mb-1 font-bold uppercase tracking-wider">{tText.service}</span>
                <span className="font-bold text-brand-navy-dark text-xs bg-white border border-brand-navy-dark/[0.03] px-3.5 py-2.5 rounded-xl block text-start shadow-3xs">
                  {result.service_type === 'business_license' ? (isRtl ? '💼 تأسيس وإصدار رخصة تجارية متكاملة' : '💼 Full Business Licensing Setup') : result.service_type}
                </span>
              </div>

              {/* شريط الإنجاز الفعلي الدقيق */}
              <div className="space-y-1.5 bg-white border border-brand-navy-dark/[0.03] p-3 rounded-xl shadow-3xs">
                <div className="flex justify-between items-center text-[10px] font-black">
                  <span className="text-brand-navy-dark/50">{tText.progress}</span>
                  <span className="font-mono text-brand-navy-dark bg-brand-gold/10 px-2 py-0.5 rounded-md font-extrabold">{result.progress || 0}%</span>
                </div>
                <div className="w-full h-2.5 bg-brand-light-bg border border-brand-navy-dark/5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-hover rounded-full transition-all duration-600 ease-out shadow-[0_0_8px_rgba(212,175,55,0.3)]" 
                    style={{ width: `${result.progress || 0}%` }}
                  />
                </div>
              </div>

              {result.notes && (
                <div className="bg-brand-navy-dark/[0.015] border border-brand-navy-dark/[0.04] p-3 rounded-xl space-y-1 text-start w-full">
                  <span className="text-[9px] text-brand-navy-dark/40 block font-bold uppercase tracking-wider">{tText.notes}</span>
                  <p className="text-brand-navy-dark/80 text-[11px] leading-relaxed font-semibold text-start">{result.notes}</p>
                </div>
              )}
            </div>

            {/* الأزرار التفاعلية السفلية */}
            {result.issued_document_url && result.status === 'approved' ? (
              <div className="pt-2">
                <a 
                  href={result.issued_document_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-center select-none"
                >
                  <Download size={13} />
                  <span>{tText.downloadBtn}</span>
                </a>
              </div>
            ) : (
              <div className="pt-2">
                <button 
                  onClick={() => setResult(null)}
                  className="w-full bg-brand-navy-dark hover:bg-brand-navy-light text-white font-black text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer text-center select-none"
                >
                  {tText.close}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}