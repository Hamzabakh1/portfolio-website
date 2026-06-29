import "dotenv/config";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import argon2 from "argon2";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import { and, count, desc, eq } from "drizzle-orm";
import express, { type Request, type Response, type NextFunction } from "express";
import rateLimit from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import connectPgSimple from "connect-pg-simple";
import multer from "multer";
import { nanoid } from "nanoid";
import { Resend } from "resend";
import { ZodError } from "zod";
import { db, hasDatabase, pool } from "./db/client.js";
import {
  articleInputSchema,
  articles,
  contactMessages,
  contactSchema,
  experienceInputSchema,
  experiences,
  loginSchema,
  projectInputSchema,
  projects,
  skillInputSchema,
  skills,
  siteSettings,
  users
} from "../shared/schema.js";
import { localStore } from "./localStore.js";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    role?: string;
    csrfToken?: string;
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT ?? 3000);
const publicSiteUrl = process.env.PUBLIC_SITE_URL ?? `http://localhost:${port}`;
const isProd = process.env.NODE_ENV === "production";
const staticDir = path.resolve(process.cwd(), "dist/public");
const uploadDir = path.resolve(process.cwd(), "public/uploads");
await mkdir(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const safeName = file.originalname.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/(^-|-$)/g, "");
      cb(null, `${Date.now()}-${safeName}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image uploads are allowed"));
    cb(null, true);
  }
});

app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: isProd ? publicSiteUrl : true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

const PgSession = connectPgSimple(session);
app.use(
  session({
    store: pool ? new PgSession({ pool, createTableIfMissing: true }) : undefined,
    secret: process.env.SESSION_SECRET ?? "dev-only-change-this-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 8
    }
  })
);

const writeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 80, standardHeaders: true, legacyHeaders: false });
const contactLimiter = rateLimit({ windowMs: 10 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false });

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (typeof req.session.userId !== "number") return res.status(401).json({ error: "Authentication required" });
  next();
}

function csrfProtection(req: Request, res: Response, next: NextFunction) {
  if (!req.session.csrfToken) req.session.csrfToken = nanoid(32);
  if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") return next();
  const token = req.get("CSRF-Token");
  if (!token || token !== req.session.csrfToken) return res.status(403).json({ error: "Invalid security token" });
  next();
}

function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
  return (req: Request, res: Response, next: NextFunction) => void fn(req, res, next).catch(next);
}

app.get("/api/health", (_req, res) => res.json({ ok: true, database: hasDatabase, timestamp: new Date().toISOString() }));
app.get("/api/csrf", csrfProtection, (req, res) => res.json({ csrfToken: req.session.csrfToken }));

app.get("/api/content", asyncHandler(async (_req, res) => {
  if (!db || !hasDatabase) return res.json(await localStore.content());
  const [projectRows, articleRows, skillRows, experienceRows] = await Promise.all([
    db!.select().from(projects).where(eq(projects.published, true)).orderBy(desc(projects.featured), desc(projects.createdAt)),
    db!.select().from(articles).where(eq(articles.published, true)).orderBy(desc(articles.publishedAt)),
    db!.select().from(skills),
    db!.select().from(experiences).orderBy(experiences.displayOrder)
  ]);
  res.json({ projects: projectRows, articles: articleRows, skills: skillRows, experiences: experienceRows });
}));

app.get("/api/settings", asyncHandler(async (_req, res) => {
  if (!db || !hasDatabase) return res.json(await localStore.settings());
  const [row] = await db!.select().from(siteSettings).where(eq(siteSettings.key, "site"));
  res.json(row?.value ?? await localStore.settings());
}));

app.get("/api/projects/:slug", asyncHandler(async (req, res) => {
  const slug = String(req.params.slug);
  if (!db || !hasDatabase) {
    const project = await localStore.project(slug);
    if (!project) return res.status(404).json({ error: "Project not found" });
    return res.json(project);
  }
  const [project] = await db!.select().from(projects).where(and(eq(projects.slug, slug), eq(projects.published, true)));
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
}));

app.get("/api/articles/:slug", asyncHandler(async (req, res) => {
  const slug = String(req.params.slug);
  if (!db || !hasDatabase) {
    const article = await localStore.article(slug);
    if (!article) return res.status(404).json({ error: "Article not found" });
    return res.json(article);
  }
  const [article] = await db!.select().from(articles).where(and(eq(articles.slug, slug), eq(articles.published, true)));
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
}));

app.post("/api/contact", contactLimiter, csrfProtection, asyncHandler(async (req, res) => {
  const parsed = contactSchema.parse(req.body);
  if (parsed.website) return res.status(204).send();
  if (!db || !hasDatabase) {
    const message = await localStore.contact({
      name: parsed.name,
      email: parsed.email,
      company: parsed.company || null,
      subject: parsed.subject,
      message: parsed.message
    });
    return res.status(201).json({ ok: true, id: message.id, storage: "local" });
  }
  const [message] = await db!.insert(contactMessages).values({
    name: parsed.name,
    email: parsed.email,
    company: parsed.company || null,
    subject: parsed.subject,
    message: parsed.message
  }).returning();

  if (process.env.RESEND_API_KEY && process.env.CONTACT_RECEIVER_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `Portfolio contact: ${parsed.subject}`,
      text: `${parsed.name} <${parsed.email}>${parsed.company ? ` (${parsed.company})` : ""}\n\n${parsed.message}`
    });
  }

  res.status(201).json({ ok: true, id: message.id });
}));

app.post("/api/auth/login", loginLimiter, csrfProtection, asyncHandler(async (req, res) => {
  const parsed = loginSchema.parse(req.body);
  const localEmail = process.env.ADMIN_EMAIL ?? (!isProd ? "admin@local.test" : undefined);
  const localPassword = process.env.ADMIN_PASSWORD ?? (!isProd ? "change-me-local-admin" : undefined);
  const envAdminOk = parsed.email === localEmail && parsed.password === localPassword;
  if (!db || !hasDatabase) {
    if (!envAdminOk) return res.status(401).json({ error: "Invalid email or password" });
    req.session.userId = -1;
    req.session.role = "admin";
    return res.json({ ok: true, user: { email: parsed.email, role: "admin" }, storage: "local" });
  }
  const [user] = await db!.select().from(users).where(eq(users.email, parsed.email));
  const dbOk = user ? await argon2.verify(user.passwordHash, parsed.password) : false;
  if (!envAdminOk && !dbOk) return res.status(401).json({ error: "Invalid email or password" });
  req.session.userId = user?.id ?? -1;
  req.session.role = user?.role ?? "admin";
  res.json({ ok: true, user: { email: parsed.email, role: req.session.role } });
}));

app.post("/api/auth/logout", csrfProtection, (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get("/api/admin/me", (req, res) => {
  res.json({ authenticated: Boolean(req.session.userId), role: req.session.role });
});

app.get("/api/admin/summary", requireAdmin, asyncHandler(async (_req, res) => {
  if (!db || !hasDatabase) return res.json(await localStore.summary());
  const [messageCount, projectCount, articleCount, recentMessages] = await Promise.all([
    db!.select({ value: count() }).from(contactMessages),
    db!.select({ value: count() }).from(projects),
    db!.select({ value: count() }).from(articles).where(eq(articles.published, true)),
    db!.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(6)
  ]);
  res.json({
    messages: messageCount[0].value,
    projects: projectCount[0].value,
    publishedArticles: articleCount[0].value,
    recentMessages
  });
}));

app.get("/api/admin/settings", requireAdmin, asyncHandler(async (_req, res) => {
  if (!db || !hasDatabase) return res.json(await localStore.settings());
  const [row] = await db!.select().from(siteSettings).where(eq(siteSettings.key, "site"));
  res.json(row?.value ?? await localStore.settings());
}));

app.put("/api/admin/settings", requireAdmin, writeLimiter, csrfProtection, asyncHandler(async (req, res) => {
  if (!db || !hasDatabase) return res.json(await localStore.updateSettings(req.body));
  await db!.insert(siteSettings).values({ key: "site", value: req.body }).onConflictDoUpdate({
    target: siteSettings.key,
    set: { value: req.body, updatedAt: new Date() }
  });
  res.json(req.body);
}));

app.post("/api/admin/uploads", requireAdmin, writeLimiter, csrfProtection, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(201).json({ url: `/uploads/${req.file.filename}`, name: req.file.originalname, size: req.file.size });
});

function crud<T extends { id: unknown }>(table: any, schema: any, name: string) {
  app.get(`/api/admin/${name}`, requireAdmin, asyncHandler(async (_req, res) => {
    if (!db || !hasDatabase) return res.json(await localStore.list(name));
    return res.json(await db!.select().from(table).orderBy(desc(table.id)));
  }));
  app.post(`/api/admin/${name}`, requireAdmin, writeLimiter, csrfProtection, asyncHandler(async (req, res) => {
    const parsed = schema.parse(req.body);
    if (!db || !hasDatabase) return res.status(201).json(await localStore.create(name, parsed));
    const [row] = await (db!.insert(table).values(parsed).returning() as Promise<unknown[]>);
    res.status(201).json(row);
  }));
  app.put(`/api/admin/${name}/:id`, requireAdmin, writeLimiter, csrfProtection, asyncHandler(async (req, res) => {
    const parsed = schema.partial().parse(req.body);
    if (!db || !hasDatabase) return res.json(await localStore.update(name, Number(req.params.id), parsed));
    const patch = "updatedAt" in table ? { ...parsed, updatedAt: new Date() } : parsed;
    const [row] = await db!.update(table).set(patch).where(eq(table.id, Number(req.params.id))).returning();
    res.json(row);
  }));
  app.delete(`/api/admin/${name}/:id`, requireAdmin, writeLimiter, csrfProtection, asyncHandler(async (req, res) => {
    if (!db || !hasDatabase) {
      await localStore.delete(name, Number(req.params.id));
      return res.json({ ok: true });
    }
    await db!.delete(table).where(eq(table.id, Number(req.params.id)));
    res.json({ ok: true });
  }));
}

crud(projects, projectInputSchema, "projects");
crud(articles, articleInputSchema, "articles");
crud(skills, skillInputSchema, "skills");
crud(experiences, experienceInputSchema, "experiences");

app.get("/api/admin/messages", requireAdmin, asyncHandler(async (_req, res) => {
  if (!db || !hasDatabase) return res.json(await localStore.messages());
  res.json(await db!.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)));
}));

app.put("/api/admin/messages/:id", requireAdmin, writeLimiter, csrfProtection, asyncHandler(async (req, res) => {
  const status = String(req.body.status ?? "read").slice(0, 40);
  if (!db || !hasDatabase) return res.json(await localStore.updateMessage(Number(req.params.id), status));
  const [row] = await db!.update(contactMessages).set({ status }).where(eq(contactMessages.id, Number(req.params.id))).returning();
  res.json(row);
}));

app.post("/api/analytics", asyncHandler(async (req, res) => {
  if (!db || !hasDatabase) {
    await localStore.analytics(String(req.body.eventName ?? "page_view").slice(0, 120), String(req.body.route ?? "/").slice(0, 255));
    return res.status(204).send();
  }
  await db!.insert((await import("../shared/schema.js")).analyticsEvents).values({
    eventName: String(req.body.eventName ?? "page_view").slice(0, 120),
    route: String(req.body.route ?? "/").slice(0, 255)
  });
  res.status(204).send();
}));

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(`User-agent: *\nAllow: /\nSitemap: ${publicSiteUrl}/sitemap.xml\n`);
});

app.get("/sitemap.xml", asyncHandler(async (_req, res) => {
  const { projects: projectRows, articles: articleRows } = (!db || !hasDatabase)
    ? await localStore.slugs()
    : {
        projects: await db!.select({ slug: projects.slug }).from(projects).where(eq(projects.published, true)),
        articles: await db!.select({ slug: articles.slug }).from(articles).where(eq(articles.published, true))
      };
  const staticRoutes = ["", "/about", "/projects", "/experience", "/insights", "/contact", "/resume", "/privacy"];
  const urls = [
    ...staticRoutes.map((route) => `${publicSiteUrl}${route}`),
    ...projectRows.map((p) => `${publicSiteUrl}/projects/${p.slug}`),
    ...articleRows.map((a) => `${publicSiteUrl}/insights/${a.slug}`)
  ];
  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`);
}));

app.use("/uploads", express.static(uploadDir));
app.use(express.static(staticDir));
app.use((_req, res) => res.sendFile(path.join(staticDir, "index.html")));

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) return res.status(400).json({ error: "Validation failed", details: error.flatten() });
  console.error(error);
  res.status(500).json({ error: "Unexpected server error" });
});

app.listen(port, () => console.log(`Portfolio app listening on http://localhost:${port}`));
