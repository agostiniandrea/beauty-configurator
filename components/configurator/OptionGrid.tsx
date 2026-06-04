"use client";

import { useRef, type KeyboardEvent } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import type { Option } from "@/lib/types";
import type { Locale } from "@/site.config";
import { mq } from "@/lib/breakpoints";

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-4);
  list-style: none;
  margin: 0;
  padding: 0;

  ${mq.md} { grid-template-columns: repeat(2, 1fr); }
  ${mq.xl} { grid-template-columns: repeat(3, 1fr); }
`;

const Item = styled.li`
  display: flex;
`;

const OptionButton = styled.button<{ $selected: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  border-radius: var(--radius-xl);
  border: 2px solid ${({ $selected }) => $selected ? "var(--color-brand-rose)" : "var(--color-border)"};
  padding: var(--space-5);
  background: ${({ $selected }) => $selected ? "color-mix(in srgb, var(--color-brand-rose) 5%, var(--color-surface))" : "var(--color-surface)"};
  box-shadow: ${({ $selected }) => $selected ? "var(--shadow-focus)" : "none"};
  transition: border-color var(--transition-base), background var(--transition-base), box-shadow var(--transition-base);
  cursor: pointer;

  ${({ $selected }) =>
    !$selected &&
    css`
      &:hover {
        border-color: var(--color-brand-rose);
        box-shadow: var(--shadow-hover);
      }
    `}
`;

const ImageSlot = styled.div`
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
  overflow: hidden;
  position: relative;
`;

const OptionName = styled.p<{ $selected: boolean }>`
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-snug);
  margin-bottom: var(--space-1);
  transition: color var(--transition-base);
  color: ${({ $selected }) => $selected ? "var(--color-brand-rose)" : "var(--color-text-primary)"};
`;

const OptionDescription = styled.p`
  font-size: var(--font-size-caption);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
  flex: 1;
`;

const PriceTag = styled.p`
  font-size: var(--font-size-note);
  font-weight: var(--font-weight-medium);
  color: var(--color-brand-rose);
  margin-top: var(--space-2);
`;

const EmptyMessage = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
`;

type Props = {
  options: Option[];
  selectedOptionId?: string;
  onSelect: (id: string) => void;
};

export default function OptionGrid({ options, selectedOptionId, onSelect }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("configurator");
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % options.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + options.length) % options.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = options.length - 1;
    if (next !== -1) { e.preventDefault(); buttonRefs.current[next]?.focus(); }
  }

  if (options.length === 0) {
    return <EmptyMessage>{t("noOptions")}</EmptyMessage>;
  }

  return (
    <Grid aria-label={t("selectOption")}>
      {options.map((opt, index) => {
        const isSelected = opt.id === selectedOptionId;
        return (
          <Item key={opt.id}>
            <OptionButton
              ref={(el) => { buttonRefs.current[index] = el; }}
              onClick={() => onSelect(opt.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-pressed={isSelected}
              $selected={isSelected}
            >
              <ImageSlot aria-hidden="true">
                {opt.imageUrl ? (
                  <Image
                    src={opt.imageUrl}
                    alt={opt.name[locale]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <ImagePlaceholder colorSeed={opt.name[locale]} size="md" />
                )}
              </ImageSlot>
              <OptionName $selected={isSelected}>{opt.name[locale]}</OptionName>
              <OptionDescription>{opt.description[locale]}</OptionDescription>
              {opt.price > 0 && <PriceTag>€{opt.price}</PriceTag>}
            </OptionButton>
          </Item>
        );
      })}
    </Grid>
  );
}
