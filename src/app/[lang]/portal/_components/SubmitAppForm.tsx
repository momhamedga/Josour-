'use client';

import { useState, useTransition } from 'react';
import { createNewApplication } from '@/app/actions/portal-actions';
import { Send, Loader2 } from 'lucide-react';

interface SubmitAppFormProps {
  userId: string;
  lang: 'ar' | 'en';
  isRtl: boolean;
  services: {
    id: any;
    title: any;
    requiredDocs: any;
  }[]; 
  translations: {
    submitNewApp: string;
    selectService: string;
    btnApply: string;
  };
}

export default function SubmitAppForm({ userId, lang, isRtl, services = [], translations }: SubmitAppFormProps) {
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);

  // التأمين الذكي لضمان وجود مصفوفة حقيقية قابلة للـ Loop
  const safeServices = Array.isArray(services) ? services : [];

  const handleSubmit = async (formData: FormData) => {
    setActionError(null);
    const serviceType = formData.get('service_type') as string;
    if (!serviceType || !userId) return;

    startTransition(async () => {
      try {
        const result = await createNewApplication(userId, serviceType, lang);
        if (result && 'error' in result) {
          setActionError(result.error as string);
        }
      } catch (err: any) {
        setActionError(err.message || 'An unexpected error occurred');
      }
    });
  };

  return (
    <div 
      className="bg-white border border-brand-gold/15 rounded-xl p-4 sm:p-5 shadow-2xs relative overflow-hidden font-cairo w-full text-start"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className={`absolute top-0 bottom-0 w-[4px] bg-brand-gold ${isRtl ? 'right-0' : 'left-0'}`} />
      
      <h3 className="text-xs sm:text-sm font-black text-brand-navy-dark mb-4 flex items-center gap-1.5 text-start">
        ✨ {translations?.submitNewApp || ''}
      </h3>

      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }} className="flex flex-col gap-4 w-full">
        
        <div className="w-full space-y-1.5 text-start">
          <label className="text-[10px] sm:text-xs text-brand-navy-dark/60 font-bold block text-start">
            {translations?.selectService || ''}
          </label>
          
          <select 
            name="service_type" 
            required
            disabled={isPending || safeServices.length === 0}
            className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-gold disabled:opacity-60 transition-colors text-start cursor-pointer"
          >
            {safeServices.length === 0 ? (
              <option value="">{lang === 'ar' ? 'جاري تحميل الخدمات...' : 'Loading services...'}</option>
            ) : (
              safeServices.map((srv, idx) => (
                <option key={srv?.id || `srv-key-${idx}`} value={srv?.id || ''} className="font-medium">
                  {srv?.title || ''}
                </option>
              ))
            )}
          </select>
        </div>
        
        <div className="w-full pt-1">
          <button 
            type="submit"
            disabled={isPending || safeServices.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-navy-dark hover:bg-brand-navy-light text-brand-gold font-black text-xs px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-300 cursor-pointer shadow-2xs disabled:opacity-50 select-none text-center"
          >
            {isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                <Send size={13} className={`shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                <span>{translations?.btnApply || ''}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {actionError && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-[11px] font-bold flex items-center gap-2 animate-fadeIn text-start w-full">
          🛑 {actionError}
        </div>
      )}
    </div>
  );
}