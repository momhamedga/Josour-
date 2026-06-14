// 🌟 إجبار المترجم على معالجة الصفحة ديناميكياً 100% ومنع الـ Pre-rendering الصامت
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
import SubmitAppForm from './_components/SubmitAppForm'; 
import Link from 'next/link';
import ClientIdCopyButton from './_components/ClientIdCopyButton'; 

interface PortalPageProps {
  params: Promise<{ lang: 'ar' | 'en' }>;
}

export default async function ClientPortalPage({ params }: PortalPageProps) {
  // 1. فك الـ Params بأمان
  const { lang } = await params;

  // 2. التحقق من الكوكيز
  const cookieStore = await cookies();
  const userEmail = cookieStore.get('user_email')?.value;

  if (!userEmail) {
    redirect(`/${lang}/portal/login`);
  }

  // 3. تأمين القاموس والمحتوى من الانهيار التام
  const dict = siteContent?.[lang] || siteContent?.ar || {};
  const isRtl = lang === 'ar';

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
    if (userRows.length > 0) {
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

    if (rows.length > 0) {
      let blobToken: any = null;
      try {
        const tokenResult = await issueSignedToken({ operations: ['get'] });
        blobToken = typeof tokenResult === 'string' ? tokenResult : (tokenResult as any).token;
      } catch (tokenErr) {
        console.error('Failed to issue blob token', tokenErr);
      }

      // 🌟 احتساب الوقت الثابت الآمن بداخل الـ Execution Block
      const now = Date.now();
      const validUntil = now + 60 * 60 * 1000;

      rawApplications = await Promise.all(
        rows.map(async (app) => {
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
              console.error('Failed to sign final doc url safely', err);
            }
          }

          if (!app.documents) app.documents = [];

          const securedDocuments = await Promise.all(
            app.documents.map(async (doc: any) => {
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
                  console.error('Safe bypass for document URL parsing', tokenErr);
                  return doc;
                }
              }
              return doc;
            })
          );

          return { ...updatedApp, documents: securedDocuments };
        })
      );
    }
  } catch (err) {
    errorMsg = t.errorFetch;
    console.error('Main db transaction failed', err);
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
  });

  const totalApps = processedApplications.length;
  const approvedLicenses = processedApplications.filter(a => a.status === 'approved').length;
  
  const pendingDocs = processedApplications.reduce((acc, app) => 
    acc + (app.displayedDocs?.filter((d: any) => d && !d.file_url && d.status !== 'rejected').length || 0), 0
  );
  
  const rejectedDocs = processedApplications.reduce((acc, app) => 
    acc + (app.displayedDocs?.filter((d: any) => d && d.status === 'rejected').length || 0), 0
  );

  return (
    <main className={`min-h-screen bg-brand-light-bg py-12 md:py-20 px-3 sm:px-6 lg:px-8 text-start ${isRtl ? 'font-cairo' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 w-full">
        
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

        {userData && (
          <div className="w-full">
            <SubmitAppForm 
              userId={userData.id}
              lang={lang}
              isRtl={isRtl}
              services={availableServices}
              translations={{
                submitNewApp: t.submitNewApp,
                selectService: t.selectService,
                btnApply: t.btnApply
              }}
            />
          </div>
        )}

        <PortalNotification rejectedCount={rejectedDocs} lang={lang} />

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

        <div className="grid grid-cols-1 gap-5 sm:gap-8 w-full">
          {processedApplications.map((app) => {
            const currentColors = statusColors[app.status as keyof typeof statusColors] || statusColors.pending;
            const statusText = t.statuses[app.status as keyof typeof t.statuses] || t.statuses.pending;

            return (
              <div key={app.id} className="bg-white border border-brand-navy-dark/[0.05] rounded-xl p-4 sm:p-7 shadow-2xs relative overflow-hidden group text-start w-full">
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-gold to-brand-gold-hover" />
                
                <div className="mb-4 bg-brand-navy-dark/[0.015] p-2.5 rounded-lg border border-brand-navy-dark/[0.04] flex items-center justify-between gap-3 w-full text-start">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-brand-navy-dark/60 text-start">
                    <span className="w-1 h-1 bg-brand-gold rounded-full shrink-0" />
                    <span className="truncate">{t.appIdLabel}:</span>
                    <span className="font-mono text-brand-navy-dark font-extrabold bg-white border border-brand-navy-dark/5 px-2 py-0.5 rounded shadow-3xs uppercase select-all">
                      {app.id.slice(0, 4)}...{app.id.slice(-4)}
                    </span>
                  </div>
                  <ClientIdCopyButton id={app.id} lang={lang} />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 w-full text-start">
                  <div className="text-start">
                    <h3 className="text-base sm:text-xl font-black text-brand-navy-dark text-start">{app.serviceTitle}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border tracking-wide shadow-3xs"
                      style={{ backgroundColor: currentColors.bg, borderColor: currentColors.border, color: currentColors.textCol }}>
                      {statusText}
                    </span>
                    <DeleteAppButton appId={app.id} lang={lang} />
                  </div>
                </div>

                {app.issued_document_url && (
                  <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 sm:p-5 rounded-xl shadow-3xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 animate-fadeIn w-full text-start">
                    <p className="font-bold text-xs sm:text-sm text-start leading-relaxed">
                      {t.finalDocBanner}
                    </p>
                    <Link 
                      href={app.issued_document_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto text-center text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all cursor-pointer shadow-xs"
                    >
                      {t.downloadFinalDoc}
                    </Link>
                  </div>
                )}

                <div className="mb-5 bg-brand-light-bg/30 border border-brand-navy-dark/[0.02] rounded-xl p-3 sm:p-5 w-full text-start">
                  <div className="flex justify-between items-center mb-3 text-[10px] sm:text-xs font-bold">
                    <span className="text-brand-navy-dark/40">{t.progressText}</span>
                    <span className="text-brand-navy-dark bg-brand-navy-dark/[0.04] px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                      <span className="text-brand-gold font-black">{app.progress || 0}%</span>
                    </span>
                  </div>
                  <TransactionTimeline status={app.status} progress={app.progress} lang={lang} />
                </div>

                {app.notes && (
                  <div className="bg-brand-navy-dark/[0.015] border border-brand-navy-dark/[0.03] rounded-lg p-3 text-xs text-brand-navy-dark/80 mb-5 text-start w-full">
                    <span className="text-[10px] text-brand-navy-dark/40 block font-bold mb-1 text-start">{t.updateLabel}</span>
                    <p className="leading-relaxed font-semibold text-start">{app.notes}</p>
                  </div>
                )}

                {app.displayedDocs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-brand-navy-dark/[0.05] w-full text-start">
                    <h4 className="text-xs sm:text-sm font-black text-brand-navy-dark mb-3 flex items-center gap-1.5 text-start">
                      <span className="w-1 h-2.5 bg-brand-gold rounded-full inline-block" />
                      {t.docsTitle}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-start">
                      {app.displayedDocs.map((doc: any) => {
                        if (!doc) return null;
                        const docName = lang === 'ar' ? doc.document_name_ar : doc.document_name_en;
                        const docStatusText = t.statuses[doc.status as keyof typeof t.statuses] || t.statuses.pending;
                        const styleClass = docStatusStyles[doc.status as keyof typeof docStatusStyles] || docStatusStyles.pending;
                        const secureViewUrl = doc.file_url ? `/api/view-doc?url=${encodeURIComponent(doc.file_url)}` : '';

                        return (
                          <div key={doc.id} className="border border-brand-navy-dark/[0.04] rounded-lg p-3 flex flex-col justify-between bg-brand-light-bg/20 gap-2 w-full text-start">
                            <div className="flex justify-between items-start gap-2 text-start w-full">
                              <span className="text-[11px] font-bold text-brand-navy-dark/80 leading-tight text-start flex-1 min-w-0 truncate">{docName}</span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black border shrink-0 whitespace-nowrap ${styleClass}`}>
                                {doc.file_url ? docStatusText : (lang === 'ar' ? 'مطلوب الرفع' : 'Required')}
                              </span>
                            </div>

                            {doc.status === 'rejected' && (
                              <div className="space-y-2 w-full text-start">
                                {doc.rejection_reason && (
                                  <div className="text-[10px] text-rose-700 bg-rose-50/70 p-2 rounded-lg border border-rose-100 font-semibold text-start">
                                    <strong>{t.rejectionReason}</strong> {doc.rejection_reason}
                                  </div>
                                )}
                                
                                {secureViewUrl && (
                                  <Link 
                                    href={secureViewUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[10px] font-black text-brand-navy-dark hover:underline block text-center cursor-pointer"
                                  >
                                    {t.viewRejected}
                                  </Link>
                                )}
                                <DocumentResubmitter docId={doc.id} appId={app.id} lang={lang} />
                              </div>
                            )}

                            {doc.file_url && doc.status !== 'rejected' && (
                              <Link 
                                href={secureViewUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-[10px] text-center font-bold text-brand-gold bg-brand-navy-dark hover:bg-brand-navy-light py-1.5 rounded-lg transition-colors mt-1 block shadow-xs cursor-pointer w-full"
                              >
                                {t.downloadDoc}
                              </Link>
                            )}

                            {!doc.file_url && (
                              <div className="mt-0.5 w-full">
                                <DocumentResubmitter docId={doc.id} appId={app.id} lang={lang} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className={`mt-4 pt-3 border-t border-brand-navy-dark/[0.03] flex justify-end text-[10px] font-mono text-brand-navy-dark/40 ${isRtl ? 'text-left' : 'text-right'}`}>
                  <span>{t.lastUpdate} {new Date(app.updated_at).toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>

              </div>
            ); 
          })}
        </div>
      </div>
    </main>
  );   
}