import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Article, ContactMessage, Experience, Project, Skill } from "../shared/schema.js";

type LocalStore = {
  profileSourceVersion?: number;
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
    title: "Quality Control Analytics & Reporting System",
    slug: "quality-control-analytics-reporting-system",
    category: "Business Intelligence",
    shortDescription: "Quality-control dashboards for rejection rate, defect rate, grade distribution, conformity, export readiness and trends.",
    fullDescription: "A reporting system for turning production, harvest, packing and quality-control records into structured operational insights.",
    challenge: "Quality teams needed consistent visibility across batches, farms, crops, packing lines and client destinations.",
    solution: "Structured quality-control datasets and Power BI views with validation rules and a KPI framework connecting quality results to operational impact.",
    results: "Improved visibility over quality issues, rejection causes, packing performance and export-readiness signals.",
    architecture: "Production → Harvest → Packing Station → Quality Control → Stock → Export Readiness → Client Delivery.",
    technologies: ["SQL", "Excel", "Power BI", "Data Modeling", "Data Validation", "KPI Reporting"],
    featured: true,
    published: true,
    imageUrl: "",
    createdAt: now(),
    updatedAt: now()
  },
  {
    id: 3,
    title: "Agricultural BI Dashboard Automation",
    slug: "agricultural-bi-dashboard-automation",
    category: "Business Intelligence",
    shortDescription: "Automated agricultural data preparation from Excel and surveys through Python cleaning, SQL Server and Power BI.",
    fullDescription: "A practical workflow that replaced manual spreadsheet preparation with structured validation, reusable transformations and interactive BI outputs.",
    challenge: "Agricultural reporting depended on scattered Excel workflows and repetitive manual corrections.",
    solution: "Built Python/Pandas preparation scripts, SQL Server workflows and Power BI dashboards for operational KPIs.",
    results: "Improved reporting accuracy and accelerated access to agricultural performance insights.",
    architecture: "Excel / survey data → Python cleaning → SQL Server → Power BI.",
    technologies: ["SQL Server", "Python", "Pandas", "NumPy", "Power BI", "Excel"],
    featured: true,
    published: true,
    imageUrl: "",
    createdAt: now(),
    updatedAt: now()
  },
  {
    id: 4,
    title: "OCR-Based Survey Data Automation",
    slug: "ocr-based-survey-data-automation",
    category: "Automation",
    shortDescription: "OCR-assisted survey extraction into clean datasets for Excel, SQL and BI reporting workflows.",
    fullDescription: "An automation workflow that converts paper and semi-structured survey records into validated, analysis-ready data.",
    challenge: "Manual survey transcription created repetitive work and inconsistencies in reporting datasets.",
    solution: "Combined OCR/Tesseract extraction, Python/Pandas cleaning, validation rules and standardized outputs.",
    results: "Reduced manual processing effort and created a reusable foundation for paper-to-digital reporting.",
    architecture: "Paper / scanned forms → OCR extraction → Python cleaning → Excel / SQL outputs → BI reporting.",
    technologies: ["Python", "Pandas", "OCR", "Tesseract", "Excel", "SQL"],
    featured: false,
    published: true,
    imageUrl: "",
    createdAt: now(),
    updatedAt: now()
  },
  {
    id: 5,
    title: "Graduate Tracking Management System",
    slug: "graduate-tracking-management-system",
    category: "Software & Data Systems",
    shortDescription: "Desktop information system for graduate records, administrative follow-up, SQL reporting and Crystal Reports.",
    fullDescription: "A database-driven workflow that centralized student and graduate tracking data previously scattered across spreadsheets.",
    challenge: "Administrative follow-up required a consistent system for students, promotions, internships and insertion records.",
    solution: "Built VB6 modules, SQL database structures, validation rules and Crystal Reports outputs.",
    results: "Contributed to process digitalization and improved consistency through structured storage and reporting logic.",
    architecture: "VB6 desktop application → SQL database → Crystal Reports.",
    technologies: ["Visual Basic 6", "SQL", "SQL Server", "Crystal Reports", "Database Design"],
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
    company: "AGRUPA MARCA",
    role: "Data Analyst | Financial Services Sector",
    location: "Hybrid",
    startDate: "Dec 2025",
    endDate: "May 2026",
    description: "Built analytical datasets and Power BI dashboards for financial and operational reporting, including revenue, expense, budget and KPI monitoring. Improved reporting reliability with SQL optimization, VBA automation and data-quality controls.",
    technologies: ["Power BI", "SQL", "Excel", "VBA", "Data Modeling", "Financial Reporting"],
    displayOrder: 1
  },
  {
    id: 2,
    company: "AGRIDATA CONSULTING",
    role: "Data Engineer",
    location: "Agadir, Morocco · On-site",
    startDate: "Feb 2025",
    endDate: "Jul 2025",
    description: "Designed a multi-tenant embedded-BI platform connecting SQL Server to Snowflake through Python and Prefect, with dbt models and tenant-specific Metabase dashboards.",
    technologies: ["Snowflake", "SQL Server", "Python", "Prefect", "dbt", "Metabase", "Docker"],
    displayOrder: 2
  },
  {
    id: 3,
    company: "AGRIDATA CONSULTING",
    role: "Data Analyst",
    location: "Agadir, Morocco · Hybrid",
    startDate: "Jun 2024",
    endDate: "Sep 2024",
    description: "Automated agricultural data preparation and reporting workflows from Excel and survey files through Python cleaning, SQL Server storage and interactive Power BI dashboards.",
    technologies: ["Python", "Pandas", "NumPy", "SQL Server", "Power BI", "Excel"],
    displayOrder: 3
  },
  {
    id: 4,
    company: "CodSoft",
    role: "Data Scientist",
    location: "Remote",
    startDate: "Jan 2024",
    endDate: "Feb 2024",
    description: "Completed applied machine-learning projects in classification and regression, including Titanic survival, Iris classification, sales prediction and credit-card fraud detection.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning"],
    displayOrder: 4
  },
  {
    id: 5,
    company: "Institut Supérieur des Pêches Maritimes",
    role: "Software Developer — Graduate Tracking System",
    location: "Morocco",
    startDate: "Jun 2023",
    endDate: "Aug 2023",
    description: "Developed a desktop information system for graduate tracking, administrative follow-up and SQL reporting, replacing scattered Excel processes with a central database workflow.",
    technologies: ["Visual Basic 6", "SQL Server", "Crystal Reports", "Database Design"],
    displayOrder: 5
  }
];

const baseSiteSettings: SiteSettings = {
  profile: {
    name: "HAMZA BAKH",
    headline: "Data Engineer & BI | Finance & Operations Analytics | SQL, Python, Snowflake, dbt, Azure & Power BI",
    location: "Morocco",
    email: "hh6118915@gmail.com",
    linkedin: "https://www.linkedin.com/in/hamza-bakh/",
    github: "https://github.com/Hamzabakh1",
    cvUrl: "/Hamza-Bakh-CV.pdf",
    avatarUrl: ""
  },
  home: {
    badge: "Open to Data & BI Opportunities",
    heroTitle: "Building reliable data systems that turn complexity into decisions.",
    heroText: "I turn operational data into trusted finance and operations analytics — from reliable pipelines and governed models to dashboards people can use to make decisions.",
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
    profileSourceVersion: 3,
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
    const store = JSON.parse(raw) as LocalStore;
    if ((store.profileSourceVersion ?? 0) < 3) {
      store.profileSourceVersion = 3;
      store.experiences = baseExperiences;
      store.projects = baseProjects;
      store.siteSettings = {
        ...store.siteSettings,
        profile: baseSiteSettings.profile,
        home: { ...store.siteSettings?.home, ...baseSiteSettings.home },
        about: baseSiteSettings.about,
        contact: baseSiteSettings.contact,
        codeSnippets: store.siteSettings?.codeSnippets?.length ? store.siteSettings.codeSnippets : baseSiteSettings.codeSnippets
      };
      await writeStore(store);
    }
    return store;
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
