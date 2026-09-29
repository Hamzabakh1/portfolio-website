import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, Layers3, ShieldCheck, Linkedin, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { useContent } from "@/hooks/useContent";
import { useSettings } from "@/hooks/useSettings";
import { useLanguage } from "@/providers/language";
import { ProjectCard, SkillsMatrix, ArchitectureFlow, Timeline, InsightCard } from "@/pages/SharedViews";

export function HomePage() {
  const { t, lang } = useLanguage();
  const { data } = useContent();
  const settings = useSettings();
  const projects = data?.projects.filter((p) => p.featured).slice(0, 3) ?? [];
  const articles = data?.articles.slice(0, 4) ?? [];
  const profile = settings?.profile;
  const home = settings?.home;
  return (
    <>
      <section id="top" className="portfolio-hero relative overflow-hidden">
        <img className="portfolio-hero-image" src="/portfolio-assets/hero-data-portal.webp" alt="Layered glass data portal in a dark architectural landscape" />
        <div className="portfolio-hero-shade" />
        <div className="portfolio-hero-grid" />
        <motion.div className="portfolio-hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="availability-pill"><span />{lang === "fr" ? t.available : (home?.badge ?? t.available)}</div>
          <p className="portfolio-kicker">{t.ui.kicker}</p>
          <h1>{t.ui.heroHeadlineTop}<br />{t.ui.heroHeadlineBottom} <em>{t.ui.heroHeadlineEmphasis}</em></h1>
          <p className="portfolio-intro">{lang === "fr" ? t.heroText : (home?.heroText ?? t.heroText)}</p>
          <p className="portfolio-role">{profile?.headline ?? "Data Engineer & BI"}</p>
          <div className="portfolio-hero-actions">
            <Link to="/projects" className="portfolio-button light">{t.explore} <ArrowRight size={17} /></Link>
            <Link to="/demos" className="portfolio-button"><PlayCircle size={17} /> {t.ui.runLiveDemos}</Link>
            <a href={profile?.linkedin ?? "https://www.linkedin.com/in/hamza-bakh/"} target="_blank" rel="noreferrer" className="portfolio-text-link"><Linkedin size={16} /> {t.ui.linkedin}</a>
          </div>
        </motion.div>
        <div className="portfolio-hero-meta"><span>{t.ui.agadirMorocco}</span><span>{t.ui.openToInternational}</span></div>
      </section>
      <div className="professional-proof border-y border-white/10 bg-white/[.025]">
        <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div><strong>4,259</strong><span>{t.ui.followers}</span></div>
          <div><strong>500+</strong><span>{t.ui.connections}</span></div>
          <div><strong>5</strong><span>{t.ui.verifiedRoles}</span></div>
        </div>
      </div>
      <div className="tool-strip border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 py-5 sm:px-6 lg:px-8">
          {(home?.trustStrip ?? ["Data Engineering", "BI & Analytics", "ETL / ELT Pipelines", "Snowflake & SQL", "Power BI & Metabase", "Python Automation", "Full-Stack Development"]).map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-3 py-2 font-mono text-xs text-slate-300">{item}</span>
          ))}
        </div>
      </div>
      <Section id="impact" eyebrow={t.impactEyebrow} title={t.impactTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {(lang === "fr" ? t.impactItems : (home?.impactCards ?? t.impactItems)).map((item) => (
            <div key={item} className="glass rounded-lg p-5"><CheckCircle2 className="mb-4 text-emerald" /><h3 className="font-semibold">{item}</h3></div>
          ))}
        </div>
      </Section>
      <Section eyebrow={t.projectsEyebrow} title={t.projectsTitle}>
        <div className="grid gap-5 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </Section>
      <Section eyebrow={t.modelEyebrow} title={t.modelTitle}>
        <div className="grid gap-4 md:grid-cols-5">
          {(lang === "fr" ? t.modelItems : (home?.operatingModel ?? t.modelItems)).map((item, index) => (
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
      <Section id="skills-matrix" eyebrow={t.skillsEyebrow} title={t.skillsTitle}>
        <SkillsMatrix skills={data?.skills ?? []} />
      </Section>
      <Section eyebrow={t.experienceEyebrow} title={t.experienceTitle}>
        <Timeline experiences={data?.experiences ?? []} />
      </Section>
      <Section eyebrow={t.insightsEyebrow} title={t.insightsTitle}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{articles.map((article) => <InsightCard key={article.id} article={article} />)}</div>
      </Section>
      <Section eyebrow={t.ui.contactEyebrow} title={t.dataDriven}>
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
