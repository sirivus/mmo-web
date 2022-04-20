
        //If this code is not in a define call,
//DO NOT use require('foo'), but use the async
//callback version:
/*
require(['foo'], function (foo) {
    //foo is now loaded.
});
*/

        //require([selenium-webdriver], 
        const { Builder, By, Key, until } = require('selenium-webdriver');

        (async function helloSelenium() {
            let driver = await new Builder().forBrowser('firefox').build();

            await driver.get('https://www.google.com');

            await driver.getTitle(); // => "Google"

            driver.manage().setTimeouts({ implicit: 0.5 })

            let searchBox = await driver.findElement(By.name('q'));
            let searchButton = await driver.findElement(By.name('btnK'));

            await searchBox.sendKeys('Selenium');
            await searchButton.click();

            await driver.findElement(By.name('q')).getAttribute("value"); // => 'Selenium'

            await driver.quit();
        })();