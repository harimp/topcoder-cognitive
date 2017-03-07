const Cloudant = require('cloudant');
const config = require('../common/config');
const logger = require('../common/logger')('history-controller');

const getCredentials = function getCredentials() {
  const cloudantConfig = JSON.parse(config.get('VCAP_SERVICES'));
  return cloudantConfig.cloudantNoSQLDB[0].credentials;
};

const getDBConn = function getDBConn() {
  const cloudant = Cloudant(getCredentials().url);
  const db = cloudant.db.use('translationdb');
  return db;
};

const loadToDB = function loadToDB(item) {
  const document = {
    _id: String(Date.now()),
    content: item,
  };
  const db = getDBConn();
  db.insert(document, (err, body) => {
    if (err) {
      logger.error(err);
    } else {
      logger.trace(body);
    }
  });
};

const searchLatest = function searchLatest(limit) {
  const query = {
    selector: {
      _id: {
        $gt: 0,
      },
      content: {
        $exists: true,
        $not: {
          translation: null,
        },
      },
      $not: {
        content: null,
      },
    },
    limit,
    fields: [
      '_id',
      '_rev',
      'content',
    ],
    sort: [
      {
        _id: 'desc',
      },
    ],
  };
  return new Promise((resolve, reject) => {
    getDBConn().find(query, (err, result) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  loadToDB,
  searchLatest,
};
