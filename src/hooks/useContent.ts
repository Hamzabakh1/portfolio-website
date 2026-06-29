import { useEffect, useState } from "react";
import { api, type Content } from "@/lib/api";
import { staticContent } from "@/lib/staticFallback";

export function useContent() {
  const [data, setData] = useState<Content | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    api<Content>("/api/content").then(setData).catch((err) => {
      if (import.meta.env.VITE_GITHUB_PAGES === "true") setData(staticContent);
      else setError(err.message);
    });
  }, []);
  return { data, error, loading: !data && !error };
}
