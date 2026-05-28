"use client";

import styled from "styled-components";
import { useTranslations } from "next-intl";
import { mq } from "@/lib/breakpoints";

const Strip = styled.div`
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-6) var(--space-4);

  ${mq.md} {
    padding: var(--space-7) var(--space-6);
  }
`;

const Inner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
`;

const Tagline = styled.p`
  font-family: var(--font-heading);
  font-size: var(--font-size-note);
  font-style: italic;
  font-weight: var(--font-weight-light);
  letter-spacing: var(--letter-spacing-md);
  color: var(--color-text-muted);
  text-align: center;
`;

const Badges = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;

  ${mq.md} {
    gap: var(--space-3);
  }
`;

const Badge = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-sm);
  text-transform: uppercase;
  color: var(--color-text-secondary);
  white-space: nowrap;
`;

const Glyph = styled.span`
  font-family: var(--font-heading);
  font-style: italic;
  font-size: var(--font-size-base);
  color: var(--color-brand-rose);
  line-height: var(--line-height-tight);
`;

const BADGES = ["vegan", "crueltyfree", "natural", "sustainable"] as const;

export default function BrandValues() {
  const t = useTranslations("brandValues");

  return (
    <Strip role="region" aria-label={t("ariaLabel")} suppressHydrationWarning>
      <Inner>
        <Tagline>{t("tagline")}</Tagline>
        <Badges>
          {BADGES.map((key) => (
            <Badge key={key}>
              <Glyph aria-hidden="true">✦</Glyph>
              {t(key)}
            </Badge>
          ))}
        </Badges>
      </Inner>
    </Strip>
  );
}
