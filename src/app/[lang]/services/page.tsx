import { Language } from "@/config/josour-content";
import ServicesClientPage from "./ServicesClientPage";

interface PageProps {
  params: Promise<{ lang: Language }>;
}

// حوكمة المسار الرئيسي لصفحة الخدمات الاستشارية الفاخرة لعام 2026
export default async function Page({ params }: PageProps) {
  // فك الـ Promise مباشرة في السيرفر لتمريره المستقر
  const resolvedParams = await params;
  return <ServicesClientPage params={resolvedParams} />;
}