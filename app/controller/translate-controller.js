const LanguageTranslationV2 = require('watson-developer-cloud/language-translation/v2');
const logger = require('../common/logger')('translate');
const historyController = require('./history-controller');
const config = require('../common/config');

const getTranslator = function getTranslator() {
  const vcapConfig = JSON.parse(config.get('VCAP_SERVICES'));
  const credentials = vcapConfig.language_translator[0].credentials;
  return new LanguageTranslationV2({
    username: credentials.username,
    password: credentials.password,
    url: credentials.url,
  });
};

const identify = function identify(sourceText) {
  return new Promise((resolve) => {
    const translator = getTranslator();
    translator.identify({
      text: sourceText,
    }, (err, language) => {
      if (err) {
        logger.error('Error while translating', err);
        resolve(null);
      }
      logger.trace('Translation found', language);
      resolve(language);
    });
  });
};

const translatePromise = function translatePromise(sourceText, sourceLang, destLang) {
  const translator = getTranslator();
  return new Promise((resolve) => {
    translator.translate({
      text: sourceText,
      source: sourceLang,
      target: destLang,
    }, (err, translation) => {
      if (err) {
        logger.error('Error while translating', err);
        resolve(null);
      }
      logger.trace('Translation results', translation);
      historyController.loadToDB(translation);
      resolve(translation);
    });
  });
};

const translate = function translate(sourceText, sourceLang, destLang) {
  if (!sourceLang) {
    return identify(sourceText).then((result) => {
      logger.trace('identify result', result.languages[0].language);
      return translatePromise(sourceText, result.languages[0].language, destLang);
    });
  }
  return translatePromise(sourceText, sourceLang, destLang);
};

module.exports = {
  translate,
};
