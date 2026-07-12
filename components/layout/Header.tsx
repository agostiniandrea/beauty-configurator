"use client";

import Link from "next/link";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import siteConfig from "@/site.config";
import ThemeToggle from "./ThemeToggle";
import { mq } from "@/lib/breakpoints";

const HeaderBar = styled.div`
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 20;
`;

const Inner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: var(--space-3) var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-4);

  ${mq.md} {
    padding: var(--space-4) var(--space-6);
    gap: var(--space-6);
  }
`;

const BackLink = styled(Link)`
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--space-1-5);
  flex-shrink: 0;
  transition: color var(--transition-base);

  &:hover {
    color: var(--color-text-primary);
  }
`;

const SiteName = styled(Link)`
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-light);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color var(--transition-base);

  &:hover {
    color: var(--color-brand-rose);
  }
`;

const Controls = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

const LocaleLink = styled(Link)`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-2xl);
  text-transform: uppercase;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-base);

  &:hover {
    color: var(--color-text-primary);
  }
`;

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
    <HeaderBar role="banner" suppressHydrationWarning>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:text-sm focus:font-medium focus:bg-[var(--color-surface)] focus:border focus:border-[var(--color-border-strong)] focus:text-[var(--color-text-primary)]"
      >
        {t("skipToContent")}
      </a>
      <Inner>
        {backLink && (
          <BackLink href={backHref ?? `/${locale}`} aria-label={backLabel ?? t("back")}>
            <span aria-hidden="true">←</span>
            <span>{backLabel ?? t("back")}</span>
          </BackLink>
        )}

        <SiteName href={`/${locale}`} aria-label={`${siteConfig.name} — home`}>
          {siteConfig.name}
        </SiteName>

        <Controls aria-label="Site controls">
          <LocaleLink
            href={`/${otherLocale}`}
            aria-label={`Switch to ${otherLocale === "en" ? "English" : "Italiano"}`}
            hrefLang={otherLocale}
          >
            {otherLocale}
          </LocaleLink>
          <ThemeToggle />
        </Controls>
      </Inner>
    </HeaderBar>
  );
}
