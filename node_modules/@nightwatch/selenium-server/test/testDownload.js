const assert = require('assert');
const path = require('path');
const fs = require('fs');
const packageInfo = require('../package.json');

describe('test download', function() {
  const {version, selenium} = packageInfo;
  const {versionNumber = version} = selenium;

  it('tests the config', function() {
    const config = require('../install.conf.js');
    assert.strictEqual(config.downloadUrl, `https://github.com/SeleniumHQ/selenium/releases/download/selenium-${selenium.folder}/${selenium.filename}-${versionNumber}.jar`);
  })

  it('tests the download', async function() {
    const download = require('../download.js');
    await download();

    assert.strictEqual(fs.existsSync(path.join(__dirname, `../lib/${selenium.filename}-${versionNumber}.jar`)), true);
  });

  it('tests the require path', function() {
    const {path: filePath} = require('../index.js');
    assert.strictEqual(filePath, path.join(__dirname, `../lib/${selenium.filename}-${versionNumber}.jar`));
  });
})