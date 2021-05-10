const fs = require("fs");
const { InOutRecord } = require("./models/inOutRecordModel");
const _ = require("lodash");
const config = require("config");
const photoStoreTemp = config.get("photoStoreTemp.location");
const { casher } = require("./casher");
// const { AlprCamera } = require('./models/alprCameraModel');
// const { publicEncrypt } = require("crypto");

async function lpSearchForUpdate(lp, isExitLane, candidates) {
	const entryQuery = {
		"ticket.isUsed": false,
		$or: [
			{ lp: { $elemMatch: { plate: { $in: lp } } } },
			{
				candidates: {
					$elemMatch: {
						plate: { $in: _.map(candidates, "plate") },
					},
				},
			},
		],
	};
	const exitQuery = {
		"ticket.isUsed": false,
		$or: [
			{ lp: { $elemMatch: { plate: { $in: lp } } } },
			{
				candidates: {
					$elemMatch: {
						plate: { $in: _.map(candidates, "plate") },
					},
				},
			},
		],
	};

	isExitLane ? (query = exitQuery) : (query = entryQuery);
	//console.log("queryObject:", query);
	try {
		//const lpDoc = await InOutRecord.findOne( { $or: [ {'lp':{$in: lp} } , {'candidates': {$in: lp} } ], 'ticket.isUsed': false } ).sort({'updatedAt': -1}).limit(1);
		const searchResult = await InOutRecord.findOne(query)
			.sort({ updatedAt: -1 })
			.limit(1);
		console.log(
			"camFeedHandler: Search result of Temp database:",
			searchResult ? searchResult._id : "NOT Found!"
		);
		return searchResult;
	} catch (error) {
		console.log(error);
	}
}

async function saveInOutRecord(newDocData) {
	const { lp } = newDocData;
	const inOutRecord = new InOutRecord(newDocData);
	const savedRecord = await inOutRecord.save();
	//console.log(`camFeedHandlerJS: saveInOutRecord: ${lp} Saved.`);
	return savedRecord;
}

async function updateInOutRecord(_id, newUpdateData) {
	const updatedRecord = await InOutRecord.findByIdAndUpdate(
		{ _id: _id },
		{
			$set: newUpdateData,
		},
		{ new: true }
	);
	console.log("updateInOutRecord: record updated.", _id);
	return updatedRecord;
}

async function deleteOldPhoto(photo) {
	await fs.unlink(`${photoStoreTemp}/${photo}`, (err) => {
		if (err) throw err;
		console.log(
			`deleteOldPhoto: old photo file ${photoStoreTemp}/${photo} is deleted.`
		);
	});
}

// function isTimeCheckOk(trafficToken) {
// 	const { epoch_time, searchResult } = trafficToken;
// 	const { updatedAt } = searchResult;
// 	let waitTime = 10;
// 	let sleepTime = 0;
// 	sleepTime = getTime(addSeconds(updatedAt, waitTime));
// 	return (isTimeOk = isAfter(epoch_time, sleepTime)); // true or false
// }

async function makeRecordUsed(updatedRecord) {
	const { _id } = updatedRecord;
	const query = {
		_id: _id,
		"ticket.isUsed": false,
		$and: [{ inTrafficId: { $ne: "" }, outTrafficId: { $ne: "" } }],
	};
	const update = { "ticket.isUsed": true };
	const result = await InOutRecord.findOneAndUpdate(query, update, {
		new: true,
	});
	console.log("camFeedHandler: makeRecordUsed:", result);
	return result ? result : null;
}

async function verifyInTraffic(lp) {
	const query = {
		"candidates.plate": { $in: lp },
		direction: "IN",
		inTrafficId: { $ne: null },
	};
	try {
		//const lpDoc = await InOutRecord.findOne( { $or: [ {'lp':{$in: lp} } , {'candidates': {$in: lp} } ], 'ticket.isUsed': false } ).sort({'updatedAt': -1}).limit(1);
		const searchResult = await InOutRecord.findOne(query)
			.sort({ updatedAt: -1 })
			.limit(1);
		console.log("camFeedHandler: verifyInTraffic:", searchResult);
		return searchResult ? searchResult : null;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	saveInOutRecord,
	updateInOutRecord,
	lpSearchForUpdate,
	verifyInTraffic,
	deleteOldPhoto,
	// isTimeCheckOk,
	makeRecordUsed,
};
