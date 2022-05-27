const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://app.meliopayments.com/meliome/pay/metaverse
  await page.goto('https://app.meliopayments.com/meliome/pay/metaverse');

  // Fill [data-testid="input-totalAmount"]
  await page.locator('[data-testid="input-totalAmount"]').fill('1a');

  // Click [data-testid="input-invoiceNumber"]
  await page.locator('[data-testid="input-invoiceNumber"]').click();

  // Fill [data-testid="input-invoiceNumber"]
  await page.locator('[data-testid="input-invoiceNumber"]').fill('1');

  // Click text=Upload an invoice file
  await page.locator('text=Upload an invoice file').click();

  // Click [data-testid="button-guests\.register\.buttonText"]
  await page.locator('[data-testid="button-guests\\.register\\.buttonText"]').click();
  // assert.equal(page.url(), 'https://app.meliopayments.com/meliome/pay/metaverse/signUp');

  // ---------------------
  await context.close();
  await browser.close();
})();