

var webdriver = require(‘selenium-webdriver’);

var browser_name = new webdriver.Builder();

withCapabilities(webdriver.Capabilities.firefox()).build();

browser.get(‘http:/www.google.com’);

var promise = browser_name.getTitle();

promise.then(function(title) 

{

console.log(title);

});

browser.quit();

10,20,30,40,50,60,70,80,
360
480
840
