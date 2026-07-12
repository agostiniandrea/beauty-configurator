"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import type { Look } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition:
    border-color var(--transition-slow),
    box-shadow var(--transition-slow);

  &:hover {
    border-color: var(--color-border-strong);
    box-shadow: var(--shadow-card);
  }
`;

const ImageWrap = styled.div`
  aspect-ratio: 3 / 2;
  position: relative;
  overflow: hidden;
`;

const TagsOverlay = styled.div`
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1-5);
`;

const Tag = styled.span`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-xl);
  padding: var(--space-0-5) var(--space-2);
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-surface) 80%, transparent);
  backdrop-filter: blur(4px);
  color: var(--color-text-secondary);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  flex: 1;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-light);
  color: var(--color-text-primary);
  line-height: var(--line-height-snug);
`;

const Description = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  flex: 1;
  line-height: var(--line-height-relaxed);
`;

const PriceFrom = styled.p`
  font-size: var(--font-size-note);
  font-weight: var(--font-weight-medium);
  color: var(--color-brand-rose);
  letter-spacing: var(--letter-spacing-tight);
`;

const CtaLink = styled(Link)`
  margin-top: var(--space-3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-lg);
  background: var(--color-action-bg);
  color: var(--color-action-text);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  padding: var(--space-3) var(--space-5);
  text-decoration: none;
  transition: background var(--transition-base);

  &:hover {
    background: var(--color-action-bg-hover);
  }
  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 3px;
  }
`;

type Props = { look: Look; startingPrice?: number };

export default function LookCard({ look, startingPrice }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");

  return (
    <Card>
      <ImageWrap role="img" aria-label={`${look.name[locale]} — preview`}>
        {look.imageUrl ? (
          <Image
            src={look.imageUrl}
            alt={look.name[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <ImagePlaceholder label={look.name[locale]} size="lg" />
        )}
        <TagsOverlay>
          {look.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsOverlay>
      </ImageWrap>

      <Body>
        <Title>{look.name[locale]}</Title>
        <Description>{look.description[locale]}</Description>
        {siteConfig.features.showPricing && startingPrice != null && startingPrice > 0 && (
          <PriceFrom>from €{startingPrice}</PriceFrom>
        )}
        <CtaLink
          href={`/${locale}/configure/${look.id}`}
          aria-label={`${t("cta")} — ${look.name[locale]}`}
        >
          {t("cta")}
          <span aria-hidden="true">→</span>
        </CtaLink>
      </Body>
    </Card>
  );
}
