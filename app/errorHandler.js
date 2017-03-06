const logger = require('./common/logger.js')('errorHandle');

const handleError = (err, req, res, next) => {
  if (err) {
    logger.error(err);
    res.status(500).json({
      code: 500,
      message: 'Unexpected Error.',
      detail: err,
    });
  } else {
    next();
  }
};

module.exports = handleError;
