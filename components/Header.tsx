import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import siteConfig from "@/site.config";
import ThemeToggle from "./ThemeToggle";

type Props = {
  backLink?: boolean;
  backLabel?: string;
  backHref?: string;
};

export default function Header({ backLink = false, backLabel, backHref }: Props) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const otherLocale = locale === "en" ? "it" : "en";

  return (
    <header
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md sticky top-0 z-20"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        {backLink && (
          <Link
            href={backHref ?? `/${locale}`}
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1.5 shrink-0"
            aria-label={backLabel ?? t("back")}
          >
            <span aria-hidden="true">←</span>
            <span>{backLabel ?? t("back")}</span>
          </Link>
        )}

        <Link
          href={`/${locale}`}
          className="font-[family-name:var(--font-heading)] text-xl font-light tracking-wide text-[var(--color-text-primary)] hover:text-[var(--color-brand-rose)] transition-colors"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.name}
        </Link>

        <nav className="ml-auto flex items-center gap-3" aria-label="Site controls">
          <Link
            href={`/${otherLocale}`}
            className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest"
            aria-label={`Switch to ${otherLocale === "en" ? "English" : "Italiano"}`}
            hrefLang={otherLocale}
          >
            {otherLocale}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
