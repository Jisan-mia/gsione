import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`homepage hero fits and plays on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.goto('http://localhost:3000/');

    const tagline = page.getByRole('heading', {
      name: 'From Bengal to beyond . . .',
    });
    await expect(tagline).toBeVisible();

    const playButton = page.getByRole('button', {
      name: /Play/i,
    }).first();
    await expect(playButton).toBeVisible();

    const hero = page.locator('main section').first();
    const heroBox = await hero.boundingBox();
    expect(heroBox).not.toBeNull();
    expect(heroBox.y + heroBox.height).toBeLessThanOrEqual(viewport.height + 8);

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(viewport.width);

    await playButton.click();
    await expect(page.locator('iframe[src*="youtube.com/embed/ApAvTMdAUmQ"]')).toBeVisible();
  });
}
