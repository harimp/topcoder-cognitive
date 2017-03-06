const LanguageTranslationV2 = require('watson-developer-cloud/language-translation/v2');
const logger = require('../common/logger')('translate');
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
  return Promise((resolve) => {
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
  }).then(result => result);
};

const translate = function translate(sourceText, sourceLang, destLang) {
  const translator = getTranslator();
  let sourceLangCode = sourceLang;
  if (!sourceLang) {
    sourceLangCode = identify(sourceText);
  }
  return new Promise((resolve) => {
    translator.translate({
      text: sourceText,
      source: sourceLangCode,
      target: destLang,
    }, (err, translation) => {
      if (err) {
        logger.error('Error while translating', err);
        resolve(null);
      }
      logger.trace('Translation results', translation);
      resolve(translation);
    });
  }).then(result => result);
};

module.exports = {
  translate,
};
