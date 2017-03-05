const nconf = require('nconf');

nconf.argv()
  .env('_');

module.exports = nconf;
