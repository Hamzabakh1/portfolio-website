import { Download } from "lucide-react";
import { Section } from "@/components/Section";
import { useLanguage } from "@/providers/language";
import { useSettings } from "@/hooks/useSettings";

export function ResumePage() {
  const { t } = useLanguage();
  const settings = useSettings();
  return (
    <Section eyebrow="Resume" title={t.resumeTitle}>
      <div className="grid gap-5 lg:grid-cols-[.75fr_1fr]">
        <div className="glass rounded-lg p-6">
          <p className="text-slate-300">{t.resumeIntro}</p>
          <a href={settings?.profile.cvUrl ?? "/Hamza-Bakh-CV.pdf"} className="mt-6 inline-flex items-center gap-2 rounded-md bg-emerald px-5 py-3 font-semibold text-ink"><Download size={17} />Download CV</a>
        </div>
        <div className="glass rounded-lg p-6">
          <h3 className="text-2xl font-bold">Profile</h3>
          <p className="mt-3 text-slate-300">{settings?.about.body ?? t.aboutBody}</p>
          <h3 className="mt-6 text-2xl font-bold">Focus Areas</h3>
          <p className="mt-3 text-slate-300">Data Engineering, Business Intelligence, ETL/ELT, SQL, Snowflake, Power BI, Metabase, Python automation, and full-stack product delivery.</p>
        </div>
      </div>
    </Section>
  );
}
