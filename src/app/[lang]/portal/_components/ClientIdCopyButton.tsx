'use client';

import { useState } from 'react';

interface ClientIdCopyButtonProps {
  id: string;
  lang: 'ar' | 'en';
}

export default function ClientIdCopyButton({ id, lang }: ClientIdCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy ID', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer border shadow-2xs ${
        copied 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 scale-[0.98]' 
          : 'bg-white border-brand-navy-dark/10 text-brand-navy-dark/60 hover:text-brand-navy-dark hover:border-brand-navy-dark/20 hover:bg-brand-light-bg'
      }`}
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>{lang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376A8.965 8.965 0 0012 12.75c-.197 0-.39.024-.577.074m3.377 4.426a8.956 8.956 0 014.2 4.192m0 0A8.969 8.969 0 0110.5 22.5a8.965 8.965 0 01-4.2-1.192m14.25-4.058a8.966 8.966 0 01-1.543-4.116M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12" />
          </svg>
          <span>{lang === 'ar' ? 'نسخ السجل الكلي' : 'Copy Key'}</span>
        </>
      )}
    </button>
  );
}