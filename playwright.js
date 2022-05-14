//export
require (['playwright' ], async (playwright) => {
    const { chromium } = require('playwright');
    (async () => {
        const browser = await chromium.launch();
        // Create pages, interact with UI elements, assert values
        await browser.close();
      })();
})
//export { playwright };

/*
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  // Create pages, interact with UI elements, assert values
  await browser.close();
})();

*/

/*

require(['foo'], function (foo) {
    //foo is now loaded.
});

*/
