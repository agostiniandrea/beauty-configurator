"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import CategoryNav from "@/components/CategoryNav";
import OptionGrid from "@/components/OptionGrid";
import SummaryPanel from "@/components/SummaryPanel";
import type { Look, Category, Option, Selection } from "@/lib/types";

type Props = {
  look: Look;
  categories: Category[];
  optionsByCategory: Record<string, Option[]>;
};

export default function ConfiguratorClient({
  look,
  categories,
  optionsByCategory,
}: Props) {
  const locale = useLocale();
  const t = useTranslations("configurator");

  const [activeCategoryId, setActiveCategoryId] = useState(
    categories[0]?.id ?? ""
  );
  const [selection, setSelection] = useState<Selection>({});

  const allOptions = Object.values(optionsByCategory).flat();
  const activeOptions = optionsByCategory[activeCategoryId] ?? [];

  function handleSelect(optionId: string) {
    setSelection((prev) => ({ ...prev, [activeCategoryId]: optionId }));
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-[220px_1fr_240px] gap-8">
      <aside className="lg:sticky lg:top-24 self-start">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-3 font-medium">
          {look.name[locale as "en" | "it"]}
        </p>
        <CategoryNav
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelect={setActiveCategoryId}
        />
      </aside>

      <section>
        <h2 className="text-lg font-semibold text-stone-800 mb-5">
          {categories.find((c) => c.id === activeCategoryId)?.name[
            locale as "en" | "it"
          ] ?? ""}
        </h2>
        <OptionGrid
          options={activeOptions}
          selectedOptionId={selection[activeCategoryId]}
          onSelect={handleSelect}
        />
      </section>

      <aside className="lg:sticky lg:top-24 self-start">
        <SummaryPanel
          categories={categories}
          options={allOptions}
          selection={selection}
        />
      </aside>
    </div>
  );
}
