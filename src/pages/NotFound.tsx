import { Link } from "react-router-dom";
import { useLanguage } from "@/providers/language";

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-emerald">404</p>
        <h1 className="mt-3 text-5xl font-black">{t.notFound}</h1>
        <Link to="/" className="mt-8 inline-flex rounded-md bg-emerald px-5 py-3 font-semibold text-ink">{t.backHome}</Link>
      </div>
    </section>
  );
}
