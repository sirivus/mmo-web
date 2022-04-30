import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://app.meliopayments.com/meliome/pay/metaverse
  await page.goto('https://app.meliopayments.com/meliome/pay/metaverse');

  // Click [data-testid="input-totalAmount"]
  await page.locator('[data-testid="input-totalAmount"]').click();

  // Fill [data-testid="input-totalAmount"]
  await page.locator('[data-testid="input-totalAmount"]').fill('1');

  // Click [data-testid="input-invoiceNumber"]
  await page.locator('[data-testid="input-invoiceNumber"]').click();

  // Fill [data-testid="input-invoiceNumber"]
  await page.locator('[data-testid="input-invoiceNumber"]').fill('1');

  // Click [data-testid="button-guests\.register\.buttonText"]
  await page.locator('[data-testid="button-guests\\.register\\.buttonText"]').click();
  await expect(page).toHaveURL('https://app.meliopayments.com/meliome/pay/metaverse/signUp');

});