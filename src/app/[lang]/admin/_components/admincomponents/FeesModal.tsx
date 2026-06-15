'use client';

import { useState } from 'react';

interface FeesModalProps {
  activeFeesApp: any;
  setActiveFeesApp: (val: any) => void;
  handleFieldChange: (id: string, field: string, value: any) => void;
  lang: 'ar' | 'en';
  t: any;
}

export default function FeesModal({ activeFeesApp, setActiveFeesApp, handleFieldChange, lang, t }: FeesModalProps) {
  const [newFeeForm, setNewFeeForm] = useState({ description: '', amount: '' });

  if (!activeFeesApp) return null;
  const totalFeesPaid = activeFeesApp.fees?.reduce((sum: number, f: any) => sum + f.amount, 0) || 0;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 text-start border border-brand-navy-dark/10 shadow-xl">
        <div className="flex justify-between items-center border-b pb-3 text-start">
          <h3 className="font-black text-brand-navy-dark text-base sm:text-lg text-start">{t.feesBtn} - {activeFeesApp.company_name}</h3>
          <button onClick={() => setActiveFeesApp(null)} className="text-gray-400 hover:text-black font-black cursor-pointer p-1">✕</button>
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2 text-start pr-1">
          {activeFeesApp.fees && activeFeesApp.fees.length > 0 ? (
            activeFeesApp.fees.map((fee: any) => (
              <div key={fee.id} className="flex justify-between items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-xs font-bold text-start">
                <span className="font-bold text-gray-700 text-start">{fee.description}</span>
                <span className="font-mono font-black text-emerald-600 text-start">{fee.amount} AED</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 text-center py-4 w-full font-medium">{lang === 'ar' ? 'لا توجد رسوم حكومية مسجلة حالياً.' : 'No recorded fees yet.'}</p>
          )}
        </div>

        <div className="border-t pt-3 space-y-3 text-start text-xs font-bold">
          <input 
            type="text" placeholder={lang === 'ar' ? 'وصف الرسوم (مثال: رسوم اعتماد رخصة الغرفة)' : 'Fees description...'} 
            value={newFeeForm.description}
            onChange={(e) => setNewFeeForm({...newFeeForm, description: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-start focus:outline-none focus:border-brand-gold/40 font-semibold"
          />
          <input 
            type="number" placeholder={lang === 'ar' ? 'المبلغ الفعلي بالدرهم AED' : 'Amount in AED...'} 
            value={newFeeForm.amount}
            onChange={(e) => setNewFeeForm({...newFeeForm, amount: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-start focus:outline-none focus:border-brand-gold/40 font-mono font-bold"
          />
          <button 
            onClick={() => {
              if(!newFeeForm.description || !newFeeForm.amount) return;
              const updatedFees = [...(activeFeesApp.fees || []), { id: Date.now().toString(), description: newFeeForm.description, amount: parseFloat(newFeeForm.amount) }];
              handleFieldChange(activeFeesApp.id, 'fees', updatedFees);
              setNewFeeForm({ description: '', amount: '' });
            }}
            className="w-full bg-emerald-600 text-white font-black p-2.5 rounded-xl hover:bg-emerald-700 cursor-pointer select-none transition-colors"
          >
            {lang === 'ar' ? '＋ إضافة الرسوم والمزامنة الحية' : '＋ Add Gov Fee'}
          </button>
        </div>
      </div>
    </div>
  );
}