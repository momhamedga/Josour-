'use client';

import { useState } from 'react';
import SubmitAppForm from './SubmitAppForm';

interface ClientAppManagerProps {
  userId: string;
  lang: 'ar' | 'en';
  isRtl: boolean;
  availableServices: any[];
  translations: {
    submitNewApp: string;
    selectService: string;
    btnApply: string;
  };
}

export default function ClientAppManager({
  userId,
  lang,
  isRtl,
  availableServices,
  translations,
}: ClientAppManagerProps) {
  const [portalError, setPortalError] = useState<string | null>(null);

  return (
    <div className="w-full space-y-4">
      {/* 🌟 تم تنظيف الـ Prop onError لمنع تعارض الـ TypeScript مع المكون الأصلي */}
      <SubmitAppForm 
        userId={userId}
        lang={lang}
        isRtl={isRtl}
        services={availableServices}
        translations={translations}
      />

      {/* ⚠️ مودال عرض الخطأ الأمني والمنبثق الفخم للمستثمر في حال حدوث أي خلل بالشبكة */}
      {portalError && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 text-start border border-rose-500/20 shadow-2xl animate-scaleUp">
            <div className="text-center sm:text-start space-y-2">
              <h3 className="font-black text-rose-600 text-base sm:text-lg flex items-center gap-2 justify-center sm:justify-start">
                {lang === 'ar' ? '⚠️ عطل في معالجة طلب المستثمر' : '⚠️ Portal Request Failure'}
              </h3>
              <p className="text-brand-navy-dark/80 text-xs sm:text-sm font-semibold leading-relaxed bg-rose-50/50 p-3.5 rounded-xl border border-rose-100">
                {portalError}
              </p>
            </div>
            
            <div className="flex items-center pt-2 text-xs font-black">
              <button
                onClick={() => setPortalError(null)}
                className="w-full bg-brand-navy-dark hover:bg-brand-navy-light text-white p-3 rounded-xl cursor-pointer select-none transition-colors"
              >
                {lang === 'ar' ? 'متابعة وتحديث البيانات' : 'Dismiss & Retry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}