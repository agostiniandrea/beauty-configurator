import { useTranslations } from "next-intl";
import { getLooks } from "@/lib/data";
import LookCard from "@/components/LookCard";
import Header from "@/components/Header";
import siteConfig from "@/site.config";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locale === "it" ? "it" : "en") as "en" | "it";
  const description = siteConfig.seo.description[loc];
  return {
    description,
    openGraph: {
      type: "website",
      siteName: siteConfig.seo.openGraph.siteName,
      description,
    },
    twitter: {
      card: "summary_large_image",
      description,
    },
  };
}

export default function HomePage() {
  const t = useTranslations("home");
  const looks = getLooks();

  return (
    <div className="min-h-screen bg-[var(--color-background)]" suppressHydrationWarning>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden" aria-labelledby="hero-heading">
        {/* Decorative background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-rose-light)]/30 via-[var(--color-surface)] to-[var(--color-brand-gold)]/10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-8 right-12 w-96 h-96 rounded-full bg-[var(--color-brand-rose-light)]/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-brand-rose)] mb-5">
              {siteConfig.name}
            </p>
            <h1
              id="hero-heading"
              className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-[var(--color-text-primary)] leading-[1.1] mb-6"
            >
              {t("subtitle")}
            </h1>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
              {t("lead")}
            </p>

            {/* How it works */}
            <div className="mt-10 flex flex-wrap gap-6" aria-label="How it works">
              {(["1", "2", "3"] as const).map((step, i) => (
                <div key={step} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span
                    className="w-6 h-6 rounded-full bg-[var(--color-brand-rose)]/15 text-[var(--color-brand-rose)] text-xs font-medium flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>{t(`step${step}` as "step1" | "step2" | "step3")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Looks grid */}
      <section
        className="max-w-7xl mx-auto px-6 py-16"
        aria-labelledby="looks-heading"
      >
        <h2
          id="looks-heading"
          className="font-[family-name:var(--font-heading)] text-3xl font-light text-[var(--color-text-primary)] mb-10"
        >
          {t("looksTitle")}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {looks.map((look) => (
            <li key={look.id} className="flex">
              <LookCard look={look} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
