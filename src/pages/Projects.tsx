import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Database, GitBranch, ShieldCheck, Target, Lightbulb, Layers3, Code2, Play, BarChart3 } from "lucide-react";
import { Section } from "@/components/Section";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/providers/language";
import { ArchitectureFlow, ProjectCard } from "@/pages/SharedViews";
import { api } from "@/lib/api";
import type { Project } from "@shared/schema";
import { useEffect } from "react";
import { getShowcaseProject } from "@/data/projectRegistry";
import { DemoShell } from "@/components/DemoShell";

export function ProjectsPage() {
  const { data, loading } = useContent();
  const { t } = useLanguage();
  const categories = useMemo(() => [t.all, ...Array.from(new Set((data?.projects ?? []).map((p) => p.category)))], [data?.projects, t.all]);
  const [active, setActive] = useState(t.all);
  useEffect(() => setActive(t.all), [t.all]);
  const projects = active === t.all ? data?.projects ?? [] : (data?.projects ?? []).filter((p) => p.category === active);
  return (
    <Section eyebrow={t.ui.projectsEyebrow} title={t.ui.projectsPageTitle}>
      <div className="mb-6 flex flex-wrap gap-2">{categories.map((category) => <button className={`rounded-md border px-3 py-2 text-sm ${active === category ? "border-emerald bg-emerald text-ink" : "border-white/12"}`} onClick={() => setActive(category)} key={category}>{category}</button>)}</div>
      {loading ? <div className="h-48 animate-pulse rounded-lg bg-white/5" /> : <div className="grid gap-5 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>}
    </Section>
  );
}

export function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { data } = useContent();
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    const staticProject = data?.projects.find((item) => item.slug === slug);
    if (staticProject) {
      setProject(staticProject);
      return;
    }
    api<Project>(`/api/projects/${slug}`).then(setProject).catch(() => setProject(null));
  }, [data?.projects, slug]);
  if (!project) return <Section title={t.ui.loadingCaseStudy}><div className="h-80 animate-pulse rounded-lg bg-white/5" /></Section>;
  const demo = getShowcaseProject(project.title.toLowerCase().includes("multi-tenant") ? "multi-tenant" : project.title.toLowerCase().includes("quality") ? "data-quality" : project.title.toLowerCase().includes("paper") ? "validation-framework" : project.title.toLowerCase().includes("finance") ? "finance-planning" : project.title.toLowerCase().includes("azure") ? "azure-real-estate" : undefined);
  return (
    <>
      <section className="border-b border-white/10 bg-white/[.025]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link to="/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"><ArrowLeft size={16} />{t.ui.allProjects}</Link>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald">{project.category}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">{project.fullDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-1 text-xs">{tech}</span>)}</div>
          {demo && <Link to={"/demos/" + demo.slug} className="mt-7 inline-flex items-center gap-2 rounded-md bg-emerald px-5 py-3 font-semibold text-ink"><ArrowRight size={17} />{t.ui.launchInteractive}</Link>}
        </div>
      </section>
      <Section eyebrow={t.ui.caseStudyStructure} title={t.ui.caseStudyFlow}>
        <div className="case-study-roadmap">
          {[
            [Target, t.ui.problem, project.challenge],
            [Lightbulb, t.ui.solution, project.solution],
            [Layers3, t.ui.architecture, project.architecture],
            [Code2, t.ui.techStack, project.technologies.join(" · ")],
            [Play, t.ui.liveDemo, demo ? t.ui.runSyntheticDemo : t.ui.readCaseStudy],
            [BarChart3, t.ui.results, project.results]
          ].map(([Icon, title, body]) => {
            const I = Icon as typeof Target;
            return <article key={String(title)} className="case-study-step"><span className="case-study-step-icon"><I size={19} /></span><p className="case-study-step-title">{String(title)}</p><p className="case-study-step-body">{String(body)}</p></article>;
          })}
        </div>
      </Section>
      <Section eyebrow={t.ui.context} title={t.ui.businessContext}>
        <div className="grid gap-5 md:grid-cols-3">{[
          [t.ui.challenge, project.challenge],
          [t.ui.technicalImplementation, project.solution],
          [t.ui.resultsOutcomes, project.results]
        ].map(([title, body]) => <div key={title} className="glass rounded-lg p-5"><h3 className="font-bold">{title}</h3><p className="mt-3 text-slate-300">{body}</p></div>)}</div>
      </Section>
      <Section eyebrow={t.ui.dataFlow} title={t.ui.architectureQuality}><ArchitectureFlow /></Section>
      {demo && <Section eyebrow={t.ui.launchInteractive} title={t.ui.inspectPipeline}><DemoShell slug={demo.slug} /></Section>}
      <Section eyebrow={t.ui.engineeringDecisions} title={t.ui.engineeringDecisionsTitle}>
        <div className="grid gap-5 md:grid-cols-3">{[
          [Database, t.ui.dataModelOverview, project.architecture],
          [ShieldCheck, t.ui.qualityValidation, t.ui.qualityValidationBody],
          [GitBranch, t.ui.futureImprovements, t.ui.futureImprovementsBody]
        ].map(([Icon, title, body]) => {
          const I = Icon as typeof Database;
          return <div key={String(title)} className="glass rounded-lg p-5"><I className="mb-4 text-cyan" /><h3 className="font-bold">{String(title)}</h3><p className="mt-3 text-slate-300">{String(body)}</p></div>;
        })}</div>
      </Section>
      <Section eyebrow={t.ui.next} title={t.ui.similarSystem}>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-emerald px-5 py-3 font-semibold text-ink">{t.ui.contactHamza}<CheckCircle2 size={17} /></Link>
      </Section>
    </>
  );
}
