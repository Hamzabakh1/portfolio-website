import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"]
      },
      colors: {
        ink: "#07090d",
        panel: "#0d1117",
        line: "rgba(148, 163, 184, 0.22)",
        emerald: "#32f5a7",
        cyan: "#37d5ff",
        amber: "#ffbf66"
      },
      boxShadow: {
        glow: "0 0 40px rgba(50,245,167,.14)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
} satisfies Config;
