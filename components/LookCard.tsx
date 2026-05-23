import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Look } from "@/lib/types";
import type { Locale } from "@/site.config";

type Props = {
  look: Look;
};

export default function LookCard({ look }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");

  return (
    <article className="group flex flex-col rounded-3xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:shadow-lg hover:shadow-[var(--color-brand-rose)]/8 transition-all duration-300">
      {/* Image placeholder — replace with <Image> when assets are ready */}
      <div
        className="aspect-[3/2] bg-gradient-to-br from-[var(--color-brand-rose-light)] via-[var(--color-surface-alt)] to-[var(--color-brand-gold)]/30 flex items-center justify-center relative overflow-hidden"
        role="img"
        aria-label={`${look.name[locale]} — preview`}
      >
        <span className="text-[var(--color-brand-rose)]/40 text-7xl font-[family-name:var(--font-heading)] italic select-none">
          ✦
        </span>
        {/* Tags overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {look.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--color-surface)]/80 backdrop-blur-sm text-[var(--color-text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-6 flex-1">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-light text-[var(--color-text-primary)] leading-tight">
          {look.name[locale]}
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] flex-1 leading-relaxed">
          {look.description[locale]}
        </p>
        <Link
          href={`/${locale}/configure/${look.id}`}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-action-bg)] text-[var(--color-action-text)] text-sm font-medium px-5 py-3 hover:bg-[var(--color-action-bg-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)]"
          aria-label={`${t("cta")} — ${look.name[locale]}`}
        >
          {t("cta")}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
