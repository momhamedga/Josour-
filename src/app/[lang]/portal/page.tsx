export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { issueSignedToken, presignUrl } from '@vercel/blob';
import { siteContent } from '@/config/josour-content';
import { sql } from '@/lib/neon';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutClientUser } from '@/app/actions/user-auth';

import TransactionTimeline from './_components/TransactionTimeline';
import PortalNotification from './_components/PortalNotification';
import DocumentResubmitter from './_components/DocumentResubmitter';
import DeleteAppButton from './_components/DeleteAppButton'; 
import ClientAppManager from './_components/ClientAppManager'; // المكون الفخم الجديد
import Link from 'next/link';
import ClientIdCopyButton from './_components/ClientIdCopyButton'; 

interface PortalPageProps {
  params: Promise<{ lang: 'ar' | 'en' }>;
}

export default async function ClientPortalPage({ params }: PortalPageProps) {
  const { lang } = await params;
  const isRtl = lang === 'ar';

  const cookieStore = await cookies();
  const userEmail = cookieStore.get('user_email')?.value;

  if (!userEmail) {
    redirect(`/${lang}/portal/login`);
  }

  const dict = siteContent?.[lang] || siteContent?.ar || {};

  const translations = {
    ar: {
      title: 'بوابة تتبع المعاملات الذكية',
      subtitle: 'متابعة حية لحالة الرخص والتأشيرات والتفاعل اللحظي مع المستشار الإداري',
      investor: 'المنشأة / المستثمر',
      noData: 'لا توجد معاملات نشطة حالياً تحت هذا الحساب.',
      progressText: 'المسار الزمني اللحظي المعزز',
      progressLabel: 'نسبة الإنجاز الفعلي:', 
      updateLabel: 'تحديث المستشار الإداري اللحظي:',
      lastUpdate: 'آخر تحديث للمعاملة:',
      errorFetch: 'فشل في تحميل بيانات التتبع اللحظي.',
      docsTitle: 'المستندات والوثائق الرسمية للمنشأة',
      downloadDoc: 'تحميل المستند الحالي',
      viewRejected: 'معاينة المستند المرفوض',
      rejectionReason: 'سبب الرفض المباشر:',
      logoutBtn: 'تسجيل خروج أمني',
      viewMainSite: '🏢 الموقع الرئيسي',
      submitNewApp: 'تقديم معاملة جديدة فوراً',
      selectService: 'اختر نوع الخدمة / الرخصة المطلوبة',
      btnApply: 'إرسال الطلب البدئي مع المستندات',
      finalDocBanner: '🎉 مبروك! تم إصدار وثيقة الإنجاز النهائي واعتماد معاملتكم بنجاح.',
      downloadFinalDoc: '👁️ معاينة وتحميل الوثيقة الرسمية الصادرة',
      appIdLabel: 'رقم السجل التتبعي الموحد', 
      stats: {
        totalApps: 'المعاملات النشطة',
        approved: 'الرخص الصادرة',
        pendingDocs: 'وثائق مطلوبة',
        rejectedDocs: 'تعديلات مطلوبة'
      },
      statuses: {
        pending: 'قيد الانتظار',
        in_progress: 'جاري المعالجة',
        review: 'تحت التدقيق',
        approved: 'تم الاعتماد',
        rejected: 'تعديل مطلوب',
      }
    },
    en: {
      title: 'Smart Tracking Portal',
      subtitle: 'Live tracking of your business licenses and visas with direct interactive actions',
      investor: 'Company / Investor',
      noData: 'No active applications found under this account.',
      progressText: 'Enhanced Live Timeline Track',
      progressLabel: 'Actual Progress:', 
      updateLabel: 'Live Consultant Update:',
      lastUpdate: 'Last Update:',
      errorFetch: 'Failed to load tracking data.',
      docsTitle: 'Official Documents & Permits',
      downloadDoc: 'Download Current Document',
      viewRejected: 'Preview Rejected Document',
      rejectionReason: 'Rejection Reason:',
      logoutBtn: 'Secure Logout',
      viewMainSite: '🏢 View Main Site',
      submitNewApp: 'Submit New Application',
      selectService: 'Select Required Service / License',
      btnApply: 'Submit Request with Documents',
      finalDocBanner: '🎉 Congratulations! Your final document has been successfully issued and approved.',
      downloadFinalDoc: '👁️ Preview & Download Official Issued Document',
      appIdLabel: 'Unified Registry Key', 
      stats: {
        totalApps: 'Active Apps',
        approved: 'Issued Licenses',
        pendingDocs: 'Docs Required',
        rejectedDocs: 'Revisions Needed'
      },
      statuses: {
        pending: 'Pending',
        in_progress: 'In Progress',
        review: 'Under Review',
        approved: 'Approved',
        rejected: 'Rejected',
      }
    }
  };

  const t = translations[lang] || translations.ar;
  
  let rawApplications: any[] = [];
  let userData: { id: string; company_name: string } | null = null;
  let errorMsg = '';

  const docTranslations: Record<string, { ar: string; en: string }> = {
    passport: { ar: 'صورة جواز السفر الساري', en: 'Valid Passport Copy' },
    corporate_papex: { ar: 'عقد التأسيس أو السجل التجاري', en: 'Memorandum of Association' },
    trade_mark: { ar: 'شهادة العلامة التجارية (إن وجدت)', en: 'Trademark Certificate' },
    personal_photo: { ar: 'الصورة الشخصية الخلفية بيضاء', en: 'Personal Digital Photo' },
    current_visa: { ar: 'تأشيرة الدخول أو الإقامة الحالية', en: 'Current Visa/Entry Permit' },
    financial_statement: { ar: 'القوائم المالية المدققة للشركة', en: 'Audited Financial Statements' },
    icv_plan: { ar: 'خطة القيمة الوطنية المضافة المقترحة', en: 'Proposed ICV Improvement Plan' },
    property_deed: { ar: 'صورة الملكية أو سند العقار المعني', en: 'Title Deed Copy' },
    trade_license: { ar: 'صورة رخصة المنشأة الحالية', en: 'Current Trade License Copy' },
    id_card: { ar: 'الهوية الوطنية / بطاقة الإقامة', en: 'National ID / Emirates ID' }
  };

  try {
    const userRows = await sql`SELECT id, company_name FROM users WHERE email = ${userEmail} LIMIT 1` as any[];
    if (userRows && userRows.length > 0) {
      userData = { id: userRows[0].id, company_name: userRows[0].company_name };
    }

    const rows = await sql`
      SELECT 
        a.id, a.service_type, a.status, a.progress, a.notes, a.updated_at, a.issued_document_url, u.company_name, u.name as user_name,
        COALESCE(
          (
            SELECT json_agg(d.* ORDER BY d.created_at ASC)
            FROM application_documents d
            WHERE d.application_id = a.id
          ),
          '[]'::json
        ) as documents
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE u.email = ${userEmail}
      ORDER BY a.updated_at DESC
    ` as any[];

    if (rows && rows.length > 0) {
      let blobToken: any = null;
      try {
        const tokenResult = await issueSignedToken({ operations: ['get'] });
        blobToken = typeof tokenResult === 'string' ? tokenResult : (tokenResult as any)?.token;
      } catch (tokenErr) {
        console.error('Safe bypassed blob token issuance', tokenErr);
      }

      const now = Date.now();
      const validUntil = now + 60 * 60 * 1000;

      rawApplications = await Promise.all(
        rows.map(async (app) => {
          if (!app) return null;
          const updatedApp = { ...app };

          if (blobToken && app.issued_document_url && app.issued_document_url.includes('.private.blob.vercel-storage.com')) {
            try {
              const finalUrlObj = new URL(app.issued_document_url);
              const finalPathname = finalUrlObj.pathname.substring(1);
              const tokenString = typeof blobToken === 'string' ? blobToken : blobToken.token;

              const { presignedUrl: signedFinalUrl } = await presignUrl(tokenString, {
                pathname: finalPathname,
                operation: 'get',
                access: 'private',
                validUntil: validUntil,
              });
              updatedApp.issued_document_url = signedFinalUrl;
            } catch (err) {
              console.error('Failed to presign final URL safely', err);
            }
          }

          if (!app.documents) app.documents = [];

          const securedDocuments = await Promise.all(
            app.documents.map(async (doc: any) => {
              if (!doc) return null;
              if (blobToken && doc?.file_url && doc.file_url.includes('.private.blob.vercel-storage.com')) {
                try {
                  const urlObj = new URL(doc.file_url);
                  const pathname = urlObj.pathname.substring(1);
                  const tokenString = typeof blobToken === 'string' ? blobToken : blobToken.token;

                  const { presignedUrl } = await presignUrl(tokenString, {
                    pathname: pathname,
                    operation: 'get',
                    access: 'private',
                    validUntil: validUntil,
                  });

                  return { ...doc, file_url: presignedUrl };
                } catch (tokenErr) {
                  return doc;
                }
              }
              return doc;
            })
          );

          updatedApp.documents = securedDocuments.filter(Boolean);
          return updatedApp;
        })
      );
      
      rawApplications = rawApplications.filter(Boolean);
    }
  } catch (err) {
    errorMsg = t.errorFetch;
    console.error('Absolute Main DB Render Safe Crash Catch:', err);
  }

  const statusColors = {
    pending: { bg: 'oklch(0.96 0.03 90)', border: 'oklch(0.85 0.1 90)', textCol: 'oklch(0.45 0.15 90)' },
    in_progress: { bg: 'oklch(0.94 0.04 220)', border: 'oklch(0.78 0.14 220)', textCol: 'oklch(0.4 0.18 220)' },
    review: { bg: 'oklch(0.95 0.05 40)', border: 'oklch(0.8 0.15 40)', textCol: 'oklch(0.45 0.2 40)' },
    approved: { bg: 'oklch(0.95 0.04 145)', border: 'oklch(0.78 0.14 145)', textCol: 'oklch(0.35 0.18 145)' },
    rejected: { bg: 'oklch(0.94 0.05 25)', border: 'oklch(0.75 0.16 25)', textCol: 'oklch(0.4 0.2 25)' },
  };

  const docStatusStyles = {
    pending: 'bg-amber-50 border-amber-200 text-amber-700',
    approved: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    rejected: 'bg-rose-50 border-rose-200 text-rose-700',
  };

  const servicesItems = dict?.servicesSection?.items || siteContent?.ar?.servicesSection?.items || [];
  const availableServices = servicesItems
    .map((item: any) => ({
      id: item?.id || '',
      title: item?.title || '',
      requiredDocs: item?.requiredDocs || []
    }))
    .filter((item: any) => item.id && item.id !== 'vip' && item.id !== 'vip_web' && !item.id.includes('design'));

  const processedApplications = rawApplications.map((app) => {
    if (!app) return null;
    const currentServiceConfig = availableServices.find((s: any) => String(s.id) === String(app.service_type));
    
    let fallbackDocsKeys: string[] = [];
    if (currentServiceConfig?.requiredDocs && currentServiceConfig.requiredDocs.length > 0) {
      fallbackDocsKeys = currentServiceConfig.requiredDocs;
    } else {
      switch (app.service_type) {
        case 'government_services':
          fallbackDocsKeys = ['id_card', 'trade_license', 'passport'];
          break;
        case 'icv_certificates':
          fallbackDocsKeys = ['financial_statement', 'icv_plan', 'trade_license'];
          break;
        case 'real_estate_services':
          fallbackDocsKeys = ['property_deed', 'id_card', 'passport'];
          break;
        case 'investor_visa':
          fallbackDocsKeys = ['passport', 'personal_photo', 'current_visa'];
          break;
        default:
          fallbackDocsKeys = ['passport', 'trade_license', 'corporate_papex'];
          break;
      }
    }

    const displayedDocs = fallbackDocsKeys.map((docKey: string, i: number) => {
      const translation = docTranslations[docKey] || { ar: docKey, en: docKey };
      const nameAr = translation.ar;
      const nameEn = translation.en;

      const existingDoc = app.documents?.find((d: any) => 
        d && (d.document_name_ar === nameAr || 
        d.document_name_en === nameEn ||
        (d.id && String(d.id).includes(docKey)))
      );
      
      if (existingDoc) return existingDoc;

      return {
        id: `fallback-${app.id}-${docKey}-${i}`,
        document_name_ar: nameAr,
        document_name_en: nameEn,
        status: 'pending',
        file_url: null
      };
    });

    return {
      ...app,
      displayedDocs,
      serviceTitle: currentServiceConfig ? currentServiceConfig.title : app.service_type
    };
  }).filter(Boolean);

  const totalApps = processedApplications.length;
  const approvedLicenses = processedApplications.filter(a => a && a.status === 'approved').length;
  
  const pendingDocs = processedApplications.reduce((acc, app) => 
    acc + (app?.displayedDocs?.filter((d: any) => d && !d.file_url && d.status !== 'rejected').length || 0), 0
  );
  
  const rejectedDocs = processedApplications.reduce((acc, app) => 
    acc + (app?.displayedDocs?.filter((d: any) => d && d.status === 'rejected').length || 0), 0
  );

return (
    <main className={`min-h-screen bg-brand-light-bg py-12 md:py-20 px-3 sm:px-6 lg:px-8 text-start ${isRtl ? 'font-cairo' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 w-full">
        
        {/* شريط الأدوات العلوي وتسجيل الخروج الآمن */}
        <div className="flex items-center justify-between gap-2 bg-white/60 border border-brand-navy-dark/[0.04] p-2 rounded-xl backdrop-blur-xs w-full">
          <Link 
            href={`/${lang}`}
            className="text-[10px] sm:text-xs font-bold text-brand-navy-dark hover:text-brand-gold bg-brand-navy-dark/[0.03] px-2.5 py-1.5 rounded-lg border border-brand-navy-dark/5 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>{t.viewMainSite}</span>
          </Link>

          <form action={async () => {
            'use server';
            await logoutClientUser();
            redirect(`/${lang}/portal/login`);
          }}>
            <button 
              type="submit" 
              className="text-[10px] sm:text-xs font-black text-rose-600 bg-rose-50/50 hover:bg-rose-100/60 px-3 py-1.5 rounded-lg border border-rose-200/40 cursor-pointer transition-all duration-200"
            >
              {t.logoutBtn}
            </button>
          </form>
        </div>

        {/* معلومات المستثمر والهيدر الإستراتيجي */}
        <div className="border-b border-brand-navy-dark/10 pb-5 sm:pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="text-start">
            <h1 className="text-xl sm:text-3xl font-black text-brand-navy-dark tracking-tight mb-1.5 text-start">{t.title}</h1>
            <p className="text-brand-navy-dark/60 text-xs sm:text-sm font-medium text-start">{t.subtitle}</p>
          </div>
          {userData && (
            <div className="bg-white border border-brand-navy-dark/5 shadow-2xs rounded-xl p-3 sm:p-4 w-full md:w-auto text-start">
              <span className="text-[10px] text-brand-navy-dark/40 block mb-0.5 font-bold">{t.investor}</span>
              <span className="text-sm font-black text-brand-navy-dark block">{userData.company_name}</span>
            </div>
          )}
        </div>

        {/* لوحة الإحصائيات الشاملة السريعة */}
        {processedApplications.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            <div className="bg-white border border-brand-navy-dark/[0.05] rounded-xl p-3 shadow-2xs text-start">
              <span className="text-brand-navy-dark/40 text-[10px] font-bold block mb-0.5 truncate">{t.stats.totalApps}</span>
              <span className="text-xl font-mono font-black text-brand-navy-dark block">{totalApps}</span>
            </div>
            <div className="bg-emerald-50/40 border border-emerald-500/10 rounded-xl p-3 text-start">
              <span className="text-emerald-700/60 text-[10px] font-bold block mb-0.5 truncate">{t.stats.approved}</span>
              <span className="text-xl font-mono font-black text-emerald-700 block">{approvedLicenses}</span>
            </div>
            <div className="bg-amber-50/50 border border-amber-500/10 rounded-xl p-3 text-start">
              <span className="text-amber-700/60 text-[10px] font-bold block mb-0.5 truncate">{t.stats.pendingDocs}</span>
              <span className="text-xl font-mono font-black text-amber-700 block">{pendingDocs}</span>
            </div>
            <div className="bg-rose-50/40 border border-rose-500/10 rounded-xl p-3 text-start">
              <span className="text-rose-700/60 text-[10px] font-bold block mb-0.5 truncate">{t.stats.rejectedDocs}</span>
              <span className="text-xl font-mono font-black text-rose-700 block">{rejectedDocs}</span>
            </div>
          </div>
        )}

        {errorMsg && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center text-xs font-bold">{errorMsg}</div>}
        
        {processedApplications.length === 0 && !errorMsg && (
          <div className="text-center py-14 bg-white border border-brand-navy-dark/5 rounded-xl shadow-2xs p-6 w-full">
            <p className="text-brand-navy-dark/40 text-sm font-medium">{t.noData}</p>
          </div>
        )}

        {/* 🌟 استدعاء القائد التفاعلي الموحد وإعطاؤه الصلاحية الكاملة لرسم كروت المعاملات وحمايتها بمودال الحذف الفخم */}
        {userData && (
          <ClientAppManager 
            userId={userData.id}
            lang={lang}
            isRtl={isRtl}
            availableServices={availableServices}
            processedApplications={processedApplications}
            translations={t}
            statusColors={statusColors}
            docStatusStyles={docStatusStyles}
          />
        )}

      </div>
    </main>
  );   
} 
