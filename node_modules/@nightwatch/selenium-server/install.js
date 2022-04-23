const cliProgress = require('cli-progress');
const download = require('./download.js');

(async () => {
  // create a new progress bar instance and use shades_classic theme
  //const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  const progressBar = new cliProgress.Bar({
    format: ' [{bar}] {percentage}% | ETA: {eta}s'
  }, cliProgress.Presets.shades_classic);

  // start the progress bar with a total value of 200 and start value of 0
  // update the current value in your application..
  const stream = download();
  progressBar.start(100, 0);

  stream.on('downloadProgress', function(progress) {
    progressBar.update(progress.percent*100);
  }).then(() => {
    progressBar.stop();
    console.log('');
  });
})();