'use server';

import { put } from '@vercel/blob';

/**
 * دالة رفع الملفات السحابية بشكل خاص وآمن (Private)
 */
export async function uploadDocumentFile(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file || file.size === 0) {
      return { success: false, error: 'لم يتم تحديد أي ملف للرفع أو الملف فارغ.' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // تم تغيير الوصول إلى private لحماية الملفات
    const blob = await put(`josour-docs/${Date.now()}-${file.name}`, buffer, {
      access: 'private', 
      contentType: file.type, 
    });

    return { success: true, url: blob.url };
  } catch (error) {
    console.error('خطأ أثناء رفع الملف سحابياً:', error);
    return { success: false, error: 'فشل رفع الملف، تحقق من إعدادات التخزين.' };
  }
}