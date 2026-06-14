'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UploadIssuedDocProps {
  appId: string;
  currentUrl: string | null;
  lang: 'ar' | 'en';
  onUploadSuccess?: (url: string | null) => void;
}

interface ToastState {
  show: boolean;
  type: 'success' | 'error' | 'delete';
  message: string;
}

export default function UploadIssuedDoc({ appId, currentUrl, lang, onUploadSuccess }: UploadIssuedDocProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // 🌟 نظام الإشعارات الفخم البديل للـ alert التقليدي
  const [toast, setToast] = useState<ToastState>({ show: false, type: 'success', message: '' });
  
  const router = useRouter();

  // تصفير الإشعار تلقائياً بعد 4 ثواني
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // 🔄 دالة الرفع والتعديل (Create & Update)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('appId', appId);

    try {
      const res = await fetch(`/api/upload-issued-doc`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        setToast({
          show: true,
          type: 'error',
          message: lang === 'ar' ? `فشل الحفظ: ${errorText}` : `Save failed: ${errorText}`
        });
        setUploading(false);
        return;
      }

      const data = await res.json().catch(() => ({}));
      
      // 🔥 إشعار فخم عند النجاح
      setToast({
        show: true,
        type: 'success',
        message: lang === 'ar' ? 'تم حفظ وثيقة الإنجاز بنجاح واعتماد المعاملة لايف! ✨' : 'Issued document saved and application approved live! ✨'
      });
      
      if (onUploadSuccess && data.url) {
        onUploadSuccess(data.url); 
      } else {
        setTimeout(() => window.location.reload(), 1500); // تأخير بسيط ليقرأ العميل الإشعار الفخم
        return;
      }
      
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setToast({
        show: true,
        type: 'error',
        message: lang === 'ar' ? 'حدث خطأ غير متوقع أثناء الرفع' : 'An unexpected error occurred during upload'
      });
    } finally {
      setUploading(false);
    }
  };

  // 🗑️ دالة الحذف (Delete)
  const handleDelete = async () => {
    const confirmMsg = lang === 'ar' 
      ? 'هل أنت متأكد من حذف هذه الوثيقة النهائية؟ سيتم إعادة حالة الطلب إلى "جاري المعالجة".' 
      : 'Are you sure you want to delete this final document? Application status will revert to In Progress.';
    
    if (!window.confirm(confirmMsg)) return;

    setDeleting(true);
    const formData = new FormData();
    formData.append('appId', appId);
    formData.append('delete', 'true');

    try {
      const res = await fetch(`/api/upload-issued-doc`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        // 🔥 إشعار فخم عند الحذف
        setToast({
          show: true,
          type: 'delete',
          message: lang === 'ar' ? 'تم حذف الوثيقة الصادرة وإعادة المعاملة للمسار الجاري! 🗑️' : 'Issued document deleted and application reset successfully! 🗑️'
        });

        if (onUploadSuccess) {
          onUploadSuccess(null); 
        } else {
          setTimeout(() => window.location.reload(), 1500);
          return;
        }
        router.refresh();
      } else {
        setToast({ show: true, type: 'error', message: 'Failed to delete document' });
      }
    } catch (err) {
      console.error(err);
      setToast({ show: true, type: 'error', message: 'Error deleting file' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-6 mt-6 space-y-4 relative">
      
      {/* 🌟 هيدر الكومبوننت الإداري */}
      <div>
        <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
          🏆 {lang === 'ar' ? 'إدارة وثيقة الإنجاز النهائي للمستثمر' : 'Investor Final Document Control'}
        </h4>
        <p className="text-xs text-emerald-700/70 mt-1 leading-relaxed">
          {lang === 'ar' 
            ? 'يمكنك رفع رخصة جديدة، تعديل الحالية برفع ملف بديل مباشرة، أو حذف الملف المرفوع لإعادة فتح المعاملة.' 
            : 'You can upload a new license, replace the current one by uploading another file, or delete it to reset state.'}
        </p>
      </div>

      {/* 🛠️ أزرار التحكم والـ CRUD التفاعلي */}
      <div className="flex items-center gap-3 flex-wrap">
        <label className={`font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-sm inline-flex items-center gap-2 text-white ${
          uploading ? 'bg-emerald-400 cursor-not-allowed animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]'
        }`}>
          {uploading 
            ? (lang === 'ar' ? '⏳ جاري المعالجة الحية...' : '⏳ Processing Live...') 
            : currentUrl 
              ? (lang === 'ar' ? '🔄 تحديث واستبدال الوثيقة' : '🔄 Replace Document')
              : (lang === 'ar' ? '📤 اختيار ورفع الوثيقة النهائية' : '📤 Upload Final Doc')}
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            disabled={uploading || deleting} 
            accept=".pdf,image/*" 
          />
        </label>

        {currentUrl && (
          <>
            <Link
              href={`/api/view-doc?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              className="text-xs font-bold text-emerald-800 bg-white px-3 py-2.5 rounded-xl border border-emerald-200 shadow-2xs hover:bg-emerald-50 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>👁️</span> {lang === 'ar' ? 'معاينة الحالية' : 'Preview Current'}
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={uploading || deleting}
              className="text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 px-3 py-2.5 rounded-xl border border-rose-200 shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>🗑️</span>
              {deleting 
                ? (lang === 'ar' ? 'جاري الحذف...' : 'Deleting...') 
                : (lang === 'ar' ? 'حذف الوثيقة' : 'Delete Document')}
            </button>
          </>
        )}
      </div>

      {/* 💎 البانر العائم الفخم الاحترافي (Toast Notification UI) */}
      {toast.show && (
        <div className={`fixed bottom-6 ${lang === 'ar' ? 'right-6' : 'left-6'} z-50 transform transition-all duration-500 ease-out translate-y-0 scale-100 max-w-md w-full bg-white rounded-2xl shadow-xl border p-4 flex items-center gap-3 animate-slide-up`}>
          
          {/* أيقونات ذكية حسب نوع العملية */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
            toast.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
            toast.type === 'delete' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
          }`}>
            {toast.type === 'success' ? '✨' : toast.type === 'delete' ? '🗑️' : '❌'}
          </div>

          {/* محتوى الإشعار */}
          <div className="flex-1">
            <h5 className="text-xs font-bold text-brand-navy-dark/40 uppercase tracking-wider">
              {lang === 'ar' ? 'إشعار النظام الذكي' : 'System Notification'}
            </h5>
            <p className="text-xs font-semibold text-brand-navy-dark mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>

          {/* زر إغلاق فرعي */}
          <button 
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="text-brand-navy-dark/30 hover:text-brand-navy-dark text-sm p-1 rounded-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}