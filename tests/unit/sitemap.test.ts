import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sitemap = readFileSync("public/sitemap.xml", "utf8");

describe("sitemap.xml", () => {
  it("lists every case study (add new ones here when you add an .mdx file)", () => {
    const slugs = readdirSync("src/content/work")
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
    for (const slug of slugs) {
      expect(sitemap).toContain(`https://boopathi-raja-dev.github.io/work/${slug}/`);
    }
  });

  it("is referenced from robots.txt", () => {
    expect(readFileSync("public/robots.txt", "utf8")).toContain("/sitemap.xml");
  });
});
