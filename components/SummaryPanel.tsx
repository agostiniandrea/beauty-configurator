"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Category, Option, Selection } from "@/lib/types";

type Props = {
  categories: Category[];
  options: Option[];
  selection: Selection;
};

export default function SummaryPanel({ categories, options, selection }: Props) {
  const locale = useLocale();
  const t = useTranslations("configurator");

  const total = Object.values(selection).reduce((sum, optId) => {
    const opt = options.find((o) => o.id === optId);
    return sum + (opt?.price ?? 0);
  }, 0);

  return (
    <aside className="rounded-2xl border border-stone-200 bg-white p-5 flex flex-col gap-4">
      <h3 className="font-semibold text-stone-800">{t("summary")}</h3>
      <ul className="flex flex-col gap-2">
        {categories.map((cat) => {
          const selectedId = selection[cat.id];
          const selectedOpt = options.find((o) => o.id === selectedId);
          return (
            <li key={cat.id} className="flex items-start justify-between gap-2 text-sm">
              <span className="text-stone-500 shrink-0">
                {cat.name[locale as "en" | "it"]}
              </span>
              <span className="text-stone-800 text-right font-medium">
                {selectedOpt
                  ? selectedOpt.name[locale as "en" | "it"]
                  : <span className="text-stone-300">—</span>}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-stone-100 pt-3 flex justify-between text-sm font-semibold text-stone-800">
        <span>{t("totalLabel")}</span>
        <span>{total === 0 ? t("included") : `€${total}`}</span>
      </div>
    </aside>
  );
}
