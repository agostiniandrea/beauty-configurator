"use client";

import { useLocale } from "next-intl";
import type { Category } from "@/lib/types";

type Props = {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
};

export default function CategoryNav({
  categories,
  activeCategoryId,
  onSelect,
}: Props) {
  const locale = useLocale();

  return (
    <nav className="flex flex-col gap-1">
      {categories.map((cat) => {
        const isActive = cat.id === activeCategoryId;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            {cat.name[locale as "en" | "it"]}
          </button>
        );
      })}
    </nav>
  );
}
