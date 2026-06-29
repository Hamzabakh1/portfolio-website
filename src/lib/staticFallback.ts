import type { Content, SiteSettings } from "@/lib/api";

const now = new Date();

export const staticSettings: SiteSettings = {
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
    values: "Clarity, validation, maintainability, business context, accessible interfaces, and honest evidence."
  },
  contact: {
    intro: "For recruiters, founders, collaborators, and research contacts. Share the role, project context, data stack, and timeline so the conversation starts with useful signal.",
    availability: "Available for data engineering, BI, analytics engineering, and full-stack opportunities."
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

export const staticContent: Content = {
  projects: [
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
      createdAt: now,
      updatedAt: now
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
      createdAt: now,
      updatedAt: now
    }
  ],
  articles: [],
  skills: [
    { id: 1, category: "Data Engineering", name: "Python", level: 86, highlighted: true },
    { id: 2, category: "Data Engineering", name: "SQL", level: 88, highlighted: true },
    { id: 3, category: "Business Intelligence", name: "Power BI", level: 84, highlighted: true },
    { id: 4, category: "Cloud & Data Warehousing", name: "Snowflake", level: 76, highlighted: false },
    { id: 5, category: "Full-Stack Development", name: "React", level: 78, highlighted: false }
  ],
  experiences: [
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
    }
  ]
};
