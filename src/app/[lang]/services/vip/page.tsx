import VipServicesPage from "@/app/[lang]/services/vip/VipServicesPage";

interface PageProps {
  params: Promise<{ lang: "ar" | "en" }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <VipServicesPage params={resolvedParams} />;
}