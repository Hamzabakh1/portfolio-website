import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BarChart3, Database, FileText, GitBranch, ShieldCheck, Play, House, UserRound, Layers3, Mail, FileBadge, Github, Linkedin, BookOpen, FlaskConical, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article, Experience, Project, Skill } from "@shared/schema";
import { useLanguage } from "@/providers/language";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const demoSlug = project.title.toLowerCase().includes("multi-tenant") ? "multi-tenant" : project.title.toLowerCase().includes("quality") ? "data-quality" : project.title.toLowerCase().includes("paper") ? "validation-framework" : project.title.toLowerCase().includes("finance") ? "finance-planning" : project.title.toLowerCase().includes("azure") ? "azure-real-estate" : null;
  return (
    <article className="glass group rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald/40">
      <div className="mb-5 h-32 rounded-md border border-white/10 bg-gradient-to-br from-emerald/10 via-cyan/10 to-amber/10 p-4">
        <div className="flex h-full items-center justify-between">
          {[Database, GitBranch, BarChart3].map((Icon, i) => <div key={i} className="grid h-14 w-14 place-items-center rounded-md border border-white/12 bg-ink/80"><Icon className="text-emerald" /></div>)}
        </div>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">{project.category}</p>
      <Link to={`/projects/${project.slug}`} className="mt-2 block text-xl font-bold text-white hover:text-emerald">{project.title}</Link>
      <p className="mt-3 text-sm leading-6 text-slate-300">{project.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-1 text-xs text-slate-300">{tech}</span>)}</div>
      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-semibold text-emerald">{demoSlug ? <Link to={`/demos/${demoSlug}`} className="inline-flex items-center gap-2 rounded-md bg-emerald px-3 py-2 text-ink"><Play size={14} />{t.ui.launchDemo}</Link> : null}<Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1">{t.caseStudy}<ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link></div>
    </article>
  );
}

export function InsightCard({ article }: { article: Article }) {
  const { t } = useLanguage();
  return (
    <Link to={`/articles/${article.slug}`} className="glass block rounded-lg p-5 transition hover:-translate-y-1">
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
  useEffect(() => setActive(t.all), [t.all]);
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
  const { lang } = useLanguage();
  return <div className="relative border-l border-white/12 pl-6">{experiences.map((item) => (
    <div key={item.id} className="mb-8">
      <span className="absolute -left-2 mt-1 h-4 w-4 rounded-full border border-emerald bg-ink" />
      <p className="font-mono text-xs uppercase text-cyan">{item.startDate} - {item.endDate ?? (lang === "fr" ? "Aujourd'hui" : "Present")} · {item.location}</p>
      <h3 className="mt-2 text-xl font-bold">{item.company} — {item.role}</h3>
      <p className="mt-2 text-slate-300">{item.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">{item.technologies.map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-1 text-xs">{tech}</span>)}</div>
    </div>
  ))}</div>;
}

export function ArchitectureFlow() {
  const { t, lang } = useLanguage();
  const stages = lang === "fr"
    ? ["Systèmes sources", "SQL Server / ERP / Excel / IoT", "Extraction et validation", "Orchestration ETL / ELT", "Entrepôt Snowflake", "Transformations dbt", "Modèles sémantiques", "Dashboards BI", "Décisions métier"]
    : ["Source Systems", "SQL Server / ERP / Excel / IoT", "Extraction & Validation", "ETL / ELT Orchestration", "Snowflake Data Warehouse", "dbt Transformations", "Semantic Models", "BI Dashboards", "Business Decisions"];
  const [active, setActive] = useState(stages[0]);
  useEffect(() => setActive(stages[0]), [lang]);
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
        <p className="mt-4 text-slate-300"><strong>{t.ui.purpose}:</strong> {lang === "fr" ? "transformer des entrées opérationnelles hétérogènes en données fiables, modélisées et prêtes pour la décision." : "convert messy operational inputs into trusted, modeled, decision-ready data."}</p>
        <p className="mt-3 text-slate-300"><strong>{t.ui.validation}:</strong> {lang === "fr" ? "contrôles de schéma, fraîcheur, doublons, intégrité référentielle et rapprochement des KPI." : "schema checks, freshness checks, duplicate detection, referential integrity, and KPI reconciliation."}</p>
        <p className="mt-3 text-slate-300"><strong>{t.ui.outputs}:</strong> {lang === "fr" ? "tables warehouse, modèles sémantiques, dashboards, alertes et documentation." : "warehouse tables, semantic models, dashboards, alerts, and documentation."}</p>
      </div>
    </div>
  );
}

type ArchitectureGroup = {
  title: string;
  eyebrow: string;
  href: string;
  icon: typeof House;
  tone: string;
  links: Array<{ label: string; href: string; icon: typeof House }>;
};

export function PortfolioArchitecture() {
  const { t } = useLanguage();
  const groups: ArchitectureGroup[] = [
    {
      title: t.ui.homeNode,
      eyebrow: t.ui.firstImpression,
      href: "/",
      icon: House,
      tone: "architecture-blue",
      links: [
        { label: t.ui.heroSection, href: "/#top", icon: BarChart3 },
        { label: t.ui.valueProposition, href: "/#impact", icon: ShieldCheck },
        { label: t.ui.primaryCtas, href: "/contact", icon: ArrowRight }
      ]
    },
    {
      title: t.ui.aboutNode,
      eyebrow: t.ui.contextNode,
      href: "/about",
      icon: UserRound,
      tone: "architecture-green",
      links: [
        { label: t.ui.presentation, href: "/about", icon: UserRound },
        { label: t.ui.experience, href: "/experience", icon: BriefcaseBusiness },
        { label: t.ui.toolsSkills, href: "/#skills-matrix", icon: Layers3 }
      ]
    },
    {
      title: t.ui.projectsNode,
      eyebrow: t.ui.proofOfWork,
      href: "/projects",
      icon: Layers3,
      tone: "architecture-purple",
      links: [
        { label: t.ui.featuredProjects, href: "/projects", icon: Layers3 },
        { label: t.ui.labsInProgress, href: "/demos", icon: FlaskConical },
        { label: t.ui.caseStudies, href: "/projects", icon: FileBadge }
      ]
    },
    {
      title: t.ui.articlesNode,
      eyebrow: t.ui.thinking,
      href: "/articles",
      icon: BookOpen,
      tone: "architecture-amber",
      links: [
        { label: t.ui.blogPosts, href: "/articles", icon: FileText },
        { label: t.ui.researchNotes, href: "/articles", icon: BookOpen },
        { label: t.ui.tutorials, href: "/articles", icon: FlaskConical }
      ]
    },
    {
      title: t.ui.contactEyebrow,
      eyebrow: t.ui.startConversation,
      href: "/contact",
      icon: Mail,
      tone: "architecture-pink",
      links: [
        { label: t.ui.message, href: "/contact", icon: Mail },
        { label: t.ui.collaboration, href: "/contact", icon: UserRound },
        { label: t.ui.workOpportunities, href: "/contact", icon: BriefcaseBusiness }
      ]
    },
    {
      title: t.ui.resumeNode,
      eyebrow: t.ui.credentials,
      href: "/resume",
      icon: FileBadge,
      tone: "architecture-cyan",
      links: [
        { label: t.ui.onePageCv, href: "/resume", icon: FileText },
        { label: t.ui.downloadPdf, href: "/resume", icon: ArrowRight },
        { label: t.ui.certifications, href: "/experience", icon: FileBadge }
      ]
    },
    {
      title: t.ui.profilesNode,
      eyebrow: t.ui.publicCode,
      href: "/contact",
      icon: Github,
      tone: "architecture-indigo",
      links: [
        { label: t.ui.githubProfile, href: "https://github.com/Hamzabakh1", icon: Github },
        { label: t.ui.linkedinProfileLink, href: "https://www.linkedin.com/in/hamza-bakh/", icon: Linkedin },
        { label: t.ui.sourceCode, href: "https://github.com/Hamzabakh1/portfolio-website", icon: GitBranch }
      ]
    }
  ];

  return (
    <div className="architecture-map" aria-label="Portfolio architecture map">
      <div className="architecture-map-head">
        <div>
          <p className="architecture-map-kicker">{t.ui.portfolioSystemMap}</p>
          <p className="architecture-map-note">{t.ui.portfolioSystemNote}</p>
        </div>
        <span className="architecture-map-root"><House size={17} />{t.ui.portfolioRoot}</span>
      </div>
      <div className="architecture-map-grid">
        {groups.map(({ title, eyebrow, href, icon: Icon, tone, links }) => (
          <article key={title} className={`architecture-node ${tone}`}>
            <Link to={href} className="architecture-node-main">
              <span className="architecture-node-icon"><Icon size={24} /></span>
              <span><small>{eyebrow}</small><strong>{title}</strong></span>
            </Link>
            <div className="architecture-node-links">
              {links.map(({ label, href: linkHref, icon: LinkIcon }) => {
                const external = linkHref.startsWith("http");
                const props = external ? { href: linkHref, target: "_blank", rel: "noreferrer" } : { href: linkHref };
                return external ? <a key={label} {...props} className="architecture-node-link"><LinkIcon size={15} />{label}</a> : <Link key={label} to={linkHref} className="architecture-node-link"><LinkIcon size={15} />{label}</Link>;
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
