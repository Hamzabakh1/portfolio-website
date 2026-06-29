import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Article } from "@shared/schema";
import { Section } from "@/components/Section";
import { useContent } from "@/hooks/useContent";
import { InsightCard } from "@/pages/SharedViews";
import { api } from "@/lib/api";

export function InsightsPage() {
  const { data } = useContent();
  return <Section eyebrow="Insights" title="Technical articles, notes, and research ideas."><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{(data?.articles ?? []).map((article) => <InsightCard key={article.id} article={article} />)}</div></Section>;
}

export function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  useEffect(() => { api<Article>(`/api/articles/${slug}`).then(setArticle).catch(() => setArticle(null)); }, [slug]);
  if (!article) return <Section title="Loading article..."><div className="h-80 animate-pulse rounded-lg bg-white/5" /></Section>;
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/insights" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"><ArrowLeft size={16} />Insights</Link>
      <p className="font-mono text-xs uppercase tracking-widest text-emerald">{article.category} · {article.readTime}</p>
      <h1 className="mt-3 text-4xl font-black md:text-6xl">{article.title}</h1>
      <p className="mt-5 text-xl text-slate-300">{article.excerpt}</p>
      <div className="prose prose-invert mt-10 max-w-none text-slate-300"><p>{article.content}</p></div>
    </article>
  );
}
