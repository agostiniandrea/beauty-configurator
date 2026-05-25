import { notFound } from "next/navigation";
import { getLook, getCategoriesForLook, getOptionsForCategory } from "@/lib/data";
import Header from "@/components/Header";
import ConfiguratorClient from "./ConfiguratorClient";
import type { Option } from "@/lib/types";
import type { Metadata } from "next";
import siteConfig from "@/site.config";

type Props = {
  params: Promise<{ modelId: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modelId, locale } = await params;
  const look = getLook(modelId);
  if (!look) return {};
  const loc = (locale === "it" ? "it" : "en") as "en" | "it";
  const description = look.description[loc];
  return {
    title: look.name[loc],
    description,
    openGraph: {
      type: "website",
      siteName: siteConfig.seo.openGraph.siteName,
      title: `${look.name[loc]} — ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${look.name[loc]} — ${siteConfig.name}`,
      description,
    },
  };
}

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
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header backLink />
      <ConfiguratorClient
        look={look}
        categories={categories}
        optionsByCategory={optionsByCategory}
      />
    </div>
  );
}
