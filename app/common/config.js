const nconf = require('nconf');
const configFile = require('./config.json');

nconf.argv()
  .env({
    separator: '__',
    lowerCase: true,
  });

nconf.defaults(configFile);

module.exports = nconf;
