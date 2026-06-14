'use server';

import { sql } from '@/lib/neon';
import { revalidatePath } from 'next/cache';

// 1. تحديث حالة المعاملة الأساسية ونسبة الإنجاز والملاحظات + وثيقة الإنجاز النهائية
export async function updateApplicationStatus({
  id,
  status,
  progress,
  notes,
  issued_document_url, 
}: {
  id: string;
  status: 'pending' | 'in_progress' | 'review' | 'approved' | 'rejected';
  progress: number;
  notes: string | null;
  issued_document_url?: string | null; 
}) {
  try {
    // نتحقق أولاً إذا كان الحقل مبعوت، لو مبعوت نحدثه، لو مش مبعوت (undefined) نحتفظ بالقيمة الحالية في السيرفر منعاً للـ Overwrite
    if (issued_document_url !== undefined) {
      await sql`
        UPDATE applications
        SET 
          status = ${status}, 
          progress = ${progress}, 
          notes = ${notes}, 
          issued_document_url = ${issued_document_url}, 
          updated_at = NOW()
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE applications
        SET 
          status = ${status}, 
          progress = ${progress}, 
          notes = ${notes}, 
          updated_at = NOW()
        WHERE id = ${id}
      `;
    }
    
    // 💥 تحديث المسار الشامل لكسر كاش السيرفر بشكل صلب وقاطع
    revalidatePath('/', 'layout');
    revalidatePath('/[lang]/admin', 'page');
    revalidatePath('/[lang]/portal', 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to update application status:', error);
    return { success: false, error: 'Database update failed' };
  }
}

// 2. تحديث حالة المستند الفردي (قبول / رفض / إضافة رابط الملف المرفوع)
export async function updateDocumentStatus({
  docId,
  status,
  fileUrl,
  rejectionReason,
}: {
  docId: string;
  status: 'pending' | 'approved' | 'rejected';
  fileUrl: string | null;
  rejectionReason: string | null;
}) {
  try {
    await sql`
      UPDATE application_documents
      SET 
        status = ${status}, 
        file_url = ${fileUrl}, 
        rejection_reason = ${status === 'rejected' ? rejectionReason : null},
        updated_at = NOW()
      WHERE id = ${docId}
    `;

    revalidatePath('/', 'layout');
    revalidatePath('/[lang]/admin', 'page');
    revalidatePath('/[lang]/portal', 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to update document status:', error);
    return { success: false, error: 'Document update failed' };
  }
}