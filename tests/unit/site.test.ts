import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { site } from "~/content/site";
import { siteSchema } from "~/content/site.schema";

describe("site content", () => {
  it("matches the schema", () => {
    expect(() => siteSchema.parse(site)).not.toThrow();
  });

  it("keeps the meta description within 160 characters", () => {
    expect(site.description.length).toBeLessThanOrEqual(160);
  });

  it("shows every client product counted in the proof strip", () => {
    const caseStudies = readdirSync("src/content/work").filter((f) => f.endsWith(".mdx")).length;
    const shipped = site.proof.find((p) => p.label === "client products shipped");
    expect(caseStudies + site.alsoShipped.length).toBe(shipped?.value);
  });

  it("has unique project links", () => {
    const repos = site.projects.map((p) => p.href);
    expect(new Set(repos).size).toBe(repos.length);
  });
});
