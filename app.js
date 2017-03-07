const express = require('express');
const morgan = require('morgan');
const path = require('path');
const config = require('./app/common/config');
const logger = require('./app/common/logger')('main');
const translateRouter = require('./app/routes/translate-router');
const historyRouter = require('./app/routes/history-router');
const UIRouter = require('./app/routes/ui-router');

const app = express();
const port = config.get('PORT') || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

// API Routes
const api = express.Router();
api.use('/api/', translateRouter);
api.use('/api/', historyRouter);
app.use(api);

// UI Routes
const ui = express.Router();
ui.use('/', UIRouter);
app.use(ui);

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
