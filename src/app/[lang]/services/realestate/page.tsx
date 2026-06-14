import VipRealEstatePage from "./VipRealEstatePage";

interface PageProps {
  params: Promise<{ lang: "ar" | "en" }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  return <VipRealEstatePage params={resolvedParams} />;
}