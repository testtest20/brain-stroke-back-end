
const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors, json } = format;
// for storage object like string
const logFormat = printf(({ level, message, timestamp, stack }) => {
  let logMessage = `${timestamp} | ${level.toLocaleUpperCase()} | ${stack || (typeof message == 'object' ? JSON.stringify(message) :message )}`;
  return logMessage;
});
// for storage data ==> json
const getLogger = (fileName) => {
  const logger = createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json(),
      logFormat,
    ),
    transports: [
        new transports.File({ filename: `./logs/${fileName}.log` }),
        new transports.File({ filename: `./logs/all.log` }),
        new transports.Console(),
    ],
  });

  return logger;
};

module.exports = getLogger;