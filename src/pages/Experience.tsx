import { Section } from "@/components/Section";
import { useContent } from "@/hooks/useContent";
import { Timeline } from "@/pages/SharedViews";
import { linkedinProfile } from "@/data/linkedinProfile";
import { CheckCircle2, GraduationCap, Linkedin, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/providers/language";

export function ExperiencePage() {
  const { data } = useContent();
  const { t } = useLanguage();
  return <>
    <Section eyebrow={t.ui.linkedinProfile} title={t.ui.experienceCredentials}>
      <div className="profile-signal-grid">
        <div className="glass rounded-lg p-5"><p className="font-mono text-xs uppercase tracking-[.16em] text-emerald">{t.ui.headline}</p><p className="mt-3 text-lg font-semibold">{linkedinProfile.headline}</p><p className="mt-2 text-sm text-slate-400">{linkedinProfile.location} · {linkedinProfile.followers} followers · {linkedinProfile.connections} connections</p></div>
        <div className="glass rounded-lg p-5"><p className="font-mono text-xs uppercase tracking-[.16em] text-emerald">{t.ui.openTo}</p><p className="mt-3 text-lg font-semibold">{linkedinProfile.openTo}</p><a className="mt-3 inline-flex items-center gap-2 text-sm text-cyan" href="https://www.linkedin.com/in/hamza-bakh/" target="_blank" rel="noreferrer"><Linkedin size={16} /> {t.ui.viewSource}</a></div>
      </div>
    </Section>
    <Section eyebrow={t.ui.professionalTimeline} title={t.ui.rolesContext}><Timeline experiences={data?.experiences ?? []} /></Section>
    <Section eyebrow={t.ui.education} title={t.ui.educationFoundation}>
      <div className="glass flex items-start gap-4 rounded-lg p-6"><div className="grid h-12 w-12 flex-none place-items-center rounded-full border border-emerald/30 bg-emerald/10 text-emerald"><GraduationCap /></div><div><h3 className="text-2xl font-bold">{linkedinProfile.education}</h3><p className="mt-2 text-slate-300">{linkedinProfile.degree}</p><p className="mt-1 text-sm text-slate-500">{linkedinProfile.educationDates}</p></div></div>
    </Section>
    <Section eyebrow={t.ui.certifications} title={t.ui.learningMilestones}>
      <div className="grid gap-3 md:grid-cols-2">{linkedinProfile.certifications.map((cert) => <div className="glass flex items-start gap-3 rounded-lg p-4" key={cert.name}><CheckCircle2 className="mt-1 flex-none text-emerald" size={18} /><div><h3 className="font-semibold">{cert.name}</h3><p className="mt-1 text-sm text-slate-400">{cert.issuer} · {cert.issued}</p></div></div>)}</div>
    </Section>
    <Section eyebrow={t.ui.linkedInProjects} title={t.ui.connectedProjects}>
      <div className="grid gap-3 md:grid-cols-2">{linkedinProfile.projects.map((project) => <div className="glass rounded-lg p-4" key={`${project.name}-${project.period}`}><div className="flex items-start justify-between gap-4"><h3 className="font-semibold">{project.name}</h3><ShieldCheck className="flex-none text-cyan" size={17} /></div><p className="mt-2 text-sm text-slate-400">{project.period}</p><p className="mt-3 font-mono text-xs text-emerald">{project.stack}</p></div>)}</div>
    </Section>
  </>;
}
