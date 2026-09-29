import { Menu, X, Github, Linkedin, Mail, Moon, Sun, ShieldCheck } from "lucide-react";
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
  ["/demos", "demos"],
  ["/articles", "articles"],
  ["/contact", "contact"]
] as const;

export function Layout() {
  const { t, lang, setLang } = useLanguage();
  const settings = useSettings();
  const githubUrl = settings?.profile.github && settings.profile.github !== "#" ? settings.profile.github : "https://github.com/Hamzabakh1";
  const linkedinUrl = settings?.profile.linkedin && settings.profile.linkedin !== "#" ? settings.profile.linkedin : "https://www.linkedin.com/in/hamza-bakh/";
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => (localStorage.getItem("portfolio-theme") as "dark" | "light") || "dark");
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    document.title = `Hamza Bakh | ${location.pathname === "/" ? "Data Engineer & BI Builder" : location.pathname.slice(1).replace(/-/g, " ")}`;
    fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ route: location.pathname }) }).catch(() => undefined);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.documentElement.lang = lang;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, lang]);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="site-shell min-h-screen overflow-hidden text-slate-100">
      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-[4vw]" aria-label="Main navigation">
          <Link to="/" className="site-brand flex items-center gap-3 font-semibold" aria-label="Hamza Bakh — home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/brand-hb.png" alt="" className="brand-logo" />
            </span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(([to, key]) => (
              <NavLink key={to} to={to} className={({ isActive }) => cn("site-nav-link rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white", isActive && "active bg-white/8 text-white")}>
                {t.nav[key]}
              </NavLink>
            ))}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Light mode" : "Dark mode"}>
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <LanguageToggle lang={lang} setLang={setLang} />
            <IconLink href={githubUrl} label="GitHub"><Github size={17} /></IconLink>
            <IconLink href={linkedinUrl} label="LinkedIn"><Linkedin size={17} /></IconLink>
            <Link to="/admin" className="admin-entry inline-flex items-center gap-2 rounded-md border border-white/12 px-3 py-2 text-sm hover:bg-white/8"><ShieldCheck size={16} />Admin</Link>
          </div>
          <button className="rounded-md border border-white/12 p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="border-t border-white/10 bg-ink/95 p-4 lg:hidden">
            <div className="grid gap-2">
              {navItems.map(([to, key]) => <NavLink key={to} to={to} className="rounded-md px-3 py-3 text-slate-200 hover:bg-white/8">{t.nav[key]}</NavLink>)}
              <NavLink to="/admin" className="rounded-md px-3 py-3 text-slate-200 hover:bg-white/8"><ShieldCheck size={16} className="mr-2 inline" />Admin</NavLink>
              <button className="flex items-center gap-2 rounded-md px-3 py-3 text-left text-slate-200 hover:bg-white/8" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}{theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <LanguageToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        )}
      </header>
      <main className="pt-[76px]"><Outlet /></main>
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
  const external = href.startsWith("http");
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} aria-label={label} className="icon-button">{children}</a>;
}

function Footer() {
  const { t } = useLanguage();
  const settings = useSettings();
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Hamza Bakh. {t.ui.footerTagline}</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-white">{t.privacy}</Link>
          <a href={`mailto:${settings?.profile.email ?? "hello@example.com"}`} className="inline-flex items-center gap-2 hover:text-white"><Mail size={15} />{settings?.profile.email ?? "hello@example.com"}</a>
          <Link to="/admin" className="hover:text-white">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
