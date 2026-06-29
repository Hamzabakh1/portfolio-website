import { useEffect, useState } from "react";
import { api, type SiteSettings } from "@/lib/api";
import { staticSettings } from "@/lib/staticFallback";

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    api<SiteSettings>("/api/settings").then(setSettings).catch(() => {
      if (import.meta.env.VITE_GITHUB_PAGES === "true") setSettings(staticSettings);
    });
  }, []);
  return settings;
}
