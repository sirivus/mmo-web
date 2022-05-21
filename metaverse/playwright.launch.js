/*
require(['chromium'], function (playwright) {
    //foo is now loaded.
});
*/
//@playwright/test
require('playwright')(function (chromium){
    //chromium is now loaded.
})
require('node')(function(node){

})
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Go to https://app.meliopayments.com/meliome/pay/metaverse
  await page.goto('https://app.meliopayments.com/meliome/pay/metaverse');
  // ---------------------
  await context.close();
  await browser.close();
})();