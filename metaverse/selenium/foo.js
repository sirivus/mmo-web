//If this code is not in a define call,
//DO NOT use require('foo'), but use the async
//callback version:
//require(["foo"], function (foo) {
//  //foo is now loaded.
//});

var requirejs = require("requirejs");

requirejs.config({
  //Pass the top-level main.js/index.js require
  //function to requirejs so that node modules
  //are loaded relative to the top-level JS file.
  nodeRequire: require,
});

requirejs(["foo", "bar"], function (foo, bar) {
  //foo and bar are loaded according to requirejs
  //config, but if not found, then node's require
  //is used to load the module.
});

("use strict");

/**
 * Module dependencies
 */

var diacritics = require("diacritics-map");
var utils = require("lazy-cache")(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require("concat-stream", "concat");

require = require("esm")(module);
require("../src/cli").cli(process.argv);

const { Builder } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
//const { Builder } = require("selenium-webdriver");
//const firefox = require("selenium-webdriver/firefox");
//import * as Builder from "../../node_modules/selenium-webdriver/index.js";
//import * as firefox from "../../node_modules/selenium-webdriver/firefox.js";
//import { Builder } from "../../node_modules/selenium-webdriver/index.js";
//import firefox from "../../node_modules/selenium-webdriver/firefox.js";
//node_modules / selenium - webdriver / firefox.js;
//require("../../node_modules/selenium-webdriver/index.js");
//require("../../node_modules/selenium-webdriver/firefox.js");

const service = new firefox.ServiceBuilder(
  "/path/to/chromedriver../../node_modules/selenium-webdriver/firefox.js"
);

async function helloSelenium() {
  let options = new firefox.Options();
  let driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  await driver.get("https://www.google.com");

  await driver.getTitle(); // => "Google"

  driver.manage().setTimeouts({ implicit: 0.5 });

  let searchBox = await driver.findElement(By.name("q"));
  let searchButton = await driver.findElement(By.name("btnK"));

  await searchBox.sendKeys("Selenium");
  await searchButton.click();

  await driver.findElement(By.name("q")).getAttribute("value"); // => 'Selenium'

  await driver.quit();
}
helloSelenium();

//https://appium.io/
//for apple browser safari
//code signature error.
//
