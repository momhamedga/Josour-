import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob'; // 👈 أضفنا del لحذف الملف سحابياً من الفيرسيل
import { sql } from '@/lib/neon';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const appId = formData.get('appId') as string | null;
    const isDelete = formData.get('delete') === 'true'; // 👈 فحص إذا كان الطلب هو طلب حذف

    if (!appId) {
      return NextResponse.json({ success: false, error: 'Missing application ID (appId)' }, { status: 400 });
    }

    // 🛑 [عملية الحذف]: إذا كان الأدمن ضغط على زرار الحذف
    if (isDelete) {
      // جلب الرابط القديم من قاعدة البيانات لحذفه من السحاب أولاً تنظيفاً للمساحة
      const currentApp = await sql`SELECT issued_document_url FROM applications WHERE id = ${appId} LIMIT 1` as any[];
      const oldUrl = currentApp[0]?.issued_document_url;

      if (oldUrl) {
        try {
          await del(oldUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
        } catch (delErr) {
          console.error('⚠️ Could not delete file from Vercel Blob, maybe already gone:', delErr);
        }
      }

      // تصفير الخانة في قاعدة البيانات وإرجاع الحالة إلى 'in_progress' أو 'pending' حسب رغبتك
      await sql`
        UPDATE applications
        SET 
          issued_document_url = null,
          status = 'in_progress', -- رجوع المعاملة جارية لأن الوثيقة اتحذفت
          progress = 90,         -- تقليل النسبة تلقائياً
          updated_at = NOW()
        WHERE id = ${appId}
      `;

      revalidatePath('/[lang]/admin', 'page');
      revalidatePath('/[lang]/portal', 'page');

      return NextResponse.json({ success: true, message: 'Document deleted successfully', url: null });
    }

    // 🟢 [عملية الرفع أو التعديل]:
    const file = formData.get('file') as File | null;
    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // تنظيف مساحة السحاب: لو فيه ملف قديم نمسحه قبل ما نرفع الجديد (تعديل CRUD ذكي)
    const currentApp = await sql`SELECT issued_document_url FROM applications WHERE id = ${appId} LIMIT 1` as any[];
    const oldUrl = currentApp[0]?.issued_document_url;
    if (oldUrl) {
      try { await del(oldUrl, { token: process.env.BLOB_READ_WRITE_TOKEN }); } catch {}
    }

    // رفع الملف الجديد
    const uniqueFileName = `issued-docs/${appId}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const blob = await put(uniqueFileName, file, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (!blob.url) {
      throw new Error('Failed to get secure URL from Vercel Blob');
    }

    // حفظ الرابط الجديد واعتماد المعاملة 100%
    await sql`
      UPDATE applications
      SET 
        issued_document_url = ${blob.url},
        status = 'approved',
        progress = 100,
        updated_at = NOW()
      WHERE id = ${appId}
    `;

    revalidatePath('/[lang]/admin', 'page');
    revalidatePath('/[lang]/portal', 'page');

    return NextResponse.json({ success: true, url: blob.url });

  } catch (error: any) {
    console.error('🔴 Error in upload-issued-doc API:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}