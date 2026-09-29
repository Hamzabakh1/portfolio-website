import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Linkedin } from "lucide-react";
import type { Article } from "@shared/schema";
import { Section } from "@/components/Section";
import { useContent } from "@/hooks/useContent";
import { InsightCard } from "@/pages/SharedViews";
import { api } from "@/lib/api";
import { useLanguage } from "@/providers/language";
import { linkedinProfile } from "@/data/linkedinProfile";

export function InsightsPage() {
  const { data } = useContent();
  const { t, lang } = useLanguage();
  const fr = lang === "fr";
  return <>
    <Section eyebrow={t.nav.insights} title={t.ui.insightsPageTitle}><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{(data?.articles ?? []).map((article) => <InsightCard key={article.id} article={article} />)}</div></Section>
    <Section eyebrow={fr ? "Publications LinkedIn" : "LinkedIn publications"} title={fr ? "Articles, signaux et points de vue" : "Articles, signals and points of view"}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {linkedinProfile.posts.map((post) => <article className="glass flex h-full flex-col rounded-lg p-5" key={post.url}>
          <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-emerald"><Linkedin size={14} /> LinkedIn</span><span className="text-xs text-slate-500">{post.date}</span></div>
          <h3 className="mt-4 text-xl font-semibold leading-7">{post.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">{post.topics.map((topic) => <span className="rounded-full border border-white/10 bg-white/[.04] px-2 py-1 text-xs text-slate-300" key={topic}>{topic}</span>)}</div>
          {(post.impressions || post.reactions) && <div className="mt-5 flex gap-4 border-t border-white/10 pt-4 text-xs uppercase tracking-[.1em] text-slate-500"><span>{post.impressions ?? "—"} {fr ? "impressions" : "impressions"}</span><span>{post.reactions ?? "—"} {fr ? "réactions" : "reactions"}</span></div>}
          <a className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-cyan hover:text-white" href={post.url} target="_blank" rel="noreferrer">{fr ? "Lire sur LinkedIn" : "Read on LinkedIn"} <ExternalLink size={13} /></a>
        </article>)}
      </div>
    </Section>
  </>;
}

export function ArticleDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  useEffect(() => { api<Article>(`/api/articles/${slug}`).then(setArticle).catch(() => setArticle(null)); }, [slug]);
  if (!article) return <Section title={t.ui.loadingArticle}><div className="h-80 animate-pulse rounded-lg bg-white/5" /></Section>;
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/articles" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"><ArrowLeft size={16} />{t.nav.articles}</Link>
      <p className="font-mono text-xs uppercase tracking-widest text-emerald">{article.category} · {article.readTime}</p>
      <h1 className="mt-3 text-4xl font-black md:text-6xl">{article.title}</h1>
      <p className="mt-5 text-xl text-slate-300">{article.excerpt}</p>
      <div className="prose prose-invert mt-10 max-w-none text-slate-300"><p>{article.content}</p></div>
    </article>
  );
}
