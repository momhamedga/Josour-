import { issueSignedToken, presignUrl } from '@vercel/blob';
import { siteContent } from '@/config/josour-content';
import { sql } from '@/lib/neon';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutClientUser } from '@/app/actions/user-auth';

// استيراد المكونات الفرعية التفاعلية
import TransactionTimeline from './_components/TransactionTimeline';
import PortalNotification from './_components/PortalNotification';
import DocumentResubmitter from './_components/DocumentResubmitter';
import DeleteAppButton from './_components/DeleteAppButton'; 
import SubmitAppForm from './_components/SubmitAppForm'; 
import Link from 'next/link';
import ClientIdCopyButton from './_components/ClientIdCopyButton'; // استيراد زر النسخ التفاعلي

interface PortalPageProps {
  params: Promise<{ lang: 'ar' | 'en' }>;
}

export default async function ClientPortalPage({ params }: PortalPageProps) {
  const { lang } = await params;

  const cookieStore = await cookies();
  const userEmail = cookieStore.get('user_email')?.value;

  if (!userEmail) {
    redirect(`/${lang}/portal/login`);
  }

  const dict = siteContent[lang];
  const isRtl = dict.dir === 'rtl';

  const translations = {
    ar: {
      title: 'بوابة تتبع المعاملات الذكية',
      subtitle: 'متابعة حية ومباشرة لحالة الرخص والتأشيرات الخاصة بك والتفاعل مع المستشار الإداري',
      investor: 'المنشأة / المستثمر',
      noData: 'لا توجد معاملات نشطة حالياً تحت هذا الحساب أو البريد الإلكتروني.',
      progressText: 'حالة المسار الزمني اللحظي المعزز',
      progressLabel: 'نسبة الإنجاز الفعلي:', 
      updateLabel: 'تحديث المستشار الإداري اللحظي:',
      lastUpdate: 'آخر تحديث للمعاملة:',
      errorFetch: 'فشل في تحميل بيانات التتبع اللحظي.',
      docsTitle: 'المستندات والوثائق الرسمية للمنشأة',
      downloadDoc: 'تحميل المستند الحالي',
      viewRejected: 'معاينة المستند المرفوض',
      rejectionReason: 'سبب الرفض المباشر:',
      logoutBtn: 'تسجيل خروج المنشأة الأمني',
      viewMainSite: '🏢 عرض الموقع الرئيسي',
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
        review: 'تحت التدقيق والمراجعة',
        approved: 'تم الاعتماد',
        rejected: 'مرفوض ومُعاد',
      }
    },
    en: {
      title: 'Smart Application Tracking Portal',
      subtitle: 'Live tracking of your business licenses and visas with direct interactive actions',
      investor: 'Company / Investor',
      noData: 'No active applications found under this account.',
      progressText: 'Enhanced Live Timeline Track',
      progressLabel: 'Actual Completion Progress:', 
      updateLabel: 'Live Consultant Update:',
      lastUpdate: 'Last Update:',
      errorFetch: 'Failed to load tracking data.',
      docsTitle: 'Official Documents & Permits',
      downloadDoc: 'Download Current Document',
      viewRejected: 'Preview Rejected Document',
      rejectionReason: 'Rejection Reason:',
      logoutBtn: 'Secure Portal Logout',
      viewMainSite: '🏢 View Main Site',
      submitNewApp: 'Submit New Application',
      selectService: 'Select Required Service / License',
      btnApply: 'Submit Request with Documents',
      finalDocBanner: '🎉 Congratulations! Your final document has been successfully issued and approved.',
      downloadFinalDoc: '👁️ Preview & Download Official Issued Document',
      appIdLabel: 'Unified Registry Key', 
      stats: {
        totalApps: 'Active Applications',
        approved: 'Issued Licenses',
        pendingDocs: 'Documents Required',
        rejectedDocs: 'Revisions Required'
      },
      statuses: {
        pending: 'Pending',
        in_progress: 'In Progress',
        review: 'Under Review & Audit',
        approved: 'Approved',
        rejected: 'Rejected',
      }
    }
  };

  const t = translations[lang] || translations.ar;
  let applications: any[] = [];
  let userData: { id: string; company_name: string } | null = null;
  let errorMsg = '';

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
      const blobToken = await issueSignedToken({ operations: ['get'] });

      applications = await Promise.all(
        rows.map(async (app) => {
          let updatedApp = { ...app };

          if (app.issued_document_url && app.issued_document_url.includes('.private.blob.vercel-storage.com')) {
            try {
              const finalUrlObj = new URL(app.issued_document_url);
              const finalPathname = finalUrlObj.pathname.substring(1);

              const { presignedUrl: signedFinalUrl } = await presignUrl(blobToken, {
                pathname: finalPathname,
                operation: 'get',
                access: 'private',
                validUntil: Date.now() + 60 * 60 * 1000,
              });
              updatedApp.issued_document_url = signedFinalUrl;
            } catch (err) {
              console.error('Failed to sign final doc url', err);
            }
          }

          if (!app.documents) app.documents = [];

          const securedDocuments = await Promise.all(
            app.documents.map(async (doc: any) => {
              if (doc.file_url && doc.file_url.includes('.private.blob.vercel-storage.com')) {
                try {
                  const urlObj = new URL(doc.file_url);
                  const pathname = urlObj.pathname.substring(1);

                  const { presignedUrl } = await presignUrl(blobToken, {
                    pathname: pathname,
                    operation: 'get',
                    access: 'private',
                    validUntil: Date.now() + 60 * 60 * 1000,
                  });

                  return { ...doc, file_url: presignedUrl };
                } catch (tokenErr) {
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
  }

  const totalApps = applications.length;
  const approvedLicenses = applications.filter(a => a.status === 'approved').length;
  const pendingDocs = applications.reduce((acc, app) => acc + (app.documents?.filter((d: any) => d.status === 'pending').length || 0), 0);
  const rejectedDocs = applications.reduce((acc, app) => acc + (app.documents?.filter((d: any) => d.status === 'rejected').length || 0), 0);

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

  const availableServices = dict.servicesSection?.items?.map((item: any) => ({
    id: item.id,
    title: item.title,
    requiredDocs: item.requiredDocs || []
  })) || [];

  return (
    <main className={`min-h-screen bg-brand-light-bg py-24 px-4 sm:px-6 lg:px-8 ${isRtl ? 'font-cairo' : 'font-sans'}`} dir={dict.dir}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 🛠️ الشريط العلوي المطور: زر العودة للموقع الرئيسي وزر خروج المستثمر متراصين بذكاء */}
        <div className="flex items-center justify-between gap-4 bg-white/40 border border-brand-navy-dark/[0.04] p-3 rounded-xl backdrop-blur-xs">
          <Link 
            href={`/${lang}`}
            className="text-xs font-bold text-brand-navy-dark hover:text-brand-gold bg-brand-navy-dark/[0.03] hover:bg-brand-navy-dark/5 px-3 py-2 rounded-lg border border-brand-navy-dark/5 transition-all flex items-center gap-1.5 cursor-pointer"
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
              className="text-xs font-bold text-rose-600 bg-rose-50/50 hover:bg-rose-100/60 px-4 py-2 rounded-xl border border-rose-200/50 cursor-pointer transition-all duration-200 shadow-xs"
            >
              {t.logoutBtn}
            </button>
          </form>
        </div>

        {/* Header */}
        <div className="border-b border-brand-navy-dark/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-din font-bold text-brand-navy-dark tracking-tight mb-2">{t.title}</h1>
            <p className="text-brand-navy-dark/60 text-sm md:text-base">{t.subtitle}</p>
          </div>
          {userData && (
            <div className="bg-white border border-brand-navy-dark/5 shadow-xs rounded-xl p-4">
              <span className="text-xs text-brand-navy-dark/40 block mb-1">{t.investor}</span>
              <span className="text-base font-bold text-brand-navy-dark block">{userData.company_name}</span>
            </div>
          )}
        </div>

        {/* الكومبوننت التفاعلي لتقديم المعاملات الجديدة */}
        {userData && (
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
        )}

        {/* سكين الإشعارات الفوري الذكي */}
        <PortalNotification rejectedCount={rejectedDocs} lang={lang} />

        {/* كروت الإحصائيات الفورية */}
        {applications.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-brand-navy-dark/[0.06] rounded-2xl p-4 shadow-xs">
              <span className="text-brand-navy-dark/40 text-[11px] font-bold block mb-1">{t.stats.totalApps}</span>
              <span className="text-2xl font-din font-bold text-brand-navy-dark">{totalApps}</span>
            </div>
            <div className="bg-emerald-50/40 border border-emerald-500/10 rounded-2xl p-4">
              <span className="text-emerald-700/60 text-[11px] font-bold block mb-1">{t.stats.approved}</span>
              <span className="text-2xl font-din font-bold text-emerald-700">{approvedLicenses}</span>
            </div>
            <div className="bg-amber-50/50 border border-amber-500/10 rounded-2xl p-4">
              <span className="text-amber-700/60 text-[11px] font-bold block mb-1">{t.stats.pendingDocs}</span>
              <span className="text-2xl font-din font-bold text-amber-700">{pendingDocs}</span>
            </div>
            <div className="bg-rose-50/40 border border-rose-500/10 rounded-2xl p-4">
              <span className="text-rose-700/60 text-[11px] font-bold block mb-1">{t.stats.rejectedDocs}</span>
              <span className="text-2xl font-din font-bold text-rose-700">{rejectedDocs}</span>
            </div>
          </div>
        )}

        {errorMsg && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">{errorMsg}</div>}
        
        {applications.length === 0 && !errorMsg && (
          <div className="text-center py-20 bg-white border border-brand-navy-dark/5 rounded-2xl shadow-xs p-8">
            <p className="text-brand-navy-dark/50 text-lg">{t.noData}</p>
          </div>
        )}

        {/* قائمة المعاملات السابقة والحالية */}
        <div className="grid grid-cols-1 gap-8">
          {applications.map((app) => {
            const currentColors = statusColors[app.status as keyof typeof statusColors] || statusColors.pending;
            const statusText = t.statuses[app.status as keyof typeof t.statuses] || t.statuses.pending;
            
            const serviceInfo = dict.servicesSection?.items.find((s: any) => String(s.id) === String(app.service_type));
            const serviceTitle = serviceInfo ? serviceInfo.title : (app.service_type === 'business_license' ? (isRtl ? 'رخصة تجارية إلكترونية' : 'E-Business License') : app.service_type);

            let fallbackDocsKeys: string[] = [];
            switch (app.service_type) {
              case 'business_license':
                fallbackDocsKeys = ['passport', 'corporate_papex', 'trade_mark'];
                break;
              case 'investor_visa':
                fallbackDocsKeys = ['passport', 'personal_photo', 'current_visa'];
                break;
              default:
                fallbackDocsKeys = serviceInfo?.requiredDocs || ['passport'];
                break;
            }

            const displayedDocs = fallbackDocsKeys.map((docKey, index) => {
              let nameAr = docKey;
              let nameEn = docKey;
              
              switch (docKey) {
                case 'passport':
                  nameAr = 'صورة جواز السفر الساري';
                  nameEn = 'Valid Passport Copy';
                  break;
                case 'corporate_papex':
                  nameAr = 'عقد التأسيس أو السجل التجاري';
                  nameEn = 'Memorandum of Association';
                  break;
                case 'trade_mark':
                  nameAr = 'شهادة العلامة التجارية (إن وجدت)';
                  nameEn = 'Trademark Certificate';
                  break;
                case 'personal_photo':
                  nameAr = 'الصورة الشخصية الخلفية بيضاء';
                  nameEn = 'Personal Digital Photo';
                  break;
                case 'current_visa':
                  nameAr = 'تأشيرة الدخول أو الإقامة الحالية';
                  nameEn = 'Current Visa/Entry Permit';
                  break;
              }

              const existingDoc = app.documents && app.documents[index];
              if (existingDoc) return existingDoc;

              return {
                id: `fallback-${app.id}-${index}`,
                document_name_ar: nameAr,
                document_name_en: nameEn,
                status: 'pending',
                file_url: null
              };
            });

            return (
              <div key={app.id} className="bg-white border border-brand-navy-dark/[0.06] rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-sm transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold" />
                
                {/* 💎 البادج المطور فائق النقاء والأناقة لعرض الـ ID بشكل سينمائي مقصوص وجميل جداً */}
                <div className="mb-5 bg-brand-navy-dark/[0.02] px-4 py-3 rounded-xl border border-brand-navy-dark/[0.05] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] md:text-xs font-bold text-brand-navy-dark/60">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                      {t.appIdLabel}:
                    </span>
                    <span className="font-din text-brand-navy-dark font-extrabold tracking-widest bg-white border border-brand-navy-dark/5 px-2.5 py-1 rounded-lg uppercase shadow-3xs select-all">
                      {app.id.slice(0, 5)}...{app.id.slice(-5)}
                    </span>
                  </div>
                  <ClientIdCopyButton id={app.id} lang={lang} />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-brand-gold tracking-widest uppercase block mb-1 font-din">
                      {app.id.slice(0, 8).toUpperCase()}
                    </span>
                    <h3 className="text-xl md:text-2xl font-din font-bold text-brand-navy-dark">{serviceTitle}</h3>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold border tracking-wide shadow-xs"
                      style={{ backgroundColor: currentColors.bg, borderColor: currentColors.border, color: currentColors.textCol }}>
                      {statusText}
                    </span>
                    
                    <DeleteAppButton appId={app.id} lang={lang} />
                  </div>
                </div>

                {/* لافتة وثيقة الإنجاز الصادرة المعززة */}
                {app.issued_document_url && (
                  <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-900 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
                    <div className="space-y-1">
                      <p className="font-bold text-sm md:text-base flex items-center gap-1.5">
                        {t.finalDocBanner}
                      </p>
                    </div>
                    <Link 
                      href={app.issued_document_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full md:w-auto text-center text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
                    >
                      {t.downloadFinalDoc}
                    </Link>
                  </div>
                )}

                {/* الخط الزمني التفاعلي */}
                <div className="mb-6 bg-brand-light-bg/40 border border-brand-navy-dark/[0.03] rounded-2xl p-4 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-brand-navy-dark/40">{t.progressText}</span>
                    <span className="text-xs font-bold text-brand-navy-dark bg-brand-navy-dark/[0.05] px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <span className="text-brand-navy-dark/50">{t.progressLabel}</span>
                      <span className="text-brand-gold font-din">{app.progress || 0}%</span>
                    </span>
                  </div>
                  <TransactionTimeline status={app.status} progress={app.progress} lang={lang} />
                </div>

                {/* ملاحظات وتحديثات المستشار */}
                {app.notes && (
                  <div className="bg-brand-navy-dark/[0.02] border border-brand-navy-dark/[0.04] rounded-xl p-4 text-sm text-brand-navy-dark/80 mb-6">
                    <span className="text-xs font-bold text-brand-navy-dark/40 block mb-1.5">{t.updateLabel}</span>
                    <p className="leading-relaxed font-medium">{app.notes}</p>
                  </div>
                )}

                {/* 📌 قسم تقديم الملفات والمستندات الفردية الثابت والمحمي من الاختفاء */}
                {displayedDocs.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-brand-navy-dark/[0.06]">
                    <h4 className="text-sm font-bold text-brand-navy-dark mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-3 bg-brand-gold rounded-full inline-block" />
                      {t.docsTitle}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {displayedDocs.map((doc: any) => {
                        const docName = lang === 'ar' ? doc.document_name_ar : doc.document_name_en;
                        const docStatusText = t.statuses[doc.status as keyof typeof t.statuses] || t.statuses.pending;
                        const styleClass = docStatusStyles[doc.status as keyof typeof docStatusStyles] || docStatusStyles.pending;
                        const secureViewUrl = doc.file_url ? `/api/view-doc?url=${encodeURIComponent(doc.file_url)}` : '';

                        return (
                          <div key={doc.id} className="border border-brand-navy-dark/[0.04] rounded-xl p-4 flex flex-col justify-between bg-brand-light-bg/30 gap-3 transition-all hover:border-brand-navy-dark/10">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-xs font-bold text-brand-navy-dark/80 leading-tight">{docName}</span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${styleClass}`}>
                                {doc.file_url ? docStatusText : (lang === 'ar' ? 'مطلوب الرفع' : 'Required')}
                              </span>
                            </div>

                            {/* سكشن الـ Rejected */}
                            {doc.status === 'rejected' && (
                              <div className="space-y-2">
                                {doc.rejection_reason && (
                                  <div className="text-[11px] text-rose-700 bg-rose-50/70 p-2.5 rounded-xl border border-rose-100 font-medium">
                                    <strong>{t.rejectionReason}</strong> {doc.rejection_reason}
                                  </div>
                                )}
                                
                                {secureViewUrl && (
                                  <Link 
                                    href={secureViewUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[10px] font-bold text-brand-navy-dark hover:underline block text-center mb-1 cursor-pointer"
                                  >
                                    {t.viewRejected}
                                  </Link>
                                )}
                                
                                <DocumentResubmitter docId={doc.id} appId={app.id} lang={lang} />
                              </div>
                            )}

                            {/* سكشن الملف الجاهز المرفوع */}
                            {doc.file_url && doc.status !== 'rejected' && (
                              <Link 
                                href={secureViewUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-[11px] text-center font-bold text-brand-gold bg-brand-navy-dark hover:bg-brand-navy-light py-2 rounded-lg transition-colors mt-1 block shadow-xs cursor-pointer"
                              >
                                {t.downloadDoc}
                              </Link>
                            )}

                            {/* سكشن حقل الرفع الخالي الثابت */}
                            {!doc.file_url && (
                              <div className="mt-1">
                                <DocumentResubmitter docId={doc.id} appId={app.id} lang={lang} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* تاريخ التحديث السفلي */}
                <div className={`mt-4 pt-4 border-t border-brand-navy-dark/[0.04] flex justify-end text-xs text-brand-navy-dark/40 font-din ${isRtl ? 'text-left' : 'text-right'}`}>
                  <span>{t.lastUpdate} {new Date(app.updated_at).toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </main>
  ); 
}