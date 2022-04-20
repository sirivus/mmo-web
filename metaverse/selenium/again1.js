let options = new ie.Options();
options.setEdgeChromium(true);
options.setEdgePath("/path/to/edge/browser);

let driver = await new Builder()
  .forBrowser('internet explorer')
  .setIEOptions(options)
  .build();

await driver.quit();

