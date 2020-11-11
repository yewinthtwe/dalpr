require('express-async-errors');
const error = require("./middleware/error");
const config = require('config');
//const Joi = require("joi");
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const members = require("./routes/members");
const gateUsers = require("./routes/gateUsers");
const alprd = require("./routes/alprd");
const lane = require('./routes/lane');
const users = require("./routes/users");
const obu = require('./routes/obu');
const auth = require("./routes/auth");
//const houseKeeper = require('./housekeeper');


process.on('uncaughtException', (ex) => {
 console.log('We got Uncaught exception error');
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
    
//console.error("'FATAL Error: jwtPrivateKey is not defined");
  //console.error("'FATAL Error: jwtPrivateKey is not defined");
process.exit(1);
}

const app = express();
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use(express.static('/plateimages'));
app.get('/:photo', (req, res) => {
//   //res.sendFile(req.params.photo);
 console.log(req.params.photo);
 });

mongoose
  .connect(config.get("dbURL"), config.get("mongooseConfig"))
  .then(() => console.log("Connected to Database."))
  .catch((error) => console.log("Could not connect to Database."));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/members", members);
app.use("/api/users", users);
app.use("/api/gateUsers", gateUsers);
app.use("/api/alprd", alprd);
app.use("/api/lane", lane);
app.use("/api/obu", obu);
app.use("/api/auth", auth);
app.use(error);

//houseKeeper();

const port = process.env.PORT || 30000;
app.listen(port);
logger.log({
  level: 'info',
  message: `Server is listening on port ${port}`,
});

