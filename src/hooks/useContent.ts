import { useEffect, useState } from "react";
import { api, type Content } from "@/lib/api";
import { staticContent } from "@/lib/staticFallback";

export function useContent() {
  const [data, setData] = useState<Content | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (import.meta.env.VITE_GITHUB_PAGES === "true") {
      fetch(`${import.meta.env.BASE_URL}site-content.json`, { cache: "no-store" })
        .then((response) => response.ok ? response.json() : Promise.reject(new Error("No static content")))
        .then((data) => setData(data.content ?? staticContent))
        .catch(() => setData(staticContent));
      return;
    }
    api<Content>("/api/content").then(setData).catch((err) => {
      setError(err.message);
    });
  }, []);
  return { data, error, loading: !data && !error };
}
