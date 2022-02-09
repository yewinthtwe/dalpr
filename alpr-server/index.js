require("express-async-errors");
const cron = require("node-cron");
const error = require("./middleware/error");
const config = require("config");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const members = require("./routes/members");
const obus = require("./routes/obus");
const inOutRecord = require("./routes/inOutRecord");
const alprd = require("./routes/alprd");
const users = require("./routes/users");
const login = require("./routes/login");
const logout = require("./routes/logout");
// const cookieAuth = require("./routes/cookieAuth");
const configAlpr = require("./routes/configAlpr");
const camera = require("./routes/camera");
const relay = require("./routes/relay");
const ioModule = require("./routes/ioModule");
// const oldlane = require("./routes/Old_lane");
const lane = require("./routes/lane");
const generalSetting = require("./routes/generalSetting");
const price = require("./routes/price");
const monitoredIp = require("./routes/monitoredIp");
const aiLane = require("./routes/aiLane");
const report = require("./routes/report");
const kiosk = require("./routes/kiosk");
// const digitaloutput = require("./routes/digitaloutput"); // Dummy Relay

process.on("uncaughtException", (ex) => {
	console.log("We got Uncaught exception error", ex);

	logger.log({
		level: "error",
		message: "We got Uncaught exception error",
	});
});

if (!config.get("jwtPrivateKey")) {
	logger.log({
		level: "info",
		message: "FATAL Error: jwtPrivateKey is not defined",
	});

	process.exit(1);
}

const app = express();

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"http://localhost:30000",
			"http://127.0.0.1:3000",
			"http://192.168.11.247:3000",
			"http://172.16.22.*:3000",
			"http://192.168.11.239:3000",
			"http://192.168.11.239:30000",
			 
		],
		credentials: true,
	})
);

// app.use(
// 	cors({
// 		origin: "*",
// 		credentials: true,
// 	})
// );
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(express.static("/home/alprsvr/plateimagesTemp"));
app.get("/:photo", (req, res) => {});

mongoose
	.connect(config.get("dbURL"), config.get("mongooseConfig"))
	.then(() => console.log("Connected to Database."))
	.catch((error) => console.log("Could not connect to Database."));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/members", members);
app.use("/api/obus", obus);
app.use("/api/users", users);
app.use("/api/inOutRecord", inOutRecord);
app.use("/api/alprd", alprd);
app.use("/api/login", login);
app.use("/api/logout", logout);
// app.use("/api/cookieAuth", cookieAuth);
app.use("/api/configAlpr", configAlpr);
app.use("/api/camera", camera);
app.use("/api/relay", relay);
app.use("/api/ioModule", ioModule);
app.use("/api/lane", lane);
app.use("/api/generalSetting", generalSetting);
app.use("/api/price", price);
app.use("/api/monitoredIp", monitoredIp);
app.use("/api/aiLane", aiLane);
app.use("/api/report", report);
app.use("/api/kiosk", kiosk);

//app.use("/api/digitaloutput", digitaloutput);

app.use(error);

const port = process.env.PORT || 30000;
app.listen(port);
logger.log({
	level: "info",
	message: `Server is listening on port ${port}`,
});
