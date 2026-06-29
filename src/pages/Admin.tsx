import { useEffect, useState } from "react";
import { LogOut, Plus, RefreshCcw, Save, Trash2 } from "lucide-react";
import type { Article, ContactMessage, Project } from "@shared/schema";
import { api, uploadFile, type AdminSummary, type SiteSettings } from "@/lib/api";
import { slugify } from "@/lib/utils";

type Mode = "studio" | "projects" | "articles" | "skills" | "experience" | "messages" | "assets";

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<{ authenticated: boolean }>("/api/admin/me").then((data) => setAuthenticated(data.authenticated)).finally(() => setLoading(false));
  }, []);
  if (loading) return <AdminShell><div className="h-60 animate-pulse rounded-lg bg-white/5" /></AdminShell>;
  return <AdminShell>{authenticated ? <Dashboard onLogout={() => setAuthenticated(false)} /> : <Login onLogin={() => setAuthenticated(true)} />}</AdminShell>;
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-ink px-4 py-8 text-slate-100"><div className="mx-auto max-w-7xl">{children}</div></div>;
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }
  return (
    <form onSubmit={submit} className="glass mx-auto mt-20 grid max-w-md gap-4 rounded-lg p-6">
      <h1 className="text-3xl font-bold">Admin Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border border-white/12 bg-ink px-3 py-3" placeholder="ADMIN_EMAIL" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border border-white/12 bg-ink px-3 py-3" placeholder="ADMIN_PASSWORD" type="password" />
      <button className="rounded-md bg-emerald px-4 py-3 font-semibold text-ink">Login</button>
      {error && <p className="text-sm text-red-300">{error}</p>}
    </form>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [mode, setMode] = useState<Mode>("projects");
  useEffect(() => { api<AdminSummary>("/api/admin/summary").then(setSummary); }, []);
  async function logout() {
    await api("/api/auth/logout", { method: "POST", body: "{}" });
    onLogout();
  }
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div><p className="font-mono text-xs uppercase text-emerald">Protected Area</p><h1 className="text-4xl font-black">Portfolio Admin</h1></div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-md border border-white/12 px-4 py-2"><LogOut size={16} />Logout</button>
      </div>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Stat label="Messages" value={summary?.messages ?? 0} />
        <Stat label="Projects" value={summary?.projects ?? 0} />
        <Stat label="Published Articles" value={summary?.publishedArticles ?? 0} />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">{(["studio", "projects", "articles", "skills", "experience", "messages", "assets"] as Mode[]).map((item) => <button key={item} onClick={() => setMode(item)} className={`rounded-md border px-3 py-2 capitalize ${mode === item ? "border-emerald bg-emerald text-ink" : "border-white/12"}`}>{item}</button>)}</div>
      {mode === "studio" && <StudioEditor />}
      {mode === "projects" && <JsonCrud<Project> endpoint="/api/admin/projects" empty={emptyProject} />}
      {mode === "articles" && <JsonCrud<Article> endpoint="/api/admin/articles" empty={emptyArticle} />}
      {mode === "skills" && <JsonCrud<any> endpoint="/api/admin/skills" empty={emptySkill} />}
      {mode === "experience" && <JsonCrud<any> endpoint="/api/admin/experiences" empty={emptyExperience} />}
      {mode === "messages" && <Messages />}
      {mode === "assets" && <AssetsPanel />}
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="glass rounded-lg p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-4xl font-black">{value}</p></div>;
}

function JsonCrud<T extends { id: number; title?: string; slug?: string } & Record<string, unknown>>({ endpoint, empty }: { endpoint: string; empty: Record<string, unknown> }) {
  const [rows, setRows] = useState<T[]>([]);
  const [selected, setSelected] = useState<Record<string, unknown>>(empty);
  const [raw, setRaw] = useState(JSON.stringify(empty, null, 2));
  const [error, setError] = useState("");
  async function load() { setRows(await api<T[]>(endpoint)); }
  useEffect(() => { load(); }, [endpoint]);
  function pick(row: T) {
    setSelected(row);
    setRaw(JSON.stringify(row, null, 2));
  }
  async function save() {
    try {
      const value = JSON.parse(raw);
      if (value.title && !value.slug) value.slug = slugify(value.title);
      const method = value.id ? "PUT" : "POST";
      const url = value.id ? `${endpoint}/${value.id}` : endpoint;
      await api(url, { method, body: JSON.stringify(value) });
      setSelected(empty);
      setRaw(JSON.stringify(empty, null, 2));
      await load();
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }
  async function remove(id: number) {
    await api(`${endpoint}/${id}`, { method: "DELETE", body: "{}" });
    await load();
  }
  return (
    <div className="grid gap-5 lg:grid-cols-[.75fr_1fr]">
      <div className="glass rounded-lg p-4">
        <div className="mb-4 flex justify-between"><button onClick={() => { setSelected(empty); setRaw(JSON.stringify(empty, null, 2)); }} className="inline-flex items-center gap-2 rounded-md border border-white/12 px-3 py-2"><Plus size={16} />New</button><button onClick={load} className="rounded-md border border-white/12 p-2" aria-label="Refresh"><RefreshCcw size={16} /></button></div>
        <div className="grid gap-2">{rows.map((row) => <button key={row.id} onClick={() => pick(row)} className={`rounded-md border p-3 text-left ${selected.id === row.id ? "border-emerald bg-emerald/10" : "border-white/10"}`}><p className="font-semibold">{String(row.title ?? row.slug ?? row.id)}</p><p className="text-xs text-slate-500">ID {row.id}</p></button>)}</div>
      </div>
      <div className="glass rounded-lg p-4">
        <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={24} className="w-full rounded-md border border-white/12 bg-ink p-3 font-mono text-sm" />
        <div className="mt-4 flex gap-2"><button onClick={save} className="inline-flex items-center gap-2 rounded-md bg-emerald px-4 py-2 font-semibold text-ink"><Save size={16} />Save</button>{Boolean(selected.id) && <button onClick={() => remove(Number(selected.id))} className="inline-flex items-center gap-2 rounded-md border border-red-300/30 px-4 py-2 text-red-200"><Trash2 size={16} />Delete</button>}</div>
        {error && <p className="mt-3 text-red-300">{error}</p>}
      </div>
    </div>
  );
}

function Messages() {
  const [rows, setRows] = useState<ContactMessage[]>([]);
  useEffect(() => { api<ContactMessage[]>("/api/admin/messages").then(setRows); }, []);
  return <div className="grid gap-3">{rows.map((message) => <div key={message.id} className="glass rounded-lg p-4"><div className="flex flex-wrap justify-between gap-3"><h3 className="font-bold">{message.subject}</h3><span className="font-mono text-xs text-emerald">{message.status}</span></div><p className="text-sm text-slate-400">{message.name} · {message.email} · {message.company}</p><p className="mt-3 text-slate-300">{message.message}</p></div>)}</div>;
}

function StudioEditor() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [raw, setRaw] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    api<SiteSettings>("/api/admin/settings").then((data) => {
      setSettings(data);
      setRaw(JSON.stringify(data, null, 2));
    });
  }, []);
  async function save() {
    try {
      const next = JSON.parse(raw) as SiteSettings;
      await api<SiteSettings>("/api/admin/settings", { method: "PUT", body: JSON.stringify(next) });
      setSettings(next);
      setStatus("Saved. Refresh the public site to see updates.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed");
    }
  }
  if (!settings) return <div className="h-64 animate-pulse rounded-lg bg-white/5" />;
  return (
    <div className="grid gap-5 lg:grid-cols-[.55fr_1fr]">
      <div className="glass rounded-lg p-5">
        <h2 className="text-2xl font-bold">All Public Sections</h2>
        <p className="mt-3 text-sm text-slate-300">Edit hero, profile links, about, contact, trust strip, impact cards, operating model, and code snippets from one structured JSON model.</p>
        <div className="mt-5 grid gap-3 text-sm">
          <Preview label="Name" value={settings.profile.name} />
          <Preview label="Hero" value={settings.home.heroTitle} />
          <Preview label="Contact" value={settings.contact.availability} />
          <Preview label="Snippets" value={`${settings.codeSnippets.length} code block(s)`} />
        </div>
      </div>
      <div className="glass rounded-lg p-4">
        <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={30} className="w-full rounded-md border border-white/12 bg-ink p-3 font-mono text-sm" />
        <button onClick={save} className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald px-4 py-2 font-semibold text-ink"><Save size={16} />Save Sections</button>
        {status && <p className="mt-3 text-sm text-emerald">{status}</p>}
      </div>
    </div>
  );
}

function AssetsPanel() {
  const [uploads, setUploads] = useState<Array<{ url: string; name: string; size: number }>>([]);
  const [status, setStatus] = useState("");
  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const uploaded = await uploadFile(file);
      setUploads((current) => [uploaded, ...current]);
      setStatus(`Uploaded ${uploaded.name}`);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Upload failed");
    }
  }
  return (
    <div className="glass rounded-lg p-5">
      <h2 className="text-2xl font-bold">Images & Visual Assets</h2>
      <p className="mt-2 text-sm text-slate-300">Upload images from your PC, then use the returned URL in projects, articles, profile avatar, or section JSON.</p>
      <input type="file" accept="image/*" onChange={handleUpload} className="mt-5 block w-full rounded-md border border-white/12 bg-ink p-3" />
      {status && <p className="mt-3 text-sm text-emerald">{status}</p>}
      <div className="mt-5 grid gap-4 md:grid-cols-3">{uploads.map((upload) => <div key={upload.url} className="rounded-lg border border-white/10 p-3"><img src={upload.url} alt={upload.name} className="h-36 w-full rounded-md object-cover" /><p className="mt-2 break-all font-mono text-xs text-cyan">{upload.url}</p></div>)}</div>
    </div>
  );
}

function Preview({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-white/10 p-3"><p className="font-mono text-xs uppercase text-slate-500">{label}</p><p className="mt-1 text-slate-200">{value}</p></div>;
}

const emptyProject = {
  title: "",
  slug: "",
  category: "Data Engineering",
  shortDescription: "",
  fullDescription: "",
  challenge: "",
  solution: "",
  results: "",
  architecture: "",
  technologies: [],
  featured: false,
  published: true,
  imageUrl: ""
};

const emptyArticle = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Data Engineering",
  readTime: "5 min",
  coverImageUrl: "",
  published: false,
  publishedAt: null
};

const emptySkill = {
  category: "Data Engineering",
  name: "",
  level: 70,
  highlighted: false
};

const emptyExperience = {
  company: "",
  role: "",
  location: "Morocco",
  startDate: "2024",
  endDate: "Present",
  description: "",
  technologies: [],
  displayOrder: 10
};
