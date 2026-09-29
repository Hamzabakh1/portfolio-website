import { Section } from "@/components/Section";
import { linkedinProfile } from "@/data/linkedinProfile";
import { useLanguage } from "@/providers/language";
import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  FileBadge,
  FileCheck2,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  MessageSquareQuote,
  Network,
  ScanLine,
  Server,
  ShieldCheck,
  Star,
  Workflow,
  Wrench,
} from "lucide-react";

const experienceIcons = {
  finance: BarChart3,
  platform: Network,
  agriculture: Database,
  science: Code2,
  software: BriefcaseBusiness,
};

const projectIcons = {
  quality: ShieldCheck,
  platform: Network,
  agriculture: BarChart3,
  ocr: ScanLine,
  software: Code2,
  observability: Server,
  finance: BarChart3,
};

const skillIcons = {
  database: Database,
  pipeline: Workflow,
  gauge: BarChart3,
  chart: BarChart3,
  finance: BarChart3,
  model: Network,
  code: Code2,
  warehouse: Database,
  workflow: Workflow,
  dashboard: BarChart3,
  monitor: ShieldCheck,
  tool: Wrench,
  scan: ScanLine,
  sheet: FileText,
  report: FileCheck2,
};

export function ExperiencePage() {
  const { t, lang } = useLanguage();
  const ui = lang === "fr";

  return <>
    <Section eyebrow={t.ui.linkedinProfile} title={ui ? "Expérience, preuves et écosystème" : "Experience, proof and ecosystem"}>
      <div className="profile-signal-grid">
        <div className="glass rounded-lg p-5">
          <p className="font-mono text-xs uppercase tracking-[.16em] text-emerald">{t.ui.headline}</p>
          <p className="mt-3 text-lg font-semibold">{linkedinProfile.headline}</p>
          <p className="mt-2 text-sm text-slate-400">{linkedinProfile.location} · {linkedinProfile.followers} followers · {linkedinProfile.connections} connections</p>
        </div>
        <div className="glass rounded-lg p-5">
          <p className="font-mono text-xs uppercase tracking-[.16em] text-emerald">{t.ui.openTo}</p>
          <p className="mt-3 text-lg font-semibold">{linkedinProfile.openTo}</p>
          <a className="mt-3 inline-flex items-center gap-2 text-sm text-cyan" href={linkedinProfile.profileUrl} target="_blank" rel="noreferrer"><Linkedin size={16} /> {t.ui.viewSource} <ExternalLink size={13} /></a>
        </div>
      </div>
    </Section>

    <Section eyebrow={ui ? "Parcours LinkedIn" : "LinkedIn experience"} title={ui ? "Des responsabilités réelles, avec leur stack" : "Real responsibilities, with the stack behind them"}>
      <div className="grid gap-5 lg:grid-cols-2">
        {linkedinProfile.experiences.map((experience) => {
          const Icon = experienceIcons[experience.icon];
          return <article className="glass rounded-lg p-6" key={experience.id}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan"><Icon size={20} /></div>
                <div><p className="text-xs font-mono uppercase tracking-[.14em] text-emerald">{experience.company}</p><h3 className="mt-1 text-xl font-semibold">{experience.role}</h3></div>
              </div>
              <a className="text-slate-500 hover:text-cyan" href={experience.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${experience.role} LinkedIn`}><Linkedin size={17} /></a>
            </div>
            <p className="mt-4 text-sm text-slate-400">{experience.period} · {experience.location} · {experience.mode} · {experience.employment}</p>
            <p className="mt-4 leading-7 text-slate-300">{experience.summary}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">{experience.bullets.map((bullet) => <li className="flex gap-2" key={bullet}><CheckCircle2 className="mt-1 flex-none text-emerald" size={15} /> <span>{bullet}</span></li>)}</ul>
            <div className="mt-5 flex flex-wrap gap-2">{experience.technologies.map((technology) => <span className="rounded-full border border-white/10 bg-white/[.04] px-2.5 py-1 text-xs text-slate-300" key={technology}>{technology}</span>)}</div>
            <a className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-cyan hover:text-white" href={experience.companyUrl} target="_blank" rel="noreferrer">{ui ? "Voir l’entreprise" : "View company"} <ExternalLink size={13} /></a>
          </article>;
        })}
      </div>
    </Section>

    <Section eyebrow={ui ? "Outils & compétences" : "Tools & skills"} title={ui ? "Une matrice basée sur des preuves" : "A matrix backed by evidence"}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {linkedinProfile.skills.map((skill) => {
          const Icon = skillIcons[skill.icon];
          return <div className="glass rounded-lg p-4" key={skill.name}><div className="flex items-start gap-3"><div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-emerald/10 text-emerald"><Icon size={17} /></div><div><h3 className="font-semibold">{skill.name}</h3><p className="mt-1 text-xs uppercase tracking-[.12em] text-cyan">{skill.category}</p></div></div><p className="mt-3 text-sm leading-6 text-slate-400">{skill.evidence}</p></div>;
        })}
      </div>
    </Section>

    <Section eyebrow={t.ui.education} title={t.ui.educationFoundation}>
      <div className="glass flex items-start gap-4 rounded-lg p-6"><div className="grid h-12 w-12 flex-none place-items-center rounded-full border border-emerald/30 bg-emerald/10 text-emerald"><GraduationCap /></div><div><h3 className="text-2xl font-bold">{linkedinProfile.education}</h3><p className="mt-2 text-slate-300">{linkedinProfile.degree}</p><p className="mt-1 text-sm text-slate-500">{linkedinProfile.educationDates}</p></div></div>
    </Section>

    <Section eyebrow={t.ui.certifications} title={ui ? "Certifications vérifiables" : "Verifiable certifications"}>
      <div className="grid gap-3 md:grid-cols-2">
        {linkedinProfile.certifications.map((cert) => <article className="glass rounded-lg p-5" key={cert.name}><div className="flex items-start gap-3"><FileBadge className="mt-1 flex-none text-emerald" size={19} /><div className="min-w-0"><h3 className="font-semibold leading-6">{cert.name}</h3><p className="mt-1 text-sm text-slate-400">{cert.issuer} · {cert.issued}</p>{cert.credentialId && <p className="mt-2 font-mono text-xs text-slate-500">ID {cert.credentialId}</p>}<div className="mt-3 flex flex-wrap gap-2">{cert.skills.map((skill) => <span className="rounded-full border border-emerald/20 bg-emerald/5 px-2 py-1 text-xs text-emerald" key={skill}>{skill}</span>)}</div><a className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-cyan hover:text-white" href={cert.credentialUrl} target="_blank" rel="noreferrer">{ui ? "Vérifier le certificat" : "Verify credential"} <ExternalLink size={13} /></a></div></div></article>)}
      </div>
    </Section>

    <Section eyebrow={t.ui.linkedInProjects} title={ui ? "Projets reliés à l’expérience" : "Projects connected to the experience"}>
      <div className="grid gap-5 lg:grid-cols-2">
        {linkedinProfile.projects.map((project) => { const Icon = projectIcons[project.icon]; return <article className="glass rounded-lg p-5" key={`${project.name}-${project.period}`}><div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-cyan/10 text-cyan"><Icon size={18} /></div><div><h3 className="font-semibold leading-6">{project.name}</h3>{project.associatedWith && <p className="mt-1 text-xs uppercase tracking-[.12em] text-emerald">{project.associatedWith}</p>}</div></div><a className="text-slate-500 hover:text-cyan" href={project.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} LinkedIn`}><Linkedin size={16} /></a></div>{project.period && <p className="mt-3 text-sm text-slate-500">{project.period}</p>}<p className="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p><div className="mt-4 flex flex-wrap gap-2">{project.stack.map((technology) => <span className="rounded-full border border-white/10 bg-white/[.04] px-2.5 py-1 text-xs text-slate-300" key={technology}>{technology}</span>)}</div><p className="mt-4 text-sm leading-6 text-slate-400"><span className="text-emerald">Impact · </span>{project.impact}</p><div className="mt-5 flex flex-wrap gap-4 text-xs uppercase tracking-[.12em]"><a className="inline-flex items-center gap-2 text-cyan hover:text-white" href={project.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn <ExternalLink size={12} /></a>{project.githubUrl && <a className="inline-flex items-center gap-2 text-cyan hover:text-white" href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={14} /> GitHub <ExternalLink size={12} /></a>}</div></article>; })}
      </div>
    </Section>

    <Section eyebrow={ui ? "Recommandation" : "Recommendation"} title={ui ? "Une preuve humaine du mode de travail" : "A human proof point"}>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
        {linkedinProfile.recommendations.map((recommendation) => <article className="glass rounded-lg p-6" key={recommendation.author}><MessageSquareQuote className="text-emerald" size={24} /><blockquote className="mt-4 text-lg leading-8 text-slate-200">“{recommendation.text}”</blockquote><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><div><p className="font-semibold">{recommendation.author}</p><p className="text-sm text-slate-400">{recommendation.role} · {recommendation.relationship} · {recommendation.date}</p></div><a className="inline-flex items-center gap-2 text-sm text-cyan hover:text-white" href={recommendation.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ExternalLink size={13} /></a></div></article>)}
        <div className="glass rounded-lg p-6"><Star className="text-amber-300" size={23} /><p className="mt-4 text-sm leading-7 text-slate-300">{ui ? "Les liens de source ouvrent directement LinkedIn, GitHub ou le certificat d’origine afin que chaque élément puisse être vérifié." : "Source links open LinkedIn, GitHub or the issuing credential so every claim can be verified."}</p><a className="mt-5 inline-flex items-center gap-2 text-sm text-cyan hover:text-white" href={linkedinProfile.profileUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> {ui ? "Ouvrir le profil complet" : "Open full profile"} <ExternalLink size={13} /></a></div>
      </div>
    </Section>
  </>;
}
