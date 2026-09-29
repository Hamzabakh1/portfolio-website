import { Section } from "@/components/Section";
import { useLanguage } from "@/providers/language";
import { useSettings } from "@/hooks/useSettings";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Layers3, UserRound } from "lucide-react";

export function StaticPage({ type }: { type: "about" | "privacy" }) {
  const { t, lang } = useLanguage();
  const settings = useSettings();
  if (type === "privacy") {
    return (
      <Section eyebrow={t.privacy} title={t.privacyTitle}>
        <div className="glass max-w-3xl rounded-lg p-6 text-slate-300">
          <p>{t.privacyBody}</p>
          <p className="mt-4">{t.ui.privacyAnalytics}</p>
        </div>
      </Section>
    );
  }
  return (
    <Section eyebrow={t.nav.about} title={lang === "fr" ? t.aboutTitle : (settings?.about.title ?? t.aboutTitle)}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="glass rounded-lg p-6 text-slate-300">
          <p>{lang === "fr" ? t.aboutBody : (settings?.about.body ?? t.aboutBody)}</p>
          <p className="mt-4">{lang === "fr" ? t.ui.aboutIntersection : "His work sits at the intersection of operational data, analytics engineering, dashboards, and full-stack applications that make data easier to trust and use."}</p>
        </div>
        <div className="glass rounded-lg p-6 text-slate-300">
          <h3 className="text-xl font-bold text-white">{t.ui.values}</h3>
          <p className="mt-3">{lang === "fr" ? t.aboutValues : (settings?.about.values ?? t.aboutValues)}</p>
        </div>
      </div>
      <div className="about-path-grid">
        {[
          [UserRound, t.ui.presentation, t.ui.presentationBody, "/about"],
          [BriefcaseBusiness, t.ui.experience, t.ui.experienceBody, "/experience"],
          [Layers3, t.ui.toolsSkills, t.ui.toolsSkillsBody, "/#skills-matrix"]
        ].map(([Icon, title, body, href]) => {
          const I = Icon as typeof UserRound;
          return <Link key={String(title)} to={String(href)} className="about-path-card"><I size={22} /><span><strong>{String(title)}</strong><small>{String(body)}</small></span><ArrowRight size={17} /></Link>;
        })}
      </div>
    </Section>
  );
}
