'use server';

import { sql } from '@/lib/neon';
import { revalidatePath } from 'next/cache';

export interface UpdateDocPayload {
  docId: string;
  status: 'pending' | 'approved' | 'rejected';
  fileUrl?: string | null;
  rejectionReason?: string | null;
}


export async function updateDocumentStatus(payload: UpdateDocPayload) {
  try {
    const { docId, status, fileUrl, rejectionReason } = payload;

    // 1. تحديث قاعدة البيانات
    await sql`
      UPDATE application_documents
      SET 
        status = ${status},
        file_url = COALESCE(${fileUrl}, file_url),
        rejection_reason = ${rejectionReason || null},
        updated_at = NOW()
      WHERE id = ${docId}
    `;

    // 2. جلب بيانات العميل والوثيقة
    const result = await sql`
      SELECT 
        u.email, u.name, u.preferred_lang,
        d.document_name_ar, d.document_name_en,
        a.service_type
      FROM application_documents d
      JOIN applications a ON d.application_id = a.id
      JOIN users u ON a.user_id = u.id
      WHERE d.id = ${docId}
    `;

    if (result && result.length > 0) {
      const client = result[0];
      const isAr = client.preferred_lang === 'ar';
      const docName = isAr ? client.document_name_ar : client.document_name_en;

      // 3. الحل السحري: استدعاء المكتبة ديناميكياً لتفادي مشاكل الـ Compiler تماماً
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      // 4. صياغة محتوى الإيميل بناءً على اللغة
      let emailSubject = '';
      let emailHtml = '';

      if (isAr) {
        const statusText = status === 'approved' ? 'تم اعتماده' : status === 'rejected' ? 'يتطلب إجراء مراجعة' : 'قيد التدقيق';
        emailSubject = `تحديث بخصوص وثيقتك: ${docName}`;
        emailHtml = `
          <div dir="rtl" style="font-family: 'Cairo', sans-serif; padding: 30px; background-color: #f9f9f9; color: #0b1a30;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid #eee;">
              <h2 style="color: #d4af37; border-bottom: 2px solid #f5f5f5; padding-bottom: 15px;">بوابة جسور | تحديث لحظي للمعاملة</h2>
              <p>عزيزي المستثمر <strong>${client.name}</strong>،</p>
              <p>نود إفادتك بأن مستشارنا الإداري قد قام بمراجعة المستند الخاص بك:</p>
              <div style="background-color: #f4f6f9; padding: 15px; border-radius: 10px; margin: 20px 0; font-weight: bold;">
                📄 ${docName}
              </div>
              <p>الحالة الجديدة للوثيقة هي: <span style="color: ${status === 'approved' ? '#10b981' : '#f43f5e'}; font-weight: bold;">${statusText}</span></p>
              ${status === 'rejected' && rejectionReason ? `
                <div style="background-color: #fff1f2; border: 1px solid #ffe4e6; padding: 15px; border-radius: 10px; color: #e11d48; margin-top: 15px;">
                  <strong>سبب الرفض والملاحظات:</strong> ${rejectionReason}
                </div>
              ` : ''}
              <div style="margin-top: 35px; text-align: center;">
                <a href="https://josour.ae/ar/portal" style="background-color: #0b1a30; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">الانتقال إلى بوابة التتبع</a>
              </div>
            </div>
          </div>
        `;
      } else {
        const statusText = status === 'approved' ? 'Approved' : status === 'rejected' ? 'Requires Revision' : 'Under Review';
        emailSubject = `Document Update Notice: ${docName}`;
        emailHtml = `
          <div dir="ltr" style="font-family: Arial, sans-serif; padding: 30px; background-color: #f9f9f9; color: #0b1a30;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid #eee;">
              <h2 style="color: #d4af37; border-bottom: 2px solid #f5f5f5; padding-bottom: 15px;">Josour Portal | Live Document Update</h2>
              <p>Dear Valued Investor <strong>${client.name}</strong>,</p>
              <p>We would like to inform you that our consultant has reviewed the following document:</p>
              <div style="background-color: #f4f6f9; padding: 15px; border-radius: 10px; margin: 20px 0; font-weight: bold;">
                📄 ${docName}
              </div>
              <p>The new status of this document is: <span style="color: ${status === 'approved' ? '#10b981' : '#f43f5e'}; font-weight: bold;">${statusText}</span></p>
              ${status === 'rejected' && rejectionReason ? `
                <div style="background-color: #fff1f2; border: 1px solid #ffe4e6; padding: 15px; border-radius: 10px; color: #e11d48; margin-top: 15px;">
                  <strong>Rejection Reason / Notes:</strong> ${rejectionReason}
                </div>
              ` : ''}
              <div style="margin-top: 35px; text-align: center;">
                <a href="https://josour.ae/en/portal" style="background-color: #0b1a30; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Go to Tracking Portal</a>
              </div>
            </div>
          </div>
        `;
      }

      // 5. إرسال الإيميل
      await resend.emails.send({
        from: 'بوابة جسور الذكية <portal@josour.ae>',
        to: [client.email],
        subject: emailSubject,
        html: emailHtml,
      });
    }

    // ريفريش الكاش فوراً
    revalidatePath('/[lang]/portal', 'page');
    revalidatePath('/[lang]/admin', 'page');
    
    return { success: true };
  } catch (error) {
    console.error('خطأ أثناء التحديث:', error);
    return { success: false, error: 'فشل في التحديث أو إرسال الإشعار اللحظي.' };
  }
}