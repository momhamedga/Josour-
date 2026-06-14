'use client';

import { useState, useTransition, use } from 'react'; 
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/app/actions/admin-auth';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'; // 👈 استيراد الأيقونات اللازمة للشكل الشيك

interface PageProps {
  params: Promise<{ lang: 'ar' | 'en' }>; 
}

export default function AdminLoginPage({ params }: PageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const unwrappedParams = use(params); 
  const isRtl = unwrappedParams.lang === 'ar';

  const t = {
    ar: {
      title: 'بوابة المستشار الإداري',
      subtitle: 'سجل الدخول لإدارة معاملات المستثمرين وبث التحديثات لايف',
      labelUser: 'اسم المستخدم أو البريد الإلكتروني',
      labelPass: 'كلمة المرور الإدارية',
      btnLog: 'دخول آمن للوحة التحكم',
      logging: 'جاري التحقق وبناء الجلسة...',
      backHome: 'العودة للرئيسية', // 👈 نص العودة للرئيسية بالعربية
      unknownError: 'خطأ غير معروف في نظام صلاحيات المشرفين.'
    },
    en: {
      title: 'Consultant Admin Portal',
      subtitle: 'Sign in to manage investor applications and broadcast updates live',
      labelUser: 'Username or Email',
      labelPass: 'Administrative Password',
      btnLog: 'Secure Access Login',
      logging: 'Verifying Credentials...',
      backHome: 'Back to Home', // 👈 نص العودة للرئيسية بالإنجليزية
      unknownError: 'An unknown administrative profile error occurred.'
    }
  }[unwrappedParams.lang] || { title: '', subtitle: '', labelUser: '', labelPass: '', btnLog: '', logging: '', backHome: '', unknownError: '' }; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAdmin(formData);
      if (result.success) {
        router.push(`/${unwrappedParams.lang}/admin`);
        router.refresh();
      } else {
        // ✅ استقبال الخطأ الديناميكي المترجم القادم من الـ Server Action بدقة وثبات لايف
   // ✅ استقبال الخطأ الديناميكي المترجم القادم من الـ Server Action بدقة وثبات
const errorMsg = unwrappedParams.lang === 'ar' 
  ? result.errorAr 
  : result.errorEn;

setError(errorMsg || t.unknownError);

        setError(errorMsg || t.unknownError);
      }
    });
  };

  return (
    <main className={`min-h-screen bg-brand-light-bg flex flex-col items-center justify-center px-4 relative overflow-hidden ${isRtl ? 'font-cairo' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* دوائر فنية مشعة بالخلفية تليق ببراند جسور الفخم */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-4 relative z-10">
        
        {/* 🏆 زرار العودة للرئيسية الفخم والمحمي ديناميكياً لتسهيل الـ UX والرجوع بأمان للموقع */}
        <button
          onClick={() => router.push(`/${unwrappedParams.lang}`)}
          type="button"
          className="flex items-center gap-2 text-xs font-bold text-brand-navy-dark/60 hover:text-brand-navy-dark bg-white/60 hover:bg-white border border-brand-navy-dark/[0.06] hover:border-brand-navy-dark/10 px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-3xs group w-max"
        >
          {isRtl ? <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" /> : <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />}
          <Home size={13} className="text-brand-gold" />
          <span>{t.backHome}</span>
        </button>

        {/* كارت الـ UI المنسق والنظيف تماماً بدون أي تغيير هيكلي */}
        <div className="w-full bg-white border border-brand-navy-dark/[0.08] rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold" />
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-din font-bold text-brand-navy-dark mb-2">{t.title}</h1>
            <p className="text-brand-navy-dark/50 text-xs md:text-sm">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold text-center animate-fade-in">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-brand-navy-dark/70 mb-2">{t.labelUser}</label>
              <input
                type="text"
                name="identifier"
                required
                disabled={isPending}
                className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-xl p-3 text-sm text-brand-navy-dark focus:outline-none focus:border-brand-gold transition-colors font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy-dark/70 mb-2">{t.labelPass}</label>
              <input
                type="password"
                name="password"
                required
                disabled={isPending}
                className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-xl p-3 text-sm text-brand-navy-dark focus:outline-none focus:border-brand-gold transition-colors font-din tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-brand-navy-dark text-white hover:bg-brand-navy-light disabled:opacity-50 font-din font-bold text-sm py-3 rounded-xl cursor-pointer transition-all mt-2 shadow-xs"
            >
              {isPending ? t.logging : t.btnLog}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}