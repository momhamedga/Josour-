import VipIsoSection from "./VipIsoSection";

interface PageProps {
  params: Promise<{
    lang: 'ar' | 'en';
  }>;
}

// حوكمة المسار الرئيسي لصفحة الأيزو العالمية
export default async function VipIsoPage({ params }: PageProps) {
  // ⚡ فك الـ Promise مباشرة في السيرفر لمنع انتقال الوعود غير المحلولة إلى العميل
  const resolvedParams = await params;

  return (
    <main className="min-h-screen bg-brand-light-bg">
      {/* تمرير كائن الـ params المفكوك والجاهز */}
      <VipIsoSection params={resolvedParams} />
    </main>
  );
}