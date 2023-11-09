import winston from 'winston';
import { createLogger, format, transports } from 'winston';

// Create a logger instance
const logger = createLogger({
  level: 'info', // Set the logger block level to info
  format: format.combine(
    format.timestamp(),
    format.json()

),
  transports: [
    new transports.Console(), // Console transport will log messages at info level or above
    new transports.File({
      filename: 'app.log',
      level: 'info' // File transport will only log messages at error level
    })
  ]
});

export default logger;
