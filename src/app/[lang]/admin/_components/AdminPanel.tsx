'use client';

import { useState, useTransition, useMemo, useRef } from 'react';
import { updateApplicationStatus, updateDocumentStatus } from '@/app/actions/admin';
import { adminCreateApplication, adminDeleteApplication } from '@/app/actions/portal-actions';
import UploadZone from './UploadZone';
import UploadIssuedDoc from './UploadIssuedDoc'; 
import Link from 'next/link';
import ClientIdCopyButton from '../../portal/_components/ClientIdCopyButton'; // 👈 استيراد زر النسخ التفاعلي المشترك

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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAppForm, setNewAppForm] = useState({ userId: '', serviceType: '', status: 'pending', progress: 0, notes: '', slaLimit: 48 });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'progress-asc' | 'progress-desc' | 'sla-risk'>('latest');
  const [expandedApps, setExpandedApps] = useState<Record<string, boolean>>({});

  const [activeCanvasDoc, setActiveCanvasDoc] = useState<{appId: string, doc: DocumentItem} | null>(null);
  const [activeFeesApp, setActiveFeesApp] = useState<ApplicationItem | null>(null);
  const [newFeeForm, setNewFeeForm] = useState({ description: '', amount: '' });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
      notesPlaceholder: 'اكتب هنا آخر المستجدات والخطوات القادمة للمستثمر...',
      saveBtn: 'تحديث وبث البيانات لايف',
      saving: 'جاري المعالجة والبث اللحظي...',
      successAlert: 'تم بث التحديثات بنجاح! ✨',
      docsTitle: 'إدارة وثائق ومستندات المعاملة والتغذية البصرية',
      fileUrlLabel: 'رابط الملف المرفوع (Cloud URL):',
      rejectReasonLabel: 'سبب الرفض المباشر:',
      updateDocBtn: 'حفظ الوثيقة',
      showDocs: 'عرض وثائق المعاملة',
      hideDocs: 'إخفاء وثائق المعاملة',
      noResults: 'لم يتم العثور على أي معاملات تطابق خيارات التصفية الحالية.',
      deleteBtn: 'حذف المعاملة نهائياً',
      confirmDelete: 'هل أنت متأكد من حذف هذه المعاملة وجميع وثائقها نهائياً؟ لا يمكن التراجع عن هذا الإجراء.',
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
      confirmDelete: 'Are you sure you want to permanently delete this application and all its documents? This cannot be undone.',
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
      statuses: {
        pending: 'Pending',
        in_progress: 'In Progress',
        review: 'Under Review',
        approved: 'Approved',
        rejected: 'Rejected',
      },
      finalDocTitle: '🏆 Investor Final Document Delivery',
      finalDocDesc: 'Upload the issued license, commercial register, or visa here to appear directly in the client portal.',
      previewFinalDoc: 'Preview Final Issued Document 👁️',
    }
  }[lang];

  const getSLAStatus = (app: ApplicationItem) => {
    const createdAt = app.created_at ? new Date(app.created_at).getTime() : Date.now() - 3600000 * 12;
    const hoursElapsed = (Date.now() - createdAt) / (1000 * 60 * 60);
    const limit = app.sla_hours_limit || 48;

    if (app.status === 'approved') return { status: 'safe', label: t.slaSafe, color: 'bg-emerald-500', text: 'text-emerald-600', score: 0 };
    if (hoursElapsed > limit) return { status: 'breached', label: t.slaViolated, color: 'bg-rose-500 animate-pulse', text: 'text-rose-600 font-extrabold', score: 3 };
    if (hoursElapsed > limit * 0.75) return { status: 'warning', label: t.slaWarning, color: 'bg-amber-500', text: 'text-amber-600', score: 2 };
    return { status: 'safe', label: t.slaSafe, color: 'bg-indigo-500', text: 'text-indigo-600', score: 1 };
  };

  const uniqueClients = useMemo(() => {
    const names = initialApplications.map(a => a.name);
    return Array.from(new Set(names));
  }, [initialApplications]);

  const filteredApps = useMemo(() => {
    let result = [...apps];

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(app => 
        app.name.toLowerCase().includes(query) ||
        app.company_name.toLowerCase().includes(query) ||
        app.id.toLowerCase().includes(query) ||
        app.service_type.toLowerCase().includes(query)
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
    }

    return result;
  }, [apps, searchQuery, selectedClient, statusFilter, sortBy]);

  const totalApps = apps.length;
  const approvedLicenses = apps.filter(a => a.status === 'approved').length;
  const pendingDocs = apps.reduce((acc, app) => acc + (app.documents?.filter(d => d.status === 'pending').length || 0), 0);
  const rejectedDocs = apps.reduce((acc, app) => acc + (app.documents?.filter(d => d.status === 'rejected').length || 0), 0);

  const handleFieldChange = (id: string, field: keyof ApplicationItem, value: any) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, [field]: value } : app));
  };

  const handleDocFieldChange = (appId: string, docId: string, field: keyof DocumentItem, value: any) => {
    setApps(prev => prev.map(app => {
      if (app.id !== appId) return app;
      return {
        ...app,
        documents: app.documents.map(d => d.id === docId ? { ...d, [field]: value } : d)
      };
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedApps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAIGenerateResponse = (appId: string, docId: string, currentReason: string | null) => {
    const reasonToProcess = currentReason && currentReason.trim() !== '' 
      ? currentReason 
      : (lang === 'ar' ? 'عدم وضوح المرفق أو نقص المستندات الثبوتية المطلوبة' : 'unclear document attachment or missing secondary credentials');

    const standardLegalPhrasing = lang === 'ar' 
      ? `نود إفادتكم بأنه بعد مراجعة دقيقة للوثيقة المرفوعة، تبين وجود عدم تطابق رسمي متمثل في (${reasonToProcess}). يرجى إعادة رفع نسخة واضحة ومحدثة تجنباً لإلغاء طلب الترخيص.`
      : `Our dynamic review indicated a non-compliance regarding (${reasonToProcess}). Please update and upload a clear valid copy to comply with regulatory affairs standards.`;
    
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

  const handleDeleteApp = async (id: string) => {
    if (!window.confirm(t.confirmDelete)) return;
    startTransition(async () => {
      const result = await adminDeleteApplication(id);
      if (result.success) {
        setApps(prev => prev.filter(app => app.id !== id));
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

  const statusSelectColors = {
    pending: 'bg-[oklch(0.96_0.03_90)] text-[oklch(0.45_0.15_90)]',
    in_progress: 'bg-[oklch(0.94_0.04_220)] text-[oklch(0.4_0.18_220)]',
    review: 'bg-[oklch(0.95_0.05_40)] text-[oklch(0.45_0.2_40)]',
    approved: 'bg-[oklch(0.95_0.04_145)] text-[oklch(0.35_0.18_145)]',
    rejected: 'bg-[oklch(0.94_0.05_25)] text-[oklch(0.4_0.2_25)]',
  };

  return (
    <div className={`space-y-8 ${isRtl ? 'font-cairo' : 'font-sans'}`}>
      
      {/* Header */}
      <div className="border-b border-brand-navy-dark/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-din font-bold text-brand-navy-dark tracking-tight mb-2">{t.title}</h1>
          <p className="text-brand-navy-dark/60 text-sm md:text-base">{t.subtitle}</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-brand-gold hover:bg-brand-gold-hover text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
        >
          {t.createNewBtn}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-brand-navy-dark/[0.06] rounded-2xl p-4 shadow-2xs">
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

      {/* Filters */}
      <div className="bg-white border border-brand-navy-dark/[0.08] rounded-2xl p-5 shadow-3xs space-y-4">
        <span className="text-xs font-bold text-brand-gold tracking-wider uppercase block">{t.filterTitle}</span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-medium">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none focus:border-brand-gold/50"
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
      <div className="grid grid-cols-1 gap-6">
        {filteredApps.length === 0 ? (
          <div className="text-center py-16 bg-white border border-brand-navy-dark/5 rounded-2xl p-6">
            <p className="text-brand-navy-dark/40 text-sm font-medium">{t.noResults}</p>
          </div>
        ) : (
          filteredApps.map((app) => {
            const currentColors = statusSelectColors[app.status] || statusSelectColors.pending;
            const isExpanded = !!expandedApps[app.id];
            const sla = getSLAStatus(app);
            const totalFeesPaid = app.fees?.reduce((sum, f) => sum + f.amount, 0) || 0;

            return (
              <div key={app.id} className="bg-white border border-brand-navy-dark/[0.08] rounded-2xl p-6 md:p-8 shadow-xs relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold" />
                
                {/* 💎 البادج المطور فائق النقاء والأناقة لعرض الـ ID بشكل سينمائي مقصوص وجميل جداً داخل الآدمن */}
                <div className="mb-4 bg-brand-navy-dark/[0.02] px-4 py-3 rounded-xl border border-brand-navy-dark/[0.05] flex items-center justify-between gap-4 flex-wrap">
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

                <div className="mb-4 flex flex-wrap justify-between items-center bg-brand-light-bg/80 px-4 py-2 rounded-xl border border-brand-navy-dark/[0.04] gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="text-brand-navy-dark/60">{t.slaBadge}</span>
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${sla.color}`} />
                    <span className={sla.text}>{sla.label} ({app.sla_hours_limit || 48}h Limit)</span>
                  </div>
                  <div className="text-xs font-bold text-brand-navy-dark">
                    💰 إجمالي النفقات الحكومية الموثقة: <span className="text-emerald-600 font-din">{totalFeesPaid} AED</span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-brand-navy-dark/[0.06] pb-4 mb-6 text-sm">
                  <div>
                    <span className="text-brand-navy-dark/40 block text-xs mb-0.5">{t.clientName}</span>
                    <span className="font-bold text-brand-navy-dark">{app.name}</span>
                  </div>
                  <div>
                    <span className="text-brand-navy-dark/40 block text-xs mb-0.5">{t.company}</span>
                    <span className="font-bold text-brand-navy-dark">{app.company_name}</span>
                  </div>
                  <div>
                    <span className="text-brand-navy-dark/40 block text-xs mb-0.5">{t.service}</span>
                    <input
                      type="text"
                      value={app.service_type}
                      onChange={(e) => handleFieldChange(app.id, 'service_type', e.target.value)}
                      className="font-bold text-brand-gold font-din border-b border-dashed border-brand-gold/30 focus:outline-none focus:border-brand-gold bg-transparent text-xs w-full"
                    />
                  </div>
                </div>

                {/* Status & Progress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-navy-dark/70 mb-2">{t.statusLabel}</label>
                      <select
                        value={app.status}
                        onChange={(e) => handleFieldChange(app.id, 'status', e.target.value as any)}
                        className={`w-full border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none cursor-pointer ${currentColors}`}
                      >
                        {Object.entries(t.statuses).map(([key, label]) => (
                          <option key={key} value={key} className="bg-white text-brand-navy-dark">{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-brand-navy-dark/70">{t.progressLabel}</label>
                        <span className="text-sm font-din font-bold text-brand-navy-dark bg-brand-navy-dark/5 px-2 py-0.5 rounded-md">{app.progress}%</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={app.progress}
                        onChange={(e) => handleFieldChange(app.id, 'progress', parseInt(e.target.value))}
                        className="w-full h-2 bg-brand-navy-dark/5 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy-dark/70 mb-2">{t.notesLabel}</label>
                    <textarea
                      rows={3} value={app.notes || ''}
                      onChange={(e) => handleFieldChange(app.id, 'notes', e.target.value)}
                      placeholder={t.notesPlaceholder}
                      className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-xl p-4 text-sm text-brand-navy-dark focus:outline-none resize-none font-medium"
                    />
                  </div>
                </div>

                {/* Final Doc Zone */}
                <div className="bg-emerald-50/40 border border-emerald-500/10 rounded-2xl p-4 md:p-6 mb-6 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    {t.finalDocTitle}
                  </h4>
                  <p className="text-brand-navy-dark/60 text-[11px] font-medium">{t.finalDocDesc}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <UploadIssuedDoc 
                        appId={app.id}
                        currentUrl={app.issued_document_url}
                        lang={lang}
                        onUploadSuccess={(url) => {
                          if (url === null) {
                            handleFieldChange(app.id, 'issued_document_url', null);
                            handleFieldChange(app.id, 'status', 'in_progress');
                            handleFieldChange(app.id, 'progress', 90);
                          } else {
                            handleFieldChange(app.id, 'issued_document_url', url);
                            handleFieldChange(app.id, 'status', 'approved');
                            handleFieldChange(app.id, 'progress', 100);
                          }
                        }}
                      />
                    </div>
                    {app.issued_document_url && (
                      <div className="text-xs font-semibold">
                        <Link 
                          href={`/api/view-doc?url=${encodeURIComponent(app.issued_document_url)}`} 
                          target="_blank" 
                          className="text-emerald-700 hover:underline flex items-center gap-1 bg-white border border-emerald-200 px-3 py-2 rounded-xl w-max shadow-3xs cursor-pointer"
                        >
                          {t.previewFinalDoc}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-brand-navy-dark/[0.04] pb-6 mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    {successId === app.id && (
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                        {t.successAlert}
                      </span>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => toggleExpand(app.id)}
                      className="text-xs font-bold text-brand-navy-dark/60 hover:text-brand-navy-dark bg-brand-light-bg px-4 py-2.5 rounded-xl border border-brand-navy-dark/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isExpanded ? '🔼' : '📂'}</span>
                      {isExpanded ? t.hideDocs : `${t.showDocs} (${app.documents?.length || 0})`}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveFeesApp(app)}
                      className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-200 transition-all cursor-pointer"
                    >
                      {t.feesBtn} ({app.fees?.length || 0})
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteApp(app.id)}
                      className="text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 bg-rose-50 px-4 py-2.5 rounded-xl border border-rose-200 transition-all cursor-pointer"
                    >
                      🗑️ {t.deleteBtn}
                    </button>
                  </div>

                  <button 
                    onClick={() => handleUpdate(app)} 
                    disabled={isPending} 
                    className="w-full sm:w-auto bg-brand-navy-dark text-white hover:bg-brand-navy-light font-din text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer disabled:opacity-50"
                  >
                    {isPending ? t.saving : t.saveBtn}
                  </button>
                </div>

                {/* Documents Expand Area */}
                {app.documents && app.documents.length > 0 && isExpanded && (
                  <div className="bg-brand-light-bg/40 border border-brand-navy-dark/[0.04] rounded-xl p-4 md:p-6 space-y-4">
                    <h3 className="text-sm font-bold text-brand-navy-dark flex items-center gap-2">
                      <span className="w-1.5 h-3 bg-brand-gold rounded-full inline-block" />
                      {t.docsTitle}
                    </h3>
                    
                    <div className="space-y-4">
                      {app.documents.map((doc) => {
                        const docName = lang === 'ar' ? doc.document_name_ar : doc.document_name_en;
                        const secureViewUrl = doc.file_url ? `/api/view-doc?url=${encodeURIComponent(doc.file_url)}` : '';

                        return (
                          <div key={doc.id} className="bg-white border border-brand-navy-dark/[0.04] rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs">
                            <div>
                              <span className="text-brand-navy-dark/40 block mb-1">{lang === 'ar' ? 'اسم المستند' : 'Document Name'}</span>
                              <span className="font-bold text-brand-navy-dark block truncate" title={docName}>{docName}</span>
                            </div>

                            <div>
                              <span className="text-brand-navy-dark/40 block mb-1">{lang === 'ar' ? 'حالة الوثيقة' : 'Document Status'}</span>
                              <select
                                value={doc.status}
                                onChange={(e) => handleDocFieldChange(app.id, doc.id, 'status', e.target.value as any)}
                                className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-lg p-2 font-semibold text-brand-navy-dark focus:outline-none cursor-pointer"
                              >
                                <option value="pending">{t.statuses.pending}</option>
                                <option value="approved">{t.statuses.approved}</option>
                                <option value="rejected">{t.statuses.rejected}</option>
                              </select>
                            </div>

                            <div className="md:col-span-1">
                              {doc.status === 'rejected' ? (
                                <div className="space-y-2">
                                  {doc.file_url && (
                                    <Link 
                                      href={`/api/view-doc?url=${encodeURIComponent(doc.file_url)}`}
                                      target="_blank"
                                      className="w-full text-center block text-[11px] font-semibold text-brand-navy-dark bg-brand-light-bg border border-brand-navy-dark/10 py-1.5 px-2 rounded-md hover:bg-brand-navy-dark hover:text-white transition-all duration-200 cursor-pointer"
                                    >
                                      👁️ {lang === 'ar' ? 'معاينة الوثيقة المرفوضة' : 'View Rejected Document'}
                                    </Link>
                                  )}

                                  <span className="text-brand-navy-dark/40 block mb-0.5">{t.rejectReasonLabel}</span>
                                  <div className="flex gap-1.5">
                                    <input
                                      type="text"
                                      value={doc.rejection_reason || ''}
                                      onChange={(e) => handleDocFieldChange(app.id, doc.id, 'rejection_reason', e.target.value)}
                                      className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-lg p-2 focus:outline-none"
                                      placeholder="اكتب سبب الرفض..."
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleAIGenerateResponse(app.id, doc.id, doc.rejection_reason)}
                                      className="bg-brand-navy-dark text-white p-2 rounded-lg font-bold hover:bg-brand-gold transition-colors cursor-pointer"
                                      title={t.aiGenerateBtn}
                                    >
                                      ✨
                                    </button>
                                  </div>
                                </div>
                              ) : doc.file_url ? (
                                <div className="flex items-center justify-between gap-2 bg-emerald-50 text-emerald-700 p-2 rounded-lg border border-emerald-100 font-semibold">
                                  <Link 
                                    href={secureViewUrl} 
                                    target="_blank" 
                                    className="truncate hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    👁️ {lang === 'ar' ? 'معاينة المستند بأمان' : 'View Document'}
                                  </Link>
                                  
                                  <button 
                                    type="button"
                                    onClick={() => handleDocFieldChange(app.id, doc.id, 'file_url', null)}
                                    className="text-rose-600 font-bold hover:underline cursor-pointer"
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

                            <div className="flex items-center justify-between gap-2">
                              {successId === `doc-${doc.id}` && <span className="text-xs font-bold text-emerald-600">✓</span>}
                              <button
                                onClick={() => handleUpdateDocBtn(app.id, doc)}
                                disabled={isPending}
                                className="w-full bg-brand-gold text-white hover:bg-brand-gold-hover disabled:opacity-40 font-bold py-2 rounded-lg text-center cursor-pointer"
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
    </div>
  );
}