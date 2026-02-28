import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should render the page title", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Next Production");
  });

  test("should render feature cards", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator('[data-slot="card"]');
    await expect(cards).toHaveCount(6);
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });

  test("should have correct page title in metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next Production Template/);
  });

  test("should return health check response", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.status).toBe("ok");
    expect(data.timestamp).toBeDefined();
    expect(data.uptime).toBeGreaterThan(0);
  });
});
