import { notFound } from "next/navigation";
import {
  getLook,
  getCategoriesForLook,
  getOptionsForCategory,
  getLookStartingPrice,
} from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientOnly from "@/lib/ClientOnly";
import ConfiguratorClient from "./ConfiguratorClient";
import type { Option, Selection } from "@/lib/types";
import type { Metadata } from "next";
import siteConfig from "@/site.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  const { modelId, locale } = await params;
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

  const loc = (locale === "it" ? "it" : "en") as "en" | "it";
  const path = `/configure/${modelId}`;
  const canonicalPath = loc === "en" ? path : `/${loc}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: look.name[loc],
    description: look.description[loc],
    image: `${siteUrl}${look.imageUrl}`,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}${canonicalPath}`,
      priceCurrency: "EUR",
      price: getLookStartingPrice(look),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      <script
        type="application/ld+json"
        // Trusted server-generated data only (look name/description/image/price
        // from the local catalog) — never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientOnly>
        <Header backLink />
        <main id="main-content" className="flex-1">
          <ConfiguratorClient
            look={look}
            categories={categories}
            optionsByCategory={optionsByCategory}
            initialSelection={
              Object.keys(restoredSelection).length > 0 ? restoredSelection : undefined
            }
          />
        </main>
        <Footer />
      </ClientOnly>
    </div>
  );
}
