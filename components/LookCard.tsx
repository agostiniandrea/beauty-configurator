import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Look } from "@/lib/types";

type Props = {
  look: Look;
};

export default function LookCard({ look }: Props) {
  const locale = useLocale();
  const t = useTranslations("home");

  return (
    <article className="group flex flex-col rounded-2xl border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-gradient-to-br from-rose-50 to-stone-100 flex items-center justify-center">
        <span className="text-stone-300 text-5xl">✦</span>
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {look.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-semibold text-stone-800">
          {look.name[locale as "en" | "it"]}
        </h2>
        <p className="text-sm text-stone-500 flex-1 leading-relaxed">
          {look.description[locale as "en" | "it"]}
        </p>
        <Link
          href={`/${locale}/configure/${look.id}`}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-stone-900 text-white text-sm font-medium px-4 py-2.5 hover:bg-stone-700 transition-colors"
        >
          {t("cta")}
        </Link>
      </div>
    </article>
  );
}
