const path = require('path');
const packageInfo = require('./package.json');
const {version, selenium} = packageInfo;
const {versionNumber = version} = selenium;

module.exports = {
  path: path.join(__dirname, 'lib', `${selenium.filename}-${versionNumber}.jar`)
}