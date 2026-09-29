import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, LockKeyhole, PlayCircle, ShieldCheck } from "lucide-react";
import { Section } from "@/components/Section";
import { DemoShell } from "@/components/DemoShell";
import { getShowcaseProject, showcaseProjects } from "@/data/projectRegistry";
import { useLanguage } from "@/providers/language";
export function DemosPage() {
  const { t } = useLanguage();
  return <Section eyebrow={t.ui.liveLab} title={t.ui.liveLabTitle}><div className="demo-intro"><div><p>{t.ui.liveLabIntro} <strong>{t.ui.runSimulation}</strong> button.</p><div className="demo-trust"><span><PlayCircle size={16} /> {t.ui.noSetup}</span><span><ShieldCheck size={16} /> {t.ui.safeSynthetic}</span></div></div><Link className="portfolio-button light" to="/demos/multi-tenant">{t.ui.startRecommended} <ArrowRight size={16} /></Link></div><div className="grid gap-5 lg:grid-cols-2">{showcaseProjects.map((project, index) => <Link className="showcase-card" key={project.slug} to={"/demos/" + project.slug}><span className="showcase-number">0{index + 1}</span><span className="showcase-kicker">{project.category} · {project.mode}</span><h3>{project.title}</h3><p>{project.subtitle}</p><span className="showcase-link"><PlayCircle size={17} /> {t.ui.launchDemo} <ArrowRight size={16} /></span></Link>)}</div></Section>;
}
export function DemoPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const project = getShowcaseProject(slug);
  if (!project) return <Section title={t.ui.demoNotFound}><Link className="text-emerald" to="/demos">{t.ui.backToDemos}</Link></Section>;
  return <><section className="border-b border-white/10 bg-white/[.025]"><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><Link to="/demos" className="mb-6 inline-flex items-center gap-2 text-slate-300 hover:text-white"><ArrowLeft size={16} />{t.ui.allDemos}</Link><p className="font-mono text-xs uppercase tracking-widest text-emerald">{project.category} · {project.mode}</p><h1 className="mt-3 max-w-4xl text-4xl font-black md:text-6xl">{project.title}</h1><p className="mt-5 max-w-3xl text-lg text-slate-300">{project.subtitle}. {project.visibility === "private" && <><LockKeyhole size={15} className="inline" /> {t.ui.sourcePrivate}</>}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map((tech) => <span className="rounded border border-white/10 px-2 py-1 text-xs" key={tech}>{tech}</span>)}</div></div></section><Section eyebrow={t.ui.interactiveExperience} title={t.ui.runInspect}><DemoShell slug={project.slug} /></Section><Section eyebrow={t.ui.engineeringContext} title={t.ui.problemSolutionValue}><div className="grid gap-5 md:grid-cols-3"><div className="glass rounded-lg p-5"><h3>{t.ui.problem}</h3><p>{project.problem}</p></div><div className="glass rounded-lg p-5"><h3>{t.ui.engineeringSolution}</h3><p>{t.ui.engineeringSolutionBody}</p></div><div className="glass rounded-lg p-5"><h3>{t.ui.businessValue}</h3><p>{project.value}</p></div></div></Section><Section eyebrow={t.ui.nextStep} title={t.ui.similarDataProblem}><Link className="inline-flex items-center gap-2 rounded-md bg-emerald px-5 py-3 font-semibold text-ink" to="/contact">{t.ui.discussProject} <ArrowRight size={17} /></Link></Section></>;
}
