const fs = require("fs/promises");
const mongoose = require("mongoose");
const config = require("config");
// const { YatKyay } = require("./models/yatkyayModel");
const { AiLane } = require("./models/aiLaneModel");
const { Lane } = require("./models/laneModel");
const { Camera } = require("./models/cameraModel");
const { IoModule } = require("./models/ioModuleModel");
const subDays = require("date-fns/subDays");
const currentTime = Math.floor(new Date().getTime());
const _ = require("lodash");

mongoose
	//.connect(config.get("testDbUrl"), config.get("mongooseConfig"))
	.connect(config.get("dbURL"), config.get("mongooseConfig"))
	.then(() => console.log("Connected to Database."))
	.catch((error) => console.log("Could not connect to Database."));

// async function dbTest() {
// 	const name = [{ အမည်: "နေတိုး" }];
// 	const query = {
// 		အမည်: { $in: _.map(name, "အမည်") },
// 	};
// 	const result = await YatKyay.find(query);
// 	console.log("dbTestJs: search result:", result);
// }

async function dbTest() {
	// const alprLane = await AiLane.findOne().populate({
	// 	path: "camera",
	// 	match: { camera_id: 2 },
	// });

	let attachedCamera = await AiLane.find().populate({
		path: "camera",
		match: { camera_id: 1 },
	});

	let result = attachedCamera.filter(function (lane) {
		if (lane.camera) {
			console.log("found camera:", lane.camera);
			return lane.camera;
		}
	});
	console.log("result:", result);
	//const alprLane = await AiLane.findOne();
	//console.log(attachedCamera);
}

dbTest();
//   async function dbTest() {
//     const oneDayOldRecords = subDays(currentTime, 1);
//     const weekOldRecords = subDays(currentTime, 7);
//     const usedTickets = await Ticket.findOneAndDelete({'isUsed': true, 'outTime': { $lt: weekOldRecords } });
//     const inOutRecords = await InOutRecord
//     .findOne({'Time': { $lt : oneDayOldRecords }})
//     .select('Photo');
//     deletePhoto(`${photoStore.location}/${inOutRecords.Photo}`);
//     Ticket.db.close();
//     InOutRecord.db.close();
//   }
//cleanRecords();

// async function deletePhoto (path) {
//     try{
//         await fs.unlink(path);
//         logger.log({
//           level: 'info',
//           message: `successfully deleted ${path}`,
//         });
//     } catch (error) {
//       logger.error({
//         level: 'error',
//         message: 'there was an error deleting photo',
//       });
//     }
// }

module.exports = {
	dbTest,
};
