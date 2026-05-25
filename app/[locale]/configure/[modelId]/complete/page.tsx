import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { getLook, getCategoriesForLook, getOptionsForCategory } from "@/lib/data";
import Header from "@/components/Header";
import StoreCard from "@/components/StoreCard";
import BookingForm from "@/components/BookingForm";
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
  return {
    title,
    description,
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

export default async function CompletePage({ params, searchParams }: Props) {
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

  const selection: Selection = {};
  for (const cat of categories) {
    if (rawParams[cat.id]) selection[cat.id] = rawParams[cat.id];
  }

  const t = await getTranslations("complete");
  const tNav = await getTranslations("nav");

  // Build the full URL for the QR code — points back to this completion page so
  // studio staff can scan and see the same card on their device.
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const selectionParams = new URLSearchParams(Object.entries(selection)).toString();
  const orderUrl = `${proto}://${host}/${locale}/configure/${modelId}/complete?${selectionParams}`;

  const summaryUrl = `/${locale}/configure/${modelId}/summary?${selectionParams}`;

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="no-print">
        <Header
          backLink
          backLabel={tNav("backToSummary")}
          backHref={summaryUrl}
        />
      </div>

      <main className="max-w-3xl mx-auto px-6 py-14">
        <div className="mb-10 no-print">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-rose)]/15 flex items-center justify-center mb-5" aria-hidden="true">
            <span className="text-[var(--color-brand-rose)] text-2xl">✦</span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light text-[var(--color-text-primary)]">
            {t("title")}
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2">{t("subtitle")}</p>
        </div>

        <StoreCard
          look={look}
          categories={categories}
          allOptions={allOptions}
          selection={selection}
          locale={locale as "en" | "it"}
          orderUrl={orderUrl}
        />

        <div className="mt-10 no-print">
          <BookingForm
            look={look}
            categories={categories}
            allOptions={allOptions}
            selection={selection}
            locale={locale as "en" | "it"}
          />
        </div>
      </main>
    </div>
  );
}
