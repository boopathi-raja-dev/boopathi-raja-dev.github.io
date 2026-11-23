import { readFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/work/salon-booking/",
  "/work/student-housing/",
  "/work/flooring-storefront/",
  "/work/book-erp/",
];

for (const path of pages) {
  test(`${path} renders and has no a11y violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    // Let entrance animations settle so axe checks the final colours, not a mid-fade frame.
    const words = page.locator("h1 span");
    if ((await words.count()) > 0) await expect(words.last()).toHaveCSS("opacity", "1");
    // Scan the settled page: scroll-reveal fades are decorative and would make
    // half-faded text look like a contrast failure at the viewport edge.
    await page.emulateMedia({ reducedMotion: "reduce" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("work card navigates to its case study", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Booking, scheduling and payments/ }).click();
  await expect(page).toHaveURL(/\/work\/salon-booking/);
});

test("static files are served byte-for-byte from public/", async ({ request }) => {
  for (const file of ["resume.pdf", "og.png"]) {
    const res = await request.get(`/${file}`);
    expect(res.ok()).toBe(true);
    const served = await res.body();
    const source = readFileSync(new URL(`../../public/${file}`, import.meta.url));
    expect(served.equals(source), `${file} differs from public/${file}`).toBe(true);
  }
});

test("inspect mode labels components and turns off with Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Inspect mode is desktop-only (needs hover)");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Inspect" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveClass(/inspect-on/);
  const card = page.locator('[data-inspect="WorkCard"]').first();
  await card.hover();
  const label = await card.evaluate((el) => getComputedStyle(el, "::after").content);
  expect(label).toContain("WorkCard");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("stub-first demo switches modes", async ({ page }) => {
  await page.goto("/work/book-erp/");
  await expect(page.getByText(/integration slips to day 10/)).toBeVisible();
  await page.getByRole("button", { name: "With stub-first" }).click();
  await expect(page.getByText(/integrate on day 7/)).toBeVisible();
});
