'use server';

import { put } from '@vercel/blob';
import { sql } from '@/lib/neon';
import { revalidatePath } from 'next/cache';

// 1. أكشن إعادة رفع المستندات المرفوضة (الموجود لديك حالياً)
export async function resubmitDocument(
  docId: string,
  appId: string,
  formData: FormData,
  lang: 'ar' | 'en'
) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: lang === 'ar' ? 'لم يتم اختيار ملف' : 'No file provided' };
    }

    // 1. رفع الملف بأمان إلى Vercel Blob Storage
    const blob = await put(`portal-docs/${appId}-${Date.now()}-${file.name}`, file, {
      access: 'private',
    });

    // 🚀 2. التحقق الذكي: هل المستند جديد كلياً (Fallback) أم مستند مرفوض مسبقاً؟
    if (docId.startsWith('fallback-')) {
      
      // استنتاج اسم المستند بناءً على المعرف الاحتياطي الممرر
      let docNameAr = 'مستند مرفق';
      let docNameEn = 'Attached Document';

      if (docId.includes('passport')) { docNameAr = 'صورة جواز السفر الساري'; docNameEn = 'Valid Passport Copy'; }
      else if (docId.includes('corporate_papex')) { docNameAr = 'عقد التأسيس أو السجل التجاري'; docNameEn = 'Memorandum of Association'; }
      else if (docId.includes('trade_mark')) { docNameAr = 'شهادة العلامة التجارية (إن وجدت)'; docNameEn = 'Trademark Certificate'; }
      else if (docId.includes('personal_photo')) { docNameAr = 'الصورة الشخصية الخلفية بيضاء'; docNameEn = 'Personal Digital Photo'; }
      else if (docId.includes('current_visa')) { docNameAr = 'تأشيرة الدخول أو الإقامة الحالية'; docNameEn = 'Current Visa/Entry Permit'; }

      // إدخال سطر جديد كلياً في قاعدة البيانات
      await sql`
        INSERT INTO application_documents (
          application_id, 
          document_name_ar, 
          document_name_en, 
          file_url, 
          status
        ) VALUES (
          ${appId}, 
          ${docNameAr}, 
          ${docNameEn}, 
          ${blob.url}, 
          'pending'
        )
      `;
    } else {
      // إذا كان المستند موجوداً مسبقاً ومرفوضاً، نقوم بتحديث الرابط وحالته إلى قيد الانتظار
      await sql`
        UPDATE application_documents
        SET file_url = ${blob.url}, status = 'pending', updated_at = NOW()
        WHERE id = ${docId} AND application_id = ${appId}
      `;
    }

    // 3. تحديث حالة المعاملة الأب لتصبح "تحت التدقيق والمراجعة" تلقائياً بمجرد رفع أي ملف
    await sql`
      UPDATE applications
      SET status = 'review', updated_at = NOW()
      WHERE id = ${appId}
    `;

    // تحديث الكاش الفوري لـ Next.js لمزامنة الصفحة
    revalidatePath(`/${lang}/portal`);

    return { success: true };
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return { 
      success: false, 
      error: lang === 'ar' ? 'حدث خطأ أثناء حفظ الملف في السيرفر' : 'Server error during upload' 
    };
  }
}

export async function createNewApplication(userId: string, serviceType: string, lang: 'ar' | 'en') {
  // رسائل الخطأ بناءً على لغة الواجهة
  const errors = {
    ar: {
      monthlyLimit: 'عذراً، لقد تجاوزت الحد الأقصى للمعاملات المسموح بها شهرياً (6 معاملات كحد أقصى).',
      activeLimit: 'لا يمكنك فتح معاملة جديدة. لديك 3 معاملات نشطة أو أكثر، ويجب اعتماد معاملتين منها على الأقل أولاً.',
    },
    en: {
      monthlyLimit: 'Sorry, you have reached the maximum allowed applications per month (Max 6).',
      activeLimit: 'Cannot open a new application. You have 3 or more active applications, and at least 2 must be approved first.',
    }
  };

  const t = errors[lang] || errors.ar;

  try {
    // 1. القيد الأول: حد أقصى 6 معاملات شهرياً (خلال الشهر الميلادي الحالي)
    const monthlyCheck = await sql`
      SELECT COUNT(*) as count 
      FROM applications 
      WHERE user_id = ${userId} 
        AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
    ` as any[];
    
    const monthlyCount = parseInt(monthlyCheck[0]?.count || '0', 10);
    if (monthlyCount >= 6) {
      throw new Error(t.monthlyLimit);
    }

    // 2. القيد الثاني: عدم إمكانية فتح أكثر من 3 معاملات نشطة إلا لو تم اعتماد 2 منها على الأقل
    // نحسب أولاً إجمالي المعاملات النشطة (كل الحالات ما عدا المعتمدة والمرفوضة نهائياً)
    const activeCheck = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE status NOT IN ('approved', 'rejected')) as active_count,
        COUNT(*) FILTER (WHERE status = 'approved') as approved_count
      FROM applications 
      WHERE user_id = ${userId}
    ` as any[];

    const activeCount = parseInt(activeCheck[0]?.active_count || '0', 10);
    const approvedCount = parseInt(activeCheck[0]?.approved_count || '0', 10);

    // إذا كان لديه 3 معاملات نشطة أو أكثر، ولم يعتمد له معاملتان على الأقل، يتم منعه
    if (activeCount >= 3 && approvedCount < 2) {
      throw new Error(t.activeLimit);
    }

    // 3. إذا تم اجتياز القيود بنجاح -> يتم إدراج المعاملة الجديدة
    await sql`
      INSERT INTO applications (user_id, service_type, status, progress, created_at, updated_at)
      VALUES (${userId}, ${serviceType}, 'pending', 0, NOW(), NOW())
    `;

    // تحديث الكاش لتظهر المعاملة فوراً في البوابة
    revalidatePath(`/${lang}/portal`);
    
    return { success: true };

  } catch (error: any) {
    console.error('Application Creation Error:', error);
    // إرجاع الخطأ ليتم عرضه في الواجهة أو إعادة رميه حسب رغبتك
    throw new Error(error.message || 'An unexpected error occurred');
  }
}
export async function updateApplicationDetails(
  appId: string,
  data: { progress?: number; notes?: string; status?: string },
  lang: 'ar' | 'en'
) {
  try {
    // بناء استعلام ديناميكي بسيط للتحديث
    await sql`
      UPDATE applications
      SET 
        progress = COALESCE(${data.progress}, progress),
        notes = COALESCE(${data.notes}, notes),
        status = COALESCE(${data.status}, status),
        updated_at = NOW()
      WHERE id = ${appId}
    `;

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Update application error:', error);
    return {
      success: false,
      error: lang === 'ar' ? 'فشل في تحديث بيانات المعاملة.' : 'Failed to update application.'
    };
  }
}

/**
 * 2. حذف المعاملة (Delete Application) مع تطبيق الشرط الأمني
 * "لا يمكن الحذف إلا إذا كانت الحالة تم الاعتماد approved"
 */
export async function deleteApplication(appId: string, lang: 'ar' | 'en') {
  try {
    // أ) التحقق من حالة المعاملة أولاً قبل الحذف
    const appRows = await sql`
      SELECT status FROM applications WHERE id = ${appId} LIMIT 1
    ` as any[];

    if (appRows.length === 0) {
      return {
        success: false,
        error: lang === 'ar' ? 'المعاملة غير موجودة بالفعل.' : 'Application not found.'
      };
    }

    const currentStatus = appRows[0].status;

    // ب) تطبيق الشرط الخاص بك
    if (currentStatus !== 'approved') {
      return {
        success: false,
        error: lang === 'ar' 
          ? '🛡️ أمن النظام: لا يمكن حذف المعاملة إلا بعد مراجعتها واعتمادها بالكامل وتحول حالتها إلى (تم الاعتماد).' 
          : '🛡️ System Security: Application cannot be deleted unless its status is (Approved).'
      };
    }

    // ج) إذا تحقق الشرط، يتم حذف المستندات المرتبطة بها أولاً لتجنب مشاكل الـ Foreign Key
    await sql`DELETE FROM application_documents WHERE application_id = ${appId}`;
    
    // د) حذف المعاملة نفسها
    await sql`DELETE FROM applications WHERE id = ${appId}`;

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Delete application error:', error);
    return {
      success: false,
      error: lang === 'ar' ? 'حدث خطأ غير متوقع أثناء محاولة الحذف.' : 'An error occurred during deletion.'
    };
  }
}
export async function adminDeleteApplication(id: string) {
  try {
    // حذف الوثائق التابعة أولاً لضمان عدم حدوث Foreign Key constraint error
    await sql`DELETE FROM application_documents WHERE application_id = ${id}`;
    // حذف المعاملة نفسها
    await sql`DELETE FROM applications WHERE id = ${id}`;
    
    revalidatePath('/[lang]/admin', 'page');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete application' };
  }
}
export async function adminCreateApplication(data: { userId: string; serviceType: string; status: string; progress: number; notes: string }) {
  try {
    await sql`
      INSERT INTO applications (user_id, service_type, status, progress, notes, created_at, updated_at)
      VALUES (${data.userId}, ${data.serviceType}, ${data.status}, ${data.progress}, ${data.notes}, NOW(), NOW())
    `;
    revalidatePath('/[lang]/admin', 'page');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create application' };
  }
}