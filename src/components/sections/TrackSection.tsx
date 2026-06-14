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
      placeholder: 'أدخل رقم المعاملة السري هنا (مثال: app_123)...',
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
        review: 'تحت التدقيق والمراجعة',
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
        review: 'Under Review & Audit',
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
    <section id="track" className="py-20 bg-gradient-to-b from-brand-light-bg to-white relative overflow-hidden px-6 border-t border-brand-gold/10">
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-din font-bold text-brand-navy-dark mb-2">
            {tText.title}
          </h2>
          <p className="text-brand-navy-dark/60 font-cairo text-xs md:text-sm max-w-xl mx-auto font-medium">
            {tText.subtitle}
          </p>
        </div>

        <form onSubmit={handleQuickTrack} className="bg-white border border-brand-gold/20 rounded-2xl p-2.5 shadow-md max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 items-center">
          <div className="relative w-full flex-1">
            <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-brand-navy-dark/30 pointer-events-none ${isRtl ? 'right-4' : 'left-4'}`} />
            <input 
              type="text"
              required
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder={tText.placeholder}
              className={`w-full bg-transparent border-0 text-xs md:text-sm text-brand-navy-dark focus:outline-none placeholder-brand-navy-dark/30 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-brand-navy-dark text-white font-cairo font-bold text-xs px-6 py-3.5 rounded-xl hover:bg-brand-gold hover:text-brand-navy-dark active:scale-[0.99] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm shadow-brand-navy-dark/10"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            <span>{tText.btn}</span>
            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </button>
        </form>

        {errorText && (
          <div className="text-xs font-bold text-rose-600 bg-rose-50/60 border border-rose-100 rounded-xl py-3 px-4 max-w-md mx-auto animate-fade-in">
            {errorText}
          </div>
        )}
      </div>

      {result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-dark/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-brand-gold/20 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative space-y-6 transform transition-all scale-100">
            
            <button 
              onClick={() => setResult(null)}
              className={`absolute top-4 p-1.5 rounded-lg text-brand-navy-dark/40 hover:text-brand-navy-dark bg-brand-light-bg transition-colors cursor-pointer ${isRtl ? 'left-4' : 'right-4'}`}
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2.5 border-b border-brand-navy-dark/5 pb-4">
              <div className="bg-brand-gold/10 p-2 rounded-xl text-brand-gold border border-brand-gold/10">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-din font-bold text-lg text-brand-navy-dark leading-tight">{tText.modalTitle}</h3>
                <span className="text-[10px] text-brand-gold font-din font-bold block uppercase tracking-wider mt-0.5">{result.id.toUpperCase()}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs font-medium text-brand-navy-dark/70">
              <div className="flex justify-between items-center bg-brand-light-bg/50 border border-brand-navy-dark/[0.02] p-3 rounded-xl">
                <div>
                  <span className="text-[10px] text-brand-navy-dark/40 block mb-0.5">{tText.company}</span>
                  <span className="font-bold text-brand-navy-dark text-sm">{result.company_name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${statusColors[result.status as keyof typeof statusColors] || statusColors.pending}`}>
                  {tText.statuses[result.status as keyof typeof tText.statuses] || result.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-brand-navy-dark/40 block mb-1">{tText.service}</span>
                <span className="font-bold text-brand-navy-dark text-sm bg-brand-light-bg px-3 py-2 rounded-xl block">
                  {result.service_type === 'business_license' ? (isRtl ? '💼 تأسيس وإصدار رخصة تجارية' : '💼 Business Licensing Setup') : result.service_type}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span>{tText.progress}</span>
                  <span className="font-din font-extrabold text-brand-gold bg-brand-gold/5 px-2 py-0.5 rounded-md">{result.progress || 0}%</span>
                </div>
                <div className="w-full h-2.5 bg-brand-light-bg border border-brand-navy-dark/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-hover rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${result.progress || 0}%` }}
                  />
                </div>
              </div>

              {result.notes && (
                <div className="bg-brand-navy-dark/[0.02] border border-brand-navy-dark/[0.04] p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-brand-navy-dark/40 block font-bold">{tText.notes}</span>
                  <p className="text-brand-navy-dark/80 font-cairo text-[11px] leading-relaxed font-semibold">{result.notes}</p>
                </div>
              )}
            </div>

            {/* 🏆 حماية وتحكم: يظهر زر المعاينة والتحميل فقط وحصرياً عندما تكون حالة المعاملة مساوية لـ approved */}
            {result.issued_document_url && result.status === 'approved' ? (
              <div className="pt-2">
                <Link 
                  href={result.issued_document_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-cairo font-bold text-xs py-3.5 rounded-xl shadow-md shadow-emerald-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  <span>{tText.downloadBtn}</span>
                </Link>
              </div>
            ) : (
              <div className="pt-2">
                <button 
                  onClick={() => setResult(null)}
                  className="w-full bg-brand-navy-dark hover:bg-brand-navy-light text-white font-cairo font-bold text-xs py-3.5 rounded-xl transition-all cursor-pointer"
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