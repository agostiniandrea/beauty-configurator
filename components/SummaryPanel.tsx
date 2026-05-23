"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

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

  return (
    <aside
      className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col gap-5"
      aria-label={t("summary")}
    >
      <div>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-light text-[var(--color-text-primary)]">
          {t("summary")}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
          {completedCount}/{categories.length} {t("stepsCompleted")}
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full bg-[var(--color-border)] overflow-hidden"
        role="progressbar"
        aria-valuenow={completedCount}
        aria-valuemin={0}
        aria-valuemax={categories.length}
        aria-label={t("progress")}
      >
        <div
          className="h-full bg-[var(--color-brand-rose)] rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / categories.length) * 100}%` }}
        />
      </div>

      <ul className="flex flex-col gap-3">
        {categories.map((cat) => {
          const selectedId = selection[cat.id];
          const selectedOpt = options.find((o) => o.id === selectedId);
          return (
            <li
              key={cat.id}
              className="flex items-start justify-between gap-3 text-sm border-b border-[var(--color-border)] last:border-0 pb-3 last:pb-0"
            >
              <span className="text-[var(--color-text-muted)] shrink-0 text-xs uppercase tracking-wider font-medium pt-0.5">
                {cat.name[locale]}
              </span>
              <span className="text-[var(--color-text-primary)] text-right font-[family-name:var(--font-heading)] text-base leading-tight">
                {selectedOpt ? (
                  selectedOpt.name[locale]
                ) : (
                  <span className="text-[var(--color-border-strong)] font-sans text-xs italic">
                    —
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {siteConfig.features.showPricing && (
        <div className="border-t-2 border-[var(--color-border-strong)] pt-4 flex justify-between items-baseline">
          <span className="text-sm text-[var(--color-text-secondary)] font-medium">{t("totalLabel")}</span>
          <span className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-text-primary)]">
            {total === 0 ? t("included") : `€${total}`}
          </span>
        </div>
      )}
    </aside>
  );
}
