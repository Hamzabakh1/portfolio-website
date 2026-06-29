import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, Database, FileText, GitBranch, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article, Experience, Project, Skill } from "@shared/schema";
import { useLanguage } from "@/providers/language";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <Link to={`/projects/${project.slug}`} className="glass group block rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald/40">
      <div className="mb-5 h-32 rounded-md border border-white/10 bg-gradient-to-br from-emerald/10 via-cyan/10 to-amber/10 p-4">
        <div className="flex h-full items-center justify-between">
          {[Database, GitBranch, BarChart3].map((Icon, i) => <div key={i} className="grid h-14 w-14 place-items-center rounded-md border border-white/12 bg-ink/80"><Icon className="text-emerald" /></div>)}
        </div>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">{project.category}</p>
      <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{project.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-1 text-xs text-slate-300">{tech}</span>)}</div>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald">{t.caseStudy}<ArrowRight size={16} className="transition group-hover:translate-x-1" /></div>
    </Link>
  );
}

export function InsightCard({ article }: { article: Article }) {
  const { t } = useLanguage();
  return (
    <Link to={`/insights/${article.slug}`} className="glass block rounded-lg p-5 transition hover:-translate-y-1">
      <div className="mb-4 grid h-24 place-items-center rounded-md border border-white/10 bg-white/[.03]"><FileText className="text-cyan" /></div>
      <p className="font-mono text-xs uppercase text-emerald">{article.category} · {article.readTime}</p>
      <h3 className="mt-2 font-bold text-white">{article.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{article.excerpt}</p>
      <p className="mt-4 text-sm font-semibold text-emerald">{t.readArticle}</p>
    </Link>
  );
}

export function SkillsMatrix({ skills }: { skills: Skill[] }) {
  const { t } = useLanguage();
  const categories = useMemo(() => [t.all, ...Array.from(new Set(skills.map((skill) => skill.category)))], [skills, t.all]);
  const [active, setActive] = useState(t.all);
  const visible = active === t.all ? skills : skills.filter((skill) => skill.category === active);
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">{categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`rounded-md border px-3 py-2 text-sm ${active === category ? "border-emerald bg-emerald text-ink" : "border-white/12 text-slate-300 hover:bg-white/8"}`}>{category}</button>)}</div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{visible.map((skill) => (
        <div key={skill.id} className="rounded-lg border border-white/10 bg-white/[.035] p-4">
          <div className="mb-3 flex items-center justify-between"><span className="font-semibold">{skill.name}</span><span className="font-mono text-xs text-slate-400">{skill.level}%</span></div>
          <div className="h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-emerald to-cyan" style={{ width: `${skill.level}%` }} /></div>
        </div>
      ))}</div>
    </>
  );
}

export function Timeline({ experiences }: { experiences: Experience[] }) {
  return <div className="relative border-l border-white/12 pl-6">{experiences.map((item) => (
    <div key={item.id} className="mb-8">
      <span className="absolute -left-2 mt-1 h-4 w-4 rounded-full border border-emerald bg-ink" />
      <p className="font-mono text-xs uppercase text-cyan">{item.startDate} - {item.endDate ?? "Present"} · {item.location}</p>
      <h3 className="mt-2 text-xl font-bold">{item.company} — {item.role}</h3>
      <p className="mt-2 text-slate-300">{item.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">{item.technologies.map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-1 text-xs">{tech}</span>)}</div>
    </div>
  ))}</div>;
}

export function ArchitectureFlow() {
  const stages = ["Source Systems", "SQL Server / ERP / Excel / IoT", "Extraction & Validation", "ETL / ELT Orchestration", "Snowflake Data Warehouse", "dbt Transformations", "Semantic Models", "BI Dashboards", "Business Decisions"];
  const [active, setActive] = useState(stages[0]);
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <div className="grid gap-3 md:grid-cols-3">{stages.map((stage, index) => (
        <button key={stage} onClick={() => setActive(stage)} className={`rounded-lg border p-4 text-left transition hover:-translate-y-1 ${active === stage ? "border-emerald bg-emerald/10" : "border-white/10 bg-white/[.03]"}`}>
          <p className="font-mono text-xs text-slate-500">0{index + 1}</p>
          <p className="mt-2 font-semibold">{stage}</p>
        </button>
      ))}</div>
      <div className="glass rounded-lg p-6">
        <ShieldCheck className="mb-4 text-emerald" />
        <h3 className="text-2xl font-bold">{active}</h3>
        <p className="mt-4 text-slate-300">Purpose: convert messy operational inputs into trusted, modeled, decision-ready data.</p>
        <p className="mt-3 text-slate-300">Validation: schema checks, freshness checks, duplicate detection, referential integrity, and KPI reconciliation.</p>
        <p className="mt-3 text-slate-300">Outputs: warehouse tables, semantic models, dashboards, alerts, and documentation.</p>
      </div>
    </div>
  );
}
