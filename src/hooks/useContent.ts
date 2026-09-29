import { useEffect, useState } from "react";
import { api, type Content } from "@/lib/api";
import { staticContent } from "@/lib/staticFallback";
import { isStaticHostedSite, loadStaticSiteFile } from "@/lib/runtime";

export function useContent() {
  const [data, setData] = useState<Content | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (isStaticHostedSite()) {
      loadStaticSiteFile()
        .then((data) => setData(data.content ?? staticContent))
        .catch(() => setData(staticContent));
      return;
    }
    api<Content>("/api/content").then(setData).catch((err) => {
      setData(staticContent);
      setError(err.message);
    });
  }, []);
  return { data, error, loading: !data && !error };
}
