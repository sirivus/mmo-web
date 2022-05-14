const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://www.youtube.com/
  await page.goto('https://www.youtube.com/');
  // Click text=Watch later Watch later Add to queue Add to queue Keep hovering to play Ed Sheer >> #img >> nth=0
  await page.locator('text=Watch later Watch later Add to queue Add to queue Keep hovering to play Ed Sheer >> #img').first().click();
  // assert.equal(page.url(), 'https://www.youtube.com/watch?v=xax6NwLPAkk');
  // ---------------------
  await context.close();
  await browser.close();
})();