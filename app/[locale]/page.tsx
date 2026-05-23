import { useTranslations } from "next-intl";
import { getLooks } from "@/lib/data";
import LookCard from "@/components/LookCard";
import Header from "@/components/Header";

export default function HomePage() {
  const t = useTranslations("home");
  const looks = getLooks();

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="max-w-6xl mx-auto px-5 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-2 text-stone-500">{t("subtitle")}</p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {looks.map((look) => (
            <li key={look.id}>
              <LookCard look={look} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
