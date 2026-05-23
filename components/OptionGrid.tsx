"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Option } from "@/lib/types";

type Props = {
  options: Option[];
  selectedOptionId: string | undefined;
  onSelect: (id: string) => void;
};

export default function OptionGrid({
  options,
  selectedOptionId,
  onSelect,
}: Props) {
  const locale = useLocale();
  const t = useTranslations("configurator");

  if (options.length === 0) {
    return (
      <p className="text-stone-400 text-sm">{t("noOptions")}</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map((opt) => {
        const isSelected = opt.id === selectedOptionId;
        return (
          <li key={opt.id}>
            <button
              onClick={() => onSelect(opt.id)}
              className={`w-full text-left rounded-2xl border p-4 transition-all ${
                isSelected
                  ? "border-stone-900 bg-stone-50 ring-1 ring-stone-900"
                  : "border-stone-200 bg-white hover:border-stone-400"
              }`}
            >
              <div className="aspect-video rounded-xl mb-3 bg-gradient-to-br from-rose-50 to-stone-100 flex items-center justify-center">
                <span className="text-stone-300 text-2xl">✦</span>
              </div>
              <p className="font-medium text-stone-800 text-sm">
                {opt.name[locale as "en" | "it"]}
              </p>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {opt.description[locale as "en" | "it"]}
              </p>
              <p className="text-xs font-medium text-stone-500 mt-2">
                {opt.price === 0 ? t("included") : `+€${opt.price}`}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
