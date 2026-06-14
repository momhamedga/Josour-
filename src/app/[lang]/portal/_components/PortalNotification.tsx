'use client';

import { useState } from 'react';

interface PortalNotificationProps {
  rejectedCount: number;
  lang: 'ar' | 'en';
}

export default function PortalNotification({ rejectedCount, lang }: PortalNotificationProps) {
  const [visible, setVisible] = useState(true);
  if (rejectedCount === 0 || !visible) return null;

  const isRtl = lang === 'ar';

  return (
    <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-500/10 rounded-2xl p-4 flex justify-between items-center shadow-3xs animate-fade-in ring-1 ring-rose-500/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 text-lg animate-bounce">
          ⚠️
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-950">
            {isRtl ? 'مستندات تتطلب إجراءً فورياً' : 'Documents Require Attention'}
          </h4>
          <p className="text-xs text-rose-700/80 font-medium mt-0.5">
            {isRtl 
              ? `يوجد عدد (${rejectedCount}) من المستندات المرفوضة من قبل المستشار. يرجى مراجعة السبب وإعادة الرفع.` 
              : `There are (${rejectedCount}) rejected documents. Please review the consultant comment and re-upload.`}
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => setVisible(false)}
        className="text-rose-900/30 hover:text-rose-900/60 p-1 cursor-pointer text-xs transition-colors"
      >
        ✕
      </button>
    </div>
  );
}