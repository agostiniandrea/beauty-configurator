import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getLook, getCategoriesForLook, getOptionsForCategory } from "@/lib/data";
import Header from "@/components/layout/Header";
import ClientOnly from "@/lib/ClientOnly";
import SummaryReview from "@/components/configurator/SummaryReview";
import type { Option, Selection } from "@/lib/types";
import type { Metadata } from "next";
import siteConfig from "@/site.config";

type Props = {
  params: Promise<{ modelId: string; locale: string }>;
  searchParams: Promise<Record<string, string>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, modelId } = await params;
  const look = getLook(modelId);
  if (!look) return {};
  const loc = (locale === "it" ? "it" : "en") as "en" | "it";
  const title = `${look.name[loc]} — ${siteConfig.name}`;
  const description = look.description[loc];
  const path = `/configure/${modelId}/summary`;
  return {
    title,
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
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SummaryPage({ params, searchParams }: Props) {
  const { modelId, locale } = await params;
  const rawParams = await searchParams;

  const look = getLook(modelId);
  if (!look) notFound();

  const categories = getCategoriesForLook(modelId);

  const optionsByCategory: Record<string, Option[]> = {};
  for (const cat of categories) {
    optionsByCategory[cat.id] = getOptionsForCategory(cat.id);
  }

  const allOptions = Object.values(optionsByCategory).flat();

  // Rebuild selection from search params (categoryId → optionId)
  const selection: Selection = {};
  for (const cat of categories) {
    if (rawParams[cat.id]) selection[cat.id] = rawParams[cat.id];
  }

  const t = await getTranslations("summary");
  const tNav = await getTranslations("nav");

  const selectionParams = new URLSearchParams(Object.entries(selection)).toString();

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <ClientOnly>
        <Header
          backLink
          backLabel={tNav("backToConfigurator")}
          backHref={`/configure/${modelId}?${selectionParams}`}
        />

        <main id="main-content" className="max-w-3xl mx-auto px-6 py-14">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-brand-rose)] mb-3">
              {t("lookLabel")} — {look.name[locale as "en" | "it"]}
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light text-[var(--color-text-primary)]">
              {t("title")}
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-2">{t("subtitle")}</p>
          </div>

          <SummaryReview
            look={look}
            categories={categories}
            allOptions={allOptions}
            selection={selection}
            locale={locale as "en" | "it"}
          />

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/configure/${modelId}?${selectionParams}`}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-all"
            >
              ← {t("edit")}
            </Link>
            <Link
              href={`/configure/${modelId}/complete?${selectionParams}`}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold bg-[var(--color-action-bg)] text-[var(--color-action-text)] hover:bg-[var(--color-action-bg-hover)] transition-all"
            >
              {t("confirm")} ✓
            </Link>
          </div>
        </main>
      </ClientOnly>
    </div>
  );
}
