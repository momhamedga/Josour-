'use client';

import { useState, useTransition, useRef } from 'react';
import { resubmitDocument } from '@/app/actions/portal-actions';
import { useRouter } from 'next/navigation'; // 🚀 استيراد الموجه لتحديث بيانات الصفحة فوراً

interface ResubmitterProps {
  docId: string;
  appId: string;
  lang: 'ar' | 'en';
}

export default function DocumentResubmitter({ docId, appId, lang }: ResubmitterProps) {
  const router = useRouter(); // 🔄 تفعيل الموجه
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isRtl = lang === 'ar';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setError(null);
    startTransition(async () => {
      const res = await resubmitDocument(docId, appId, formData, lang);
      if (res.success) {
        setSuccess(true);
        
        // 🚀 تنشيط لايف خلف الكواليس لتحديث الكروت وتغيير حالة المستند من مرفوض إلى قيد الانتظار
        router.refresh(); 
      } else {
        setError(res.error || 'Upload failed');
      }
    });
  };

  if (success) {
    return (
      <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center animate-pulse">
        {isRtl ? '✓ تم إعادة الرفع بنجاح، جاري التدقيق' : '✓ Re-uploaded successfully, reviewing'}
      </div>
    );
  }

  return (
    <div className="mt-2 pt-2 border-t border-brand-navy-dark/[0.04]">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden" 
        disabled={isPending}
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isPending}
        className={`w-full text-center text-[11px] font-bold py-2 px-3 rounded-lg border transition-all duration-300 cursor-pointer
          ${isPending 
            ? 'bg-brand-navy-dark/10 text-brand-navy-dark/40 border-transparent animate-pulse cursor-not-allowed' 
            : 'bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-white border-brand-gold/20 hover:border-brand-gold shadow-xs'
          }
        `}
      >
        {isPending 
          ? (isRtl ? 'جاري رفع الوثيقة الجديدة...' : 'Uploading new document...') 
          : (isRtl ? 'رفع المستند المصحح فوراً ⇡' : 'Upload corrected document ⇡')}
      </button>

      {error && (
        <p className="text-[10px] font-bold text-rose-600 mt-1.5 px-1">{error}</p>
      )}
    </div>
  );
}