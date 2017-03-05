const express = require('express');
const config = require('./common/config');
const logger = require('./common/logger')('main');

const app = express();
const port = config.get('port') || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
