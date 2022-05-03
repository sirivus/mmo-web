//If this code is not in a define call,
//DO NOT use require('foo'), but use the async
//callback version:

//require(['foo'], function (foo) {
//  //foo is now loaded.
//});

/*
requirejs(["helper/util"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});
*/

/*
define(['dyn_modules'], function (dynModules) {
    require(dynModules, function(){
        // use arguments since you don't know how many modules you're getting in the callback
        for (var i = 0; i < arguments.length; i++){
            var mymodule = arguments[i];
            // do something with mymodule...
        }
    });

});
*/
//require is already defined.


//requirejs(["playwright"], function(util) {
  //This function is called when scripts/helper/util.js is loaded.
  //If util.js calls define(), then this function is not fired until
  //util's dependencies have loaded, and the util argument will hold
  //the module value for "helper/util".
  
//});

/*
var playwright = 'foo'
require(["playwright"], function (foo) {
    //playwright is now loaded.
    });
    
const { chromium } = require('playwright');
*/
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

/*
// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);

<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
<script data-main="scripts/main.js" src="scripts/require.js"></script>

*/