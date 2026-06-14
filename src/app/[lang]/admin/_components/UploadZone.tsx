'use client';

import { useState } from 'react';
import { uploadDocumentFile } from '@/app/actions/upload';

interface UploadZoneProps {
  onUploadSuccess: (url: string) => void;
  lang: 'ar' | 'en';
}

export default function UploadZone({ onUploadSuccess, lang }: UploadZoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const t = {
    ar: {
      idle: 'اسحب وأفلت ملف الـ PDF هنا أو اضغط للاختيار',
      uploading: 'جاري رفع الملف سحابياً...',
      success: 'تم الرفع والحفظ بنجاح! ✓',
    },
    en: {
      idle: 'Drag & drop PDF here or click to browse',
      uploading: 'Uploading file cloud...',
      success: 'Uploaded successfully! ✓',
    }
  }[lang];

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const result = await uploadDocumentFile(formData);
    setIsUploading(false);

    if (result.success && result.url) {
      onUploadSuccess(result.url);
    } else {
      alert(result.error);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files?.[0]) handleUpload(e.dataTransfer.files[0]); }}
      className={`mt-2 border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer relative ${
        dragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-navy-dark/15 bg-brand-light-bg/50'
      }`}
    >
      <input
        type="file"
        accept=".pdf,image/*"
        disabled={isUploading}
        onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0]); }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <span className="text-[11px] font-medium text-brand-navy-dark/60">
        {isUploading ? (
          <span className="text-brand-gold animate-pulse">{t.uploading}</span>
        ) : t.idle}
      </span>
    </div>
  );
}