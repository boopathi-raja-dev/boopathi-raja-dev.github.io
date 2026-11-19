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

  it("has unique project links", () => {
    const repos = site.projects.map((p) => p.href);
    expect(new Set(repos).size).toBe(repos.length);
  });
});
