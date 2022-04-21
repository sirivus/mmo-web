
//const { Builder } = require("selenium-webdriver");
//const firefox = require('selenium-webdriver/firefox');
import { Builder } from "./chrome-folder/index.js"
//auto find index file first.
import { firefox } from "../../node_modules/selenium-webdriver/firefox.js"
let options = new firefox.Options();
let driver =  new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();

 driver.quit();

