import { notFound } from "next/navigation";
import { getLook, getCategoriesForLook, getOptionsForCategory } from "@/lib/data";
import Header from "@/components/layout/Header";
import ClientOnly from "@/lib/ClientOnly";
import ConfiguratorClient from "./ConfiguratorClient";
import type { Option, Selection } from "@/lib/types";
import type { Metadata } from "next";
import siteConfig from "@/site.config";

type Props = {
  params: Promise<{ modelId: string; locale: string }>;
  searchParams: Promise<Record<string, string>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modelId, locale } = await params;
  const look = getLook(modelId);
  if (!look) return {};
  const loc = (locale === "it" ? "it" : "en") as "en" | "it";
  const description = look.description[loc];
  const path = `/configure/${modelId}`;
  return {
    title: look.name[loc],
    description,
    alternates: {
      canonical: loc === "en" ? path : `/${loc}${path}`,
      languages: {
        en: path,
        it: `/it${path}`,
        "x-default": path,
      },
    },
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

export default async function ConfiguratorPage({ params, searchParams }: Props) {
  const { modelId } = await params;
  const rawParams = await searchParams;

  const look = getLook(modelId);
  if (!look) notFound();

  const categories = getCategoriesForLook(modelId);

  const optionsByCategory: Record<string, Option[]> = {};
  for (const cat of categories) {
    optionsByCategory[cat.id] = getOptionsForCategory(cat.id);
  }

  // Restore a previous selection from the query string (categoryId → optionId)
  // so navigating back from summary/complete doesn't lose the user's choices.
  const restoredSelection: Selection = {};
  for (const cat of categories) {
    const optionId = rawParams[cat.id];
    if (optionId && optionsByCategory[cat.id].some((o) => o.id === optionId)) {
      restoredSelection[cat.id] = optionId;
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <ClientOnly>
        <Header backLink />
        <main id="main-content">
          <ConfiguratorClient
            look={look}
            categories={categories}
            optionsByCategory={optionsByCategory}
            initialSelection={
              Object.keys(restoredSelection).length > 0 ? restoredSelection : undefined
            }
          />
        </main>
      </ClientOnly>
    </div>
  );
}
