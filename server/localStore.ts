import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Article, ContactMessage, Experience, Project, Skill } from "../shared/schema.js";

type LocalStore = {
  projects: Project[];
  articles: Article[];
  skills: Skill[];
  experiences: Experience[];
  contactMessages: ContactMessage[];
  siteSettings: SiteSettings;
  analyticsEvents: Array<{ id: number; eventName: string; route: string; createdAt: string }>;
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
  codeSnippets: Array<{
    id: number;
    title: string;
    language: string;
    code: string;
  }>;
};

const dataDir = path.resolve(process.cwd(), ".local-data");
const dataFile = path.join(dataDir, "portfolio.json");

function now() {
  return new Date() as unknown as Date;
}

const baseProjects: Project[] = [
  {
    id: 1,
    title: "Multi-Tenant Data Platform for BI Analytics",
    slug: "multi-tenant-data-platform-bi-analytics",
    category: "Data Engineering",
    shortDescription: "A multi-tenant pipeline integrating SQL Server, orchestration workflows, Snowflake, dbt, and Metabase dashboards.",
    fullDescription: "Designed a BI analytics platform concept that moves operational data into a governed warehouse layer with validation checkpoints and dashboard-ready marts.",
    challenge: "Operational reporting needed repeatable ingestion, validation, tenant-aware modeling, and dashboard-ready semantic structures.",
    solution: "Modeled source-to-warehouse flows with orchestration, validation checkpoints, dbt transformations, tenant-aware marts, and dashboard delivery.",
    results: "Created a maintainable architecture for BI analytics with clearer ownership, validation, and reporting consistency.",
    architecture: "SQL Server and ERP sources feed orchestrated extraction jobs, Snowflake staging, dbt marts, semantic models, and Metabase dashboards.",
    technologies: ["SQL Server", "Snowflake", "Python", "Prefect", "Airflow", "dbt", "Metabase", "Docker"],
    featured: true,
    published: true,
    imageUrl: "",
    createdAt: now(),
    updatedAt: now()
  },
  {
    id: 2,
    title: "Business Intelligence Dashboards for ERP Operations",
    slug: "erp-operations-bi-dashboards",
    category: "Business Intelligence",
    shortDescription: "Dashboards for HR, production, inventory, energy consumption, and executive KPI monitoring using ERP data.",
    fullDescription: "Built a BI portfolio pattern for transforming ERP data into operational dashboards and executive KPI monitoring.",
    challenge: "Teams needed consistent, permission-aware reporting across ERP domains without relying on manual spreadsheet updates.",
    solution: "Modeled KPIs, applied DAX and Power Query transformations, and designed dashboards with row-level security concepts.",
    results: "Improved reporting clarity through reusable models, validation checks, and decision-focused dashboard layouts.",
    architecture: "ERP data flows through SQL Server models, Power Query transformations, DAX measures, and Power BI reporting layers.",
    technologies: ["Power BI", "DAX", "Power Query", "SQL Server", "RLS", "ERP Data"],
    featured: true,
    published: true,
    imageUrl: "",
    createdAt: now(),
    updatedAt: now()
  },
  {
    id: 3,
    title: "Paper Questionnaire Automation Pipeline",
    slug: "paper-questionnaire-automation-pipeline",
    category: "Automation",
    shortDescription: "Automated paper questionnaires into structured datasets using OCR/ICR, Python processing, SQL storage, and BI reporting.",
    fullDescription: "A practical pipeline for turning paper-based collection into searchable, validated, analytics-ready datasets.",
    challenge: "Manual transcription slowed analysis and introduced quality risks into downstream reporting.",
    solution: "Combined OCR/ICR capture, Python validation, SQL storage, and dashboard-ready exports.",
    results: "Reduced repetitive processing effort and created a clearer audit path from source forms to reporting outputs.",
    architecture: "Scanned forms move through OCR/ICR extraction, Python cleaning, validation queues, SQL tables, and BI dashboards.",
    technologies: ["Python", "Pandas", "OCR/ICR", "Tesseract", "SQL", "Power BI"],
    featured: true,
    published: true,
    imageUrl: "",
    createdAt: now(),
    updatedAt: now()
  },
  {
    id: 4,
    title: "Data Quality Monitoring Layer for BI Reporting",
    slug: "data-quality-monitoring-layer-bi-reporting",
    category: "Analytics Engineering",
    shortDescription: "Validation rules, freshness checks, anomaly flags, and reporting controls before dashboard publication.",
    fullDescription: "A control layer that helps prevent bad data from reaching executive dashboards by checking freshness, completeness, duplicates, and business rules.",
    challenge: "Dashboards can look polished while hiding stale data, missing records, or KPI calculation drift.",
    solution: "Designed a lightweight validation layer with rule definitions, issue severity, source ownership, and dashboard-readiness checks.",
    results: "Created a stronger path from raw data to trusted reporting without claiming unverified numerical impact.",
    architecture: "Source tables feed validation checks, issue logs, model tests, semantic model gates, and dashboard release notes.",
    technologies: ["SQL", "Python", "dbt tests", "PostgreSQL", "Power BI", "Metabase"],
    featured: false,
    published: true,
    imageUrl: "",
    createdAt: now(),
    updatedAt: now()
  },
  {
    id: 5,
    title: "Precision Agriculture Data Fusion Concept",
    slug: "precision-agriculture-data-fusion-concept",
    category: "Research & AI",
    shortDescription: "A research-oriented architecture for combining field observations, sensor signals, images, and analytics outputs.",
    fullDescription: "A future-facing concept for agriculture analytics that structures multimodal inputs into analysis-ready layers for monitoring and decision support.",
    challenge: "Agriculture data can come from paper forms, sensors, images, weather records, and field observations with different quality levels.",
    solution: "Proposed ingestion, validation, feature storage, model experimentation, and BI layers for transparent research workflows.",
    results: "Positioned the project as an editable research direction without inventing claims or production results.",
    architecture: "Forms, IoT, imagery, and weather inputs flow into validation, feature engineering, experiment tracking, warehouse tables, and dashboards.",
    technologies: ["Python", "Pandas", "Scikit-learn", "PostgreSQL", "IoT Data", "Power BI"],
    featured: false,
    published: true,
    imageUrl: "",
    createdAt: now(),
    updatedAt: now()
  }
];

const baseArticles: Article[] = [
  "Designing Multi-Tenant Data Pipelines for BI Platforms",
  "SQL Server to Snowflake: Practical ETL Architecture",
  "Building Reliable Dashboards Beyond Visual Design",
  "Data Quality Controls That Prevent Bad Decisions",
  "OCR to Analytics: Automating Paper-Based Data Collection",
  "Precision Agriculture and Multimodal Data Fusion",
  "dbt and Modern Data Transformation Workflows",
  "Data Engineering Career Roadmap for Morocco"
].map((title, index) => ({
  id: index + 1,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  excerpt: "A practical engineering note reserved for Hamza's future writing, with a focus on clear architecture, validation, and business usefulness.",
  content: "This article is an editable draft. Replace it with concrete lessons, diagrams, examples, tradeoffs, and links through the admin dashboard.",
  category: index % 2 ? "Analytics Engineering" : "Data Engineering",
  readTime: `${5 + (index % 4)} min`,
  coverImageUrl: "",
  published: index < 6,
  publishedAt: now(),
  createdAt: now(),
  updatedAt: now()
}));

const baseSkills: Skill[] = [
  ["Data Engineering", "Python", 86], ["Data Engineering", "Pandas", 82], ["Data Engineering", "SQL", 88], ["Data Engineering", "ETL", 84], ["Data Engineering", "Data Validation", 82],
  ["Business Intelligence", "Power BI", 84], ["Business Intelligence", "DAX", 76], ["Business Intelligence", "Power Query", 78], ["Business Intelligence", "Metabase", 80], ["Business Intelligence", "KPI Design", 82],
  ["Databases", "SQL Server", 84], ["Databases", "PostgreSQL", 78], ["Databases", "Snowflake", 76], ["Databases", "MySQL", 74], ["Databases", "MongoDB", 68],
  ["Cloud & Data Warehousing", "dbt", 74], ["Cloud & Data Warehousing", "Data Warehouse Design", 80], ["Cloud & Data Warehousing", "Multi-Tenant Architecture", 72],
  ["Automation & Orchestration", "Airflow", 72], ["Automation & Orchestration", "Prefect", 72], ["Automation & Orchestration", "Docker", 76], ["Automation & Orchestration", "Linux", 74],
  ["Full-Stack Development", "React", 78], ["Full-Stack Development", "TypeScript", 76], ["Full-Stack Development", "Node.js", 74], ["Full-Stack Development", "Tailwind CSS", 80],
  ["Machine Learning Foundations", "Scikit-learn", 70], ["Machine Learning Foundations", "Predictive Analytics", 72], ["DevOps & Collaboration", "Git", 82]
].map(([category, name, level], index) => ({ id: index + 1, category: String(category), name: String(name), level: Number(level), highlighted: Number(level) >= 80 }));

const baseExperiences: Experience[] = [
  {
    id: 1,
    company: "Agridata Consulting",
    role: "Data Engineering / BI Projects",
    location: "Morocco",
    startDate: "2024",
    endDate: "Present",
    description: "Data pipelines, Snowflake warehouse integration, Metabase analytics, ERP reporting, OCR automation, and dashboard development.",
    technologies: ["Snowflake", "SQL", "Python", "Metabase", "dbt"],
    displayOrder: 1
  },
  {
    id: 2,
    company: "ITPMT Tan-Tan",
    role: "Application Development Internship",
    location: "Tan-Tan, Morocco",
    startDate: "2023",
    endDate: "2023",
    description: "Developed a graduate tracking application with SQL Server database design, VB6 development, and Crystal Reports.",
    technologies: ["SQL Server", "VB6", "Crystal Reports"],
    displayOrder: 2
  },
  {
    id: 3,
    company: "CodSoft",
    role: "Data Science Projects",
    location: "Remote",
    startDate: "2023",
    endDate: "2023",
    description: "Completed practical projects in sales analysis, fraud detection, Titanic classification, exploratory analysis, and predictive modeling foundations.",
    technologies: ["Python", "Scikit-learn", "Pandas"],
    displayOrder: 3
  }
];

const baseSiteSettings: SiteSettings = {
  profile: {
    name: "HAMZA BAKH",
    headline: "Data Engineer | Data Analyst | BI Developer | Full-Stack Builder",
    location: "Morocco",
    email: "hello@example.com",
    linkedin: "#",
    github: "#",
    cvUrl: "/Hamza-Bakh-CV.pdf",
    avatarUrl: ""
  },
  home: {
    badge: "Open to Data & BI Opportunities",
    heroTitle: "Building reliable data systems that turn complexity into decisions.",
    heroText: "Data Engineer and BI Builder focused on scalable pipelines, cloud data warehouses, analytics automation, and business intelligence solutions.",
    primaryCta: "Explore My Work",
    secondaryCta: "Contact Me",
    trustStrip: ["Data Engineering", "BI & Analytics", "ETL / ELT Pipelines", "Snowflake & SQL", "Power BI & Metabase", "Python Automation", "Full-Stack Development"],
    impactCards: [
      "Automated reporting workflows",
      "Built BI dashboards for operational decision-making",
      "Designed ETL pipelines from SQL Server to cloud warehousing",
      "Worked with large operational datasets",
      "Reduced manual processing time through automation",
      "Improved reporting consistency through validation controls"
    ],
    operatingModel: [
      "Discovery: define business questions, stakeholders, sources, and risks.",
      "Data foundation: profile sources, model entities, and document ownership.",
      "Pipeline delivery: automate extraction, validation, transformation, and monitoring.",
      "Decision layer: publish semantic models, dashboards, and explainable KPI definitions.",
      "Iteration: improve quality controls, performance, documentation, and user adoption."
    ]
  },
  about: {
    title: "Data engineering discipline with product-builder range.",
    body: "Hamza Bakh is a Data Engineer and BI-oriented technology professional focused on building reliable data pipelines, warehouse architectures, automation workflows, and decision-support systems.",
    values: "Clarity, validation, maintainability, business context, accessible interfaces, and honest evidence. The site avoids unverified metrics and keeps content editable through the admin dashboard."
  },
  contact: {
    intro: "For recruiters, founders, collaborators, and research contacts. Share the role, project context, data stack, and timeline so the conversation starts with useful signal.",
    availability: "Available for data engineering, BI, analytics engineering, and full-stack opportunities in Morocco, Europe, and remote-first teams."
  },
  codeSnippets: [
    {
      id: 1,
      title: "Freshness Check",
      language: "sql",
      code: "select source_name, max(updated_at) as last_seen\nfrom analytics.source_audit\ngroup by source_name\nhaving max(updated_at) < now() - interval '24 hours';"
    }
  ]
};

function initialStore(): LocalStore {
  return {
    projects: baseProjects,
    articles: baseArticles,
    skills: baseSkills,
    experiences: baseExperiences,
    contactMessages: [],
    siteSettings: baseSiteSettings,
    analyticsEvents: []
  };
}

async function readStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(dataFile, "utf8");
    return JSON.parse(raw) as LocalStore;
  } catch {
    const store = initialStore();
    await writeStore(store);
    return store;
  }
}

async function writeStore(store: LocalStore) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(store, null, 2), "utf8");
}

function nextId(rows: Array<{ id: number }>) {
  return rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
}

function collection(store: LocalStore, name: string) {
  if (name === "projects") return store.projects;
  if (name === "articles") return store.articles;
  if (name === "skills") return store.skills;
  if (name === "experiences") return store.experiences;
  throw new Error(`Unknown collection: ${name}`);
}

export const localStore = {
  async content() {
    const store = await readStore();
    return {
      projects: store.projects.filter((project) => project.published).sort((a, b) => Number(b.featured) - Number(a.featured)),
      articles: store.articles.filter((article) => article.published),
      skills: store.skills,
      experiences: store.experiences.sort((a, b) => a.displayOrder - b.displayOrder)
    };
  },

  async settings() {
    const store = await readStore();
    if (!store.siteSettings) {
      store.siteSettings = baseSiteSettings;
      await writeStore(store);
    }
    return store.siteSettings;
  },

  async updateSettings(settings: SiteSettings) {
    const store = await readStore();
    store.siteSettings = settings;
    await writeStore(store);
    return settings;
  },

  async project(slug: string) {
    const store = await readStore();
    return store.projects.find((project) => project.slug === slug && project.published);
  },

  async article(slug: string) {
    const store = await readStore();
    return store.articles.find((article) => article.slug === slug && article.published);
  },

  async contact(input: Omit<ContactMessage, "id" | "status" | "createdAt">) {
    const store = await readStore();
    const message: ContactMessage = { ...input, id: nextId(store.contactMessages), status: "new", createdAt: now() };
    store.contactMessages.unshift(message);
    await writeStore(store);
    return message;
  },

  async summary() {
    const store = await readStore();
    return {
      messages: store.contactMessages.length,
      projects: store.projects.length,
      publishedArticles: store.articles.filter((article) => article.published).length,
      recentMessages: store.contactMessages.slice(0, 6)
    };
  },

  async list(name: string) {
    const store = await readStore();
    return [...collection(store, name)].sort((a, b) => Number(b.id) - Number(a.id));
  },

  async create(name: string, data: Record<string, unknown>) {
    const store = await readStore();
    const rows = collection(store, name);
    const row = { ...data, id: nextId(rows), createdAt: now(), updatedAt: now() };
    rows.unshift(row as never);
    await writeStore(store);
    return row;
  },

  async update(name: string, id: number, data: Record<string, unknown>) {
    const store = await readStore();
    const rows = collection(store, name);
    const index = rows.findIndex((row) => row.id === id);
    if (index === -1) return undefined;
    rows[index] = { ...rows[index], ...data, updatedAt: now() } as never;
    await writeStore(store);
    return rows[index];
  },

  async delete(name: string, id: number) {
    const store = await readStore();
    const rows = collection(store, name);
    const index = rows.findIndex((row) => row.id === id);
    if (index >= 0) rows.splice(index, 1);
    await writeStore(store);
  },

  async messages() {
    const store = await readStore();
    return store.contactMessages;
  },

  async updateMessage(id: number, status: string) {
    const store = await readStore();
    const message = store.contactMessages.find((row) => row.id === id);
    if (message) message.status = status;
    await writeStore(store);
    return message;
  },

  async analytics(eventName: string, route: string) {
    const store = await readStore();
    store.analyticsEvents.unshift({ id: nextId(store.analyticsEvents), eventName, route, createdAt: new Date().toISOString() });
    await writeStore(store);
  },

  async slugs() {
    const store = await readStore();
    return {
      projects: store.projects.filter((project) => project.published).map((project) => ({ slug: project.slug })),
      articles: store.articles.filter((article) => article.published).map((article) => ({ slug: article.slug }))
    };
  }
};
