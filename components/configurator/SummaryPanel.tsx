"use client";

import Image from "next/image";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import type { Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

const Panel = styled.aside`
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
`;

const PanelHeader = styled.div``;

const PanelTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-light);
  color: var(--color-text-primary);
`;

const PanelSubtitle = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-0-5);
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2);
`;

const PreviewCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
`;

const PreviewImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const PreviewLabel = styled.p`
  font-size: var(--font-size-2xs);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-xl);
  color: var(--color-text-muted);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProgressBar = styled.div`
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-border);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--color-brand-rose);
  width: ${({ $pct }) => $pct}%;
  transition: width var(--transition-image) ease;
`;

const SelectionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SelectionItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  font-size: var(--font-size-base);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-3);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const CategoryLabel = styled.span`
  color: var(--color-text-muted);
  flex-shrink: 0;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-md);
  font-weight: var(--font-weight-medium);
  padding-top: var(--space-0-5);
`;

const OptionLabel = styled.span`
  color: var(--color-text-primary);
  text-align: right;
  font-family: var(--font-heading);
  font-size: var(--font-size-md);
  line-height: var(--line-height-snug);
`;

const EmptyDash = styled.span`
  color: var(--color-border-strong);
  font-size: var(--font-size-sm);
  font-style: italic;
  font-family: sans-serif;
`;

const TotalRow = styled.div`
  border-top: 2px solid var(--color-border-strong);
  padding-top: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TotalLabel = styled.span`
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
`;

const TotalValue = styled.span`
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
`;

type Props = {
  categories: Category[];
  options: Option[];
  selection: Selection;
};

export default function SummaryPanel({ categories, options, selection }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("configurator");

  const total = Object.values(selection).reduce((sum, optId) => {
    const opt = options.find((o) => o.id === optId);
    return sum + (opt?.price ?? 0);
  }, 0);

  const completedCount = Object.keys(selection).length;
  const pct = (completedCount / categories.length) * 100;

  return (
    <Panel aria-label={t("summary")}>
      <PanelHeader>
        <PanelTitle>{t("summary")}</PanelTitle>
        <PanelSubtitle>{completedCount}/{categories.length} {t("stepsCompleted")}</PanelSubtitle>
      </PanelHeader>

      <PreviewGrid>
        {categories.map((cat) => {
          const selectedOpt = options.find((o) => o.id === selection[cat.id]);
          return (
            <PreviewCell key={cat.id}>
              <PreviewImage>
                {selectedOpt?.imageUrl ? (
                  <Image
                    src={selectedOpt.imageUrl}
                    alt={selectedOpt.name[locale]}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="120px"
                  />
                ) : (
                  <ImagePlaceholder size="sm" />
                )}
              </PreviewImage>
              <PreviewLabel>
                {selectedOpt ? selectedOpt.name[locale] : cat.name[locale]}
              </PreviewLabel>
            </PreviewCell>
          );
        })}
      </PreviewGrid>

      <ProgressBar
        role="progressbar"
        aria-valuenow={completedCount}
        aria-valuemin={0}
        aria-valuemax={categories.length}
        aria-label={t("progress")}
      >
        <ProgressFill $pct={pct} />
      </ProgressBar>

      <SelectionList>
        {categories.map((cat) => {
          const selectedOpt = options.find((o) => o.id === selection[cat.id]);
          return (
            <SelectionItem key={cat.id}>
              <CategoryLabel>{cat.name[locale]}</CategoryLabel>
              <OptionLabel>
                {selectedOpt ? selectedOpt.name[locale] : <EmptyDash>—</EmptyDash>}
              </OptionLabel>
            </SelectionItem>
          );
        })}
      </SelectionList>

      {siteConfig.features.showPricing && (
        <TotalRow>
          <TotalLabel>{t("totalLabel")}</TotalLabel>
          <TotalValue>{total === 0 ? t("included") : `€${total}`}</TotalValue>
        </TotalRow>
      )}
    </Panel>
  );
}
