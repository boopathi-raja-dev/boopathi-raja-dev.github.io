import { site } from "~/content/site";

type SeoInput = { title?: string; description?: string; path?: string };

/** Builds the <head> meta tags for a page. */
export function seo({ title, description = site.description, path = "/" }: SeoInput = {}) {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.role}`;
  const url = new URL(path, site.url).toString();
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
