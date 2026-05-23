"use client";

import { useLocale } from "next-intl";
import type { Category } from "@/lib/types";
import type { Locale } from "@/site.config";

type Props = {
  categories: Category[];
  currentStep: number;
  completedSteps: Set<number>;
  onSelect: (index: number) => void;
};

export default function CategoryNav({
  categories,
  currentStep,
  completedSteps,
  onSelect,
}: Props) {
  const locale = useLocale() as Locale;

  return (
    <nav aria-label="Configuration steps">
      <ol className="flex flex-col gap-1">
        {categories.map((cat, index) => {
          const isActive = index === currentStep;
          const isDone = completedSteps.has(index);
          const isAccessible = index <= currentStep || isDone;

          return (
            <li key={cat.id}>
              <button
                onClick={() => isAccessible && onSelect(index)}
                disabled={!isAccessible}
                aria-current={isActive ? "step" : undefined}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all ${
                  isActive
                    ? "bg-[var(--color-action-bg)] text-[var(--color-action-text)]"
                    : isDone
                    ? "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)] cursor-pointer"
                    : isAccessible
                    ? "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)] cursor-pointer"
                    : "text-[var(--color-text-muted)] cursor-not-allowed opacity-50"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                    isActive
                      ? "bg-[var(--color-brand-rose)] text-white"
                      : isDone
                      ? "bg-[var(--color-brand-rose)]/20 text-[var(--color-brand-rose)]"
                      : "bg-[var(--color-border)] text-[var(--color-text-muted)]"
                  }`}
                  aria-hidden="true"
                >
                  {isDone && !isActive ? "✓" : index + 1}
                </span>
                <span className="font-medium">{cat.name[locale]}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
