const express = require("express");
const router = express.Router();
const _ = require("lodash");
const playAdam = require("../relayPlayer");
const { validateMember } = require("../validateUser");
const {
	saveInOutRecord,
	updateInOutRecord,
	lpSearchForUpdate,
	verifyInTraffic,
	deleteOldPhoto,
	// isTimeCheckOk,
	makeRecordUsed,
} = require("../camFeedHandler");
const { Camera } = require("../models/cameraModel");
// const { isNewDoc } = require("../isNewDoc");
// const config = require("config");
//const playAdam = require("../DummyRelayPlayer");
// const { toDate } = require("date-fns");
// const { docSaver } = require("../saveDocument");
// const { AlprCamera } = require("../models/alprCameraModel");
// Process Camera feed posted by Alpr daemon

router.post("/", async (req, res) => {
	const cameraFeed = _.pick(
		req.body,
		"epoch_time",
		"uuid",
		"site_id",
		"camera_id",
		"results",
		"processing_time_ms"
	);
	const { results, epoch_time, camera_id, uuid } = cameraFeed;
	const lp = _.map(results, "plate");
	const photo = `${uuid}.jpg`;
	const candidates = _.flatten(_.map(results, "candidates"));
	console.log(`alprdJs: Starting traffic scan >>>>>>>>>>>>>>> ${lp}`);
	const member = await validateMember(candidates); // return a document
	const isMember = member ? true : false;
	const obu = member ? member.obu.obuId : "0000000000000000";

	const camera = await Camera.findOne({ camera_id: camera_id })
		.populate("laneId")
		.populate({ path: "relayId", populate: { path: "ioModule" } });
	const isExitLane = camera.laneId.isExitLane;
	const { ID: relayId, VALUE: albStatus } = camera.relayId;
	const {
		ip,
		port,
		url,
		configParam: axiosConfig,
		name: ioModule,
	} = camera.relayId.ioModule;
	const axiosUrl = `http://${ip}:${port}/${url}`;

	//console.log("alprdJS: :", axiosUrl);
	//const relayStatus = await playAdam.showDO(ioModuleId);
	//relayStatus.DO[relayId].VALUE == 0;

	let searchResult = await lpSearchForUpdate(lp, isExitLane, candidates); // return a matchedDoc in InOutRecord

	const tkn = {
		newDocData: {
			lp: lp,
			isMember: isMember,
			obu: obu,
			direction: isExitLane ? "OUT" : "IN",
			camera_id: camera_id,
			candidates: candidates,
			inTime: !isExitLane ? epoch_time : "",
			inPhoto: !isExitLane ? photo : "",
			inTrafficId: !isExitLane ? uuid : "",
			outTime: isExitLane ? epoch_time : "",
			outPhoto: isExitLane ? photo : "",
			outTrafficId: isExitLane ? uuid : "",
			ticket: {
				lp: lp,
				ticketId: !isExitLane ? _.random(0, 999999999999) : null,
				inTime: !isExitLane ? epoch_time : "",
				outTime: isExitLane ? epoch_time : "",
				InvitedBy: "",
				parkingFee: 0,
				parkedMinutes: 0,
				isPaid: false,
				isUsed: false,
			},
		},
		newUpdateExitData: {
			outTrafficId: uuid,
			outTime: epoch_time,
			camera_id: camera_id,
			outPhoto: photo,
			lp: lp,
			candidates: candidates,
			direction: "OUT",
			"ticket.lp": lp,
			"ticket.outTime": epoch_time,
			"ticket.parkingFee": 0,
			"ticket.parkedMinutes": 0,
			"ticket.isPaid": isMember ? true : false,
			"ticket.isUsed": false,
		},
		newUpdateEntryData: {
			inTrafficId: uuid,
			inTime: epoch_time,
			camera_id: camera_id,
			inPhoto: photo,
			lp: lp,
			candidates: candidates,
			direction: "IN",
			"ticket.lp": lp,
			"ticket.inTime": epoch_time,
			"ticket.parkingFee": 0,
			"ticket.parkedMinutes": 0,
			"ticket.isPaid": false,
			"ticket.isUsed": false,
		},
		isExitLane: isExitLane,
		isMember: isMember,
		albStatus: albStatus == 1 ? "active" : "inactive",
		searchResult: searchResult,
		relay: {
			ioModule: ioModule,
			axiosUrl: axiosUrl,
			axiosConfig: axiosConfig,
			relayId: relayId,
			relayValue: "",
		},
	};

	res.sendStatus(200);
	// const isNewTraffic = isNewDoc(tkn);
	// console.log("alprdJS: isNewDoc status:", isNewTraffic);
	isExitLane ? processExit(tkn) : processEntry(tkn);
	console.log(`alprdJs: End traffic scan >>>>>>>>>>>>>>> ${lp}`);
}); // routing POST block End

function processExit(tkn) {
	const { isMember } = tkn;
	console.log(`Processing Exit Lane Traffic`);
	isMember ? memberExit(tkn) : nonMemberExit(tkn);
}

async function memberExit(tkn) {
	const {
		newDocData,
		newUpdateExitData,
		searchResult: searchResultToUpdate,
		relay,
	} = tkn;
	if (searchResultToUpdate) {
		const { _id, direction, outPhoto, inPhoto } = searchResultToUpdate;
		direction === "OUT" ? (oldPhoto = outPhoto) : (oldPhoto = inPhoto);
		const updatedRecord = await updateDoc(_id, newUpdateExitData);
		await makeRecordUsed(updatedRecord);
		await deleteOldPhoto(oldPhoto);
	} else {
		await createDoc(newDocData);
	}
	await openAlb(relay);
}

async function nonMemberExit(tkn) {
	const { newUpdateExitData, relay } = tkn;
	const { lp, outPhoto: unwantedPhoto, ticket } = newUpdateExitData;
	const verifyInTrafficResult = await verifyInTraffic(lp);
	if (!verifyInTrafficResult) {
		console.log("No Valid Entry record found. Non-member use Entry lane.");
		await deleteOldPhoto(unwantedPhoto);
	} else {
		const { _id, outPhoto: oldPhoto } = verifyInTrafficResult;
		const updatedRecord = await updateDoc(_id, newUpdateExitData);
		if (oldPhoto) {
			await deleteOldPhoto(oldPhoto);
		}
		await makeRecordUsed(updatedRecord);
		ticket.isPaid
			? await openAlb(relay)
			: console.log("UNPAID Ticket. Pay ta Kiosk or Man-booth.");
	}
}

function processEntry(tkn) {
	const { newUpdateEntryData, isMember } = tkn;
	const { lp } = newUpdateEntryData;
	console.log(`${lp} > Processing Entry Lane Traffic`);
	isMember ? memberEntry(tkn) : nonMemberEntry(tkn);
}

async function memberEntry(tkn) {
	const {
		newDocData,
		newUpdateEntryData,
		searchResult: searchResultToUpdate,
		relay,
	} = tkn;
	const { lp } = newUpdateEntryData;
	console.log(`${lp} > Processing Member Entry.`);
	if (searchResultToUpdate) {
		const {
			_id,
			inPhoto,
			outPhoto,
			direction,
			inTrafficId,
			outTrafficId,
		} = searchResultToUpdate;
		direction === "IN" ? (oldPhoto = inPhoto) : (oldPhoto = outPhoto);
		if (inTrafficId && outTrafficId) {
			console.log("alprdJs: USED Traffic.");
			await createDoc(newDocData);
		} else {
			const updatedRecord = await updateDoc(_id, newUpdateEntryData);
			await makeRecordUsed(updatedRecord);
			await deleteOldPhoto(oldPhoto);
		}
	} else {
		await createDoc(newDocData);
	}
	await openAlb(relay);
}

async function nonMemberEntry(tkn) {
	const {
		newDocData,
		newUpdateEntryData,
		searchResult: searchResultToUpdate,
	} = tkn;
	const { lp } = newUpdateEntryData;
	console.log(`${lp} > Processing Non-Member Entry.`);
	if (searchResultToUpdate) {
		const { _id, inPhoto, outPhoto, direction } = searchResultToUpdate;
		direction === "IN" ? (oldPhoto = inPhoto) : (oldPhoto = outPhoto);
		const updatedRecord = await updateDoc(_id, newUpdateEntryData);
		await makeRecordUsed(updatedRecord);
		await deleteOldPhoto(oldPhoto);
	} else {
		await createDoc(newDocData);
	}
	console.log("Must open ALB manually for", lp);
}

async function createDoc(newDocData) {
	const { lp } = newDocData;
	console.log(`${lp} > Creating NEW document.`);
	await saveInOutRecord(newDocData);
}

async function updateDoc(_id, newUpdateData) {
	const { lp } = newUpdateData;
	console.log(`${lp} > Updating document.`);
	const updatedRecord = await updateInOutRecord(_id, newUpdateData);
	return updatedRecord;
}

async function openAlb(relay) {
	relay.relayValue = 1;
	relay.VALUE = 1;
	await playAdam.setRelayValue(relay);
}

module.exports = router;
