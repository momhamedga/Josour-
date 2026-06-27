'use client';

import { use } from 'react';
import VipWebSection from './vip_webSection';

interface PageProps {
  params: Promise<{ lang: 'ar' | 'en' }>;
}

export default function VipWebServicesPage({ params }: PageProps) {
  // فك الـ Promise بأمان باستخدام use()
  const unwrappedParams = use(params);

  return (
    // 🌟 الإصلاح الجذري: تمرير الكائن كـ params بالكامل ليتوافق مع واجهة المكون الابن
    <VipWebSection params={{ lang: unwrappedParams.lang }} />
  );
}