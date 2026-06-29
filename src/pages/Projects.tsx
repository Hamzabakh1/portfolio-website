import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Database, GitBranch, ShieldCheck } from "lucide-react";
import { Section } from "@/components/Section";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/providers/language";
import { ArchitectureFlow, ProjectCard } from "@/pages/SharedViews";
import { api } from "@/lib/api";
import type { Project } from "@shared/schema";
import { useEffect } from "react";

export function ProjectsPage() {
  const { data, loading } = useContent();
  const { t } = useLanguage();
  const categories = useMemo(() => [t.all, ...Array.from(new Set((data?.projects ?? []).map((p) => p.category)))], [data?.projects, t.all]);
  const [active, setActive] = useState(t.all);
  const projects = active === t.all ? data?.projects ?? [] : (data?.projects ?? []).filter((p) => p.category === active);
  return (
    <Section eyebrow="Portfolio" title="Projects built around pipelines, dashboards, automation, and decisions.">
      <div className="mb-6 flex flex-wrap gap-2">{categories.map((category) => <button className={`rounded-md border px-3 py-2 text-sm ${active === category ? "border-emerald bg-emerald text-ink" : "border-white/12"}`} onClick={() => setActive(category)} key={category}>{category}</button>)}</div>
      {loading ? <div className="h-48 animate-pulse rounded-lg bg-white/5" /> : <div className="grid gap-5 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>}
    </Section>
  );
}

export function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => { api<Project>(`/api/projects/${slug}`).then(setProject).catch(() => setProject(null)); }, [slug]);
  if (!project) return <Section title="Loading case study..."><div className="h-80 animate-pulse rounded-lg bg-white/5" /></Section>;
  return (
    <>
      <section className="border-b border-white/10 bg-white/[.025]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link to="/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"><ArrowLeft size={16} />Projects</Link>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald">{project.category}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">{project.fullDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-1 text-xs">{tech}</span>)}</div>
        </div>
      </section>
      <Section eyebrow="Context" title="Business context, challenge, and objectives.">
        <div className="grid gap-5 md:grid-cols-3">{[
          ["Challenge", project.challenge],
          ["Technical Implementation", project.solution],
          ["Results and Outcomes", project.results]
        ].map(([title, body]) => <div key={title} className="glass rounded-lg p-5"><h3 className="font-bold">{title}</h3><p className="mt-3 text-slate-300">{body}</p></div>)}</div>
      </Section>
      <Section eyebrow="Data Flow" title="Architecture and quality approach."><ArchitectureFlow /></Section>
      <Section eyebrow="Engineering Decisions" title="Security, validation, and future improvements.">
        <div className="grid gap-5 md:grid-cols-3">{[
          [Database, "Data model overview", project.architecture],
          [ShieldCheck, "Quality and validation", "Schema checks, duplicate controls, freshness checks, KPI reconciliation, and manual review queues where needed."],
          [GitBranch, "Future improvements", "Add lineage views, automated anomaly detection, richer observability, and production dashboard screenshots when approved."]
        ].map(([Icon, title, body]) => {
          const I = Icon as typeof Database;
          return <div key={String(title)} className="glass rounded-lg p-5"><I className="mb-4 text-cyan" /><h3 className="font-bold">{String(title)}</h3><p className="mt-3 text-slate-300">{String(body)}</p></div>;
        })}</div>
      </Section>
      <Section eyebrow="Next" title="Interested in a similar system?">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-emerald px-5 py-3 font-semibold text-ink">Contact Hamza<CheckCircle2 size={17} /></Link>
      </Section>
    </>
  );
}
