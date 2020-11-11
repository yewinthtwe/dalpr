
const logger = require("./logger");

module.exports = function (err, req, res, next) {
    logger.log({
        level: 'error', 
        filename: 'alpr_error.log',
        message: err.message, err
        });
res.status(500).send('Something failed.');
}