'use server';

import { sql } from '@/lib/neon';
import { cookies } from 'next/headers';

export async function loginClientUser(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();

  // رسائل التحقق الثنائية الفخمة
  if (!email) {
    return { 
      success: false, 
      errorAr: 'الرجاء إدخال البريد الإلكتروني الخاص بالمنشأة.',
      errorEn: 'Please enter your registered enterprise email.'
    };
  }

  try {
    // 1️⃣ التحقق من وجود العميل في قاعدة البيانات
    let result = await sql`
      SELECT id, name, email, company_name 
      FROM users 
      WHERE email = ${email}
      LIMIT 1
    ` as any[];

    // 2️⃣ الـ Auto-Healing الذكي والمحسن
    if (result.length === 0) {
      if (email === 'mohamed@josour.ae') {
        // إنشاء الحساب فوراً في الداتابيز
        await sql`
          INSERT INTO users (name, email, company_name)
          VALUES ('محمد أحمد', 'mohamed@josour.ae', 'مجموعة جسور الدولية للاستثمار')
        `;
        
        // جلب البيانات مجدداً بعد الإنشاء التلقائي لإكمال الجلسة فوراً بدون تجميد
        result = await sql`
          SELECT id, name, email, company_name 
          FROM users 
          WHERE email = ${email}
          LIMIT 1
        ` as any[];
      } else {
        return { 
          success: false, 
          errorAr: 'هذا البريد الإلكتروني غير مسجل في منظومة المستثمرين لدينا.',
          errorEn: 'This email is not registered in our dynamic investor network.'
        };
      }
    }

    // 3️⃣ زرع الـ Cookie الخاصة بجلسة العميل (تستمر لمدة شهر كامل لراحة المستثمر)
    const cookieStore = await cookies();
    cookieStore.set('user_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 يوم كاملة
    });

    return { success: true };
  } catch (error) {
    console.error('🔴 Client Portal Login Error:', error);
    return { 
      success: false, 
      errorAr: 'حدث خطأ في الخادم أثناء الاتصال ببوابة المستثمرين.',
      errorEn: 'A server infrastructure error occurred during portal connection.'
    };
  }
}


export async function registerClientUser(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const companyName = (formData.get('company_name') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim(); // 👈 استقبال حقل الهاتف المجمع

  if (!name || !email || !companyName || !phone) {
    return {
      success: false,
      errorAr: 'جميع الحقول بما فيها رقم الهاتف مطلوبة لتسجيل المنشأة.',
      errorEn: 'All fields, including phone number, are strictly required.'
    };
  }

  try {
    // التحقق هل الإيميل مسجل مسبقاً؟
    const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1` as any[];
    if (existing.length > 0) {
      return {
        success: false,
        errorAr: 'هذا البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول مباشرة.',
        errorEn: 'This email is already registered. Please sign in directly.'
      };
    }

    // إدراج المستثمر الجديد في قاعدة البيانات مع حفظ الهاتف
    await sql`
      INSERT INTO users (name, email, company_name, phone)
      VALUES (${name}, ${email}, ${companyName}, ${phone})
    `;

    // زرع كوكيز الجلسة فوراً للاعتماد التلقائي بعد التسجيل لراحة المستثمر
    const cookieStore = await cookies();
    cookieStore.set('user_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 يوم
    });

    return { success: true };
  } catch (error) {
    console.error('🔴 Client Corporate Registration Error:', error);
    return {
      success: false,
      errorAr: 'حدث خطأ في السيرفر أثناء تسجيل المنشأة.',
      errorEn: 'A server infrastructure error occurred during corporate registry.'
    };
  }
}
// دالة تسجيل خروج العميل الأمنية
export async function logoutClientUser() {
  const cookieStore = await cookies();
  cookieStore.delete('user_email');
  return { success: true };
}

