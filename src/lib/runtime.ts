export function isStaticHostedSite() {
  if (import.meta.env.VITE_GITHUB_PAGES === "true") return true;
  if (typeof window === "undefined") return false;

  const host = window.location.hostname.toLowerCase();
  return host.endsWith(".chatgpt.site") || host.endsWith(".dalza.chatgpt.site");
}

export async function loadStaticSiteFile() {
  const response = await fetch(`${import.meta.env.BASE_URL}site-content.json`, { cache: "no-store" });
  if (!response.ok) throw new Error("Static site content is not available");
  return response.json();
}
