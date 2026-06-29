import { Section } from "@/components/Section";
import { useLanguage } from "@/providers/language";
import { useSettings } from "@/hooks/useSettings";

export function StaticPage({ type }: { type: "about" | "privacy" }) {
  const { t } = useLanguage();
  const settings = useSettings();
  if (type === "privacy") {
    return (
      <Section eyebrow={t.privacy} title={t.privacyTitle}>
        <div className="glass max-w-3xl rounded-lg p-6 text-slate-300">
          <p>{t.privacyBody}</p>
          <p className="mt-4">The site may store basic route analytics when the database is configured. No client-side secrets are exposed. Email notifications are sent only when the owner configures an email provider.</p>
        </div>
      </Section>
    );
  }
  return (
    <Section eyebrow={t.nav.about} title={settings?.about.title ?? t.aboutTitle}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="glass rounded-lg p-6 text-slate-300">
          <p>{settings?.about.body ?? t.aboutBody}</p>
          <p className="mt-4">His work sits at the intersection of operational data, analytics engineering, dashboards, and full-stack applications that make data easier to trust and use.</p>
        </div>
        <div className="glass rounded-lg p-6 text-slate-300">
          <h3 className="text-xl font-bold text-white">Values</h3>
          <p className="mt-3">{settings?.about.values ?? t.aboutValues}</p>
        </div>
      </div>
    </Section>
  );
}
