import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";
import type { Metadata } from "next";
import siteConfig from "@/site.config";
import HtmlLang from "@/components/HtmlLang";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "it")) {
    notFound();
  }

  const messages = await getMessages();

  // The font wrapper div must be OUTSIDE NextIntlClientProvider.
  // NextIntlClientProvider is a Client Component — if it sits at the root of
  // the layout, React inserts an SSR boundary marker (display:contents) that
  // the client doesn't reproduce, causing a hydration mismatch.
  return (
    <div className={`${cormorant.variable} ${dmSans.variable}`}>
      <HtmlLang locale={locale} />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
