import { expect, test } from "@playwright/test";

test("landing page renders primary CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Resume Parser AI" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open app/i })).toBeVisible();
});
