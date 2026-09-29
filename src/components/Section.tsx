import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({ eyebrow, title, children, id }: { eyebrow?: string; title: string; children: ReactNode; id?: string }) {
  return (
    <motion.section id={id} className="portfolio-section mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" initial={false}>
      <div className="mb-8 max-w-3xl">
        {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-[.22em] text-emerald">{eyebrow}</p>}
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}
