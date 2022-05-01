import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://www.yahoo.com/
  await page.goto('https://www.yahoo.com/');

  // Click text=Remains ID'd as those of ex-NFL player's girlfriend'ER' actress Jossara Jinaro d >> img >> nth=0
  await page.locator('text=Remains ID\'d as those of ex-NFL player\'s girlfriend\'ER\' actress Jossara Jinaro d >> img').first().click();
  await expect(page).toHaveURL('https://www.yahoo.com/news/remains-found-texas-idd-missing-233309677.html');

});