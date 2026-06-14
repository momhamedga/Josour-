import VipIcvPage from "./VipIcvPage";

interface PageProps {
  params: Promise<{ lang: "ar" | "en" }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  return <VipIcvPage params={resolvedParams} />;
}