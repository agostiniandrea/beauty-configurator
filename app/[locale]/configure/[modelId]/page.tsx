import { notFound } from "next/navigation";
import { getLook, getCategoriesForLook, getOptionsForCategory } from "@/lib/data";
import Header from "@/components/Header";
import ConfiguratorClient from "./ConfiguratorClient";
import type { Option } from "@/lib/types";

type Props = {
  params: Promise<{ modelId: string; locale: string }>;
};

export default async function ConfiguratorPage({ params }: Props) {
  const { modelId } = await params;

  const look = getLook(modelId);
  if (!look) notFound();

  const categories = getCategoriesForLook(modelId);

  const optionsByCategory: Record<string, Option[]> = {};
  for (const cat of categories) {
    optionsByCategory[cat.id] = getOptionsForCategory(cat.id);
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header backLink />
      <ConfiguratorClient
        look={look}
        categories={categories}
        optionsByCategory={optionsByCategory}
      />
    </div>
  );
}
