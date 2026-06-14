import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import AboutSection from '@/components/sections/AboutSection';
import ConsultationModal from '@/components/sections/ConsultationModal';
import ContactSection from '@/components/sections/ContactSection';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import TrackSection from '@/components/sections/TrackSection';
import { Language } from '@/config/josour-content';
import { cookies } from 'next/headers';

interface HomePageProps {
  params: Promise<{ lang: Language }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
const cookieStore = await cookies();
const isAdmin = cookieStore.has('admin_session');
const isUser = cookieStore.has('user_email');
  return (
    <div className="min-h-screen bg-brand-light-bg text-brand-navy-dark selection:bg-brand-gold/30">
<Header lang={lang} isAdminLoggedIn={isAdmin} isUserLoggedIn={isUser} />
      <Hero lang={lang} />

      <AboutSection lang={lang} />

      <Services lang={lang} />

      <TrackSection lang={lang} />

      <ContactSection lang={lang} />
<ConsultationModal lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}