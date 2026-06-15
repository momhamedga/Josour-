'use client';

import { useState } from 'react';

interface CreateAppModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  allUsersList: any[];
  handleCreate: (form: any) => void;
  isPending: boolean;
  lang: 'ar' | 'en';
  t: any;
}

export default function CreateAppModal({ isOpen, setIsOpen, allUsersList, handleCreate, isPending, lang, t }: CreateAppModalProps) {
  const [form, setForm] = useState({ 
    userId: '', 
    serviceType: 'investor_visa', 
    status: 'pending', 
    progress: 0, 
    notes: '', 
    sla_hours_limit: 48 
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 text-start border border-brand-navy-dark/10 shadow-xl">
        <div className="flex justify-between items-center border-b pb-3 text-start">
          <h3 className="font-black text-brand-navy-dark text-base sm:text-lg text-start">{t.modalCreateTitle}</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black font-black cursor-pointer p-1">✕</button>
        </div>
        
        <div className="space-y-3 text-xs font-bold text-start">
          <div className="text-start">
            <label className="block mb-1 font-black text-start">{t.selectUser}</label>
            <select 
              className="w-full border p-2.5 rounded-xl bg-gray-50 text-start cursor-pointer font-semibold focus:outline-none"
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
            >
              <option value="">-- {lang === 'ar' ? 'اختر مستثمر لتخصيص المعاملة' : 'Select investor'} --</option>
              {allUsersList.map(u => u && <option key={u.id} value={u.id}>{u.name} ({u.company_name})</option>)}
            </select>
          </div>

          <div className="text-start">
            <label className="block mb-1 font-black text-start">{lang === 'ar' ? 'نوع الخدمة / الرخصة المطلوبة لفرش الوثائق' : 'Service Tracking Segment'}</label>
            <select
              className="w-full border p-2.5 rounded-xl bg-gray-50 text-start cursor-pointer font-semibold focus:outline-none"
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            >
              {Object.entries(t.serviceTypes).map(([key, label]) => (
                <option key={key} value={key}>{label as string}</option>
              ))}
            </select>
          </div>

          <div className="text-start">
            <label className="block mb-1 font-black text-start">{lang === 'ar' ? 'الحد الأقصى للـ SLA (بالساعات الميلادية)' : 'SLA Target Limit (Hours)'}</label>
            <input 
              type="number" 
              value={form.sla_hours_limit}
              onChange={(e) => setForm({ ...form, sla_hours_limit: parseInt(e.target.value) || 48 })}
              className="w-full border p-2.5 rounded-xl bg-gray-50 text-start focus:outline-none font-bold font-mono"
            />
          </div>

          <div className="text-start">
            <label className="block mb-1 font-black text-start">{t.notesLabel}</label>
            <textarea 
              rows={2}
              placeholder={t.notesPlaceholder}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border p-2.5 rounded-xl bg-gray-50 text-start focus:outline-none font-semibold resize-none"
            />
          </div>

          <button 
            onClick={() => handleCreate(form)}
            disabled={isPending}
            className="w-full bg-brand-navy-dark text-white font-black p-3 rounded-xl mt-2 hover:bg-brand-navy-light cursor-pointer select-none transition-colors"
          >
            {isPending ? t.saving : t.createNewBtn}
          </button>
        </div>
      </div>
    </div>
  );
}