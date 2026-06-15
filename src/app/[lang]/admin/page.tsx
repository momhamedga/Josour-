import { sql } from '@/lib/neon';
import AdminPanel from './_components/AdminPanel';
import { siteContent } from '@/config/josour-content';
import { logoutAdmin } from '@/app/actions/admin-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link'; // 👈 استيراد Link للتنقل السلس دون عمل ريفريش كامل

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface AdminPageProps {
  params: Promise<{ lang: 'ar' | 'en' }>;
}

export default async function AdminDashboardPage({ params }: AdminPageProps) {
  const { lang } = await params;
  const dict = siteContent[lang];

  // 📝 1. جلب كافة المعاملات والمستندات لايف
  const rows = await sql`
    SELECT 
      a.id, 
      u.name, 
      u.company_name, 
      a.service_type, 
      a.status, 
      a.progress, 
      a.notes,
      a.created_at,        
      a.issued_document_url, 
      48 as sla_hours_limit, 
      a.fees, -- 🌟 تم الاستبدال بجلب الحقل الحقيقي المباشر من الداتابيز بدلاً من التثبيت الفارغ
      COALESCE(
        (SELECT json_agg(d.* ORDER BY d.created_at ASC) FROM application_documents d WHERE d.application_id = a.id),
        '[]'::json
      ) as documents
    FROM applications a
    JOIN users u ON a.user_id = u.id
    ORDER BY a.updated_at DESC
  ` as any[];

  // 👥 2. جلب قائمة المستثمرين بالكامل لتغذية مودال الإنشاء الفوري داخل الـ AdminPanel
  const allUsers = await sql`
    SELECT id, name, company_name 
    FROM users 
    ORDER BY company_name ASC
  ` as any[];

  return (
    <main className="min-h-screen bg-brand-light-bg/50 py-24 px-4 sm:px-6 lg:px-8" dir={dict.dir}>
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* 🛠️ السطر العلوي المطور: يحتوي على زر العودة للرئيسية وزر تسجيل الخروج بجانب بعض */}
        <div className="flex items-center justify-between gap-4 bg-white/40 border border-brand-navy-dark/[0.04] p-3 rounded-xl backdrop-blur-xs">
          
          {/* 🏠 زر العودة للرئيسية الفخم (تصفح الموقع دون فقدان جلسة الإدارة) */}
          <Link 
            href={`/${lang}`}
            className="text-xs font-bold text-brand-navy-dark hover:text-brand-gold bg-brand-navy-dark/[0.03] hover:bg-brand-navy-dark/5 px-3 py-2 rounded-lg border border-brand-navy-dark/5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>{lang === 'ar' ? '🏢 عرض الموقع الرئيسي' : '🏢 View Main Site'}</span>
          </Link>

          {/* 🚪 فورم وزر تسجيل الخروج الآمن */}
          <form action={async () => {
            'use server';
            await logoutAdmin();
            redirect(`/${lang}/admin/login`);
          }}>
            <button type="submit" className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-lg border border-rose-100 cursor-pointer transition-all">
              {lang === 'ar' ? 'تسجيل الخروج الآمن' : 'Secure Logout'}
            </button>
          </form>
        </div>

        {/* تمرير البيانات الموسعة مع قائمة المستخدمين كاملة للـ Client Component */}
        <AdminPanel initialApplications={rows} allUsersList={allUsers} lang={lang} />
      </div>
    </main>
  );
}