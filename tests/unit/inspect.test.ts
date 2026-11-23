import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SOURCES, sourceUrl } from "~/lib/inspect";

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : p.endsWith(".tsx") ? [p] : [];
  });

const names = new Set(
  files("src").flatMap((f) =>
    [...readFileSync(f, "utf8").matchAll(/data-inspect="([A-Za-z]+)"/g)].map((m) => m[1] ?? ""),
  ),
);

describe("inspect mode sources", () => {
  it("maps every labelled component to a source file", () => {
    for (const name of names) expect(Object.keys(SOURCES), `${name} has no source`).toContain(name);
  });

  it("points only at files that exist", () => {
    for (const path of Object.values(SOURCES)) expect(existsSync(path), path).toBe(true);
  });

  it("links to the repository on GitHub", () => {
    expect(sourceUrl("Hero")).toBe(
      "https://github.com/boopathi-raja-dev/boopathi-raja-dev.github.io/blob/main/src/components/sections/Hero.tsx",
    );
    expect(sourceUrl("Unknown")).toBeUndefined();
  });
});
