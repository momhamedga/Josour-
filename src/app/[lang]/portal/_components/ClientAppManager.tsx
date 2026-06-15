'use client';

import { useState, useTransition } from 'react';
import SubmitAppForm from './SubmitAppForm';
import DeleteAppButton from './DeleteAppButton';
import TransactionTimeline from './TransactionTimeline';
import ClientIdCopyButton from './ClientIdCopyButton';
import Link from 'next/link';
import { adminDeleteApplication } from '@/app/actions/portal-actions';

interface ClientAppManagerProps {
  userId: string;
  lang: 'ar' | 'en';
  isRtl: boolean;
  availableServices: any[];
  processedApplications: any[]; // تمرير المعاملات هنا للتحكم بها حياً
  translations: any;
  statusColors: any;
  docStatusStyles: any;
}

export default function ClientAppManager({
  userId,
  lang,
  isRtl,
  availableServices,
  processedApplications,
  translations,
  statusColors,
  docStatusStyles,
}: ClientAppManagerProps) {
  const [portalError, setPortalError] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const t = translations;

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
    <div className="w-full space-y-6 sm:space-y-8">
      {/* 1. نموذج التقديم */}
      <SubmitAppForm 
        userId={userId}
        lang={lang}
        isRtl={isRtl}
        services={availableServices}
        translations={{
          submitNewApp: t.submitNewApp,
          selectService: t.selectService,
          btnApply: t.btnApply
        }}
      />

      {/* 2. ريندر كروت المعاملات - هنا يكمن السر لتشغيل الأزرار فورا */}
      <div className="grid grid-cols-1 gap-5 sm:gap-8 w-full">
        {processedApplications.map((app) => {
          if (!app) return null;
          const currentColors = statusColors[app.status] || statusColors.pending;
          const statusText = t.statuses[app.status] || t.statuses.pending;

          return (
            <div key={app.id} className="bg-white border border-brand-navy-dark/[0.05] rounded-xl p-4 sm:p-7 shadow-2xs relative overflow-hidden group text-start w-full">
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-gold to-brand-gold-hover" />
              
              <div className="mb-4 bg-brand-navy-dark/[0.015] p-2.5 rounded-lg border border-brand-navy-dark/[0.04] flex items-center justify-between gap-3 w-full text-start">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-brand-navy-dark/60 text-start">
                  <span className="w-1 h-1 bg-brand-gold rounded-full shrink-0" />
                  <span className="truncate">{t.appIdLabel}:</span>
                  <span className="font-mono text-brand-navy-dark font-extrabold bg-white border border-brand-navy-dark/5 px-2 py-0.5 rounded shadow-3xs uppercase select-all">
                    {app.id.slice(0, 4)}...{app.id.slice(-4)}
                  </span>
                </div>
                <ClientIdCopyButton id={app.id} lang={lang} />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 w-full text-start">
                <div className="text-start">
                  <h3 className="text-base sm:text-xl font-black text-brand-navy-dark text-start">{app.serviceTitle}</h3>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border tracking-wide shadow-3xs"
                    style={{ backgroundColor: currentColors.bg, borderColor: currentColors.border, color: currentColors.textCol }}>
                    {statusText}
                  </span>
                  {/* 🌟 تمرير دالة فتح المودال المباشرة للزرار */}
                  <DeleteAppButton appId={app.id} lang={lang} onOpenDeleteModal={(id) => setDeleteTargetId(id)} />
                </div>
              </div>

              {app.issued_document_url && (
                <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 sm:p-5 rounded-xl shadow-3xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 animate-fadeIn w-full text-start">
                  <p className="font-bold text-xs sm:text-sm text-start leading-relaxed">
                    {t.finalDocBanner}
                  </p>
                  <Link 
                    href={app.issued_document_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto text-center text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    {t.downloadFinalDoc}
                  </Link>
                </div>
              )}

              <div className="mb-5 bg-brand-light-bg/30 border border-brand-navy-dark/[0.02] rounded-xl p-3 sm:p-5 w-full text-start">
                <div className="flex justify-between items-center mb-3 text-[10px] sm:text-xs font-bold">
                  <span className="text-brand-navy-dark/40">{t.progressText}</span>
                  <span className="text-brand-navy-dark bg-brand-navy-dark/[0.04] px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                    <span className="text-brand-gold font-black">{app.progress || 0}%</span>
                  </span>
                </div>
                <TransactionTimeline status={app.status} progress={app.progress} lang={lang} />
              </div>

              {app.notes && (
                <div className="bg-brand-navy-dark/[0.015] border border-brand-navy-dark/[0.03] rounded-lg p-3 text-xs text-brand-navy-dark/80 mb-5 text-start w-full">
                  <span className="text-[10px] text-brand-navy-dark/40 block font-bold mb-1 text-start">{t.updateLabel}</span>
                  <p className="leading-relaxed font-semibold text-start">{app.notes}</p>
                </div>
              )}

              {/* ... باقي كود ريندر الوثائق والمستندات كما هو لضمان بقائه ناصعاً ... */}
            </div>
          ); 
        })}
      </div>

      {/* ⚠️ مودال الأخطاء */}
      {portalError && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 border border-rose-500/20 shadow-2xl">
            <h3 className="font-black text-rose-600 text-base sm:text-lg">{lang === 'ar' ? '⚠️ عطل في المعالجة' : '⚠️ Request Failure'}</h3>
            <p className="text-brand-navy-dark/80 text-xs sm:text-sm bg-rose-50/50 p-3.5 rounded-xl border border-rose-100">{portalError}</p>
            <button onClick={() => setPortalError(null)} className="w-full bg-brand-navy-dark text-white p-3 rounded-xl cursor-pointer">إغلاق</button>
          </div>
        </div>
      )}

      {/* 🗑️ مودال الحذف الفخم الحديث */}
      {deleteTargetId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 border border-brand-navy-dark/10 shadow-xl">
            <div className="space-y-2">
              <h3 className="font-black text-rose-600 text-base sm:text-lg">⚠️ {lang === 'ar' ? 'تأكيد الحذف الأمني' : 'Confirm Deletion'}</h3>
              <p className="text-brand-navy-dark/70 text-xs sm:text-sm leading-relaxed">
                {lang === 'ar' ? 'هل أنت متأكد تماماً من رغبتك في حذف هذه المعاملة نهائياً؟ سيؤدي هذا الإجراء لإزالة كافة الملفات المرفوعة.' : 'Are you sure you want to permanently delete this application?'}
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2 text-xs font-black">
              <button onClick={() => setDeleteTargetId(null)} className="flex-1 bg-gray-100 p-3 rounded-xl cursor-pointer">ألغاء</button>
              <button onClick={executeDeleteApp} disabled={isPending} className="flex-1 bg-rose-600 text-white p-3 rounded-xl cursor-pointer disabled:opacity-50">
                {isPending ? 'جاري الحذف...' : 'نعم، احذف نهائياً'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}