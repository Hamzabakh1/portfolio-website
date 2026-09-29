import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/Home";

const AdminPage = lazy(() => import("@/pages/Admin").then((m) => ({ default: m.AdminPage })));
const ArticleDetail = lazy(() => import("@/pages/Insights").then((m) => ({ default: m.ArticleDetail })));
const InsightsPage = lazy(() => import("@/pages/Insights").then((m) => ({ default: m.InsightsPage })));
const ContactPage = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.ContactPage })));
const ExperiencePage = lazy(() => import("@/pages/Experience").then((m) => ({ default: m.ExperiencePage })));
const NotFoundPage = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFoundPage })));
const ProjectDetail = lazy(() => import("@/pages/Projects").then((m) => ({ default: m.ProjectDetail })));
const ProjectsPage = lazy(() => import("@/pages/Projects").then((m) => ({ default: m.ProjectsPage })));
const ResumePage = lazy(() => import("@/pages/Resume").then((m) => ({ default: m.ResumePage })));
const StaticPage = lazy(() => import("@/pages/Static").then((m) => ({ default: m.StaticPage })));
const DemosPage = lazy(() => import("@/pages/Demos").then((m) => ({ default: m.DemosPage })));
const DemoPage = lazy(() => import("@/pages/Demos").then((m) => ({ default: m.DemoPage })));

export default function App() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-ink text-emerald">Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<StaticPage type="about" />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/demos" element={<DemosPage />} />
          <Route path="/demos/:slug" element={<DemoPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<ArticleDetail />} />
          <Route path="/articles" element={<InsightsPage />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/cv" element={<ResumePage />} />
          <Route path="/privacy" element={<StaticPage type="privacy" />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
}
