'use client';

import { useState, useTransition, useMemo, useRef, useEffect } from 'react';
import { updateApplicationStatus, updateDocumentStatus } from '@/app/actions/admin';
import { adminCreateApplication, adminDeleteApplication } from '@/app/actions/portal-actions';
import UploadZone from './UploadZone';
import UploadIssuedDoc from './UploadIssuedDoc'; 
import Link from 'next/link';
import ClientIdCopyButton from '../../portal/_components/ClientIdCopyButton';

interface DocumentItem {
  id: string;
  document_name_ar: string;
  document_name_en: string;
  file_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  feedback_coordinates?: string;
}

interface FeeItem {
  id: string;
  description: string;
  amount: number;
  receipt_url?: string;
}

interface ApplicationItem {
  id: string;
  user_id?: string;
  name: string;
  company_name: string;
  service_type: string;
  status: 'pending' | 'in_progress' | 'review' | 'approved' | 'rejected';
  progress: number;
  notes: string | null;
  documents: DocumentItem[];
  created_at?: string;
  sla_hours_limit?: number;
  fees?: FeeItem[];
  issued_document_url?: string | null; 
}

interface AdminPanelProps {
  initialApplications: ApplicationItem[];
  allUsersList?: { id: string; name: string; company_name: string }[];
  lang: 'ar' | 'en';
}

export default function AdminPanel({ initialApplications, allUsersList = [], lang }: AdminPanelProps) {
  const [apps, setApps] = useState<ApplicationItem[]>(initialApplications);
  const [isPending, startTransition] = useTransition();
  const [successId, setSuccessId] = useState<string | null>(null);

  useEffect(() => {
    setApps(initialApplications);
  }, [initialApplications]);

  const [timeTicker, setTimeTicker] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTimeTicker(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  // 🌟 حالات التحكم في المودالات الحديثة والمطورة
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  
  const [newAppForm, setNewAppForm] = useState({ 
    userId: '', 
    serviceType: 'investor_visa', // جعل القيمة الافتراضية مفتاحاً معلوماً للسيرفر لفرش الملفات
    status: 'pending', 
    progress: 0, 
    notes: '', 
    sla_hours_limit: 48 
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'progress-asc' | 'progress-desc' | 'sla-risk'>('latest');
  const [expandedApps, setExpandedApps] = useState<Record<string, boolean>>({});

  const [activeCanvasDoc, setActiveCanvasDoc] = useState<{appId: string, doc: DocumentItem} | null>(null);
  const [activeFeesApp, setActiveFeesApp] = useState<ApplicationItem | null>(null);
  const [newFeeForm, setNewFeeForm] = useState({ description: '', amount: '' });

  const isRtl = lang === 'ar';

  const t = {
    ar: {
      title: 'لوحة تحكم المستشار الإداري الذكية',
      subtitle: 'إدارة وتحديث وبث معاملات المستثمرين مع نظام مراقبة الـ SLA المتقدم وتتبع الرسوم والنفقات',
      searchPlaceholder: 'ابحث باسم العميل، المنشأة، أو رقم المعاملة...',
      allClients: 'جميع العملاء المتاحين',
      allStatuses: 'جميع حالات المعاملات',
      filterTitle: 'أدوات الفرز والتصفية الذكية والـ SLA',
      sortByLabel: 'ترتيب حسب:',
      sortOptions: {
        latest: 'الأحدث تحديثاً',
        progressAsc: 'نسبة الإنجاز: من الأقل للأعلى',
        progressDesc: 'نسبة الإنجاز: من الأعلى للأقل',
        slaRisk: 'مخاطر الـ SLA (الأكثر خطورة أولاً)'
      },
      stats: {
        totalApps: 'إجمالي المعاملات',
        approved: 'الرخص المعتمدة',
        pendingDocs: 'وثائق معلقة',
        rejectedDocs: 'وثائق مرفوضة'
      },
      clientName: 'العميل:',
      company: 'المنشأة:',
      service: 'نوع الخدمة:',
      statusLabel: 'حالة المعاملة الحالية',
      progressLabel: 'نسبة الإنجاز الفعلي:',
      notesLabel: 'ملاحظات المستشار الإداري (تظهر للمستثمر لايف)',
      notesPlaceholder: 'اكتب هنا آخر مستجدات خطة القيمة المضافة للمستثمر...',
      saveBtn: 'تحديث وبث البيانات لايف',
      saving: 'جاري المعالجة والبث اللحظي...',
      successAlert: 'تم بث التحديثات بنجاح! ✨',
      docsTitle: 'إدارة وثائق ومستندات المعاملة والتغذية البصرية',
      fileUrlLabel: 'رابط الملف المرفوع (Cloud URL):',
      rejectReasonLabel: 'سبب الرفض المباشر:',
      updateDocBtn: 'حفظ حالة الوثيقة',
      showDocs: 'عرض وثائق المعاملة',
      hideDocs: 'إخفاء وثائق المعاملة',
      noResults: 'لم يتم العثور على أي معاملات تطابق خيارات التصفية الحالية.',
      deleteBtn: 'حذف المعاملة نهائياً',
      confirmDeleteTitle: 'تأكيد الحذف الأمني للحساب',
      confirmDeleteDesc: 'هل أنت متأكد تماماً من رغبتك في حذف هذه المعاملة؟ سيؤدي هذا الإجراء لإزالة جميع الوثائق والملفات المرفوعة المرتبطة بها نهائياً من سحابة النظام ولا يمكن التراجع عنه.',
      cancel: 'إلغاء الأمر',
      confirm: 'نعم، احذف نهائياً',
      createNewBtn: '➕ إنشاء معاملة جديدة للآدمن',
      modalCreateTitle: 'إنشاء معاملة جديدة فورية مع تحديد حد الـ SLA',
      selectUser: 'اختر المستثمر / العميل المطلوب',
      createSuccess: 'تم إنشاء المعاملة وحفظها بنجاح! 🎉',
      slaBadge: 'مؤشر الـ SLA الزمنية:',
      slaSafe: 'آمن (ضمن الوقت المحدد)',
      slaWarning: 'تحذير (شبه متجاوز)',
      slaViolated: 'مخترق (متأخر عن الوقت المطلوب)',
      feesBtn: '💳 الرسوم الحكومية',
      interactiveRejectBtn: '🎨 رفض تفاعلي ورسم بصري',
      aiGenerateBtn: '✨ صياغة ذكية بالـ AI',
      appIdLabel: 'رقم السجل التتبعي الموحد',
      serviceTypes: {
        investor_visa: 'تأشيرة مستثمر / إقامة منشأة',
        government_services: 'الخدمات والعلاقات الحكومية الموحدة',
        icv_certificates: 'شهادات وبرامج القيمة الوطنية المضافة',
        real_estate_services: 'الخدمات والاستشارات العقارية الفاخرة'
      },
      statuses: {
        pending: 'قيد الانتظار',
        in_progress: 'جاري المعالجة',
        review: 'تحت التدقيق',
        approved: 'تم الاعتماد والإنهاء',
        rejected: 'مرفوض ومُعاد للمستثمر',
      },
      finalDocTitle: '🏆 تسليم وثيقة الإنجاز النهائي للمستثمر',
      finalDocDesc: 'ارفع هنا الرخصة الصادرة، السجل التجاري، أو التأشيرة المختومة لتظهر فوراً في شاشة العميل.',
      previewFinalDoc: 'معاينة الوثيقة النهائية الصادرة 👁️',
      close: 'إغلاق'
    },
    en: {
      title: 'Consultant Intelligent Admin Dashboard',
      subtitle: 'Manage and live broadcast investor applications with SLA Monitoring & Government Fees tracking',
      searchPlaceholder: 'Search client, company, or application ID...',
      allClients: 'All Available Clients',
      allStatuses: 'All Application Statuses',
      filterTitle: 'Smart Filtering, Sorting & SLA Tracking Tools',
      sortByLabel: 'Sort By:',
      sortOptions: {
        latest: 'Latest Updated',
        progressAsc: 'Progress: Low to High',
        progressDesc: 'Progress: High to Low',
        slaRisk: 'SLA Risk Level (High First)'
      },
      stats: {
        totalApps: 'Total Applications',
        approved: 'Approved Licenses',
        pendingDocs: 'Pending Docs',
        rejectedDocs: 'Rejected Docs'
      },
      clientName: 'Client:',
      company: 'Company:',
      service: 'Service Type:',
      statusLabel: 'Application Status',
      progressLabel: 'Current Progress:',
      notesLabel: 'Consultant Notes & Updates (Live for Investor)',
      notesPlaceholder: 'Write the latest updates for the investor here...',
      saveBtn: 'Update & Broadcast Live',
      saving: 'Broadcasting Updates...',
      successAlert: 'Updates broadcasted successfully! ✨',
      docsTitle: 'Transaction Documents & Visual Feedback',
      fileUrlLabel: 'Uploaded File Cloud URL:',
      rejectReasonLabel: 'Rejection Reason:',
      updateDocBtn: 'Save Doc State',
      showDocs: 'Show Application Documents',
      hideDocs: 'Hide Application Documents',
      noResults: 'No applications found matching the current criteria.',
      deleteBtn: 'Delete Permanently',
      confirmDeleteTitle: 'Confirm Secure Deletion',
      confirmDeleteDesc: 'Are you sure you want to permanently delete this application? This action will completely erase the application data and all its associated documents from the storage servers. This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Yes, Delete Permanently',
      createNewBtn: '➕ Create New Application',
      modalCreateTitle: 'Create New Instant Application with SLA Config',
      selectUser: 'Select Targeted Investor / Client',
      createSuccess: 'Application created and saved successfully! 🎉',
      slaBadge: 'SLA Status Indicator:',
      slaSafe: 'Safe (On Track)',
      slaWarning: 'Warning (SLA Close to Breach)',
      slaViolated: 'Breached (Delayed Application)',
      feesBtn: '💳 Gov Fees',
      interactiveRejectBtn: '🎨 Visual Feedback Builder',
      aiGenerateBtn: '✨ AI Smart Rewrite',
      appIdLabel: 'Unified Registry Key',
      serviceTypes: {
        investor_visa: 'Investor Visa & Golden Residency',
        government_services: 'Unified Corporate Government Services',
        icv_certificates: 'In-Country Value (ICV) Certificates',
        real_estate_services: 'Premium Real Estate Advisory Services'
      },
      statuses: {
        pending: 'Pending',
        in_progress: 'In Progress',
        review: 'Under Review',
        approved: 'Approved',
        rejected: 'Rejected',
      },
      finalDocTitle: 'Investor Final Document Delivery',
      finalDocDesc: 'Upload the issued license, commercial register, or visa here to appear directly in the client portal.',
      previewFinalDoc: 'Preview Final Issued Document 👁️',
      close: 'Close'
    }
  }[lang];

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

  const getSLAStatus = (app: ApplicationItem) => {
    const createdAt = app.created_at ? new Date(app.created_at).getTime() : timeTicker - 3600000 * 12;
    const hoursElapsed = (timeTicker - createdAt) / (1000 * 60 * 60);
    const limit = app.sla_hours_limit || 48;

    if (app.status === 'approved') return { status: 'safe', label: t.slaSafe, color: 'bg-emerald-500', text: 'text-emerald-600', score: 0 };
    if (hoursElapsed > limit) return { status: 'breached', label: t.slaViolated, color: 'bg-rose-500 animate-pulse', text: 'text-rose-600 font-extrabold', score: 3 };
    if (hoursElapsed > limit * 0.75) return { status: 'warning', label: t.slaWarning, color: 'bg-amber-500', text: 'text-amber-600', score: 2 };
    return { status: 'safe', label: t.slaSafe, color: 'bg-indigo-500', text: 'text-indigo-600', score: 1 };
  };

  const uniqueClients = useMemo(() => {
    const names = initialApplications.map(a => a.name).filter(Boolean);
    return Array.from(new Set(names));
  }, [initialApplications]);

  const processedApps = useMemo(() => {
    return apps.map((app) => {
      let fallbackDocsKeys: string[] = [];
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

      const fullDocsList = fallbackDocsKeys.map((docKey, i) => {
        const translation = docTranslations[docKey] || { ar: docKey, en: docKey };
        const nameAr = translation.ar;
        const nameEn = translation.en;

        const existingDoc = app.documents?.find((d) => 
          d.document_name_ar === nameAr || 
          d.document_name_en === nameEn ||
          (d.id && String(d.id).includes(docKey))
        );

        if (existingDoc) return existingDoc;

        return {
          id: `fallback-${app.id}-${docKey}-${i}`,
          document_name_ar: nameAr,
          document_name_en: nameEn,
          status: 'pending' as const,
          file_url: null,
          rejection_reason: null
        };
      });

      return {
        ...app,
        documents: app.documents && app.documents.length > 0 ? app.documents : fullDocsList
      };
    });
  }, [apps]);

  const filteredApps = useMemo(() => {
    let result = [...processedApps];

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(app => 
        (app.name && app.name.toLowerCase().includes(query)) ||
        (app.company_name && app.company_name.toLowerCase().includes(query)) ||
        (app.id && app.id.toLowerCase().includes(query)) ||
        (app.service_type && app.service_type.toLowerCase().includes(query))
      );
    }

    if (selectedClient !== 'all') {
      result = result.filter(app => app.name === selectedClient);
    }

    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }

    if (sortBy === 'progress-asc') {
      result.sort((a, b) => a.progress - b.progress);
    } else if (sortBy === 'progress-desc') {
      result.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'sla-risk') {
      result.sort((a, b) => getSLAStatus(b).score - getSLAStatus(a).score);
    } else if (sortBy === 'latest') {
      result.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
    }

    return result;
  }, [processedApps, searchQuery, selectedClient, statusFilter, sortBy, timeTicker]);

  const totalApps = apps.length;
  const approvedLicenses = apps.filter(a => a.status === 'approved').length;
  
  const pendingDocs = processedApps.reduce((acc, app) => 
    acc + (app.documents?.filter(d => d.status === 'pending').length || 0), 0
  );
  
  const rejectedDocs = processedApps.reduce((acc, app) => 
    acc + (app.documents?.filter(d => d.status === 'rejected').length || 0), 0
  );

  const handleFieldChange = (id: string, field: keyof ApplicationItem, value: any) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, [field]: value } : app));
  };

  const handleDocFieldChange = (appId: string, docId: string, field: keyof DocumentItem, value: any) => {
    setApps(prev => prev.map(app => {
      if (app.id !== appId) return app;
      
      const currentDocs = app.documents && app.documents.length > 0 
        ? app.documents 
        : (processedApps.find(p => p.id === appId)?.documents || []);

      return {
        ...app,
        documents: currentDocs.map(d => d.id === docId ? { ...d, [field]: value } : d)
      };
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedApps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAIGenerateResponse = (appId: string, docId: string, currentReason: string | null) => {
    const reasonToProcess = currentReason && currentReason.trim() !== '' 
      ? currentReason 
      : (lang === 'ar' ? 'عدم وضوح المرفق أو نقص المستندات الثبوتية المطلوبة' : 'unclear document attachment or missing credentials');

    const standardLegalPhrasing = lang === 'ar' 
      ? `نود إفادتكم بأنه بعد مراجعة دقيقة للوثيقة المرفوعة، تبين وجود عدم تطابق رسمي متمثل في (${reasonToProcess}). يرجى إعادة رفع نسخة واضحة ومحدثة تجنباً لإلغاء طلب الترخيص.`
      : `Our dynamic review indicated a non-compliance regarding (${reasonToProcess}). Please update and upload a clear valid copy to comply with regulatory standards.`;
    
    handleDocFieldChange(appId, docId, 'rejection_reason', standardLegalPhrasing);
  };

  const handleUpdate = async (app: ApplicationItem) => {
    setSuccessId(null);
    startTransition(async () => {
      const result = await updateApplicationStatus({
        id: app.id,
        status: app.status,
        progress: app.progress,
        notes: app.notes,
        issued_document_url: app.issued_document_url,
      });
      if (result.success) {
        setSuccessId(app.id);
        setTimeout(() => setSuccessId(null), 3000);
      }
    });
  };

  // 🌟 دالة الحذف الحديثة المعتمدة على المودال المخصص
  const executeDeleteApp = async () => {
    if (!deleteTargetId) return;
    startTransition(async () => {
      const result = await adminDeleteApplication(deleteTargetId);
      if (result.success) {
        setApps(prev => prev.filter(app => app.id !== deleteTargetId));
        setDeleteTargetId(null);
      }
    });
  };

  const handleUpdateDocBtn = async (appId: string, doc: DocumentItem) => {
    startTransition(async () => {
      const result = await updateDocumentStatus({
        docId: doc.id,
        status: doc.status,
        fileUrl: doc.file_url,
        rejectionReason: doc.rejection_reason,
      });
      if (result.success) {
        setSuccessId(`doc-${doc.id}`);
        setTimeout(() => setSuccessId(null), 3000);
      }
    });
  };

  // 🌟 دالة إنشاء المعاملة المصححة والمؤمنة 100% لـ Next.js 15 و SQL Schema
  const handleCreateApplication = async () => {
    if (!newAppForm.userId || !newAppForm.serviceType) {
      return alert(lang === 'ar' ? 'الرجاء ملء الحقول الأساسية وتحديد المستثمر' : 'Please fill main fields and select an investor');
    }
    
    startTransition(async () => {
      // تمرير كائن متوافق ومنظم مع تعريف الـ Schema بالسيرفر
      const result = await adminCreateApplication({
        userId: newAppForm.userId,
        serviceType: newAppForm.serviceType,
        status: newAppForm.status,
        progress: Number(newAppForm.progress),
        notes: newAppForm.notes,
        sla_hours_limit: Number(newAppForm.sla_hours_limit) // الاسم الصحيح للعمود بالداتابيز
      } as any);

      if (result.success) {
        setIsCreateModalOpen(false);
        window.location.reload(); // عمل تزامن فوري للصفحة بالكامل
      } else {
        alert(lang === 'ar' ? 'فشل إنشاء المعاملة، تأكد من البيانات' : 'Failed to create application');
      }
    });
  };

  const statusSelectColors = {
    pending: 'bg-[oklch(0.96_0.03_90)] text-[oklch(0.45_0.15_90)]',
    in_progress: 'bg-[oklch(0.94_0.04_220)] text-[oklch(0.4_0.18_220)]',
    review: 'bg-[oklch(0.95_0.05_40)] text-[oklch(0.45_0.2_40)]',
    approved: 'bg-[oklch(0.95_0.04_145)] text-[oklch(0.35_0.18_145)]',
    rejected: 'bg-[oklch(0.94_0.05_25)] text-[oklch(0.4_0.2_25)]',
  };

  return (
    <div className={`space-y-8 ${isRtl ? 'font-cairo' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className="border-b border-brand-navy-dark/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy-dark tracking-tight mb-2 text-start">{t.title}</h1>
          <p className="text-brand-navy-dark/60 text-xs sm:text-sm text-start">{t.subtitle}</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-brand-gold hover:bg-brand-gold-hover text-white text-xs font-black px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer select-none"
        >
          {t.createNewBtn}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-brand-navy-dark/[0.06] rounded-2xl p-4 shadow-2xs text-start">
          <span className="text-brand-navy-dark/40 text-[11px] font-bold block mb-1">{t.stats.totalApps}</span>
          <span className="text-2xl font-black text-brand-navy-dark font-mono">{totalApps}</span>
        </div>
        <div className="bg-emerald-50/40 border border-emerald-500/10 rounded-2xl p-4 text-start">
          <span className="text-emerald-700/60 text-[11px] font-bold block mb-1">{t.stats.approved}</span>
          <span className="text-2xl font-black text-emerald-700 font-mono">{approvedLicenses}</span>
        </div>
        <div className="bg-amber-50/50 border border-amber-500/10 rounded-2xl p-4 text-start">
          <span className="text-amber-700/60 text-[11px] font-bold block mb-1">{t.stats.pendingDocs}</span>
          <span className="text-2xl font-black text-amber-600 font-mono">{pendingDocs}</span>
        </div>
        <div className="bg-rose-50/40 border border-rose-500/10 rounded-2xl p-4 text-start">
          <span className="text-rose-700/60 text-[11px] font-bold block mb-1">{t.stats.rejectedDocs}</span>
          <span className="text-2xl font-black text-rose-600 font-mono">{rejectedDocs}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-brand-navy-dark/[0.08] rounded-2xl p-5 shadow-3xs space-y-4 text-start">
        <span className="text-xs font-bold text-brand-gold tracking-wider uppercase block">{t.filterTitle}</span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-bold">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none focus:border-brand-gold/50 font-semibold"
          />

          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none cursor-pointer"
          >
            <option value="all">👥 {t.allClients}</option>
            {uniqueClients.map(clientName => (
              <option key={clientName} value={clientName}>{clientName}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none cursor-pointer"
          >
            <option value="all">⚡ {t.allStatuses}</option>
            {Object.entries(t.statuses).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none cursor-pointer"
          >
            <option value="latest">⏳ {t.sortOptions.latest}</option>
            <option value="progress-asc">📈 {t.sortOptions.progressAsc}</option>
            <option value="progress-desc">📉 {t.sortOptions.progressDesc}</option>
            <option value="sla-risk">⚠️ {t.sortOptions.slaRisk}</option>
          </select>
        </div>
      </div>

      {/* Applications Cards */}
      <div className="grid grid-cols-1 gap-6 w-full">
        {filteredApps.length === 0 ? (
          <div className="text-center py-16 bg-white border border-brand-navy-dark/5 rounded-2xl p-6 w-full">
            <p className="text-brand-navy-dark/40 text-sm font-medium">{t.noResults}</p>
          </div>
        ) : (
          filteredApps.map((app) => {
            if (!app) return null;
            const currentColors = statusSelectColors[app.status] || statusSelectColors.pending;
            const isExpanded = !!expandedApps[app.id];
            const sla = getSLAStatus(app);
            const totalFeesPaid = app.fees?.reduce((sum, f) => sum + f.amount, 0) || 0;

            const displayServiceTitle = (t.serviceTypes as any)[app.service_type] || app.service_type;

            return (
              <div key={app.id} className="bg-white border border-brand-navy-dark/[0.08] rounded-2xl p-4 sm:p-7 shadow-2xs relative overflow-hidden text-start w-full group">
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold" />
                
                <div className="mb-4 bg-brand-navy-dark/[0.02] px-4 py-3 rounded-xl border border-brand-navy-dark/[0.05] flex items-center justify-between gap-4 flex-wrap text-start">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-brand-navy-dark/60 text-start">
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                      {t.appIdLabel}:
                    </span>
                    <span className="text-brand-navy-dark font-mono font-black tracking-wider bg-white border border-brand-navy-dark/5 px-2 py-0.5 rounded shadow-3xs uppercase select-all">
                      {app.id.slice(0, 5)}...{app.id.slice(-5)}
                    </span>
                  </div>
                  <ClientIdCopyButton id={app.id} lang={lang} />
                </div>

                <div className="mb-4 flex flex-wrap justify-between items-center bg-brand-light-bg/80 px-4 py-2.5 rounded-xl border border-brand-navy-dark/[0.04] gap-3 text-start text-xs font-bold w-full">
                  <div className="flex items-center gap-2 text-start">
                    <span className="text-brand-navy-dark/60">{t.slaBadge}</span>
                    <span className={`inline-block w-2 h-2 rounded-full ${sla.color}`} />
                    <span className={sla.text}>{sla.label} ({app.sla_hours_limit || 48}h Limit)</span>
                  </div>
                  <div className="text-brand-navy-dark text-start font-mono">
                    💰 {lang === 'ar' ? 'إجمالي النفقات:' : 'Total Gov Fees:'} <span className="text-emerald-600 font-black">{totalFeesPaid} AED</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-brand-navy-dark/[0.06] pb-4 mb-6 text-xs sm:text-sm text-start">
                  <div className="text-start">
                    <span className="text-brand-navy-dark/40 block text-[10px] sm:text-xs font-bold mb-0.5">{t.clientName}</span>
                    <span className="font-black text-brand-navy-dark">{app.name}</span>
                  </div>
                  <div className="text-start">
                    <span className="text-brand-navy-dark/40 block text-[10px] sm:text-xs font-bold mb-0.5">{t.company}</span>
                    <span className="font-black text-brand-navy-dark">{app.company_name}</span>
                  </div>
                  <div className="text-start">
                    <span className="text-brand-navy-dark/40 block text-[10px] sm:text-xs font-bold mb-0.5">{t.service}</span>
                    <span className="font-black text-brand-gold block truncate">{displayServiceTitle}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6 text-start">
                  <div className="space-y-4 text-start">
                    <div className="text-start">
                      <label className="block text-xs font-bold text-brand-navy-dark/70 mb-2">{t.statusLabel}</label>
                      <select
                        value={app.status}
                        onChange={(e) => handleFieldChange(app.id, 'status', e.target.value as any)}
                        className={`w-full border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black focus:outline-none cursor-pointer tracking-wide ${currentColors}`}
                      >
                        {Object.entries(t.statuses).map(([key, label]) => (
                          <option key={key} value={key} className="bg-white text-brand-navy-dark font-bold">{label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-start">
                      <div className="flex justify-between items-center mb-2 text-xs font-bold">
                        <label className="text-brand-navy-dark/70">{t.progressLabel}</label>
                        <span className="text-brand-navy-dark bg-brand-navy-dark/5 px-2 py-0.5 rounded-md font-mono">{app.progress}%</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={app.progress}
                        onChange={(e) => handleFieldChange(app.id, 'progress', parseInt(e.target.value))}
                        className="w-full h-2 bg-brand-navy-dark/5 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="text-start">
                    <label className="block text-xs font-bold text-brand-navy-dark/70 mb-2 text-start">{t.notesLabel}</label>
                    <textarea
                      rows={3} value={app.notes || ''}
                      onChange={(e) => handleFieldChange(app.id, 'notes', e.target.value)}
                      placeholder={t.notesPlaceholder}
                      className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-brand-navy-dark focus:outline-none resize-none font-semibold text-start leading-relaxed"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50/40 border border-emerald-500/10 rounded-2xl p-4 sm:p-5 mb-6 space-y-3 text-start">
                  <h4 className="text-xs font-black text-emerald-800 flex items-center gap-1.5 text-start">
                    {t.finalDocTitle}
                  </h4>
                  <p className="text-brand-navy-dark/60 text-[10px] sm:text-xs font-semibold text-start leading-relaxed">{t.finalDocDesc}</p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-start w-full">
                    <div className="text-start w-full sm:w-auto">
                      <UploadIssuedDoc 
                        appId={app.id}
                        currentUrl={app.issued_document_url ?? null}
                        lang={lang}
                        onUploadSuccess={async (url) => {
                          if (url === null) {
                            handleFieldChange(app.id, 'issued_document_url', null);
                          } else {
                            handleFieldChange(app.id, 'issued_document_url', url);
                            handleFieldChange(app.id, 'status', 'approved');
                            handleFieldChange(app.id, 'progress', 100);
                            await updateApplicationStatus({ id: app.id, status: 'approved', progress: 100, issued_document_url: url, notes: app.notes });
                          }
                        }}
                      />
                    </div>
                    {app.issued_document_url && (
                      <div className="text-xs font-bold text-start shrink-0">
                        <Link 
                          href={`/api/view-doc?url=${encodeURIComponent(app.issued_document_url)}`} 
                          target="_blank" 
                          className="text-emerald-700 hover:underline flex items-center gap-1 bg-white border border-emerald-200 px-3 py-2 rounded-xl shadow-3xs cursor-pointer"
                        >
                          {t.previewFinalDoc}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-brand-navy-dark/[0.04] pb-6 mb-6 text-start w-full">
                  <div className="flex items-center gap-2 flex-wrap text-start">
                    {successId === app.id && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 animate-fadeIn">
                        {t.successAlert}
                      </span>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => toggleExpand(app.id)}
                      className="text-[11px] sm:text-xs font-black text-brand-navy-dark/70 hover:text-brand-navy-dark bg-brand-light-bg px-3.5 py-2 rounded-xl border border-brand-navy-dark/10 transition-colors flex items-center gap-1 cursor-pointer select-none"
                    >
                      <span>{isExpanded ? '🔼' : '📂'}</span>
                      {isExpanded ? t.hideDocs : `${t.showDocs} (${app.documents?.length || 0})`}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveFeesApp(app)}
                      className="text-[11px] sm:text-xs font-black text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition-all cursor-pointer select-none"
                    >
                      {t.feesBtn} ({app.fees?.length || 0})
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(app.id)} // فتح مودال الحذف المطور
                      className="text-[11px] sm:text-xs font-black text-rose-600 hover:text-white hover:bg-rose-600 bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200 transition-all cursor-pointer select-none"
                    >
                      🗑️ {t.deleteBtn}
                    </button>
                  </div>

                  <button 
                    onClick={() => handleUpdate(app)} 
                    disabled={isPending} 
                    className="w-full sm:w-auto bg-brand-navy-dark hover:bg-brand-navy-light text-white font-black text-xs px-6 py-2.5 rounded-xl cursor-pointer disabled:opacity-50 select-none transition-colors"
                  >
                    {isPending ? t.saving : t.saveBtn}
                  </button>
                </div>

                {app.documents && app.documents.length > 0 && isExpanded && (
                  <div className="bg-brand-light-bg/40 border border-brand-navy-dark/[0.04] rounded-xl p-3 sm:p-5 space-y-4 text-start animate-fadeIn w-full">
                    <h3 className="text-xs sm:text-sm font-black text-brand-navy-dark flex items-center gap-1.5 text-start">
                      <span className="w-1 h-2.5 bg-brand-gold rounded-full inline-block" />
                      {t.docsTitle}
                    </h3>
                    
                    <div className="space-y-3 text-start w-full">
                      {app.documents.map((doc) => {
                        if (!doc) return null;
                        const docName = lang === 'ar' ? doc.document_name_ar : doc.document_name_en;
                        const secureViewUrl = doc.file_url ? `/api/view-doc?url=${encodeURIComponent(doc.file_url)}` : '';

                        return (
                          <div key={doc.id} className="bg-white border border-brand-navy-dark/[0.04] rounded-xl p-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-start w-full">
                            <div className="text-start min-w-0 flex-1">
                              <span className="text-brand-navy-dark/40 block text-[10px] font-bold mb-0.5 text-start">{lang === 'ar' ? 'اسم المستند' : 'Document Name'}</span>
                              <span className="font-black text-brand-navy-dark block truncate text-start" title={docName}>{docName}</span>
                            </div>

                            <div className="text-start shrink-0 w-full md:w-36">
                              <span className="text-brand-navy-dark/40 block text-[10px] font-bold mb-0.5 text-start">{lang === 'ar' ? 'حالة الوثيقة' : 'Document Status'}</span>
                              <select
                                value={doc.status}
                                onChange={(e) => handleDocFieldChange(app.id, doc.id, 'status', e.target.value as any)}
                                className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-lg p-1.5 font-bold text-brand-navy-dark focus:outline-none cursor-pointer text-start"
                              >
                                <option value="pending">{t.statuses.pending}</option>
                                <option value="approved">{t.statuses.approved}</option>
                                <option value="rejected">{t.statuses.rejected}</option>
                              </select>
                            </div>

                            <div className="text-start flex-1 w-full">
                              {doc.status === 'rejected' ? (
                                <div className="space-y-1.5 text-start w-full">
                                  {doc.file_url && (
                                    <div className="flex gap-1 text-start">
                                      <Link 
                                        href={secureViewUrl}
                                        target="_blank"
                                        className="w-full text-center text-[10px] font-bold text-brand-navy-dark bg-brand-light-bg border border-brand-navy-dark/10 py-1 rounded-md hover:bg-brand-navy-dark hover:text-white transition-all cursor-pointer"
                                      >
                                        👁️ {lang === 'ar' ? 'معاينة الملف المرفوض' : 'Preview'}
                                      </Link>
                                    </div>
                                  )}

                                  <div className="flex gap-1 text-start items-center w-full">
                                    <input
                                      type="text"
                                      value={doc.rejection_reason || ''}
                                      onChange={(e) => handleDocFieldChange(app.id, doc.id, 'rejection_reason', e.target.value)}
                                      className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-lg p-1.5 font-semibold text-start focus:outline-none"
                                      placeholder="سبب الرفض المباشر..."
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleAIGenerateResponse(app.id, doc.id, doc.rejection_reason)}
                                      className="bg-brand-navy-dark text-brand-gold px-2 py-1.5 rounded-lg font-black hover:bg-brand-gold hover:text-white transition-colors cursor-pointer select-none"
                                      title={t.aiGenerateBtn}
                                    >
                                      ✨
                                    </button>
                                  </div>
                                </div>
                              ) : doc.file_url ? (
                                <div className="flex items-center justify-between gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 font-bold text-start w-full">
                                  <Link 
                                    href={secureViewUrl} 
                                    target="_blank" 
                                    className="truncate hover:underline flex items-center gap-1 cursor-pointer text-start min-w-0"
                                  >
                                    👁️ {lang === 'ar' ? 'معاينة الملف' : 'View Doc'}
                                  </Link>
                                  <button 
                                    type="button"
                                    onClick={() => handleDocFieldChange(app.id, doc.id, 'file_url', null)}
                                    className="text-rose-600 font-black hover:underline cursor-pointer shrink-0"
                                  >
                                    {lang === 'ar' ? 'حذف' : 'Delete'}
                                  </button>
                                </div>
                              ) : (
                                <UploadZone 
                                  lang={lang} 
                                  onUploadSuccess={(url) => handleDocFieldChange(app.id, doc.id, 'file_url', url)} 
                                />
                              )}
                            </div>

                            <div className="flex items-center justify-end gap-2 text-start w-full md:w-auto shrink-0">
                              <button
                                onClick={() => handleUpdateDocBtn(app.id, doc)}
                                disabled={isPending}
                                className="w-full md:w-auto bg-brand-gold text-white hover:bg-brand-gold-hover disabled:opacity-40 font-black px-4 py-2 rounded-lg text-center cursor-pointer transition-colors"
                              >
                                {t.updateDocBtn}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 💳 مودال إدارة الرسوم والمزامنة */}
      {activeFeesApp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 text-start border border-brand-navy-dark/10 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3 text-start">
              <h3 className="font-black text-brand-navy-dark text-base sm:text-lg text-start">{t.feesBtn} - {activeFeesApp.company_name}</h3>
              <button onClick={() => setActiveFeesApp(null)} className="text-gray-400 hover:text-black font-black cursor-pointer p-1">✕</button>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2 text-start pr-1">
              {activeFeesApp.fees && activeFeesApp.fees.length > 0 ? (
                activeFeesApp.fees.map((fee) => {
                  if (!fee) return null;
                  return (
                    <div key={fee.id} className="flex justify-between items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-xs font-bold text-start">
                      <span className="font-bold text-gray-700 text-start">{fee.description}</span>
                      <span className="font-mono font-black text-emerald-600 text-start">{fee.amount} AED</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-gray-400 text-center py-4 w-full font-medium">{lang === 'ar' ? 'لا توجد رسوم حكومية مسجلة حالياً.' : 'No recorded fees yet.'}</p>
              )}
            </div>

            <div className="border-t pt-3 space-y-3 text-start text-xs font-bold">
              <input 
                type="text" placeholder={lang === 'ar' ? 'وصف الرسوم (مثال: رسوم اعتماد رخصة الغرفة)' : 'Fees description...'} 
                value={newFeeForm.description}
                onChange={(e) => setNewFeeForm({...newFeeForm, description: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-start focus:outline-none focus:border-brand-gold/40 font-semibold"
              />
              <input 
                type="number" placeholder={lang === 'ar' ? 'المبلغ الفعلي بالدرهم AED' : 'Amount in AED...'} 
                value={newFeeForm.amount}
                onChange={(e) => setNewFeeForm({...newFeeForm, amount: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-start focus:outline-none focus:border-brand-gold/40 font-mono font-bold"
              />
              <button 
                onClick={() => {
                  if(!newFeeForm.description || !newFeeForm.amount) return;
                  const updatedFees = [...(activeFeesApp.fees || []), { id: Date.now().toString(), description: newFeeForm.description, amount: parseFloat(newFeeForm.amount) }];
                  handleFieldChange(activeFeesApp.id, 'fees', updatedFees);
                  setNewFeeForm({ description: '', amount: '' });
                }}
                className="w-full bg-emerald-600 text-white font-black p-2.5 rounded-xl hover:bg-emerald-700 cursor-pointer select-none transition-colors"
              >
                {lang === 'ar' ? '＋ إضافة الرسوم والمزامنة الحية' : '＋ Add Gov Fee'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ➕ مودال إنشاء معاملة جديدة للآدمن (مصحح الهيكلية بالكامل) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 text-start border border-brand-navy-dark/10 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3 text-start">
              <h3 className="font-black text-brand-navy-dark text-base sm:text-lg text-start">{t.modalCreateTitle}</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-black font-black cursor-pointer p-1">✕</button>
            </div>
            
            <div className="space-y-3 text-xs font-bold text-start">
              <div className="text-start">
                <label className="block mb-1 font-black text-start">{t.selectUser}</label>
                <select 
                  className="w-full border p-2.5 rounded-xl bg-gray-50 text-start cursor-pointer font-semibold focus:outline-none"
                  value={newAppForm.userId}
                  onChange={(e) => setNewAppForm({ ...newAppForm, userId: e.target.value })}
                >
                  <option value="">-- {lang === 'ar' ? 'اختر مستثمر لتخصيص المعاملة' : 'Select investor'} --</option>
                  {allUsersList.map(u => {
                    if (!u) return null;
                    return <option key={u.id} value={u.id}>{u.name} ({u.company_name})</option>;
                  })}
                </select>
              </div>

              <div className="text-start">
                <label className="block mb-1 font-black text-start">{lang === 'ar' ? 'نوع الخدمة / الرخصة المطلوبة لفرش الوثائق' : 'Service Tracking Segment'}</label>
                <select
                  className="w-full border p-2.5 rounded-xl bg-gray-50 text-start cursor-pointer font-semibold focus:outline-none"
                  value={newAppForm.serviceType}
                  onChange={(e) => setNewAppForm({ ...newAppForm, serviceType: e.target.value })}
                >
                  {Object.entries(t.serviceTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="text-start">
                <label className="block mb-1 font-black text-start">{lang === 'ar' ? 'الحد الأقصى للـ SLA (بالساعات الميلادية)' : 'SLA Target Limit (Hours)'}</label>
                <input 
                  type="number" 
                  value={newAppForm.sla_hours_limit}
                  onChange={(e) => setNewAppForm({ ...newAppForm, sla_hours_limit: parseInt(e.target.value) || 48 })}
                  className="w-full border p-2.5 rounded-xl bg-gray-50 text-start focus:outline-none font-bold font-mono"
                />
              </div>

              <div className="text-start">
                <label className="block mb-1 font-black text-start">{t.notesLabel}</label>
                <textarea 
                  rows={2}
                  placeholder={t.notesPlaceholder}
                  value={newAppForm.notes}
                  onChange={(e) => setNewAppForm({ ...newAppForm, notes: e.target.value })}
                  className="w-full border p-2.5 rounded-xl bg-gray-50 text-start focus:outline-none font-semibold resize-none"
                />
              </div>

              <button 
                onClick={handleCreateApplication}
                disabled={isPending}
                className="w-full bg-brand-navy-dark text-white font-black p-3 rounded-xl mt-2 hover:bg-brand-navy-light cursor-pointer select-none transition-colors"
              >
                {isPending ? t.saving : t.createNewBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🗑️ مودال الحذف الاحترافي والمطور (بديل الـ window.confirm التقليدي) */}
      {deleteTargetId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs text-start animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 text-start border border-brand-navy-dark/10 shadow-xl animate-scaleUp">
            <div className="text-center sm:text-start space-y-2">
              <h3 className="font-black text-rose-600 text-base sm:text-lg flex items-center gap-1.5 justify-center sm:justify-start">
                ⚠️ {t.confirmDeleteTitle}
              </h3>
              <p className="text-brand-navy-dark/70 text-xs sm:text-sm font-semibold leading-relaxed">
                {t.confirmDeleteDesc}
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 pt-2 text-xs font-black">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-brand-navy-dark p-3 rounded-xl cursor-pointer select-none transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={executeDeleteApp}
                disabled={isPending}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-xl cursor-pointer select-none transition-colors disabled:opacity-50"
              >
                {isPending ? t.saving : t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}