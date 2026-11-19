import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/work/salon-booking/", "/work/student-housing/", "/work/flooring-storefront/"];

for (const path of pages) {
  test(`${path} renders and has no a11y violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    // Let entrance animations settle so axe checks the final colours, not a mid-fade frame.
    const words = page.locator("h1 span");
    if ((await words.count()) > 0) await expect(words.last()).toHaveCSS("opacity", "1");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("work card navigates to its case study", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Salon booking platform/ }).click();
  await expect(page).toHaveURL(/\/work\/salon-booking/);
});
