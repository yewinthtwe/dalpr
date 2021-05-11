const fs = require("fs/promises");
const mongoose = require("mongoose");
const config = require("config");
const { InOutRecord } = require("./models/inOutRecordModel");
const { IoModule } = require("./models/ioModuleModel");
const { Member } = require("./models/memberModel");
const subDays = require("date-fns/subDays");
const logger = require("./middleware/logger");
const photoStore = config.get("photoStore");
const currentTime = Math.floor(new Date().getTime());
const _ = require("lodash");

mongoose
	.connect(config.get("dbURL"), config.get("mongooseConfig"))
	.then(() => console.log("Connected to Database."))
	.catch((error) => console.log("Could not connect to Database."));

async function dbTest() {
	const licensePlates = [{ plate: "4M7788" }];
	const query = {
		//$and: [{ name: "dummyModule", relays: { $elemMatch: { name: "relay0" } } }],
		//relays: { $elemMatch: { name: "relay0" } },
		lp: { $elemMatch: { plate: { $in: _.map(licensePlates, "plate") } } },
	};
	const result = await Member.findOne(query);
	console.log("dbTestJs: search result:", result);
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
