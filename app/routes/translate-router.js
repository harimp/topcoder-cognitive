const express = require('express');
const translateController = require('../controller/translate-controller');
const validator = require('../validator');
const errorHandler = require('../errorHandler');
const logger = require('../common/logger')('translate-router');

const router = express.Router();

router.get('/translate', validator.translateValidator, errorHandler, (req, res) => {
  const sourceText = req.query.sourceText;
  const sourceLanguageCode = req.query.sourceLanguageCode;
  const destinationLanguageCode = req.query.destinationLanguageCode;
  translateController
    .translate(sourceText, sourceLanguageCode, destinationLanguageCode)
    .then(result => res.status(200).json({
      sourceText,
      sourceLanguageCode,
      destinationLanguageCode,
      result,
    }));
});

module.exports = router;
