"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

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

  async function handleShare() {
    await navigator.clipboard.writeText(orderUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleEmail() {
    const subject = encodeURIComponent(t("emailSubject"));
    const body = encodeURIComponent(
      t("emailBody", {
        selection: selectionText,
        total: total === 0 ? "Included" : `€${total}`,
      })
    );
    window.open(`mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`);
  }

  return (
    <div>
      {/* Action buttons — hidden on print */}
      <div className="no-print flex flex-col sm:flex-row gap-3 mb-8">
        {siteConfig.features.enablePrint && (
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-all"
          >
            🖨 {t("printButton")}
          </button>
        )}
        {siteConfig.features.enableEmailOrder && (
          <button
            onClick={handleEmail}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-all"
          >
            ✉ {t("emailButton")}
          </button>
        )}
        {siteConfig.features.enableShare && (
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-all"
          >
            {copied ? `✓ ${t("shareCopied")}` : `⎘ ${t("shareButton")}`}
          </button>
        )}
      </div>

      {/* Store card — this is what gets printed */}
      <article
        className="rounded-3xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
        aria-label="Store card"
      >
        {/* Card header */}
        <header className="bg-gradient-to-r from-[var(--color-brand-rose-light)]/40 to-[var(--color-brand-gold)]/20 px-8 py-8 border-b border-[var(--color-border)]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-brand-rose)] mb-2">
                {siteConfig.name}
                {siteConfig.contact.studioName && ` — ${siteConfig.contact.studioName}`}
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-light text-[var(--color-text-primary)]">
                {look.name[locale]}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{t("orderDate")}: {orderDate}</p>
            </div>
            {/* QR code */}
            <div className="shrink-0 p-3 bg-white rounded-2xl border border-[var(--color-border)]">
              <QRCodeSVG
                value={orderUrl}
                size={96}
                bgColor="white"
                fgColor="#2D1F1A"
                level="M"
                aria-label="QR code per l'ordine"
              />
              <p className="text-[9px] text-center text-[var(--color-text-muted)] mt-1.5">Scansiona</p>
            </div>
          </div>
        </header>

        {/* Selection list */}
        <ul className="divide-y divide-[var(--color-border)]" aria-label={t("selectionLabel")}>
          {categories.map((cat) => {
            const selectedOpt = allOptions.find((o) => o.id === selection[cat.id]);
            return (
              <li key={cat.id} className="flex items-start gap-6 px-8 py-4">
                <span className="w-28 shrink-0 text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)] pt-0.5">
                  {cat.name[locale]}
                </span>
                <div className="flex-1">
                  <p className="font-[family-name:var(--font-heading)] text-lg leading-tight text-[var(--color-text-primary)]">
                    {selectedOpt?.name[locale] ?? "—"}
                  </p>
                  {selectedOpt && (
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {selectedOpt.description[locale]}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-[var(--color-border)] bg-[var(--color-surface-alt)]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed">
              {t("studioNote")}
              {siteConfig.contact.studioAddress && (
                <span className="block mt-1 text-[var(--color-text-muted)]">
                  {siteConfig.contact.studioAddress}
                </span>
              )}
              {siteConfig.contact.studioPhone && (
                <span className="block text-[var(--color-text-muted)]">
                  {siteConfig.contact.studioPhone}
                </span>
              )}
            </p>
            {siteConfig.features.showPricing && (
              <div className="text-right">
                <p className="text-xs text-[var(--color-text-muted)] mb-0.5">Totale</p>
                <p className="font-[family-name:var(--font-heading)] text-3xl text-[var(--color-text-primary)]">
                  {total === 0 ? "Incluso" : `€${total}`}
                </p>
              </div>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
}
