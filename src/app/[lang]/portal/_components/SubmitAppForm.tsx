'use client';

import { useState, useTransition } from 'react';
import { createNewApplication } from '@/app/actions/portal-actions';

interface SubmitAppFormProps {
  userId: string;
  lang: 'ar' | 'en';
  isRtl: boolean;
  translations: {
    submitNewApp: string;
    selectService: string;
    btnApply: string;
  };
}

export default function SubmitAppForm({ userId, lang, isRtl, translations }: SubmitAppFormProps) {
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setActionError(null);
    const serviceType = formData.get('service_type') as string;
    if (!serviceType || !userId) return;

    startTransition(async () => {
      try {
        const result = await createNewApplication(userId, serviceType, lang);
        // إذا كان الـ Action يعيد كائن خطأ بدلاً من عمل Throw
        if (result && 'error' in result) {
          setActionError(result.error);
        }
      } catch (err: any) {
        // التقاط الـ throw new Error المنبعث من السيرفر وعرضه في الواجهة
        setActionError(err.message || 'An unexpected error occurred');
      }
    });
  };

  return (
    <div className="bg-white border border-brand-gold/20 rounded-2xl p-6 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 inset-y-0 w-[4px] bg-brand-gold" />
      <h3 className="text-md font-bold text-brand-navy-dark mb-3 flex items-center gap-2">
        ✨ {translations.submitNewApp}
      </h3>

      <form action={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="w-full space-y-1.5">
          <label className="text-xs text-brand-navy-dark/60 font-medium block">
            {translations.selectService}
          </label>
          <select 
            name="service_type" 
            required
            disabled={isPending}
            className="w-full bg-brand-light-bg/50 border border-brand-navy-dark/10 rounded-xl px-3 py-2 text-sm font-medium focus:outline-hidden focus:border-brand-gold disabled:opacity-60"
          >
            <option value="business_license">{isRtl ? 'رخصة تجارية جديدة' : 'New Business License'}</option>
            <option value="investor_visa">{isRtl ? 'تأشيرة مستثمر' : 'Investor Visa'}</option>
            <option value="corporate_bank">{isRtl ? 'فتح حساب بنكي للشركات' : 'Corporate Bank Account'}</option>
          </select>
        </div>
        
        <button 
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto bg-brand-navy-dark hover:bg-brand-navy-light text-brand-gold font-bold text-xs px-6 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer shadow-xs disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <span className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
          ) : (
            translations.btnApply
          )}
        </button>
      </form>

      {/* نافذة الخطأ الذكية تظهر فوراً أسفل الحقول في حال مخالفة الشروط */}
      {actionError && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          🛑 {actionError}
        </div>
      )}
    </div>
  );
}