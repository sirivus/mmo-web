const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const service = new chrome.ServiceBuilder('/path/to/geckodriver');
const driver = new Builder().forBrowser('firefox').setChromeService(service).build();

