import VipIsoSection from "./VipIsoSection";

interface PageProps {
  params: Promise<{
    lang: 'ar' | 'en';
  }>;
}

// حوكمة المسار الرئيسي لصفحة الأيزو العالمية
export default async function VipIsoPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <main className="min-h-screen ">
      <VipIsoSection lang={lang} />
    </main>
  );
}