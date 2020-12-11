require('express-async-errors');
const cron = require('node-cron');
const error = require("./middleware/error");
const config = require('config');
//const Joi = require("joi");
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const members = require("./routes/members");
const inOutRecord = require("./routes/inOutRecord");
const alprd = require("./routes/alprd");
const lane = require('./routes/lane');
const users = require("./routes/users");
const auth = require("./routes/auth");
//const { cleanRecords } = require('./dataCleaner');


process.on('uncaughtException', (ex) => {
 console.log('We got Uncaught exception error', ex);

  logger.log({
    level: 'error',
    message: 'We got Uncaught exception error' 
  });
});

if (!config.get('jwtPrivateKey')) {
  logger.log({
    level: 'info',
    message: "FATAL Error: jwtPrivateKey is not defined",
  });
    
process.exit(1);
}

const app = express();
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use(express.static('/plateimages'));
app.get('/:photo', (req, res) => {
 });

mongoose
  .connect(config.get("dbURL"), config.get("mongooseConfig"))
  .then(() => console.log("Connected to Database."))
  .catch((error) => console.log("Could not connect to Database."));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/members", members);
app.use("/api/users", users);
app.use("/api/inOutRecord", inOutRecord);
app.use("/api/alprd", alprd);
app.use("/api/lane", lane);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 30000;
app.listen(port);
logger.log({
  level: 'info',
  message: `Server is listening on port ${port}`,
});

// // Schedule tasks to be run on the server.
// cron.schedule('* * * * 7', async function() {
//   await cleanRecords();
// });

// Remove the error.log file every twenty-first day of the month.
// cron.schedule('0 0 21 * *', function() {
//   console.log('Running Cron Job');
//   fs.unlink('./error.log', err => {
//     if (err) throw err;
//     console.log('Error file successfully deleted');
//   });
// });
