const express = require('express');
const morgan = require('morgan');
const config = require('./app/common/config');
const logger = require('./app/common/logger')('main');
const translateRouter = require('./app/routes/translate-router');
const historyRouter = require('./app/routes/history-router');

const app = express();
const port = config.get('PORT') || 3000;

app.use(morgan('dev'));

const api = express.Router();
api.use('/api/', translateRouter);
api.use('/api/', historyRouter);
app.use(api);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
