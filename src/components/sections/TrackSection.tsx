'use client';

import { useState } from 'react';
import { Search, Loader2, ArrowLeft, ArrowRight, ShieldCheck, Download, X } from 'lucide-react';
import { Language } from '@/config/josour-content';
import Link from 'next/link';

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
      title: '🎯 استعلام فوري عن المعاملة',
      subtitle: 'تتبع حالة رخصتك أو تأشيرتك مباشرة من السيرفر السحابي لجسور بدون تسجيل الدخول.',
      placeholder: 'أدخل رقم المعاملة السري هنا (app_123)...',
      btn: 'فحص المعاملة',
      notFound: '⚠️ عذراً، لم نجد أي معاملة مسجلة بهذا الرقم السري.',
      error: 'حدث خطأ أثناء جلب البيانات، يرجى إعادة المحاولة.',
      modalTitle: 'حالة الطلب اللحظية',
      company: 'المنشأة المستثمرة:',
      service: 'نوع الخدمة:',
      progress: 'نسبة الإنجاز الفعلي:',
      notes: 'آخر تحديث للمستشار الإداري:',
      downloadBtn: '👁️ معاينة وتحميل الوثيقة الصادرة',
      close: 'إغلاق النافذة',
      statuses: {
        pending: 'قيد الانتظار',
        in_progress: 'جاري المعالجة',
        review: 'تحت التدقيق',
        approved: 'تم الاعتماد والإنهاء 🎉',
        rejected: 'تعديلات مطلوبة ⚠️',
      }
    },
    en: {
      title: '🎯 Instant Application Tracking',
      subtitle: 'Check your license or visa status live from Josour secure cloud storage instantly.',
      placeholder: 'Enter your secure transaction ID (e.g., app_123)...',
      btn: 'Track Now',
      notFound: '⚠️ Sorry, no application found matching this ID.',
      error: 'An error occurred while fetching data, please try again.',
      modalTitle: 'Live Application Status',
      company: 'Investor Entity:',
      service: 'Service Type:',
      progress: 'Completion Progress:',
      notes: 'Consultant Latest Note:',
      downloadBtn: '👁️ Preview & Download Issued Document',
      close: 'Close Window',
      statuses: {
        pending: 'Pending',
        in_progress: 'In Progress',
        review: 'Under Review',
        approved: 'Approved & Completed 🎉',
        rejected: 'Revision Required ⚠️',
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
    pending: 'bg-amber-50 border-amber-200 text-amber-700',
    in_progress: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    review: 'bg-orange-50 border-orange-200 text-orange-700',
    approved: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    rejected: 'bg-rose-50 border-rose-200 text-rose-700',
  };

  return (
    <section id="track" className="py-14 md:py-20 bg-gradient-to-b from-brand-light-bg to-white relative overflow-hidden px-4 sm:px-6 border-t border-brand-gold/10 font-cairo" dir={isRtl ? 'rtl' : 'ltr'}>
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5 w-full">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-navy-dark mb-2 text-center">
            {tText.title}
          </h2>
          <p className="text-brand-navy-dark/70 text-[11px] sm:text-xs md:text-sm max-w-lg mx-auto font-medium text-center px-2">
            {tText.subtitle}
          </p>
        </div>

        {/* 🔍 شريط البحث المصغر عالي الأناقة والتجاوب للموبايل */}
        <form onSubmit={handleQuickTrack} className="bg-white border border-brand-gold/20 rounded-xl p-1.5 sm:p-2.5 shadow-xs max-w-xl mx-auto flex flex-col sm:flex-row gap-2 items-center w-full">
          <div className="relative w-full flex-1 flex items-center">
            <Search size={14} className={`absolute text-brand-navy-dark/30 pointer-events-none ${isRtl ? 'right-3' : 'left-3'}`} />
            <input 
              type="text"
              required
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder={tText.placeholder}
              className={`w-full bg-transparent border-0 text-[11px] sm:text-xs md:text-sm text-brand-navy-dark focus:outline-hidden placeholder-brand-navy-dark/30 h-9 sm:h-auto ${isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-brand-navy-dark text-white font-bold text-[11px] sm:text-xs px-5 py-2.5 sm:py-3.5 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : null}
            <span>{tText.btn}</span>
            {isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
          </button>
        </form>

        {errorText && (
          <div className="text-[11px] font-bold text-rose-600 bg-rose-50/60 border border-rose-100 rounded-xl py-2.5 px-4 max-w-sm mx-auto animate-fadeIn">
            {errorText}
          </div>
        )}
      </div>

      {/* 📟 نافذة العرض المنبثقة التفاعلية الفاخرة (Meticulous Mini Modal) */}
      {result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-brand-navy-dark/30 backdrop-blur-xs animate-fadeIn" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="bg-white border border-brand-gold/15 rounded-[1.5rem] max-w-md w-full p-4 sm:p-7 shadow-xl relative space-y-4 transform transition-all scale-100 font-cairo">
            
            {/* زر الإغلاق العلوي المصغر */}
            <button 
              onClick={() => setResult(null)}
              className={`absolute top-3.5 p-1 rounded-md text-brand-navy-dark/30 hover:text-brand-navy-dark bg-brand-light-bg transition-colors cursor-pointer ${isRtl ? 'left-3.5' : 'right-3.5'}`}
            >
              <X size={14} />
            </button>

            {/* رأس النافذة المصغر */}
            <div className="flex items-center gap-2 border-b border-brand-navy-dark/5 pb-3">
              <div className="bg-brand-gold/10 p-2 rounded-lg text-brand-gold shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div className="text-start">
                <h3 className="font-black text-sm md:text-base text-brand-navy-dark leading-tight">{tText.modalTitle}</h3>
                <span className="text-[9px] text-brand-gold font-mono tracking-wider font-bold block uppercase mt-0.5">{result.id}</span>
              </div>
            </div>

            {/* تفاصيل المعاملة الملمومة وعالية التنسيق */}
            <div className="space-y-3.5 text-start w-full">
              <div className="flex justify-between items-center bg-brand-light-bg/60 border border-brand-navy-dark/[0.02] p-2.5 sm:p-3 rounded-xl gap-2 w-full">
                <div className="min-w-0 flex-1 text-start">
                  <span className="text-[9px] text-brand-navy-dark/40 block mb-0.5 font-bold">{tText.company}</span>
                  <span className="font-black text-brand-navy-dark text-xs sm:text-sm truncate block">{result.company_name}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border shrink-0 whitespace-nowrap ${statusColors[result.status as keyof typeof statusColors] || statusColors.pending}`}>
                  {tText.statuses[result.status as keyof typeof tText.statuses] || result.status}
                </span>
              </div>

              <div className="text-start w-full">
                <span className="text-[9px] text-brand-navy-dark/40 block mb-1 font-bold">{tText.service}</span>
                <span className="font-bold text-brand-navy-dark text-xs bg-brand-light-bg px-3 py-2 rounded-xl block text-start">
                  {result.service_type === 'business_license' ? (isRtl ? '💼 تأسيس وإصدار رخصة تجارية' : '💼 Business Licensing Setup') : result.service_type}
                </span>
              </div>

              {/* شريط الإنجاز الفعلي المرن */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-black">
                  <span>{tText.progress}</span>
                  <span className="font-mono text-brand-gold bg-brand-gold/5 px-1.5 py-0.5 rounded-sm">{result.progress || 0}%</span>
                </div>
                <div className="w-full h-2 bg-brand-light-bg border border-brand-navy-dark/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-hover rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${result.progress || 0}%` }}
                  />
                </div>
              </div>

              {result.notes && (
                <div className="bg-brand-navy-dark/[0.015] border border-brand-navy-dark/[0.03] p-2.5 sm:p-3 rounded-xl space-y-0.5 text-start w-full">
                  <span className="text-[9px] text-brand-navy-dark/40 block font-bold">{tText.notes}</span>
                  <p className="text-brand-navy-dark/80 text-[10px] sm:text-[11px] leading-relaxed font-semibold text-start">{result.notes}</p>
                </div>
              )}
            </div>

            {/* الأزرار السفلية الموزونة للحجم المصغر */}
            {result.issued_document_url && result.status === 'approved' ? (
              <div className="pt-1">
                <Link 
                  href={result.issued_document_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Download size={12} />
                  <span className="leading-none">{tText.downloadBtn}</span>
                </Link>
              </div>
            ) : (
              <div className="pt-1">
                <button 
                  onClick={() => setResult(null)}
                  className="w-full bg-brand-navy-dark hover:bg-brand-navy-light text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center"
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