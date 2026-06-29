import type { Article, ContactMessage, Experience, Project, Skill } from "@shared/schema";

export type Content = {
  projects: Project[];
  articles: Article[];
  skills: Skill[];
  experiences: Experience[];
};

export type SiteSettings = {
  profile: {
    name: string;
    headline: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    cvUrl: string;
    avatarUrl: string;
  };
  home: {
    badge: string;
    heroTitle: string;
    heroText: string;
    primaryCta: string;
    secondaryCta: string;
    trustStrip: string[];
    impactCards: string[];
    operatingModel: string[];
  };
  about: {
    title: string;
    body: string;
    values: string;
  };
  contact: {
    intro: string;
    availability: string;
  };
  codeSnippets: Array<{ id: number; title: string; language: string; code: string }>;
};

export async function uploadFile(file: File): Promise<{ url: string; name: string; size: number }> {
  const form = new FormData();
  form.append("file", file);
  const headers = new Headers();
  headers.set("CSRF-Token", await getCsrf());
  const response = await fetch("/api/admin/uploads", { method: "POST", body: form, headers, credentials: "include" });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error ?? "Upload failed");
  return response.json();
}

let csrfToken: string | null = null;

async function getCsrf(): Promise<string> {
  if (csrfToken) return csrfToken;
  const response = await fetch("/api/csrf", { credentials: "include" });
  const data = await response.json();
  csrfToken = String(data.csrfToken);
  return csrfToken;
}

export async function api<T>(url: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers);
  if (method !== "GET" && method !== "HEAD") {
    headers.set("Content-Type", "application/json");
    const token = await getCsrf();
    headers.set("CSRF-Token", token);
  }
  const response = await fetch(url, { ...options, headers, credentials: "include" });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Request failed");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export type AdminSummary = {
  messages: number;
  projects: number;
  publishedArticles: number;
  recentMessages: ContactMessage[];
};
