import winston from "winston";

const logger = winston.createLogger({
    level: 'info', // Set default log level to 'info'
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      // Log to a file
      new winston.transports.File({
        filename: 'logs/app.log',
        level: 'error', // Only log errors to file
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        )
      })
    ]
  });


export default logger;