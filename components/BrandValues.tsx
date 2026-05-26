"use client";

import styled from "styled-components";
import { useTranslations } from "next-intl";

const Strip = styled.section`
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 28px 24px;
`;

const Inner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Tagline = styled.p`
  font-family: var(--font-heading);
  font-size: 13px;
  font-style: italic;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  text-align: center;
`;

const Badges = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Badge = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 99px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  white-space: nowrap;
`;

const Glyph = styled.span`
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 14px;
  color: var(--color-brand-rose);
  line-height: 1;
`;

const BADGES = ["vegan", "crueltyfree", "natural", "sustainable"] as const;

export default function BrandValues() {
  const t = useTranslations("brandValues");

  return (
    <Strip aria-label={t("ariaLabel")}>
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
