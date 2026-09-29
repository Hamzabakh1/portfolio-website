import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env.VITE_GITHUB_PAGES === "true" ? "./" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "src"),
      "@shared": path.resolve(projectRoot, "shared")
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
      "/sitemap.xml": "http://localhost:3000",
      "/robots.txt": "http://localhost:3000"
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          icons: ["lucide-react"]
        }
      }
    }
  }
});
