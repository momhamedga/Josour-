import { Language } from "@/config/josour-content";
import ServicesClientPage from "./ServicesClientPage";

interface PageProps {
  params: Promise<{ lang: Language }>;
}

// 🚀 سيرفر كومبوننت نظيف وخفيف جداً للاستدعاء السريع وتأمين الـ SEO
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <ServicesClientPage params={resolvedParams} />;
}