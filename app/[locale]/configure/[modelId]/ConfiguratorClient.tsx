"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import CategoryNav from "@/components/CategoryNav";
import OptionGrid from "@/components/OptionGrid";
import SummaryPanel from "@/components/SummaryPanel";
import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";

type Props = {
  look: Look;
  categories: Category[];
  optionsByCategory: Record<string, Option[]>;
};

export default function ConfiguratorClient({ look, categories, optionsByCategory }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("configurator");
  const router = useRouter();
  const pathname = usePathname();

  const [currentStep, setCurrentStep] = useState(0);
  const [selection, setSelection] = useState<Selection>({});

  const activeCategory = categories[currentStep];
  const activeOptions = optionsByCategory[activeCategory?.id ?? ""] ?? [];
  const allOptions = Object.values(optionsByCategory).flat();
  const completedSteps = new Set(
    categories
      .map((cat, i) => (selection[cat.id] ? i : -1))
      .filter((i) => i >= 0)
  );

  const isLastStep = currentStep === categories.length - 1;
  const canGoNext = !!selection[activeCategory?.id ?? ""];
  const allComplete = categories.every((cat) => selection[cat.id]);

  function handleSelect(optionId: string) {
    setSelection((prev) => ({ ...prev, [activeCategory.id]: optionId }));
  }

  function handleNext() {
    if (isLastStep) {
      const params = new URLSearchParams();
      Object.entries(selection).forEach(([k, v]) => params.set(k, v));
      router.push(`${pathname}/summary?${params.toString()}`);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-widest">
            {t("stepOf", { current: currentStep + 1, total: categories.length })}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {completedSteps.size}/{categories.length} {t("stepsCompleted")}
          </p>
        </div>
        <div
          className="h-1 rounded-full bg-[var(--color-border)] overflow-hidden"
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={categories.length}
          aria-label={t("progress")}
        >
          <div
            className="h-full bg-[var(--color-brand-rose)] rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / categories.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_260px] gap-8">
        {/* Left: category navigation */}
        <aside className="lg:sticky lg:top-24 self-start">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-4 font-medium">
            {look.name[locale]}
          </p>
          <CategoryNav
            categories={categories}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onSelect={setCurrentStep}
          />
        </aside>

        {/* Center: options */}
        <section aria-labelledby="category-heading">
          <div className="mb-8">
            <h2
              id="category-heading"
              className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-light text-[var(--color-text-primary)]"
            >
              {activeCategory?.name[locale]}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{t("selectOption")}</p>
          </div>

          <OptionGrid
            options={activeOptions}
            selectedOptionId={selection[activeCategory?.id ?? ""]}
            onSelect={handleSelect}
          />

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-[var(--color-border)]">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <span aria-hidden="true">←</span>
              {t("back")}
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              title={!canGoNext ? t("selectTooltip") : undefined}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium bg-[var(--color-action-bg)] text-[var(--color-action-text)] hover:bg-[var(--color-action-bg-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {isLastStep && allComplete ? t("reviewOrder") : t("next")}
              <span aria-hidden="true">{isLastStep && allComplete ? "✓" : "→"}</span>
            </button>
          </div>
        </section>

        {/* Right: summary panel */}
        <aside className="lg:sticky lg:top-24 self-start">
          <SummaryPanel
            categories={categories}
            options={allOptions}
            selection={selection}
          />
        </aside>
      </div>
    </div>
  );
}
