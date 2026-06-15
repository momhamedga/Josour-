'use client';

import { useState, useTransition, useEffect } from 'react';
import SubmitAppForm from './SubmitAppForm';
import { adminDeleteApplication } from '@/app/actions/portal-actions';

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
  
  // 🌟 حالات التحكم في مودال الحذف الفخم الحديث للمستثمر
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // 💥 ميزة الاستماع للأحداث بطريقة تفاعلية آمنة تتوافق مع معايير 2026 دون كسر الـ Server Actions
  useEffect(() => {
    const handleLegacyDeleteClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // البحث عن أي زرار حذف أو كرت يحمل كلاسات أو نصوص الحذف في الـ DOM لتشغيل المودال الفخم
      const deleteBtn = target.closest('button[class*="delete"], button[class*="Delete"], .bg-rose-600');
      
      if (deleteBtn) {
        // إذا كان الزرار الأصلي يحمل معرف المعاملة (Data Attribute أو ID)
        // أو نقوم بالتقاطه برمجياً لمنع الـ window.confirm التقليدي
        const appId = deleteBtn.getAttribute('data-app-id') || deleteBtn.id;
        if (appId) {
          e.preventDefault();
          e.stopPropagation();
          setDeleteTargetId(appId);
        }
      }
    };

    document.addEventListener('click', handleLegacyDeleteClick, true);
    return () => document.removeEventListener('click', handleLegacyDeleteClick, true);
  }, []);

  // دالة الحذف الحديثة المعتمدة على المودال المخصص
  const executeDeleteApp = async () => {
    if (!deleteTargetId) return;
    startTransition(async () => {
      const result = await adminDeleteApplication(deleteTargetId);
      if (result.success) {
        setDeleteTargetId(null);
        window.location.reload(); 
      } else {
        setDeleteTargetId(null);
        setPortalError(lang === 'ar' ? 'فشل حذف المعاملة، يرجى مراجعة الصلاحيات.' : 'Failed to delete application.');
      }
    });
  };

  return (
    <div className="w-full space-y-4">
      
      {/* نموذج التقديم الذكي المعزز */}
      <SubmitAppForm 
        userId={userId}
        lang={lang}
        isRtl={isRtl}
        services={availableServices}
        translations={translations}
      />

      {/* ⚠️ مودال عرض الخطأ الأمني والمنبثق الفخم للمستثمر */}
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

      {/* 🗑️ موديول الحذف الاحترافي والمطور البصري المخصص للمستثمر */}
      {deleteTargetId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 text-start border border-brand-navy-dark/10 shadow-xl animate-scaleUp">
            <div className="text-center sm:text-start space-y-2">
              <h3 className="font-black text-rose-600 text-base sm:text-lg flex items-center gap-1.5 justify-center sm:justify-start">
                ⚠️ {lang === 'ar' ? 'تأكيد الحذف الأمني للمعاملة' : 'Confirm Secure Deletion'}
              </h3>
              <p className="text-brand-navy-dark/70 text-xs sm:text-sm font-semibold leading-relaxed">
                {lang === 'ar' 
                  ? 'هل أنت متأكد تماماً من رغبتك في حذف هذه المعاملة؟ سيؤدي هذا الإجراء لإزالة جميع الوثائق والملفات المرفوعة المرتبطة بها نهائياً من سحابة النظام ولا يمكن التراجع عنه.'
                  : 'Are you sure you want to permanently delete this application? This action will completely erase the application data and all its associated documents from the storage servers. This action cannot be undone.'}
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 pt-2 text-xs font-black">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-brand-navy-dark p-3 rounded-xl cursor-pointer select-none transition-colors"
              >
                {lang === 'ar' ? 'إلغاء الأمر' : 'Cancel'}
              </button>
              <button
                onClick={executeDeleteApp}
                disabled={isPending}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-xl cursor-pointer select-none transition-colors disabled:opacity-50"
              >
                {isPending 
                  ? (lang === 'ar' ? 'جاري الحذف الأمني...' : 'Deleting Safely...') 
                  : (lang === 'ar' ? 'نعم، احذف نهائياً' : 'Yes, Delete Permanently')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}