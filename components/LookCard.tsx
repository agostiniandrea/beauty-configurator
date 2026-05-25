"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import type { Look } from "@/lib/types";
import type { Locale } from "@/site.config";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: var(--color-border-strong);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--color-brand-rose) 8%, transparent);
  }
`;

const ImageWrap = styled.div`
  aspect-ratio: 3 / 2;
  position: relative;
  overflow: hidden;
`;

const ImageFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--color-brand-rose-light),
    var(--color-surface-alt),
    color-mix(in srgb, var(--color-brand-gold) 30%, transparent)
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FallbackGlyph = styled.span`
  color: color-mix(in srgb, var(--color-brand-rose) 40%, transparent);
  font-size: 72px;
  font-family: var(--font-heading);
  font-style: italic;
  user-select: none;
`;

const TagsOverlay = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 2px 8px;
  border-radius: 99px;
  background: color-mix(in srgb, var(--color-surface) 80%, transparent);
  backdrop-filter: blur(4px);
  color: var(--color-text-secondary);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  flex: 1;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 300;
  color: var(--color-text-primary);
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
  flex: 1;
  line-height: 1.6;
`;

const CtaLink = styled(Link)`
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 16px;
  background: var(--color-action-bg);
  color: var(--color-action-text);
  font-size: 14px;
  font-weight: 500;
  padding: 12px 20px;
  text-decoration: none;
  transition: background 0.2s;

  &:hover { background: var(--color-action-bg-hover); }
  &:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 3px; }
`;

type Props = { look: Look };

export default function LookCard({ look }: Props) {
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
          <ImageFallback>
            <FallbackGlyph aria-hidden="true">✦</FallbackGlyph>
          </ImageFallback>
        )}
        <TagsOverlay>
          {look.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </TagsOverlay>
      </ImageWrap>

      <Body>
        <Title>{look.name[locale]}</Title>
        <Description>{look.description[locale]}</Description>
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
