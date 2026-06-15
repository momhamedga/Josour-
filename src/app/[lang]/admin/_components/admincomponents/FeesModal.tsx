'use client';

import { useState, useTransition } from 'react';
import { updateApplicationFees } from '@/app/actions/portal-actions';
import { Loader2 } from 'lucide-react';

interface FeesModalProps {
  activeFeesApp: any;
  setActiveFeesApp: (val: any) => void;
  handleFieldChange: (id: string, field: any, value: any) => void;
  lang: 'ar' | 'en';
  t: any;
}

export default function FeesModal({ activeFeesApp, setActiveFeesApp, handleFieldChange, lang, t }: FeesModalProps) {
  const [newFeeForm, setNewFeeForm] = useState({ description: '', amount: '' });
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!activeFeesApp) return null;
  const totalFeesPaid = activeFeesApp.fees?.reduce((sum: number, f: any) => sum + f.amount, 0) || 0;

  const handleAddFee = async () => {
    if (!newFeeForm.description || !newFeeForm.amount || isPending) return;
    setErrorMsg(null);

    // صياغة الكائن الجديد للرسوم الحكومية
    const newFeeObject = {
      id: Date.now().toString(),
      description: newFeeForm.description,
      amount: parseFloat(newFeeForm.amount)
    };

    const updatedFeesList = [...(activeFeesApp.fees || []), newFeeObject];

    startTransition(async () => {
      // استدعاء الأكشن السحابي للحفظ الدائم داخل جدول الـ SQL
      const result = await updateApplicationFees(activeFeesApp.id, updatedFeesList);
      
      if (result.success) {
        // تحديث مصفوفة الحالة في الـ Client UI محلياً للتجاوب اللحظي المباشر السريع
        handleFieldChange(activeFeesApp.id, 'fees', updatedFeesList);
        setNewFeeForm({ description: '', amount: '' });
      } else {
        setErrorMsg(lang === 'ar' ? 'فشل حفظ الرسوم في السيرفر السحابي.' : 'Failed to save fees to cloud server.');
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 text-start border border-brand-navy-dark/10 shadow-xl relative">
        
        <div className="flex justify-between items-center border-b pb-3 text-start">
          <h3 className="font-black text-brand-navy-dark text-base sm:text-lg text-start">
            {t.feesBtn} - {activeFeesApp.company_name}
          </h3>
          <button 
            onClick={() => { if (!isPending) setActiveFeesApp(null); }} 
            disabled={isPending}
            className="text-gray-400 hover:text-black font-black cursor-pointer p-1 disabled:opacity-30"
          >
            ✕
          </button>
        </div>
        
        {/* ريندر الرسوم المتاحة */}
        <div className="max-h-60 overflow-y-auto space-y-2 text-start pr-1">
          {activeFeesApp.fees && activeFeesApp.fees.length > 0 ? (
            activeFeesApp.fees.map((fee: any) => (
              <div key={fee.id} className="flex justify-between items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-xs font-bold text-start">
                <span className="font-bold text-gray-700 text-start">{fee.description}</span>
                <span className="font-mono font-black text-emerald-600 text-start">{fee.amount} AED</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 text-center py-4 w-full font-medium">
              {lang === 'ar' ? 'لا توجد رسوم حكومية مسجلة حالياً.' : 'No recorded fees yet.'}
            </p>
          )}
        </div>

        {errorMsg && (
          <p className="text-[10px] font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-100">{errorMsg}</p>
        )}

        {/* فورم إضافة الرسوم لايف */}
        <div className="border-t pt-3 space-y-3 text-start text-xs font-bold">
          <input 
            type="text" 
            disabled={isPending}
            placeholder={lang === 'ar' ? 'وصف الرسوم (مثال: رسوم اعتماد رخصة الغرفة)' : 'Fees description...'} 
            value={newFeeForm.description}
            onChange={(e) => setNewFeeForm({...newFeeForm, description: e.target.value})}
            className="w-full bg-gray-50 disabled:opacity-60 border border-gray-200 p-2.5 rounded-xl text-start focus:outline-none focus:border-brand-gold/40 font-semibold"
          />
          <input 
            type="number" 
            disabled={isPending}
            placeholder={lang === 'ar' ? 'المبلغ الفعلي بالدرهم AED' : 'Amount in AED...'} 
            value={newFeeForm.amount}
            onChange={(e) => setNewFeeForm({...newFeeForm, amount: e.target.value})}
            className="w-full bg-gray-50 disabled:opacity-60 border border-gray-200 p-2.5 rounded-xl text-start focus:outline-none focus:border-brand-gold/40 font-mono font-bold"
          />
          <button 
            type="button"
            onClick={handleAddFee}
            disabled={isPending || !newFeeForm.description || !newFeeForm.amount}
            className="w-full bg-emerald-600 text-white font-black p-2.5 rounded-xl hover:bg-emerald-700 cursor-pointer select-none transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>{lang === 'ar' ? 'جاري الحفظ والمزامنة السحابية...' : 'Saving to cloud...'}</span>
              </>
            ) : (
              <span>{lang === 'ar' ? '＋ إضافة الرسوم والمزامنة الحية' : '＋ Add Gov Fee'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}