export type LinkedInExperience = {
  id: string;
  role: string;
  company: string;
  employment: string;
  period: string;
  location: string;
  mode: string;
  summary: string;
  bullets: string[];
  technologies: string[];
  linkedinUrl: string;
  companyUrl: string;
  icon: "finance" | "platform" | "agriculture" | "analytics" | "science" | "software";
};

export type LinkedInCertification = {
  name: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  skills: string[];
  credentialUrl: string;
};

export type LinkedInProject = {
  name: string;
  period?: string;
  summary: string;
  stack: string[];
  impact: string;
  associatedWith?: string;
  linkedinUrl: string;
  githubUrl?: string;
  portfolioPath?: string;
  icon: "quality" | "platform" | "agriculture" | "ocr" | "software" | "observability" | "finance";
};

export type LinkedInPost = {
  title: string;
  date: string;
  excerpt: string;
  topics: string[];
  impressions?: string;
  reactions?: string;
  url: string;
};

export const linkedinProfile = {
  name: "Hamza BAKH",
  headline: "Data Engineer & BI | Building Reliable Finance & Operations Analytics | SQL, Python, Snowflake, dbt, Azure & Power BI",
  location: "Morocco",
  followers: "4,261",
  connections: "500+",
  education: "École Polytechnique d'Agadir",
  degree: "Engineer’s Degree – Computer Engineering",
  educationDates: "Sep 2020 – Jul 2025",
  openTo: "Recruiters only · United Kingdom +4 more · On-site · Hybrid · Remote",
  profileUrl: "https://www.linkedin.com/in/hamza-bakh/",
  experiences: [
    {
      id: "agrupa-finance-analyst",
      role: "Data Analyst | Financial Services Sector",
      company: "AGRUPA MARCA",
      employment: "Contract",
      period: "Dec 2025 – May 2026 · 6 mos",
      location: "Morocco",
      mode: "Hybrid",
      summary: "Supporting Business Intelligence and Data Engineering initiatives in financial services through reporting layers, KPI monitoring and decision-support dashboards.",
      bullets: [
        "Built analytical datasets for financial and operational reporting using SQL and dimensional modeling.",
        "Developed Power BI dashboards for revenue, expenses, budgets, operational performance and reporting health.",
        "Optimized SQL queries, reporting logic and data structures for reliable refreshes.",
        "Automated recurring Excel reporting workflows with VBA and applied data quality validation rules.",
        "Translated stakeholder requirements into clear metrics, dashboards and analytical outputs."
      ],
      technologies: ["Power BI", "SQL", "Excel", "VBA", "Data Modeling", "ETL/ELT", "Financial Reporting", "KPI Dashboards"],
      linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/experience/edit/forms/2829986280/",
      companyUrl: "https://www.linkedin.com/company/6843455/",
      icon: "finance"
    },
    {
      id: "agridata-data-engineer",
      role: "Data Engineer",
      company: "AGRIDATA CONSULTING",
      employment: "Internship",
      period: "Feb 2025 – Jul 2025 · 6 mos",
      location: "Agadir, Souss-Massa, Morocco",
      mode: "On-site",
      summary: "Designed a multi-tenant platform for embedded Business Intelligence from operational SQL Server data to Snowflake, dbt and Metabase.",
      bullets: [
        "Designed the end-to-end flow from operational databases to business-ready dashboards.",
        "Built Python ETL/ELT workflows and used Prefect to orchestrate and monitor execution.",
        "Structured tenant-aware datasets for controlled reporting access and consistent KPIs.",
        "Developed dbt models, Snowflake schemas and analytical views for scalable reporting.",
        "Integrated Metabase dashboards and documented architecture, data flows and decisions."
      ],
      technologies: ["Snowflake", "SQL Server", "Python", "SQL", "dbt", "Prefect", "Metabase", "Docker", "Git"],
      linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/experience/edit/forms/2448283529/",
      companyUrl: "https://www.linkedin.com/company/9225706/",
      icon: "platform"
    },
    {
      id: "agridata-data-analyst",
      role: "Data Analyst",
      company: "AGRIDATA CONSULTING",
      employment: "Internship",
      period: "Jun 2024 – Sep 2024 · 4 mos",
      location: "Agadir, Souss-Massa, Morocco",
      mode: "Hybrid",
      summary: "Automated agricultural data preparation and BI reporting, replacing manual Excel workflows with Python validation, SQL Server storage and Power BI dashboards.",
      bullets: [
        "Automated ingestion and preparation of agricultural survey and operational files.",
        "Developed Pandas and NumPy scripts for cleaning, validation, standardization and transformation.",
        "Built SQL Server preparation workflows and Power BI dashboards for agricultural KPIs.",
        "Standardized cleaning rules and reusable preparation workflows to reduce manual corrections.",
        "Translated business reporting needs into indicators, dashboards and operational insights."
      ],
      technologies: ["SQL Server", "Python", "Pandas", "NumPy", "Power BI", "Excel", "Data Cleaning", "Data Validation"],
      linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/experience/edit/forms/2691341312/",
      companyUrl: "https://www.linkedin.com/company/9225706/",
      icon: "agriculture"
    },
    {
      id: "codsoft-data-scientist",
      role: "Data Scientist",
      company: "CodSoft",
      employment: "Internship",
      period: "Jan 2024 – Feb 2024 · 2 mos",
      location: "Remote",
      mode: "Remote",
      summary: "Completed applied machine-learning projects across exploratory analysis, preprocessing, model training, evaluation and interpretation.",
      bullets: [
        "Performed exploratory analysis on missing values, distributions, correlations and targets.",
        "Prepared datasets with Python, Pandas and NumPy for modeling workflows.",
        "Built classification and regression models with Scikit-learn.",
        "Evaluated models with accuracy, precision, recall, F1-score and regression error metrics.",
        "Delivered Titanic, Iris, Sales Prediction and Credit Card Fraud Detection projects."
      ],
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Data Analysis", "Classification", "Regression"],
      linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/experience/edit/forms/2340607218/",
      companyUrl: "https://www.linkedin.com/company/95014631/",
      icon: "science"
    },
    {
      id: "ispm-software-developer",
      role: "Software Developer – Graduate Tracking Management System",
      company: "Institut Supérieur des Pêches Maritimes",
      employment: "Internship",
      period: "Jun 2023 – Aug 2023 · 3 mos",
      location: "Morocco",
      mode: "On-site",
      summary: "Built a desktop information system for graduate tracking, administrative follow-up, SQL reporting and data management workflows.",
      bullets: [
        "Built Visual Basic 6 modules for student and graduate record management.",
        "Designed SQL storage for students, promotions, internships and follow-up records.",
        "Implemented forms, business rules, validation and reporting workflows.",
        "Developed Crystal Reports outputs for administrative statistics and cohort follow-up.",
        "Replaced scattered Excel processes with a centralized database-driven workflow."
      ],
      technologies: ["Visual Basic 6", "SQL", "SQL Server", "Crystal Reports", "Database Design", "Reporting"],
      linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/experience/edit/forms/2777681815/",
      companyUrl: "https://www.linkedin.com/company/73240373/",
      icon: "software"
    }
  ] satisfies LinkedInExperience[],
  certifications: [
    { name: "CFI Financial Analysis and Modeling Professional Certificate", issuer: "Corporate Finance Institute® (CFI)", issued: "Sep 2026", skills: ["Microsoft Excel"], credentialUrl: "https://www.linkedin.com/learning/certificates/1ac274f69b1a14274b53e5483252aa679b252d8fb95eef5cc2b3bddf669a420d/" },
    { name: "Microsoft Azure Essentials Professional Certificate", issuer: "Microsoft", issued: "Aug 2026", skills: ["Microsoft Azure"], credentialUrl: "https://www.linkedin.com/learning/certificates/023f1f16c72b4fadfca686a22742836e4519e64fe2e505e9596768d492260406/" },
    { name: "Docker Foundations Professional Certificate", issuer: "Docker, Inc", issued: "Sep 2025", skills: ["Docker Products", "Containerization"], credentialUrl: "https://www.linkedin.com/learning/certificates/feb3411ff3e6ea0f2eab848fa5e68ae96541eceeee973f69a2ca7bef6b1da6cc/" },
    { name: "Data Engineering Professional Certificate", issuer: "Snowflake", issued: "Nov 2025", skills: ["Snowflake", "Data Engineering", "Data Warehousing"], credentialUrl: "https://www.linkedin.com/learning/certificates/64ff42ef7b2eacd9f402fd164fe235290c38f384d6fa0d0a91664ac9f2ef5bec/" },
    { name: "Advanced Data Engineering with Snowflake", issuer: "Snowflake", issued: "Nov 2025", skills: ["Snowflake", "DevOps", "Data Engineering"], credentialUrl: "https://www.linkedin.com/learning/certificates/9820d01988b3956879d2f65f9d1256c5d1bf71816d081c95725480fbf2cad3d5/" },
    { name: "Data Engineer", issuer: "DataCamp", issued: "Nov 2025 · Expires Nov 2027", credentialId: "DE0012528224394", skills: ["Engineering Data Management", "Data Engineering"], credentialUrl: "https://www.datacamp.com/certificate/DE0012528224394" },
    { name: "DevOps Professional Certificate", issuer: "PagerDuty", issued: "Sep 2025", skills: ["DevOps", "Infrastructure as code"], credentialUrl: "https://www.linkedin.com/learning/certificates/f4d329242b93a4eab6c5be2c06b3d8f3098d5c7dacf4f5d428c8a43dea627315/" },
    { name: "Data Engineering Foundations Professional Certificate", issuer: "Astronomer", issued: "Sep 2025", skills: ["SQL", "Data Warehousing", "Data Engineering"], credentialUrl: "https://www.linkedin.com/learning/certificates/ca2ac7a96e2bda2ded9d02a71522ccd3917c435cb3271f55bb21901edd23ab34/" },
    { name: "Google Project Management Specialization", issuer: "Google", issued: "Dec 2024", credentialId: "XAKTJ8MQG1D8", skills: ["Project Management"], credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/XAKTJ8MQG1D8" },
    { name: "Google Business Intelligence Specialization", issuer: "Google", issued: "Dec 2024", credentialId: "3I02WKF0K1Z6", skills: ["Business Intelligence", "Data Visualization"], credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/3I02WKF0K1Z6" }
  ] satisfies LinkedInCertification[],
  projects: [
    { name: "Quality Control Analytics & Reporting System", period: "Nov 2025 – May 2026", summary: "Quality-control analytics connecting production, harvest, packing, stock, export readiness and client delivery.", stack: ["SQL", "Excel", "Power BI", "Data Modeling", "Data Validation"], impact: "Tracked rejection, defect, grade, conformity and export-readiness KPIs by batch, farm, crop and destination.", associatedWith: "AGRUPA MARCA", linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/projects/edit/forms/1159273430/", portfolioPath: "/projects/data-quality", icon: "quality" },
    { name: "Multi-Tenant Data Platform for Embedded BI", period: "Feb 2025 – Jul 2025", summary: "Tenant-aware analytics platform connecting operational SQL Server data to Snowflake, dbt and Metabase Embedded.", stack: ["SQL Server", "Python", "Prefect", "Snowflake", "dbt", "Metabase Embedded", "Docker"], impact: "Centralized multi-client analytics into reusable pipelines, modeled datasets and controlled dashboards.", associatedWith: "AGRIDATA CONSULTING", linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/projects/edit/forms/1996418265/", githubUrl: "https://github.com/Hamzabakh1/PRJ_ETL_METABASE_PFE1", portfolioPath: "/projects/multi-tenant-data-platform-bi-analytics", icon: "platform" },
    { name: "Agricultural BI Dashboard Automation", period: "Jun 2024 – Sep 2024", summary: "Agricultural survey and operational reporting workflow from Excel files through Python cleaning and SQL Server into Power BI.", stack: ["Python", "Pandas", "NumPy", "SQL Server", "Power BI", "Excel"], impact: "Reduced manual corrections and accelerated access to agricultural performance insights.", associatedWith: "AGRIDATA CONSULTING", linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/projects/edit/forms/1158889472/", portfolioPath: "/projects/agricultural-bi-dashboard-automation", icon: "agriculture" },
    { name: "OCR-Based Survey Data Automation", period: "Jun 2024 – Sep 2024", summary: "Paper and scanned survey forms converted into clean, structured datasets for Excel, SQL and BI reporting.", stack: ["Python", "Pandas", "OCR", "Tesseract", "Excel", "SQL"], impact: "Reduced repetitive manual entry and created a reusable paper-to-digital reporting workflow.", associatedWith: "AGRIDATA CONSULTING", linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/projects/edit/forms/1159569375/", portfolioPath: "/projects/ocr-based-survey-data-automation", icon: "ocr" },
    { name: "Graduate Tracking Management System", period: "Jul 2023 – Aug 2023", summary: "Desktop application for student and graduate records, administrative follow-up, SQL storage and Crystal Reports.", stack: ["Visual Basic 6", "SQL Server", "Crystal Reports", "Database Design"], impact: "Replaced scattered spreadsheets with a centralized database-driven administrative workflow.", associatedWith: "Institut Supérieur des Pêches Maritimes", linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/projects/edit/forms/1158968441/", portfolioPath: "/projects/graduate-tracking-management-system", icon: "software" },
    { name: "Database Reliability & Observability Stack", summary: "Production-style PostgreSQL observability stack with metrics, alert rules, Grafana dashboards and failure-drill runbooks.", stack: ["PostgreSQL", "Prometheus", "Alertmanager", "Grafana", "Docker"], impact: "Makes database health, alerting and recovery behavior visible and testable.", linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/projects/", githubUrl: "https://github.com/Hamzabakh1/db-infra-observability-stack", icon: "observability" },
    { name: "Enterprise Data Infrastructure & Observability Platform", summary: "End-to-end data infrastructure combining quality controls, PostgreSQL, messaging, monitoring, alerting and incident recovery.", stack: ["Python", "PostgreSQL", "Docker", "Prometheus", "Grafana"], impact: "Provides a complete local lab for reliable data-platform operations.", linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/projects/", githubUrl: "https://github.com/Hamzabakh1/enterprise-data-infra-lab", icon: "observability" },
    { name: "Finance Planning, Forecasting & Analytics Platform", summary: "Budget, actuals and forecast model with variance analysis, reconciliation controls and analytics-ready outputs.", stack: ["Python", "SQL", "DAX", "Power BI"], impact: "Connects financial planning inputs to decision-ready variance and forecast views.", linkedinUrl: "https://www.linkedin.com/in/hamza-bakh/details/projects/", githubUrl: "https://github.com/Hamzabakh1/finance-planning-analytics", portfolioPath: "/demos/finance-planning", icon: "finance" }
  ] satisfies LinkedInProject[],
  skills: [
    { name: "Microsoft SQL Server", category: "Data platforms", evidence: "Endorsed · used at AGRIDATA CONSULTING", icon: "database" },
    { name: "Data Engineering (ETL/ELT & Data Modeling)", category: "Engineering", evidence: "Applied across finance, agriculture and embedded BI", icon: "pipeline" },
    { name: "SQL Optimization & Performance Tuning", category: "Engineering", evidence: "Reporting reliability and refresh performance", icon: "gauge" },
    { name: "Power BI Dashboard Development", category: "BI & analytics", evidence: "Financial, agricultural and quality-control dashboards", icon: "chart" },
    { name: "Financial & Operational Analytics", category: "BI & analytics", evidence: "KPI, variance, revenue and operational reporting", icon: "finance" },
    { name: "Data Modeling", category: "Engineering", evidence: "Dimensional models, analytical views and semantic layers", icon: "model" },
    { name: "Python · Pandas · NumPy", category: "Programming", evidence: "Cleaning, validation, ETL and analysis workflows", icon: "code" },
    { name: "Snowflake · dbt", category: "Cloud warehouse", evidence: "Multi-tenant platform and modeled reporting layers", icon: "warehouse" },
    { name: "Prefect", category: "Orchestration", evidence: "Pipeline orchestration and execution visibility", icon: "workflow" },
    { name: "Metabase", category: "BI & analytics", evidence: "Embedded tenant-aware dashboards", icon: "dashboard" },
    { name: "Data Monitoring", category: "Reliability", evidence: "Quality checks, alerts and observability labs", icon: "monitor" },
    { name: "Docker · Git/GitHub", category: "Delivery", evidence: "Containerized local labs and source-linked projects", icon: "tool" },
    { name: "OCR · Tesseract", category: "Automation", evidence: "Paper-to-digital survey workflow", icon: "scan" },
    { name: "VBA Excel", category: "Automation", evidence: "Recurring financial reporting automation", icon: "sheet" },
    { name: "Financial Reporting", category: "Domain", evidence: "AGRUPA MARCA financial-services contract", icon: "report" }
  ],
  recommendations: [
    {
      author: "Nabil Ayoub",
      role: "Head of IT & Management Control",
      relationship: "Managed Hamza directly",
      date: "August 25, 2025",
      text: "Hamza is without a doubt one of the best interns we've had. He took initiative, planned his work carefully, didn't bother us with too many meetings and asked for guidance when he really needed it. His learning capacity and speed are also exceptional. Couldn't recommend more a junior for a data engineering role!",
      linkedinUrl: "https://www.linkedin.com/in/nabil-ayoub/en/"
    }
  ],
  posts: [
    { title: "I don’t just work with data. I make it speak.", date: "Apr 2026", excerpt: "Pipelines, real-world datasets and end-to-end delivery across agriculture and financial data.", topics: ["Data Engineering", "Data Analytics", "ETL", "Python", "SQL"], impressions: "4,087", reactions: "45", url: "https://www.linkedin.com/feed/update/urn:li:activity:7454457505239166976/" },
    { title: "The data industry is asking the wrong question", date: "Apr 2026", excerpt: "Before choosing a model, teams need data quality, governance, observability and trust.", topics: ["Data Engineering", "Data Quality", "Analytics Engineering", "Data Governance"], impressions: "944", reactions: "8", url: "https://www.linkedin.com/feed/update/urn:li:activity:7446858915138392064/" },
    { title: "I stopped asking ‘Will AI take my job?’ and started analyzing my tasks.", date: "Mar 2026", excerpt: "A practical reflection on automation, exploration, debugging and the human work of framing decisions.", topics: ["Future of Work", "Data Engineering", "Data Analytics"], impressions: "569", reactions: "8", url: "https://www.linkedin.com/feed/update/urn:li:activity:7445030476211462145/" },
    { title: "Morocco Data Teams: Your Vector Latency Nightmare Might Be Over", date: "Feb 2026", excerpt: "Regional vector infrastructure, feedback loops and production latency for data teams in Morocco.", topics: ["Data Engineering", "Vector Databases", "RAG", "MLOps"], impressions: "545", reactions: "5", url: "https://www.linkedin.com/feed/update/urn:li:activity:7432366277496606720/" },
    { title: "Morocco Data Teams: Our Governance Gap Just Got Exposed", date: "Feb 2026", excerpt: "Change-as-code, approvals, rollback and auditability for reliable Snowflake and BI delivery.", topics: ["Data Governance", "Snowflake", "Data Engineering", "EMEA"], impressions: "548", reactions: "6", url: "https://www.linkedin.com/feed/update/urn:li:activity:7431638946037559297/" },
    { title: "Your data platform isn’t a cost center. It’s a P&L lever.", date: "Feb 2026", excerpt: "Why data engineering decisions should connect latency, quality and platform architecture to financial value.", topics: ["Data Engineering", "Finance", "DataOps", "Morocco Tech"], impressions: "640", reactions: "9", url: "https://www.linkedin.com/feed/update/urn:li:activity:7428020282369560576/" }
  ] satisfies LinkedInPost[]
};
