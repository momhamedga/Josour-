'use server';

import { sql } from '@/lib/neon';

// تعريف الهيكل هنا يحل مشكلة الـ Cannot find name فوراً
export interface ApplicationData {
  id: string;
  name: string;
  company_name: string;
  service_type: string;
  status: 'pending' | 'in_progress' | 'review' | 'approved' | 'rejected';
  progress: number;
  notes: string | null;
  updated_at: string | Date;
}

/**
 * جلب جميع المعاملات النشطة للمستثمر بناءً على بريده الإلكتروني
 */
export async function getClientApplications(email: string): Promise<ApplicationData[]> {
  try {
    // استدعاء ناصع بالباك-تيكس متوافق 100% مع TypeScript و Neon
    const rows = await sql`
      SELECT 
        a.id,
        u.name,
        u.company_name,
        a.service_type,
        a.status,
        a.progress,
        a.notes,
        a.updated_at
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE u.email = ${email}
      ORDER BY a.updated_at DESC
    `;

    return rows as unknown as ApplicationData[];
  } catch (error) {
    console.error('خطأ أثناء جلب بيانات المعاملات من Neon via HTTP:', error);
    throw new Error('فشل في تحميل بيانات التتبع، حاول مرة أخرى.');
  }
}