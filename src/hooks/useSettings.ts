import { useEffect, useState } from "react";
import { api, type SiteSettings } from "@/lib/api";
import { staticSettings } from "@/lib/staticFallback";
import { isStaticHostedSite, loadStaticSiteFile } from "@/lib/runtime";

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    if (isStaticHostedSite()) {
      loadStaticSiteFile()
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
