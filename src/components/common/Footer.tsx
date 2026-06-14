import Link from 'next/link';
import { siteContent, Language } from '@/config/josour-content';
import { ShieldCheck, Mail, MapPin, PhoneCall } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = siteContent[lang];

  return (
    <footer className="bg-gradient-to-b from-brand-navy-dark to-[#091222] border-t border-brand-gold/20 pt-20 pb-8 px-6 relative overflow-hidden">
      
      {/* لمسة إشعاع ذهبي خافت جداً في زاوية الفوتر لإعطاء عمق سينمائي */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        
        {/* عمود الهوية والتعريف */}
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <div className="bg-brand-gold/10 p-2 rounded-lg text-brand-gold border border-brand-gold/20">
              <ShieldCheck size={24} />
            </div>
            <span className="font-din font-bold text-xl tracking-wider text-white">
              JOSOUR <span className="text-brand-gold">INTERNATIONAL</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm font-cairo leading-relaxed max-w-md">
            {t.footer.desc}
          </p>
        </div>

        {/* عمود روابط الخدمات الاحترافية */}
        <div className="space-y-4">
          <h4 className="text-brand-gold font-din font-bold text-base tracking-wide border-b border-white/5 pb-2">
            {lang === 'ar' ? 'الخدمات الاستشارية' : 'Consulting Services'}
          </h4>
          <ul className="space-y-3 text-sm font-cairo text-gray-400">
            <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">{lang === 'ar' ? 'تأسيس وإصدار الرخص' : 'Corporate Setup & Licensing'}</Link></li>
            <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">{lang === 'ar' ? 'شهادات الجودة ISO' : 'ISO Quality Standards'}</Link></li>
            <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">{lang === 'ar' ? 'شهادات القيمة المضافة ICV' : 'ICV Certifications'}</Link></li>
          </ul>
        </div>

        {/* عمود الاتصال السريع المطور بالأيقونات النظيفة */}
        <div className="space-y-4">
          <h4 className="text-brand-gold font-din font-bold text-base tracking-wide border-b border-white/5 pb-2">
            {lang === 'ar' ? 'التواصل المباشر' : 'Direct Contact'}
          </h4>
          <ul className="space-y-3 text-sm font-cairo text-gray-400">
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-brand-gold shrink-0" />
              <span>{lang === 'ar' ? 'الإمارات - دبي / أبوظبي' : 'UAE - Dubai / Abu Dhabi'}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneCall size={16} className="text-brand-gold shrink-0" />
              <span dir="ltr">+971 4 XXX XXXX</span>
            </li>
          </ul>
        </div>

      </div>

      {/* خط النهاية والحقوق */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 text-center relative z-10">
        <p className="text-xs font-cairo text-gray-500 tracking-wide">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}