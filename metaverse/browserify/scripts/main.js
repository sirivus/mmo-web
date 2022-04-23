#!/usr/bin/env node
var unique = require("uniq");

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));
console.log(
    'ey',
    'hey'
)
function asd(){

//const { Builder } = require('selenium-webdriver');
const { Builder } = require('../../../node_modules/selenium-webdriver');
const firefox = require('../../../node_modules/selenium-webdriver/firefox');
const fs = require('../../../node_modules/@types/node/fs.d.ts');

require('../../selenium/path/to/geckodriver');

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


}asd();

/*
 seleniumhq.github.io/examples/java/src/test/java/dev/selenium/getting_started/InstallDriversTest.java 

 package dev.selenium.getting_started;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.safari.SafariDriver;

public class InstallDriversTest {
    @Test
    public void chromeSession() {
        WebDriverManager.chromedriver().setup();

        WebDriver driver = new ChromeDriver();

        driver.quit();
    }

    @Test
    public void edgeSession() {
        WebDriverManager.edgedriver().setup();

        WebDriver driver = new EdgeDriver();

        driver.quit();
    }

    @Test
    public void firefoxSession() {
        WebDriverManager.firefoxdriver().setup();

        WebDriver driver = new FirefoxDriver();

        driver.quit();
    }

    @Disabled("Only runs on Windows")
    @Test
    public void ieSession() {
        WebDriverManager.iedriver().setup();

        WebDriver driver = new InternetExplorerDriver();

        driver.quit();
    }
}

*/
