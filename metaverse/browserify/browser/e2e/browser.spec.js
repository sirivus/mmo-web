//wrong javascript code for testing playwright test

const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // other actions...
  await browser.close();
})();

//import ignore from 'electron/index.js';
//ignore();

//ignore(builtinModules, { commonjsBugFix: true })

//module.exports = {"browser": true}