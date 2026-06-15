'use client';

interface DeleteBtnProps {
  appId: string;
  lang: 'ar' | 'en';
  onOpenDeleteModal?: (id: string) => void; // دالة الربط السحرية مع المودال الفخم
}

export default function DeleteAppButton({ appId, lang, onOpenDeleteModal }: DeleteBtnProps) {
  const handleDeleteClick = () => {
    // إذا كانت الدالة ممررة من الأب، شغلها وافتح المودال الفخم فوراً
    if (onOpenDeleteModal) {
      onOpenDeleteModal(appId);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleDeleteClick}
        className="px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border-rose-200 hover:border-transparent shadow-xs"
      >
        {lang === 'ar' ? 'حذف المعاملة 🗑️' : 'Delete Application 🗑️'}
      </button>
    </div>
  );
}