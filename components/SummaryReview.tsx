"use client";

import styled from "styled-components";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";
import { mq } from "@/lib/breakpoints";

const ReviewCard = styled.div`
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  overflow: hidden;
`;

const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ReviewItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);

  &:last-child { border-bottom: none; }

  ${mq.md} {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-6);
    padding: var(--space-5) var(--space-6);
  }
`;

const CategoryCol = styled.div`
  flex-shrink: 0;

  ${mq.md} {
    width: 128px;
  }
`;

const CategoryLabel = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-xl);
  color: var(--color-text-muted);
`;

const OptionCol = styled.div`
  flex: 1;
  min-width: 0;
`;

const OptionName = styled.p`
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  line-height: var(--line-height-snug);
`;

const OptionDesc = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-0-5);
`;

const EmptyOption = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  font-style: italic;
`;

const PriceCol = styled.div`
  flex-shrink: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
`;

const Footer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: var(--space-5) var(--space-5);
  background: var(--color-surface-alt);
  border-top: 1px solid var(--color-border);

  ${mq.md} {
    padding: var(--space-5) var(--space-6);
  }
`;

const FooterLabel = styled.p`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
`;

const FooterTotal = styled.p`
  font-family: var(--font-heading);
  font-size: var(--font-size-4xl);
  color: var(--color-text-primary);
`;

type Props = {
  look: Look;
  categories: Category[];
  allOptions: Option[];
  selection: Selection;
  locale: Locale;
};

export default function SummaryReview({ categories, allOptions, selection, locale }: Props) {
  const total = allOptions.reduce((sum, opt) => {
    if (Object.values(selection).includes(opt.id)) return sum + opt.price;
    return sum;
  }, 0);

  return (
    <ReviewCard>
      <ItemList>
        {categories.map((cat) => {
          const selectedOpt = allOptions.find((o) => o.id === selection[cat.id]);
          return (
            <ReviewItem key={cat.id}>
              <CategoryCol>
                <CategoryLabel>{cat.name[locale]}</CategoryLabel>
              </CategoryCol>
              <OptionCol>
                {selectedOpt ? (
                  <>
                    <OptionName>{selectedOpt.name[locale]}</OptionName>
                    <OptionDesc>{selectedOpt.description[locale]}</OptionDesc>
                  </>
                ) : (
                  <EmptyOption>—</EmptyOption>
                )}
              </OptionCol>
              {siteConfig.features.showPricing && selectedOpt && (
                <PriceCol>€{selectedOpt.price}</PriceCol>
              )}
            </ReviewItem>
          );
        })}
      </ItemList>

      {siteConfig.features.showPricing && (
        <Footer>
          <FooterLabel>Totale</FooterLabel>
          <FooterTotal>{total === 0 ? "Incluso" : `€${total}`}</FooterTotal>
        </Footer>
      )}
    </ReviewCard>
  );
}
