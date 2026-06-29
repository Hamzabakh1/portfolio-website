import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "fr";

const dictionary = {
  en: {
    nav: { home: "Home", about: "About", projects: "Projects", experience: "Experience", insights: "Insights", contact: "Contact", resume: "Resume" },
    heroTitle: "Building reliable data systems that turn complexity into decisions.",
    heroText: "Data Engineer and BI Builder focused on scalable pipelines, cloud data warehouses, analytics automation, and business intelligence solutions.",
    explore: "Explore My Work",
    contact: "Contact Me",
    cv: "Download CV",
    available: "Open to Data & BI Opportunities",
    dataDriven: "Let's build something data-driven.",
    send: "Send Message",
    success: "Message sent. Thanks for reaching out.",
    error: "Something went wrong. Please try again.",
    caseStudy: "View Case Study",
    readArticle: "Read Article",
    all: "All",
    impactEyebrow: "Impact",
    impactTitle: "Evidence-oriented work, ready for verified metrics.",
    projectsEyebrow: "Selected Work",
    projectsTitle: "Featured data systems and analytics products.",
    architectureEyebrow: "Architecture",
    architectureTitle: "From Raw Data to Decision",
    skillsEyebrow: "Skills",
    skillsTitle: "Technical matrix across data and product delivery.",
    experienceEyebrow: "Experience",
    experienceTitle: "A practical path through BI, data engineering, and applied analytics.",
    insightsEyebrow: "Insights",
    insightsTitle: "Technical notes and future research directions.",
    modelEyebrow: "Operating Model",
    modelTitle: "A more solid model for how the work is delivered.",
    modelItems: [
      "Discovery: define business questions, stakeholders, sources, and risks.",
      "Data foundation: profile sources, model entities, and document ownership.",
      "Pipeline delivery: automate extraction, validation, transformation, and monitoring.",
      "Decision layer: publish semantic models, dashboards, and explainable KPI definitions.",
      "Iteration: improve quality controls, performance, documentation, and user adoption."
    ],
    aboutTitle: "Data engineering discipline with product-builder range.",
    aboutBody: "Hamza Bakh is a Data Engineer and BI-oriented technology professional focused on building reliable data pipelines, warehouse architectures, automation workflows, and decision-support systems.",
    aboutValues: "Clarity, validation, maintainability, business context, accessible interfaces, and honest evidence. The site avoids unverified metrics and keeps content editable through the admin dashboard.",
    contactIntro: "For recruiters, founders, collaborators, and research contacts. Share the role, project context, data stack, and timeline so the conversation starts with useful signal.",
    resumeTitle: "Hamza Bakh — Data Engineer | Data Analyst | BI Developer",
    resumeIntro: "A PDF can be placed at public/Hamza-Bakh-CV.pdf. The button remains stable for deployment and recruiter sharing.",
    privacyTitle: "Privacy policy",
    privacyBody: "Contact form submissions are stored securely for professional follow-up. Messages include the information you provide: name, email, organization, subject, and message.",
    formName: "Full name",
    formEmail: "Email",
    formCompany: "Company / Organization",
    formSubject: "Subject",
    formMessage: "Message",
    privacy: "Privacy",
    notFound: "This page is not in the pipeline.",
    backHome: "Back Home"
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", projects: "Projets", experience: "Expérience", insights: "Articles", contact: "Contact", resume: "CV" },
    heroTitle: "Construire des systèmes de données fiables qui transforment la complexité en décisions.",
    heroText: "Data Engineer et BI Builder orienté pipelines scalables, entrepôts cloud, automatisation analytique et solutions décisionnelles.",
    explore: "Voir les projets",
    contact: "Me contacter",
    cv: "Télécharger le CV",
    available: "Ouvert aux opportunités Data & BI",
    dataDriven: "Construisons quelque chose avec les données.",
    send: "Envoyer",
    success: "Message envoyé. Merci pour votre prise de contact.",
    error: "Une erreur est survenue. Veuillez réessayer.",
    caseStudy: "Voir l'étude de cas",
    readArticle: "Lire l'article",
    all: "Tous",
    impactEyebrow: "Impact",
    impactTitle: "Un travail fondé sur des preuves, prêt pour des métriques vérifiées.",
    projectsEyebrow: "Projets sélectionnés",
    projectsTitle: "Systèmes data et produits analytiques mis en avant.",
    architectureEyebrow: "Architecture",
    architectureTitle: "De la donnée brute à la décision",
    skillsEyebrow: "Compétences",
    skillsTitle: "Matrice technique entre data, BI et développement produit.",
    experienceEyebrow: "Expérience",
    experienceTitle: "Un parcours pratique entre BI, data engineering et analytique appliquée.",
    insightsEyebrow: "Articles",
    insightsTitle: "Notes techniques et pistes de recherche futures.",
    modelEyebrow: "Modèle de travail",
    modelTitle: "Un modèle plus solide pour livrer les projets.",
    modelItems: [
      "Cadrage : définir les questions métier, les acteurs, les sources et les risques.",
      "Fondation data : profiler les sources, modéliser les entités et documenter la propriété.",
      "Pipelines : automatiser l'extraction, la validation, la transformation et le monitoring.",
      "Couche décisionnelle : publier des modèles sémantiques, dashboards et définitions KPI claires.",
      "Itération : améliorer les contrôles qualité, la performance, la documentation et l'adoption."
    ],
    aboutTitle: "Discipline data engineering avec une vision de builder produit.",
    aboutBody: "Hamza Bakh est un professionnel orienté Data Engineering et BI, concentré sur les pipelines fiables, les architectures warehouse, l'automatisation et les systèmes d'aide à la décision.",
    aboutValues: "Clarté, validation, maintenabilité, contexte métier, interfaces accessibles et preuves honnêtes. Le site évite les métriques non vérifiées et garde le contenu modifiable depuis l'administration.",
    contactIntro: "Pour les recruteurs, fondateurs, collaborateurs et contacts recherche. Partagez le rôle, le contexte projet, la stack data et le calendrier pour démarrer avec un signal utile.",
    resumeTitle: "Hamza Bakh — Data Engineer | Data Analyst | BI Developer",
    resumeIntro: "Un PDF peut être placé dans public/Hamza-Bakh-CV.pdf. Le bouton reste stable pour le déploiement et le partage avec les recruteurs.",
    privacyTitle: "Politique de confidentialité",
    privacyBody: "Les messages du formulaire sont stockés pour le suivi professionnel. Ils incluent les informations fournies : nom, email, organisation, sujet et message.",
    formName: "Nom complet",
    formEmail: "Email",
    formCompany: "Entreprise / Organisation",
    formSubject: "Sujet",
    formMessage: "Message",
    privacy: "Confidentialité",
    notFound: "Cette page n'est pas dans le pipeline.",
    backHome: "Retour à l'accueil"
  }
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof dictionary.en;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");
  const value = useMemo(() => ({
    lang,
    setLang: (next: Lang) => {
      localStorage.setItem("lang", next);
      setLang(next);
    },
    t: dictionary[lang]
  }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
