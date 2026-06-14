'use client';

import { useState, useTransition, use } from 'react';
import { useRouter } from 'next/navigation';
import { loginClientUser, registerClientUser } from '@/app/actions/user-auth';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'; // 👈 استيراد الأيقونات للشكل الشيك

interface PageProps {
  params: Promise<{ lang: 'ar' | 'en' }>;
}

export default function ClientLoginPage({ params }: PageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  // 🔄 وضع الصفحة الحالي: إما 'login' أو 'register'
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // الدول المدعومة بالتصميم الشيك والأعلام
  const countries = [
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+966', flag: '🇸🇦', name: 'KSA' },
    { code: '+20',  flag: '🇪🇬', name: 'EGY' },
    { code: '+974', flag: '🇶🇦', name: 'QAT' },
    { code: '+965', flag: '🇰🇼', name: 'KWT' },
    { code: '+968', flag: '🇴🇲', name: 'OMN' },
    { code: '+1',   flag: '🇺🇸', name: 'USA' },
    { code: '+44',  flag: '🇬🇧', name: 'UK' },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const unwrappedParams = use(params);
  const currentLang = unwrappedParams.lang;
  const isRtl = currentLang === 'ar';
// 🚀 1. تعريف القاموس في كائن مستقل تماماً لمنع التداخل الدائري (Circular Reference)
  const dictionary: any = {
    ar: {
      loginTitle: 'بوابة المستثمر الذكية',
      loginSubtitle: 'أدخل البريد الإلكتروني المسجل التابع لمنشأتك لتتبع الرخص والتأشيرات لايف',
      registerTitle: 'تسجيل منشأة استثمارية جديدة',
      registerSubtitle: 'قم بإنشاء سجل تتبعي فوري لشركتك الآن وابدأ في رفع وثائق التأسيس صامتاً',
      labelName: 'اسم المستثمر / الممثل القانوني',
      labelEmail: 'البريد الإلكتروني للمنشأة',
      labelCompany: 'الاسم الرسمي للمنشأة التجاري',
      labelPhone: 'رقم الهاتف المتحرك المباشر',
      btnLog: 'دخول آمن للبوابة',
      btnReg: 'تأسيس الحساب الاستثماري 🚀',
      logging: 'جاري جلب ملفك اللحظي...',
      registering: 'جاري تشفير السجلات السحابية...',
      placeholderEmail: 'example@josour.ae',
      placeholderName: 'أدخل اسمك الكريم هنا...',
      placeholderCompany: 'مثال: شركة جسور القابضة...',
      placeholderPhone: '50 123 4567',
      hasAccount: 'لديك حساب بالفعل؟ تسجيل الدخول',
      noAccount: 'مستثمر جديد؟ سجل منشأتك الآن فوراً',
      backHome: 'العودة للرئيسية',
      unknownError: 'خطأ غير معروف في نظام الحماية.'
    },
    en: {
      loginTitle: 'Smart Investor Portal',
      loginSubtitle: 'Enter your registered corporate email to track licenses & visas live',
      registerTitle: 'Register New Corporate Profile',
      registerSubtitle: 'Establish your direct tracking account instantly and deploy founding files securely',
      labelName: 'Investor Full Name / Legal Proxy',
      labelEmail: 'Corporate Email Address',
      labelCompany: 'Official Corporate Trade Name',
      labelPhone: 'Direct Mobile Number',
      btnLog: 'Secure Portal Access',
      btnReg: 'Deploy Investor Portfolio 🚀',
      logging: 'Fetching your live profile...',
      registering: 'Encrypting cloud registry handles...',
      placeholderEmail: 'example@josour.ae',
      placeholderName: 'Enter your full name...',
      placeholderCompany: 'e.g., Josour Holding LLC...',
      placeholderPhone: '50 123 4567',
      hasAccount: 'Already registered? Sign In here',
      noAccount: 'New Investor? Register your entity now',
      backHome: 'Back to Home',
      unknownError: 'An unknown secure server connection error occurred.'
    }
  };

  // 👑 2. حقن التوجيه اللغوي الآمن والسليم بنسبة 100% متوافق مع Vercel Production
  const t = dictionary[currentLang] || dictionary.ar;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    // تجميع كود الدولة المختار مع الرقم المدخل وإرساله كحقل موحد باسم phone
    if (mode === 'register') {
      const rawPhone = formData.get('raw_phone') as string;
      formData.set('phone', `${selectedCountry.code}${rawPhone.trim()}`);
    }

    startTransition(async () => {
      const result = mode === 'login' 
        ? await loginClientUser(formData)
        : await registerClientUser(formData);

      if (result.success) {
        router.push(`/${currentLang}/portal`);
        router.refresh();
      } else {
        const errorMsg = currentLang === 'ar' 
          ? (result.errorAr || result.error) 
          : (result.errorEn || result.error);
          
        setError(errorMsg || t.unknownError);
      }
    });
  };

  return (
    <main className={`min-h-screen bg-brand-light-bg flex flex-col items-center justify-center px-4 transition-all duration-500 ${isRtl ? 'font-cairo' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* دوائر خلفية جمالية لتناسق الهوية البصرية الفخمة */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-4 relative z-10">
        
        {/* 🏆 زرار العودة للرئيسية الفخم والمحمي ديناميكياً لتسهيل الـ UX والرجوع بأمان للموقع */}
        <button
          onClick={() => router.push(`/${currentLang}`)}
          type="button"
          className="flex items-center gap-2 text-xs font-bold text-brand-navy-dark/60 hover:text-brand-navy-dark bg-white/60 hover:bg-white border border-brand-navy-dark/[0.06] hover:border-brand-navy-dark/10 px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-3xs group w-max"
        >
          {isRtl ? <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" /> : <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />}
          <Home size={13} className="text-brand-gold" />
          <span>{t.backHome}</span>
        </button>

        {/* كارت الـ UI الأساسي */}
        <div className="w-full bg-white border border-brand-navy-dark/[0.08] rounded-2xl p-8 shadow-md relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold" />
          
          {/* هيدر الصفحة المتغير بنعومة حسب المود */}
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-xl md:text-2xl font-din font-bold text-brand-navy-dark mb-1.5">
              {mode === 'login' ? t.loginTitle : t.registerTitle}
            </h1>
            <p className="text-brand-navy-dark/50 text-[11px] md:text-xs leading-relaxed max-w-xs mx-auto">
              {mode === 'login' ? t.loginSubtitle : t.registerSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold text-center animate-shake">
                {error}
              </div>
            )}

            {/* حقول الـ Register الإضافية تظهر وتختفي بدقة سلاسة */}
            {mode === 'register' && (
              <div className="space-y-4 animate-slide-down">
                <div>
                  <label className="block text-xs font-bold text-brand-navy-dark/70 mb-1.5">{t.labelName}</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t.placeholderName}
                    required
                    disabled={isPending}
                    className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-xl p-3 text-xs md:text-sm text-brand-navy-dark focus:outline-none focus:border-brand-gold font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy-dark/70 mb-1.5">{t.labelCompany}</label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder={t.placeholderCompany}
                    required
                    disabled={isPending}
                    className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-xl p-3 text-xs md:text-sm text-brand-navy-dark focus:outline-none focus:border-brand-gold font-medium"
                  />
                </div>

                {/* 📱 حقل رقم الهاتف المطور بتصميم كبسولة شيك قائمة دول مدمجة */}
                <div>
                  <label className="block text-xs font-bold text-brand-navy-dark/70 mb-1.5">{t.labelPhone}</label>
                  <div className="flex bg-brand-light-bg border border-brand-navy-dark/10 rounded-xl overflow-hidden focus-within:border-brand-gold transition-colors">
                    
                    {/* قائمة اختيار كود الدولة */}
                    <div className="relative border-e border-brand-navy-dark/10 bg-brand-navy-dark/[0.02] flex items-center px-3 cursor-pointer">
                      <select
                        value={selectedCountry.code}
                        onChange={(e) => {
                          const found = countries.find(c => c.code === e.target.value);
                          if (found) setSelectedCountry(found);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        disabled={isPending}
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code} ({c.name})
                          </option>
                        ))}
                      </select>
                      <div className="flex items-center gap-1.5 text-xs md:text-sm font-din font-bold text-brand-navy-dark/80 pointer-events-none select-none">
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <span className="text-[9px] text-brand-navy-dark/30">▼</span>
                      </div>
                    </div>

                    {/* حقل إدخال الأرقام الأساسي */}
                    <input
                      type="tel"
                      name="raw_phone"
                      placeholder={t.placeholderPhone}
                      required
                      disabled={isPending}
                      className={`w-full bg-transparent border-0 p-3 text-xs md:text-sm text-brand-navy-dark focus:outline-none font-medium font-din tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* حقل الإيميل الأساسي المشترك في الحالتين دايماً */}
            <div>
              <label className="block text-xs font-bold text-brand-navy-dark/70 mb-1.5">{t.labelEmail}</label>
              <input
                type="email"
                name="email"
                placeholder={t.placeholderEmail}
                required
                disabled={isPending}
                className="w-full bg-brand-light-bg border border-brand-navy-dark/10 rounded-xl p-3 text-sm text-brand-navy-dark focus:outline-none focus:border-brand-gold transition-colors font-medium text-center font-din"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-brand-navy-dark text-white hover:bg-brand-navy-light disabled:opacity-50 font-din font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all mt-3 shadow-xs flex items-center justify-center"
            >
              {isPending ? (
                <span>{mode === 'login' ? t.logging : t.registering}</span>
              ) : (
                <span>{mode === 'login' ? t.btnLog : t.btnReg}</span>
              )}
            </button>
          </form>

          {/* ⚡ التبديل الديناميكي الحصري بين الـ Register والـ Login بضغطة زر ناعمة */}
          <div className="mt-6 pt-4 border-t border-brand-navy-dark/5 text-center">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setMode(mode === 'login' ? 'register' : 'login');
              }}
              className="text-[11px] font-bold text-brand-gold hover:underline cursor-pointer transition-colors bg-brand-gold/5 border border-brand-gold/10 px-4 py-2 rounded-lg"
            >
              {mode === 'login' ? t.noAccount : t.hasAccount}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}