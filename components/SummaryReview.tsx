"use client";

import styled from "styled-components";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

const ReviewCard = styled.div`
  border-radius: 24px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  overflow: hidden;
`;

const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  divide-color: var(--color-border);
`;

const ReviewItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);

  &:last-child { border-bottom: none; }
`;

const CategoryCol = styled.div`
  width: 128px;
  flex-shrink: 0;
`;

const CategoryLabel = styled.p`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
`;

const OptionCol = styled.div`
  flex: 1;
`;

const OptionName = styled.p`
  font-family: var(--font-heading);
  font-size: 18px;
  color: var(--color-text-primary);
  line-height: 1.2;
`;

const OptionDesc = styled.p`
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
`;

const EmptyOption = styled.p`
  font-size: 14px;
  color: var(--color-text-muted);
  font-style: italic;
`;

const PriceCol = styled.div`
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const Footer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 20px 24px;
  background: var(--color-surface-alt);
  border-top: 1px solid var(--color-border);
`;

const FooterLabel = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const FooterTotal = styled.p`
  font-family: var(--font-heading);
  font-size: 30px;
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
                <PriceCol>{selectedOpt.price === 0 ? "—" : `+€${selectedOpt.price}`}</PriceCol>
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
