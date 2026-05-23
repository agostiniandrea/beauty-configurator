"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Option } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

type Props = {
  options: Option[];
  selectedOptionId: string | undefined;
  onSelect: (id: string) => void;
};

export default function OptionGrid({ options, selectedOptionId, onSelect }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("configurator");

  if (options.length === 0) {
    return <p className="text-[var(--color-text-muted)] text-sm italic">{t("noOptions")}</p>;
  }

  return (
    <ul
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      role="listbox"
      aria-label={t("selectOption")}
    >
      {options.map((opt) => {
        const isSelected = opt.id === selectedOptionId;
        return (
          <li key={opt.id} role="option" aria-selected={isSelected}>
            <button
              onClick={() => onSelect(opt.id)}
              className={`w-full text-left rounded-3xl border-2 p-5 transition-all duration-200 group ${
                isSelected
                  ? "border-[var(--color-action-bg)] bg-[var(--color-surface-alt)] shadow-md"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand-rose)] hover:shadow-sm"
              }`}
              aria-pressed={isSelected}
            >
              {/* Option image placeholder */}
              <div
                className={`aspect-[4/3] rounded-2xl mb-4 flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-gradient-to-br from-[var(--color-brand-rose-light)] to-[var(--color-brand-gold)]/20"
                    : "bg-gradient-to-br from-[var(--color-surface-alt)] to-[var(--color-border)]"
                }`}
                aria-hidden="true"
              >
                <span
                  className={`text-3xl font-[family-name:var(--font-heading)] italic transition-colors ${
                    isSelected ? "text-[var(--color-brand-rose)]" : "text-[var(--color-border-strong)]"
                  }`}
                >
                  {isSelected ? "✦" : "○"}
                </span>
              </div>

              <p className={`font-[family-name:var(--font-heading)] text-lg leading-tight mb-1 transition-colors ${
                isSelected ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]"
              }`}>
                {opt.name[locale]}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {opt.description[locale]}
              </p>
              {siteConfig.features.showPricing && (
                <p className={`text-xs font-medium mt-3 ${
                  isSelected ? "text-[var(--color-brand-rose)]" : "text-[var(--color-text-muted)]"
                }`}>
                  {opt.price === 0 ? t("included") : `+€${opt.price}`}
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
