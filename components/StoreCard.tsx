"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  @media (min-width: 640px) { flex-direction: row; }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  background: transparent;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  &:hover { border-color: var(--color-border-strong); color: var(--color-text-primary); }
`;

const CardArticle = styled.article`
  border-radius: 24px;
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
  padding: 32px;
  border-bottom: 1px solid var(--color-border);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
`;

const BrandLabel = styled.p`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-brand-rose);
  margin-bottom: 8px;
`;

const LookTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 30px;
  font-weight: 300;
  color: var(--color-text-primary);
`;

const OrderDate = styled.p`
  font-size: 14px;
  color: var(--color-text-muted);
  margin-top: 4px;
`;

const QrWrap = styled.div`
  flex-shrink: 0;
  padding: 12px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--color-border);
`;

const QrCaption = styled.p`
  font-size: 9px;
  text-align: center;
  color: var(--color-text-muted);
  margin-top: 6px;
`;

const SelectionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SelectionItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 16px 32px;
  border-bottom: 1px solid var(--color-border);
  &:last-child { border-bottom: none; }
`;

const SelectionCategory = styled.span`
  width: 112px;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  padding-top: 2px;
`;

const SelectionName = styled.p`
  font-family: var(--font-heading);
  font-size: 18px;
  line-height: 1.2;
  color: var(--color-text-primary);
`;

const SelectionDesc = styled.p`
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
`;

const CardFooter = styled.footer`
  padding: 24px 32px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-alt);
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const StudioNote = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
  max-width: 280px;
  line-height: 1.6;
`;

const StudioDetail = styled.span`
  display: block;
  margin-top: 4px;
  color: var(--color-text-muted);
`;

const TotalBlock = styled.div`
  text-align: right;
`;

const TotalCaption = styled.p`
  font-size: 11px;
  color: var(--color-text-muted);
  margin-bottom: 2px;
`;

const TotalAmount = styled.p`
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
  orderUrl: string;
};

export default function StoreCard({ look, categories, allOptions, selection, locale, orderUrl }: Props) {
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

  function handlePrint() { window.print(); }

  function handleEmail() {
    const subject = encodeURIComponent(t("emailSubject"));
    const body = encodeURIComponent(
      t("emailBody", { selection: selectionText, total: total === 0 ? "Included" : `€${total}` })
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
          <ActionButton onClick={handlePrint}>🖨 {t("printButton")}</ActionButton>
        )}
        {siteConfig.features.enableEmailOrder && (
          <ActionButton onClick={handleEmail}>✉ {t("emailButton")}</ActionButton>
        )}
        {siteConfig.features.enableShare && (
          <ActionButton onClick={handleShare}>
            {copied ? `✓ ${t("shareCopied")}` : `⎘ ${t("shareButton")}`}
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
              <OrderDate>{t("orderDate")}: {orderDate}</OrderDate>
            </div>
            <QrWrap>
              <QRCodeSVG value={orderUrl} size={96} bgColor="white" fgColor="#2D1F1A" level="M" aria-label="QR code per l'ordine" />
              <QrCaption>Scansiona</QrCaption>
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
              {siteConfig.contact.studioAddress && <StudioDetail>{siteConfig.contact.studioAddress}</StudioDetail>}
              {siteConfig.contact.studioPhone && <StudioDetail>{siteConfig.contact.studioPhone}</StudioDetail>}
            </StudioNote>
            {siteConfig.features.showPricing && (
              <TotalBlock>
                <TotalCaption>Totale</TotalCaption>
                <TotalAmount>{total === 0 ? "Incluso" : `€${total}`}</TotalAmount>
              </TotalBlock>
            )}
          </FooterRow>
        </CardFooter>
      </CardArticle>
    </div>
  );
}
