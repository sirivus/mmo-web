
import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  // Go to https://www.youtube.com/
  await page.goto('https://www.youtube.com/');
});