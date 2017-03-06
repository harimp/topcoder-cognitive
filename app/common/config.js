const fs = require('fs');
const path = require('path');
const nconf = require('nconf');

const configPath = path.join(__dirname, 'config.json');
let configFile = {};
if (fs.existsSync(configPath)) {
  configFile = JSON.parse(fs.readFileSync(configPath));
}

nconf.argv()
  .env({
    separator: '__',
    lowerCase: true,
  });

nconf.defaults(configFile);

module.exports = nconf;
