const winston = require('winston');

const customLevels = {
  levels: {
    error: 0,
    info: 1,
    trace: 2,
  },
  colors: {
    error: 'red',
    info: 'yellow',
    trace: 'blue',
  },
};

const createLogger = (loggerLabel) => {
  const logger = new winston.Logger({
    levels: customLevels.levels,
    colors: customLevels.colors,
    transports: [
      new winston.transports.Console({
        level: 'trace',
        colorize: true,
        label: loggerLabel,
      }),
    ],
  });
  return logger;
};

module.exports = createLogger;
