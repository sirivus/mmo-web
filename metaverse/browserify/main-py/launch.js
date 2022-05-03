const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Go to https://en.wikipedia.org/wiki/ASD
  await page.goto('https://en.wikipedia.org/wiki/ASD');

  // ---------------------
  await context.close();
  await browser.close();
})();