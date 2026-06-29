import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, Layers3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { DataVisual } from "@/components/DataVisual";
import { Section } from "@/components/Section";
import { useContent } from "@/hooks/useContent";
import { useSettings } from "@/hooks/useSettings";
import { useLanguage } from "@/providers/language";
import { ProjectCard, SkillsMatrix, ArchitectureFlow, Timeline, InsightCard } from "@/pages/SharedViews";

export function HomePage() {
  const { t } = useLanguage();
  const { data } = useContent();
  const settings = useSettings();
  const projects = data?.projects.filter((p) => p.featured).slice(0, 3) ?? [];
  const articles = data?.articles.slice(0, 4) ?? [];
  const profile = settings?.profile;
  const home = settings?.home;
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-surface opacity-30" />
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-3 py-2 text-sm text-emerald"><span className="h-2 w-2 rounded-full bg-emerald" />{home?.badge ?? t.available}</div>
            <p className="font-mono text-sm uppercase tracking-[.32em] text-cyan">{profile?.headline ?? "Data Engineer | BI Developer"}</p>
            <h1 className="mt-4 max-w-5xl text-6xl font-black uppercase leading-[.9] tracking-tight text-white sm:text-7xl lg:text-8xl">{profile?.name ?? "HAMZA BAKH"}</h1>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold tracking-tight text-white md:text-5xl">{home?.heroTitle ?? t.heroTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{home?.heroText ?? t.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-emerald px-5 py-3 font-semibold text-ink hover:brightness-110">{home?.primaryCta ?? t.explore}<ArrowRight size={18} /></Link>
              <Link to="/contact" className="rounded-md border border-white/12 px-5 py-3 font-semibold hover:bg-white/8">{home?.secondaryCta ?? t.contact}</Link>
              <a href={profile?.cvUrl ?? "/Hamza-Bakh-CV.pdf"} className="rounded-md px-5 py-3 text-slate-300 hover:text-white">{t.cv}</a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {["Pipelines", "Warehouses", "Dashboards"].map((item, index) => <div key={item} className="rounded-lg border border-white/10 bg-white/[.035] p-3"><p className="font-mono text-[10px] uppercase text-slate-500">0{index + 1}</p><p className="mt-1 text-sm font-semibold">{item}</p></div>)}
            </div>
          </motion.div>
          <DataVisual />
        </div>
      </section>
      <div className="border-y border-white/10 bg-white/[.025]">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 py-5 sm:px-6 lg:px-8">
          {(home?.trustStrip ?? ["Data Engineering", "BI & Analytics", "ETL / ELT Pipelines", "Snowflake & SQL", "Power BI & Metabase", "Python Automation", "Full-Stack Development"]).map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-3 py-2 font-mono text-xs text-slate-300">{item}</span>
          ))}
        </div>
      </div>
      <Section eyebrow={t.impactEyebrow} title={t.impactTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {(home?.impactCards ?? ["Automated reporting workflows", "Built BI dashboards for operational decision-making", "Designed ETL pipelines from SQL Server to cloud warehousing", "Worked with large operational datasets", "Reduced manual processing time through automation", "Improved reporting consistency through validation controls"]).map((item) => (
            <div key={item} className="glass rounded-lg p-5"><CheckCircle2 className="mb-4 text-emerald" /><h3 className="font-semibold">{item}</h3></div>
          ))}
        </div>
      </Section>
      <Section eyebrow={t.projectsEyebrow} title={t.projectsTitle}>
        <div className="grid gap-5 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </Section>
      <Section eyebrow={t.modelEyebrow} title={t.modelTitle}>
        <div className="grid gap-4 md:grid-cols-5">
          {(home?.operatingModel ?? t.modelItems).map((item, index) => (
            <div key={item} className="glass rounded-lg p-5">
              <p className="font-mono text-xs text-emerald">0{index + 1}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow={t.architectureEyebrow} title={t.architectureTitle}>
        <ArchitectureFlow />
      </Section>
      {settings?.codeSnippets?.length ? (
        <Section eyebrow="Code" title="Practical snippets from the data workflow.">
          <div className="grid gap-5 lg:grid-cols-2">
            {settings.codeSnippets.map((snippet) => (
              <div key={snippet.id} className="glass overflow-hidden rounded-lg">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <h3 className="font-semibold">{snippet.title}</h3>
                  <span className="rounded border border-white/10 px-2 py-1 font-mono text-xs text-cyan">{snippet.language}</span>
                </div>
                <pre className="overflow-x-auto p-4 text-sm text-slate-200"><code>{snippet.code}</code></pre>
              </div>
            ))}
          </div>
        </Section>
      ) : null}
      <Section eyebrow={t.skillsEyebrow} title={t.skillsTitle}>
        <SkillsMatrix skills={data?.skills ?? []} />
      </Section>
      <Section eyebrow={t.experienceEyebrow} title={t.experienceTitle}>
        <Timeline experiences={data?.experiences ?? []} />
      </Section>
      <Section eyebrow={t.insightsEyebrow} title={t.insightsTitle}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{articles.map((article) => <InsightCard key={article.id} article={article} />)}</div>
      </Section>
      <Section eyebrow="Contact" title={t.dataDriven}>
        <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
          <div className="space-y-4 text-slate-300">
            <p>Available for data engineering, BI, analytics engineering, and full-stack opportunities in Morocco, Europe, and remote-first teams.</p>
            {[Database, Layers3, ShieldCheck].map((Icon, index) => <div key={index} className="flex items-center gap-3"><Icon className="text-cyan" />Recruiter-friendly contact funnel with secure storage and optional email alerts.</div>)}
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
