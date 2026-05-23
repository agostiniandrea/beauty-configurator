import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  backLink?: boolean;
};

export default function Header({ backLink = false }: Props) {
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <header className="border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center gap-4">
        {backLink && (
          <Link
            href={`/${locale}`}
            className="text-sm text-stone-500 hover:text-stone-800 transition-colors flex items-center gap-1"
          >
            ← {t("back")}
          </Link>
        )}
        <Link href={`/${locale}`} className="font-semibold text-stone-800 tracking-tight">
          Beauty Configurator
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href={locale === "en" ? "/it" : "/en"}
            className="text-xs text-stone-400 hover:text-stone-700 transition-colors uppercase tracking-wide"
          >
            {locale === "en" ? "IT" : "EN"}
          </Link>
        </div>
      </div>
    </header>
  );
}
