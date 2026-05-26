"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import ImagePlaceholder from "./ImagePlaceholder";
import type { Option } from "@/lib/types";
import type { Locale } from "@/site.config";

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1280px) { grid-template-columns: repeat(3, 1fr); }
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
  border-radius: 24px;
  border: 2px solid ${({ $selected }) => $selected ? "var(--color-brand-rose)" : "var(--color-border)"};
  padding: 20px;
  background: ${({ $selected }) => $selected ? "color-mix(in srgb, var(--color-brand-rose) 5%, var(--color-surface))" : "var(--color-surface)"};
  box-shadow: ${({ $selected }) => $selected ? "0 0 0 3px color-mix(in srgb, var(--color-brand-rose) 15%, transparent)" : "none"};
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  cursor: pointer;

  ${({ $selected }) =>
    !$selected &&
    css`
      &:hover {
        border-color: var(--color-brand-rose);
        box-shadow: 0 1px 4px color-mix(in srgb, var(--color-brand-rose) 8%, transparent);
      }
    `}
`;

const ImageSlot = styled.div`
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
`;


const OptionName = styled.p<{ $selected: boolean }>`
  font-family: var(--font-heading);
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 4px;
  transition: color 0.2s;
  color: ${({ $selected }) => $selected ? "var(--color-brand-rose)" : "var(--color-text-primary)"};
`;

const OptionDescription = styled.p`
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex: 1;
`;

const PriceTag = styled.p`
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 8px;
`;

type Props = {
  options: Option[];
  selectedOptionId?: string;
  onSelect: (id: string) => void;
};

export default function OptionGrid({ options, selectedOptionId, onSelect }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("configurator");

  if (options.length === 0) {
    return <p style={{ fontSize: 14, color: "var(--color-text-muted)" }}>{t("noOptions")}</p>;
  }

  return (
    <Grid role="listbox">
      {options.map((opt) => {
        const isSelected = opt.id === selectedOptionId;
        return (
          <Item key={opt.id} role="option" aria-selected={isSelected}>
            <OptionButton
              onClick={() => onSelect(opt.id)}
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <ImagePlaceholder colorSeed={opt.name[locale]} size="md" />
                )}
              </ImageSlot>
              <OptionName $selected={isSelected}>{opt.name[locale]}</OptionName>
              <OptionDescription>{opt.description[locale]}</OptionDescription>
              {opt.price > 0 && <PriceTag>+€{opt.price}</PriceTag>}
            </OptionButton>
          </Item>
        );
      })}
    </Grid>
  );
}
