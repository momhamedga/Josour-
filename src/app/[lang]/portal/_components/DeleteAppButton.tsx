// src/app/[lang]/portal/_components/DeleteAppButton.tsx
'use client';

import { useState, useTransition } from 'react';
import { deleteApplication } from '@/app/actions/portal-actions';

interface DeleteBtnProps {
  appId: string;
  lang: 'ar' | 'en';
}

export default function DeleteAppButton({ appId, lang }: DeleteBtnProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    const confirmMsg = lang === 'ar' 
      ? 'هل أنت متأكد من رغبتك في حذف هذه المعاملة نهائياً؟' 
      : 'Are you sure you want to permanently delete this application?';
      
    if (!window.confirm(confirmMsg)) return;

    setError(null);
    startTransition(async () => {
      const res = await deleteApplication(appId, lang);
      if (!res.success) {
        setError(res.error || 'Deletion failed');
        // مسح رسالة الخطأ تلقائياً بعد 7 ثوانٍ
        setTimeout(() => setError(null), 7000);
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer
          ${isPending 
            ? 'bg-gray-100 text-gray-400 border-transparent animate-pulse' 
            : 'bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border-rose-200 hover:border-transparent shadow-xs'
          }`}
      >
        {isPending ? (lang === 'ar' ? 'جاري الحذف...' : 'Deleting...') : (lang === 'ar' ? 'حذف المعاملة 🗑️' : 'Delete Application 🗑️')}
      </button>
      
      {error && (
        <div className="text-[11px] font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-2 max-w-xs animate-shake">
          {error}
        </div>
      )}
    </div>
  );
}