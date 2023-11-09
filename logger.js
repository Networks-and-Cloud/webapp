// const winston = require('winston');
// const WinstonCloudWatch = require('winston-cloudwatch');
//import winston from 'winston/lib/winston/config';

import winston from 'winston';

import moment from 'moment';

//const moment = require('moment');

 
const currentDate = moment().format('YYYY-MM-DD');
 
 
// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple()
);
 
// Create a Winston logger with multiple transports for different log levels
const logger = winston.createLogger({
  level: 'info', // Minimum log level to capture
  format: logFormat,
//   defaultMeta: { service: 'your-service-name' }, // Customize service name
  transports: [
    // Log 'info' and above messages to a file
    new winston.transports.File({
      filename: "/opt/csye6225/webapp/var/log/csye6225.log",
      level: 'info',
    }),
 
    // Log 'error' and 'warning' messages to a separate file
    new winston.transports.File({
      filename: "var/log/csye6225.log",
      level: 'error',
    }),
 
    // Log 'warning' and above messages to the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: 'warn',
    }),
  ],
});
 


export default logger;
// module.exports = logger;
 
 