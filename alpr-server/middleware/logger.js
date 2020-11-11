const winston = require('winston');

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'alpr-server' },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'alpr_error.log', level: 'error' }),
      new winston.transports.File({ filename: 'alpr_info.log' }),
    ],
  });
 
 if (process.env.NODE_ENV !== 'production') {
   logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
 
 module.exports = logger;

//  module.exports = function (err, req, res, next) {
//   logger.error(err.message, err);
//   res.status(500).send("Something wrong!");
  
//   }
