"use client";

import Image from "next/image";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import type { Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

const Panel = styled.aside`
  border-radius: 24px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PanelHeader = styled.div``;

const PanelTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 300;
  color: var(--color-text-primary);
`;

const PanelSubtitle = styled.p`
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const PreviewCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PreviewImage = styled.div`
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: var(--color-surface-alt);
`;

const PreviewEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewEmptyGlyph = styled.span`
  color: var(--color-border-strong);
  font-size: 20px;
  font-family: var(--font-heading);
  font-style: italic;
`;

const PreviewLabel = styled.p`
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProgressBar = styled.div`
  height: 4px;
  border-radius: 99px;
  background: var(--color-border);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  border-radius: 99px;
  background: var(--color-brand-rose);
  width: ${({ $pct }) => $pct}%;
  transition: width 0.5s ease;
`;

const SelectionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SelectionItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 12px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const CategoryLabel = styled.span`
  color: var(--color-text-muted);
  flex-shrink: 0;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
  padding-top: 2px;
`;

const OptionLabel = styled.span`
  color: var(--color-text-primary);
  text-align: right;
  font-family: var(--font-heading);
  font-size: 16px;
  line-height: 1.2;
`;

const EmptyDash = styled.span`
  color: var(--color-border-strong);
  font-size: 11px;
  font-style: italic;
  font-family: sans-serif;
`;

const TotalRow = styled.div`
  border-top: 2px solid var(--color-border-strong);
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TotalLabel = styled.span`
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
`;

const TotalValue = styled.span`
  font-family: var(--font-heading);
  font-size: 24px;
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
                  <PreviewEmpty>
                    <PreviewEmptyGlyph>○</PreviewEmptyGlyph>
                  </PreviewEmpty>
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
