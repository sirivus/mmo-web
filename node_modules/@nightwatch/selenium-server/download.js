const path = require('path');
const download = require('download');
const {downloadUrl} = require('./install.conf.js');

module.exports = function() {
  console.log(`\n Downloading ${downloadUrl} ...`);

  return download(downloadUrl, path.join(__dirname, 'lib'));
}