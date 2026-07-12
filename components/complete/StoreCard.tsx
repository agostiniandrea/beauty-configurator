"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";
import { mq } from "@/lib/breakpoints";

const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);

  ${mq.sm} {
    flex-direction: row;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  background: transparent;
  cursor: pointer;
  transition:
    border-color var(--transition-base),
    color var(--transition-base);
  &:hover {
    border-color: var(--color-border-strong);
    color: var(--color-text-primary);
  }
`;

const CardArticle = styled.article`
  border-radius: var(--radius-xl);
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  overflow: hidden;
`;

const CardHeader = styled.header`
  background: linear-gradient(
    to right,
    color-mix(in srgb, var(--color-brand-rose-light) 40%, transparent),
    color-mix(in srgb, var(--color-brand-gold) 20%, transparent)
  );
  padding: var(--space-6) var(--space-5);
  border-bottom: 1px solid var(--color-border);

  ${mq.md} {
    padding: var(--space-8);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;

  ${mq.sm} {
    flex-wrap: nowrap;
  }
`;

const BrandLabel = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-3xl);
  color: var(--color-brand-rose);
  margin-bottom: var(--space-2);
`;

const LookTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-light);
  color: var(--color-text-primary);
`;

const OrderDate = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  margin-top: var(--space-1);
`;

const QrWrap = styled.div`
  flex-shrink: 0;
  padding: var(--space-3);
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
`;

const QrCaption = styled.p`
  font-size: var(--font-size-2xs);
  text-align: center;
  color: var(--color-text-muted);
  margin-top: var(--space-1-5);
`;

const SelectionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SelectionItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: var(--space-0-5);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }

  ${mq.md} {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-6);
    padding: var(--space-4) var(--space-8);
  }
`;

const SelectionCategory = styled.span`
  flex-shrink: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-lg);
  color: var(--color-text-muted);
  padding-top: var(--space-0-5);

  ${mq.md} {
    width: 112px;
  }
`;

const SelectionName = styled.p`
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-snug);
  color: var(--color-text-primary);
`;

const SelectionDesc = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-0-5);
`;

const CardFooter = styled.footer`
  padding: var(--space-5);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-alt);

  ${mq.md} {
    padding: var(--space-6) var(--space-8);
  }
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
`;

const StudioNote = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  max-width: 280px;
  line-height: var(--line-height-relaxed);
`;

const StudioDetail = styled.span`
  display: block;
  margin-top: var(--space-1);
  color: var(--color-text-muted);
`;

const TotalBlock = styled.div`
  text-align: right;
`;

const TotalCaption = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-0-5);
`;

const TotalAmount = styled.p`
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
  orderUrl: string;
};

export default function StoreCard({
  look,
  categories,
  allOptions,
  selection,
  locale,
  orderUrl,
}: Props) {
  const t = useTranslations("complete");
  const [copied, setCopied] = useState(false);

  const orderDate = new Date().toLocaleDateString(locale === "it" ? "it-IT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const total = allOptions.reduce((sum, opt) => {
    if (Object.values(selection).includes(opt.id)) return sum + opt.price;
    return sum;
  }, 0);

  const selectionText = categories
    .map((cat) => {
      const opt = allOptions.find((o) => o.id === selection[cat.id]);
      return `${cat.name[locale]}: ${opt?.name[locale] ?? "—"}`;
    })
    .join("\n");

  function handlePrint() {
    window.print();
  }

  function handleEmail() {
    const subject = encodeURIComponent(t("emailSubject"));
    const body = encodeURIComponent(
      t("emailBody", { selection: selectionText, total: total === 0 ? "Included" : `€${total}` }),
    );
    window.open(`mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`);
  }

  async function handleShare() {
    await navigator.clipboard.writeText(orderUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <ActionBar className="no-print">
        {siteConfig.features.enablePrint && (
          <ActionButton onClick={handlePrint}>
            <span aria-hidden="true">🖨</span> {t("printButton")}
          </ActionButton>
        )}
        {siteConfig.features.enableEmailOrder && (
          <ActionButton onClick={handleEmail}>
            <span aria-hidden="true">✉</span> {t("emailButton")}
          </ActionButton>
        )}
        {siteConfig.features.enableShare && (
          <ActionButton onClick={handleShare}>
            <span aria-hidden="true">{copied ? "✓" : "⎘"}</span>
            {copied ? t("shareCopied") : t("shareButton")}
          </ActionButton>
        )}
      </ActionBar>

      <CardArticle aria-label="Store card">
        <CardHeader>
          <HeaderRow>
            <div>
              <BrandLabel>
                {siteConfig.name}
                {siteConfig.contact.studioName && ` — ${siteConfig.contact.studioName}`}
              </BrandLabel>
              <LookTitle>{look.name[locale]}</LookTitle>
              <OrderDate>
                {t("orderDate")}: {orderDate}
              </OrderDate>
            </div>
            <QrWrap>
              <QRCodeSVG
                value={orderUrl}
                size={96}
                bgColor="white"
                fgColor="#2D1F1A"
                level="M"
                aria-label={t("qrLabel")}
              />
              <QrCaption aria-hidden="true">{t("qrCaption")}</QrCaption>
            </QrWrap>
          </HeaderRow>
        </CardHeader>

        <SelectionList aria-label={t("selectionLabel")}>
          {categories.map((cat) => {
            const selectedOpt = allOptions.find((o) => o.id === selection[cat.id]);
            return (
              <SelectionItem key={cat.id}>
                <SelectionCategory>{cat.name[locale]}</SelectionCategory>
                <div>
                  <SelectionName>{selectedOpt?.name[locale] ?? "—"}</SelectionName>
                  {selectedOpt && <SelectionDesc>{selectedOpt.description[locale]}</SelectionDesc>}
                </div>
              </SelectionItem>
            );
          })}
        </SelectionList>

        <CardFooter>
          <FooterRow>
            <StudioNote>
              {t("studioNote")}
              {siteConfig.contact.studioAddress && (
                <StudioDetail>{siteConfig.contact.studioAddress}</StudioDetail>
              )}
              {siteConfig.contact.studioPhone && (
                <StudioDetail>{siteConfig.contact.studioPhone}</StudioDetail>
              )}
            </StudioNote>
            {siteConfig.features.showPricing && (
              <TotalBlock>
                <TotalCaption>{t("totalCaption")}</TotalCaption>
                <TotalAmount>{total === 0 ? t("includedLabel") : `€${total}`}</TotalAmount>
              </TotalBlock>
            )}
          </FooterRow>
        </CardFooter>
      </CardArticle>
    </div>
  );
}
