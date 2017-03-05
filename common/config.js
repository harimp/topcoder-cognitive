const nconf = require('nconf');

nconf.argv()
  .env({
    separator: '_',
    lowerCase: true,
  });

module.exports = nconf;
