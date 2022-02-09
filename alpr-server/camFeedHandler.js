const fs = require("fs");
const { InOutRecord } = require("./models/inOutRecordModel");
const _ = require("lodash");
const config = require("config");
const photoStoreTemp = config.get("photoStoreTemp.location");
const photoStore = config.get("photoStore.location");
const { casher } = require("./casher");
const { isAfter, getTime, addSeconds } = require("date-fns");
// const { AlprCamera } = require('./models/alprCameraModel');
// const { publicEncrypt } = require("crypto");

async function lpSearchForUpdate(lp, isExitLane, candidates) {
	//console.log("camFeedHandlerJs: lpSearchForUpdate: Performing duplicate record search in tempo database.");
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
		"ticket.isUsed": false, "ticket.ticketId" : { $ne: null },
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
			"camFeedHandlerJs: Search result of Temp database:",
			searchResult ? searchResult._id : "NOT Found!"
		);
		return searchResult;
	} catch (error) {
		console.log(error);
	}
}

async function saveInOutRecord(newDocData) {
	//const { lp } = newDocData;
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
	console.log("camFeedHandlerJs: updateInOutRecord: Doc updated.", _id);
	return updatedRecord;
}

function deleteOldPhoto(photo) {
	fs.unlink(`${photoStoreTemp}/${photo}`, (err) => {
		if (err) throw err;
		console.log(
			`camFeedHandlerJs: deleteOldPhoto: Old vehicle photo file ${photoStoreTemp}/${photo} is deleted.`
		);
	});
}

function movePhoto(photo) {
	fs.rename(`${photoStoreTemp}/${photo}`, `${photoStore}/${photo}`, (err) => {
		if (err) throw err;
		console.log(
			`camFeedHandlerJs: movePhoto: photo file has been moved to ${photoStore}/${photo}.`
		);
	});
}


function isTimeToCreateNewDoc(tkn) {
	const { searchResult, isExitLane, newDocData } = tkn;
	const { inTrafficId, outTrafficId, camera_id, createdAt, inTime, outTime } = searchResult;
	isExitLane ? currentTime =  outTime : currentTime = inTime;
	console.log("isTimeToCreateNewDoc: Launching update Work....");

	if (inTrafficId && !outTrafficId) {
		console.log("isTimeToCreateNewDoc: Found IN traffic.", inTrafficId);
   		if(isExitLane) {
		console.log("isTimeToCreateNewDoc: But its Exit Lane. Update Doc.");
			return false; // Update Doc
   		} else {
	   		if(camera_id == newDocData.camera_id ) {
				console.log("isTimeToCreateNewDoc: Seen by Same Camera.");
				let waitTime = 30;
				let sleepTime = 0;
				sleepTime = getTime(addSeconds(createdAt, waitTime));
				console.log("isTimeToCreateNewDoc: Checking Time Ok.");
				return (isTimeOk = isAfter(currentTime, sleepTime)); // true or false
	   		} else { 
				console.log("isTimeToCreateNewDoc: Seen by Different Camera. Create New Doc");
				return true; // New Doc
		 	}
   		}
	}

	if(outTrafficId && !inTrafficId) {
		console.log("isTimeToCreateNewDoc: Found Out traffic.", outTrafficId);
		if(!isExitLane) {
			console.log("isTimeToCreateNewDoc: But its Entry Lane. Update Doc.");
			return false; // Update Doc
		} else {
			if(camera_id == newDocData.camera_id) {
				console.log("isTimeToCreateNewDoc: Seen by Same Camera.");
				let waitTime = 30;
				let sleepTime = 0;
				sleepTime = getTime(addSeconds(createdAt, waitTime));
				console.log("isTimeToCreateNewDoc: Checking Time Ok.");
				return (isTimeOk = isAfter(currentTime, sleepTime)); // true or false
			} else {
				console.log("isTimeToCreateNewDoc: Seen by Different Camera. Create New Doc");
				return true; // New Doc
			}
		}
	}
}



function isTimeCheckOk(trafficToken) {

	//console.log("camFeedHandlerJs: isTimeCheckOk: ", trafficToken);
	const { searchResult } = trafficToken;
	
	// Not found in InOutRecord database.Assuming new Doc to be created.
	if(!searchResult) {
		return true;
	}
	const { direction, createdAt, updatedAt, inTime, outTime } = searchResult;
	let currentTime;
	if (direction === "IN") {
		currentTime = inTime;
	} else {
		currentTime = outTime;
	}
	let waitTime = 30;
	let sleepTime = 0;
	sleepTime = getTime(addSeconds(createdAt, waitTime));

	console.log("isTimeCheckOk: current Time is :", currentTime);
	//console.log("isTimeCheckOk: Doc is updated at: ", updatedAt);
	//console.log("isTimeCheckOk: Doc is created at:", createdAt);
	//console.log("isTimeCheckOk: sleeptime:", sleepTime);
	return (isTimeOk = isAfter(currentTime, sleepTime)); // true or false
}

async function makeRecordUsed(updatedRecord) {
	const { _id } = updatedRecord;
	const query = {
		_id: _id,
		// $and: [{ inTrafficId: { $ne: "" }, outTrafficId: { $ne: "" } }],
	};
	const update = { "ticket.isUsed": true };
	const result = await InOutRecord.findOneAndUpdate(query, update, {
		new: true,
	});
	console.log("camFeedHandlerJs: makeRecordUsed: Marking ticket as used.", result);
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
		console.log("camFeedHandlerJs: verifyInTraffic: Verifying License Plate in Entry records.");
		return searchResult ? searchResult : {};
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
	movePhoto,
	isTimeCheckOk,
	makeRecordUsed,
	isTimeToCreateNewDoc
};
