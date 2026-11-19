import { site } from "~/content/site";

type SeoInput = { title?: string; description?: string; path?: string };

const OG_IMAGE = {
  url: new URL("/og.png", site.url).toString(),
  width: "1200",
  height: "630",
  alt: `${site.name}: ${site.hero.headline}`,
};

/** Absolute URL for a page; trailing slash matches the prerendered folders on GitHub Pages. */
export const pageUrl = (path = "/") => new URL(path, site.url).toString();

/** <head> meta tags for a page: title, description, Open Graph and Twitter card. */
export function seo({ title, description = site.description, path = "/" }: SeoInput = {}) {
  const fullTitle = title ? `${title} · ${site.name}` : site.title;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: path === "/" ? "profile" : "article" },
    { property: "og:url", content: pageUrl(path) },
    { property: "og:image", content: OG_IMAGE.url },
    { property: "og:image:width", content: OG_IMAGE.width },
    { property: "og:image:height", content: OG_IMAGE.height },
    { property: "og:image:alt", content: OG_IMAGE.alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE.url },
  ];
}

/** Canonical link, so search engines index one address per page. */
export const canonical = (path = "/") => ({ rel: "canonical", href: pageUrl(path) });

/** schema.org Person data: helps a search for your name show this site, LinkedIn and GitHub together. */
export const personJsonLd = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    image: new URL("/avatar.webp", site.url).toString(),
    jobTitle: site.role,
    address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
    sameAs: [site.links.linkedin, site.links.github],
    knowsAbout: ["React", "TypeScript", "Frontend engineering", "AWS"],
  });
