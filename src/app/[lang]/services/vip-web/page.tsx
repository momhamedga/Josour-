
import { use } from 'react';
import VipWebSection from './vip_webSection';

interface PageProps {
  params: Promise<{ lang: 'ar' | 'en' }>;
}

export default function VipWebServicesPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const currentLang = unwrappedParams.lang;

  return (
    <VipWebSection lang={currentLang} />
  );
}