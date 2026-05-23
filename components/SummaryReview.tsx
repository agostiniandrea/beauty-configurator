import type { Look, Category, Option, Selection } from "@/lib/types";
import type { Locale } from "@/site.config";
import siteConfig from "@/site.config";

type Props = {
  look: Look;
  categories: Category[];
  allOptions: Option[];
  selection: Selection;
  locale: Locale;
};

export default function SummaryReview({
  categories,
  allOptions,
  selection,
  locale,
}: Props) {
  const total = allOptions.reduce((sum, opt) => {
    if (Object.values(selection).includes(opt.id)) return sum + opt.price;
    return sum;
  }, 0);

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <ul className="divide-y divide-[var(--color-border)]">
        {categories.map((cat) => {
          const selectedOpt = allOptions.find((o) => o.id === selection[cat.id]);
          return (
            <li key={cat.id} className="flex items-start gap-6 px-6 py-5">
              <div className="w-32 shrink-0">
                <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
                  {cat.name[locale]}
                </p>
              </div>
              <div className="flex-1">
                {selectedOpt ? (
                  <>
                    <p className="font-[family-name:var(--font-heading)] text-lg text-[var(--color-text-primary)] leading-tight">
                      {selectedOpt.name[locale]}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {selectedOpt.description[locale]}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)] italic">—</p>
                )}
              </div>
              {siteConfig.features.showPricing && selectedOpt && (
                <div className="shrink-0 text-sm font-medium text-[var(--color-text-secondary)]">
                  {selectedOpt.price === 0 ? "—" : `+€${selectedOpt.price}`}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {siteConfig.features.showPricing && (
        <div className="flex items-baseline justify-between px-6 py-5 bg-[var(--color-surface-alt)] border-t border-[var(--color-border)]">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">Totale</p>
          <p className="font-[family-name:var(--font-heading)] text-3xl text-[var(--color-text-primary)]">
            {total === 0 ? "Incluso" : `€${total}`}
          </p>
        </div>
      )}
    </div>
  );
}
