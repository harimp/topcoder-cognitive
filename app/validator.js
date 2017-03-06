const joi = require('joi');
// const logger = require('./common/logger.js')('validator');

const schema = {
  translate: {
    sourceText: joi.string().min(1).required(),
    sourceLanguageCode: joi.string().optional(),
    destinationLanguageCode: joi.string().min(1).required(),
  },
};

const translateValidator = function translateValidator(req, res, next) {
  joi.validate(req.query, schema.translate, (err) => {
    if (err) {
      res.status(400).json({
        code: 400,
        message: err.details,
      });
      return;
    }
    next();
  });
};

module.exports = {
  translateValidator,
};
