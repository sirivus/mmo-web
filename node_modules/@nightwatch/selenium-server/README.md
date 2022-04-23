# selenium-server-jar-download
NPM install wrapper which makes available the selenium standalone server jar file in your node_modules folder.

# Installing
This will download the jar file. 

```sh
npm i @nightwatch/selenium-server
```

Install a specific version, e.g. `4.1.1`:
```sh
npm i @nightwatch/selenium-server@4.1.1
```

# Usage

```js
const SeleniumServer = require('@nightwatch/selenium-server');

// Get the path to the jar file:
console.log(SeleniumServer.path);
```

# License
MIT
