'use client';

import { useState, useTransition, useRef } from 'react';
import { resubmitDocument } from '@/app/actions/portal-actions';
import { useRouter } from 'next/navigation';
import { UploadCloud, Loader2 } from 'lucide-react';

interface ResubmitterProps {
  docId: string;
  appId: string;
  lang: 'ar' | 'en';
}

export default function DocumentResubmitter({ docId, appId, lang }: ResubmitterProps) {
  const router = useRouter();
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
    setSuccess(false);

    startTransition(async () => {
      const res = await resubmitDocument(docId, appId, formData, lang);
      if (res.success) {
        setSuccess(true);
        router.refresh(); 
      } else {
        setError(res.error || 'Upload failed');
      }
    });
  };

  if (success) {
    return (
      <div className="w-full text-[10px] sm:text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-center animate-pulse">
        {isRtl ? '✓ تم الرفع بنجاح، جاري التدقيق' : '✓ Re-uploaded, reviewing'}
      </div>
    );
  }

  return (
    <div className="w-full mt-1.5 pt-1.5 border-t border-brand-navy-dark/[0.03]">
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
        className={`w-full inline-flex items-center justify-center gap-1.5 text-center text-[10px] sm:text-[11px] font-bold py-2 px-3 rounded-lg border transition-all duration-300 cursor-pointer select-none
          ${isPending 
            ? 'bg-brand-navy-dark/5 text-brand-navy-dark/40 border-transparent animate-pulse cursor-not-allowed' 
            : 'bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-white border-brand-gold/20 hover:border-brand-gold shadow-2xs'
          }
        `}
      >
        {isPending ? (
          <>
            <Loader2 size={12} className="animate-spin shrink-0" />
            <span>{isRtl ? 'جاري الرفع الآن...' : 'Uploading now...'}</span>
          </>
        ) : (
          <>
            <UploadCloud size={12} className="shrink-0 text-brand-gold group-hover:text-white" />
            <span>{isRtl ? 'رفع المستند المطلوب ⇡' : 'Upload required document ⇡'}</span>
          </>
        )}
      </button>

      {error && (
        <p className="text-[9px] font-bold text-rose-600 mt-1 px-1 text-start">{error}</p>
      )}
    </div>
  );
}