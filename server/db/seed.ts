import "dotenv/config";
import argon2 from "argon2";
import { count, eq } from "drizzle-orm";
import { db, pool } from "./client.js";
import { articles, experiences, projects, siteSettings, skills, users } from "../../shared/schema.js";

if (!db || !pool) throw new Error("DATABASE_URL is required to seed data.");

const projectRows = [
  {
    title: "Multi-Tenant Data Platform for BI Analytics",
    slug: "multi-tenant-data-platform-bi-analytics",
    category: "Data Engineering",
    shortDescription: "A multi-tenant pipeline integrating SQL Server, orchestration workflows, Snowflake, dbt, and Metabase dashboards.",
    fullDescription: "Designed an editable case-study foundation for a BI analytics platform that moves operational data into a governed warehouse layer.",
    challenge: "Operational reporting needed repeatable ingestion, validation, tenant-aware modeling, and dashboard-ready semantic structures.",
    solution: "Modeled source-to-warehouse flows with orchestration, validation checkpoints, dbt transformations, and dashboard delivery.",
    results: "Created a maintainable architecture for BI analytics with clearer ownership, validation, and reporting consistency.",
    architecture: "SQL Server and ERP sources feed orchestrated extraction jobs, Snowflake staging, dbt marts, semantic models, and Metabase dashboards.",
    technologies: ["SQL Server", "Snowflake", "Python", "Prefect/Airflow", "dbt", "Metabase", "Docker"],
    featured: true,
    published: true
  },
  {
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
    published: true
  },
  {
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
    published: true
  }
];

const articleRows = [
  "Designing Multi-Tenant Data Pipelines for BI Platforms",
  "SQL Server to Snowflake: Practical ETL Architecture",
  "Building Reliable Dashboards Beyond Visual Design",
  "Data Quality Controls That Prevent Bad Decisions",
  "OCR to Analytics: Automating Paper-Based Data Collection",
  "Precision Agriculture and Multimodal Data Fusion",
  "dbt and Modern Data Transformation Workflows",
  "Data Engineering Career Roadmap for Morocco"
].map((title, index) => ({
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  excerpt: "A concise technical note reserved for Hamza's future writing, structured for practical engineering readers.",
  content: "This article is an editable draft. Use the admin dashboard to replace this placeholder with concrete lessons, diagrams, and examples.",
  category: index % 2 ? "Analytics Engineering" : "Data Engineering",
  readTime: `${5 + (index % 4)} min`,
  published: index < 4,
  publishedAt: new Date()
}));

const skillRows = [
  ["Data Engineering", "Python", 86], ["Data Engineering", "Pandas", 82], ["Data Engineering", "SQL", 88], ["Data Engineering", "ETL", 84],
  ["Business Intelligence", "Power BI", 84], ["Business Intelligence", "DAX", 76], ["Business Intelligence", "Metabase", 80], ["Business Intelligence", "KPI Design", 82],
  ["Databases", "SQL Server", 84], ["Databases", "PostgreSQL", 78], ["Databases", "Snowflake", 76], ["Databases", "MongoDB", 68],
  ["Cloud & Data Warehousing", "dbt", 74], ["Cloud & Data Warehousing", "Data Warehouse Design", 80], ["Automation & Orchestration", "Airflow", 72], ["Automation & Orchestration", "Prefect", 72],
  ["Full-Stack Development", "React", 78], ["Full-Stack Development", "TypeScript", 76], ["Full-Stack Development", "Node.js", 74], ["DevOps & Collaboration", "Docker", 76],
  ["Machine Learning Foundations", "Scikit-learn", 70], ["Machine Learning Foundations", "Predictive Analytics", 72]
].map(([category, name, level]) => ({ category: String(category), name: String(name), level: Number(level), highlighted: Number(level) >= 80 }));

const experienceRows = [
  {
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

async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const [{ value }] = await db!.select({ value: count() }).from(users).where(eq(users.email, adminEmail));
    if (value === 0) {
      await db!.insert(users).values({ email: adminEmail, passwordHash: await argon2.hash(adminPassword), role: "admin" });
    }
  }

  if ((await db!.select({ value: count() }).from(projects))[0].value === 0) await db!.insert(projects).values(projectRows);
  if ((await db!.select({ value: count() }).from(articles))[0].value === 0) await db!.insert(articles).values(articleRows);
  if ((await db!.select({ value: count() }).from(skills))[0].value === 0) await db!.insert(skills).values(skillRows);
  if ((await db!.select({ value: count() }).from(experiences))[0].value === 0) await db!.insert(experiences).values(experienceRows);
  await db!.insert(siteSettings).values({ key: "profile", value: { linkedin: "#", github: "#", email: "hello@example.com", cvUrl: "/Hamza-Bakh-CV.pdf" } }).onConflictDoNothing();
}

await seed();
await pool.end();
console.log("Seed data ready.");
