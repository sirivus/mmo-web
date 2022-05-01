import { createRequire } from './require';
const require = createRequire(import.meta.url);

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');

  // Go to https://www.youtube.com/
  await page.goto('https://www.youtube.com/');

  // ---------------------
  await context.close();
  await browser.close();
})();