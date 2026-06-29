import { motion } from "framer-motion";
import { Database, BarChart3, Server, Workflow } from "lucide-react";

export function DataVisual() {
  const nodes = [
    { icon: Server, label: "ERP", x: "10%", y: "24%" },
    { icon: Workflow, label: "ETL", x: "38%", y: "52%" },
    { icon: Database, label: "DWH", x: "66%", y: "24%" },
    { icon: BarChart3, label: "BI", x: "78%", y: "66%" }
  ];
  return (
    <div className="gradient-border relative min-h-[360px] overflow-hidden rounded-lg bg-panel/70 p-6 shadow-glow">
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 500 360" aria-hidden="true">
        <defs>
          <linearGradient id="line" x1="0" x2="1">
            <stop offset="0%" stopColor="#32f5a7" />
            <stop offset="100%" stopColor="#37d5ff" />
          </linearGradient>
        </defs>
        {["M80 90 C160 40 220 210 310 90 S410 210 430 250", "M80 250 C150 220 210 120 310 180 S400 130 430 90"].map((d, index) => (
          <motion.path key={d} d={d} fill="none" stroke="url(#line)" strokeWidth="2" strokeDasharray="8 12" initial={{ pathLength: 0 }} animate={{ pathLength: 1, strokeDashoffset: [0, -40] }} transition={{ duration: 4 + index, repeat: Infinity, ease: "linear" }} />
        ))}
      </svg>
      <div className="absolute inset-0 grid-surface opacity-30" />
      {nodes.map(({ icon: Icon, label, x, y }, index) => (
        <motion.div key={label} className="absolute rounded-lg border border-white/15 bg-ink/80 p-4 shadow-2xl backdrop-blur" style={{ left: x, top: y }} whileHover={{ y: -6, scale: 1.03 }} animate={{ y: [0, -8, 0] }} transition={{ delay: index * .25, duration: 4, repeat: Infinity }}>
          <Icon className="mb-3 text-emerald" />
          <div className="font-mono text-xs uppercase tracking-widest text-slate-400">{label}</div>
          <div className="mt-1 text-sm font-semibold">{["Source", "Validate", "Warehouse", "Decide"][index]}</div>
        </motion.div>
      ))}
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
        {["Latency", "Quality", "KPI"].map((label, index) => (
          <div key={label} className="rounded-md border border-white/10 bg-white/5 p-3">
            <div className="font-mono text-[10px] uppercase text-slate-500">{label}</div>
            <motion.div className="mt-2 h-1.5 rounded-full bg-gradient-to-r from-emerald to-cyan" animate={{ width: ["42%", "88%", "58%"] }} transition={{ delay: index, duration: 3, repeat: Infinity }} />
          </div>
        ))}
      </div>
    </div>
  );
}
