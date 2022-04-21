const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');

require('geckodriver');

async function capture(url) {
  const binary = new firefox.Binary(firefox.Channel.RELEASE);
  binary.addArguments('-headless'); // until newer webdriver ships

  const options = new firefox.Options();
  options.setBinary(binary);
  // options.headless(); once newer webdriver ships

  const driver = new Builder().forBrowser('firefox')
    .setFirefoxOptions(options).build();

  await driver.get(url);
  const data = await driver.takeScreenshot();
  fs.writeFileSync('./screenshot.png', data, 'base64');

  driver.quit();
}

capture('https://hacks.mozilla.org/');
