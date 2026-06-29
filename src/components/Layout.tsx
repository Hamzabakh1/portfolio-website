import { Menu, X, Github, Linkedin, Mail, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useLanguage, type Lang } from "@/providers/language";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";

const navItems = [
  ["/", "home"],
  ["/about", "about"],
  ["/projects", "projects"],
  ["/experience", "experience"],
  ["/insights", "insights"],
  ["/contact", "contact"]
] as const;

export function Layout() {
  const { t, lang, setLang } = useLanguage();
  const settings = useSettings();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    document.title = `Hamza Bakh | ${location.pathname === "/" ? "Data Engineer & BI Builder" : location.pathname.slice(1).replace(/-/g, " ")}`;
    fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ route: location.pathname }) }).catch(() => undefined);
  }, [location.pathname]);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="spotlight min-h-screen overflow-hidden text-slate-100">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-emerald/40 bg-emerald/10 font-mono text-sm text-emerald">HB</span>
            <span className="hidden sm:block">{settings?.profile.name ?? "Hamza Bakh"}</span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(([to, key]) => (
              <NavLink key={to} to={to} className={({ isActive }) => cn("rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white", isActive && "bg-white/8 text-white")}>
                {t.nav[key]}
              </NavLink>
            ))}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageToggle lang={lang} setLang={setLang} />
            <IconLink href={settings?.profile.github ?? "#"} label="GitHub"><Github size={17} /></IconLink>
            <IconLink href={settings?.profile.linkedin ?? "#"} label="LinkedIn"><Linkedin size={17} /></IconLink>
            <Link to="/resume" className="inline-flex items-center gap-2 rounded-md border border-white/12 px-3 py-2 text-sm hover:bg-white/8"><Download size={16} />{t.nav.resume}</Link>
          </div>
          <button className="rounded-md border border-white/12 p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="border-t border-white/10 bg-ink/95 p-4 lg:hidden">
            <div className="grid gap-2">
              {navItems.map(([to, key]) => <NavLink key={to} to={to} className="rounded-md px-3 py-3 text-slate-200 hover:bg-white/8">{t.nav[key]}</NavLink>)}
              <LanguageToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        )}
      </header>
      <main className="pt-16"><Outlet /></main>
      <Footer />
    </div>
  );
}

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="inline-flex rounded-md border border-white/12 p-1" aria-label="Language selector">
      {(["en", "fr"] as Lang[]).map((item) => (
        <button key={item} onClick={() => setLang(item)} className={cn("rounded px-2 py-1 text-xs font-semibold uppercase", lang === item ? "bg-emerald text-ink" : "text-slate-300 hover:bg-white/8")}>{item}</button>
      ))}
    </div>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} aria-label={label} className="grid h-9 w-9 place-items-center rounded-md border border-white/12 text-slate-300 hover:bg-white/8 hover:text-white">{children}</a>;
}

function Footer() {
  const { t } = useLanguage();
  const settings = useSettings();
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Hamza Bakh. Data Engineer | BI Developer | Full-Stack Builder.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-white">{t.privacy}</Link>
          <a href={`mailto:${settings?.profile.email ?? "hello@example.com"}`} className="inline-flex items-center gap-2 hover:text-white"><Mail size={15} />{settings?.profile.email ?? "hello@example.com"}</a>
          <Link to="/admin" className="hover:text-white">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
