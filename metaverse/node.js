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
  // ---------------------
  await context.close();
  await browser.close();
})();