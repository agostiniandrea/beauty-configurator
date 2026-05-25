"use client";

import Link from "next/link";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import siteConfig from "@/site.config";
import ThemeToggle from "./ThemeToggle";

const HeaderBar = styled.header`
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
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const BackLink = styled(Link)`
  font-size: 14px;
  color: var(--color-text-muted);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  transition: color 0.2s;

  &:hover { color: var(--color-text-primary); }
`;

const SiteName = styled(Link)`
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0.02em;
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: var(--color-brand-rose); }
`;

const Controls = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LocaleLink = styled(Link)`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: var(--color-text-primary); }
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
    <HeaderBar role="banner">
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
