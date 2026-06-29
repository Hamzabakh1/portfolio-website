import { useEffect, useState } from "react";
import { api, type SiteSettings } from "@/lib/api";
import { staticSettings } from "@/lib/staticFallback";

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    if (import.meta.env.VITE_GITHUB_PAGES === "true") {
      fetch(`${import.meta.env.BASE_URL}site-content.json`, { cache: "no-store" })
        .then((response) => response.ok ? response.json() : Promise.reject(new Error("No static settings")))
        .then((data) => setSettings(data.settings ?? staticSettings))
        .catch(() => setSettings(staticSettings));
      return;
    }
    api<SiteSettings>("/api/settings").then(setSettings).catch(() => {
      setSettings(staticSettings);
    });
  }, []);
  return settings;
}
