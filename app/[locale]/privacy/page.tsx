import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientOnly from "@/lib/ClientOnly";
import siteConfig from "@/site.config";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

const path = "/privacy";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locale === "it" ? "it" : "en") as "en" | "it";
  const title = loc === "en" ? "Privacy Policy" : "Privacy Policy";
  return {
    title,
    alternates: {
      canonical: loc === "en" ? path : `/${loc}${path}`,
      languages: { en: path, it: `/it${path}`, "x-default": path },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.seo.openGraph.siteName,
      title,
    },
  };
}

type Section = { heading: string; body: string };

export default async function PrivacyPage() {
  const t = await getTranslations("legal");
  const sections = t.raw("privacy.sections") as Section[];

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      <ClientOnly>
        <Header backLink />
        <main id="main-content" className="max-w-3xl mx-auto px-6 py-14 flex-1 w-full">
          <div className="mb-8 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-alt)] px-5 py-4">
            <p className="text-sm text-[var(--color-text-secondary)]">{t("draftNotice")}</p>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light text-[var(--color-text-primary)] mb-2">
            {t("privacy.title")}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">{t("lastUpdated")}</p>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-medium text-[var(--color-text-primary)] mb-2">
                  {section.heading}
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>
        </main>
        <Footer />
      </ClientOnly>
    </div>
  );
}
