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
//const { Camera } = require("../models/cameraModel");
const { AiLane } = require("../models/aiLaneModel");
//const { Lane } = require("../models/laneModel");
//const { IoModule } = require("../models/ioModuleModel");
// const { isNewDoc } = require("../isNewDoc");
// const config = require("config");
//const playAdam = require("../DummyRelayPlayer");
// const { toDate } = require("date-fns");
// const { docSaver } = require("../saveDocument");
// const { AlprCamera } = require("../models/alprCameraModel");
// Process Camera feed posted by Alpr daemon

//const adamUrl = "http://192.168.11.57/digitaloutput/all/value";

// const adamConfig = {
// 	headers: {
// 		"Content-Length": 0,
// 		"Content-Type": "text/plain",
// 	},
// 	auth: {
// 		username: "root",
// 		password: "00000000",
// 	},
// };
// const { data } = await axios.post( config.get(`adamURL.${ioModuleId}`), datastring, config.get('adamConfig') );

async function getConfig() {
	let configResult = await AiLane.find()
		.populate("camera")
		.populate("lane")
		.populate("ioModule");
	return configResult;
}

router.post("/", async (req, res) => {
	const alprLaneConfig = await getConfig();

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
	console.log(`alprdJs: Starting traffic scan for >>>>>>>>>>>>>>> ${lp}`);
	console.log("alprdJs: Alpr-Camera ID is:", camera_id);

	let currentConfig = _.filter(alprLaneConfig, (o) => {
		return o.camera.camera_id === camera_id;
	});
	//console.log("alprdJs: Active CONFIG:", currentConfig);
	const member = await validateMember(lp, candidates);

	//console.log("alprdJs: Validated memberObject:", member);
	if (member) {
		const { memberName, memberId, lp: memberPlate, memberType } = member;
		console.log("alprdJs: member Name:", memberName);
		console.log("alprdJs: member Id:", memberId);
		console.log("alprdJs: Registered license plate(s):", memberPlate);
		console.log("alprdJs: member type:", memberType);
		console.log("alprdJs: OBU Id:", member.obuObjectId.obuId);
	}
	const obu = member ? member.obuObjectId.obuId : "0000000000000000";
	const isMember = member ? true : false;

	// let result = await AiLane.find()
	// 	.populate({
	// 		path: "camera",
	// 		match: { camera_id: camera_id },
	// 	})
	// 	.populate("lane")
	// 	.populate("ioModule");

	// let attachedCamera = result.filter(function (lane) {
	// 	if (lane.camera) {
	// 		//console.log("found camera:", lane.camera);
	// 		return lane.camera;
	// 	}
	// });
	//console.log("alprdJs: Alpr-Lane Config Object:", attachedCamera);
	console.log("alprdJs: Alpr-Lane Name:", currentConfig[0].name);
	const { isExitLane, name: laneName } = currentConfig[0].lane;
	console.log("alprdJs: Alpr-Camera IP:", currentConfig[0].camera.ip);
	console.log("alprdJs: Physical Lane Name is:", laneName);
	console.log(
		"alprdJs: Physical Lane type is:",
		isExitLane ? "EXIT lane" : "ENTRY Lane"
	);
	const { ioModule: ioMod, relay: relayObjId } = currentConfig[0];
	const moduleInfo = _.pick(ioMod, [
		"name",
		"ip",
		"port",
		"url",
		"configParam",
		"relays",
	]);
	console.log("alprdJs: IO Module IP:", moduleInfo ? moduleInfo.ip : "0.0.0.0");

	let relayObj = _.find(moduleInfo.relays, (o) => {
		if (_.isEqual(o._id, relayObjId)) {
			return true;
		}
	});

	const { ID: relayId, VALUE: albStatus } = relayObj;
	console.log(
		"alprdJs: Relay ID:",
		relayObj ? relayId : "INVALID EMPTY RELAY OBJECT."
	);

	const { ip, port, url, configParam: adamConfig, name: ioModule } = moduleInfo;
	const axiosUrl = `http://${ip}:${port}/${url}/all/value`;
	//const axiosUrl = adamUrl;
	//console.log("alprdJS: :", axiosUrl);
	//const relayStatus = await playAdam.showDO(ioModuleId);
	//relayStatus.DO[relayId].VALUE == 0;

	console.log("alprdJs: Performing duplicate record search in tempo database.");
	let searchResult = await lpSearchForUpdate(lp, isExitLane, candidates); // return document object
	const tkn = {
		newDocData: {
			lp: lp,
			isMember: isMember,
			memberType: isMember ? member.memberType : "Visitor",
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
			//axiosConfig: axiosConfig,
			axiosConfig: adamConfig,
			relayId: relayId,
			relayValue: albStatus,
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
	console.log(`alprdJs: processExit: Processing...`);
	isMember ? memberExit(tkn) : nonMemberExit(tkn);
}

async function memberExit(tkn) {
	const {
		newDocData,
		newUpdateExitData,
		searchResult: searchResultToUpdate,
		relay,
	} = tkn;

	if (_.isEmpty(searchResultToUpdate)) {
		await createDoc(newDocData);
	} else {
		const { _id, inPhoto, outPhoto, direction, inTrafficId, outTrafficId } =
			searchResultToUpdate;
		direction === "OUT" ? (oldPhoto = outPhoto) : (oldPhoto = inPhoto);
		const updatedRecord = await updateDoc(_id, newUpdateExitData);
		await makeRecordUsed(updatedRecord);
		await deleteOldPhoto(oldPhoto);
	}
	await openAlb(relay);
}

async function nonMemberExit(tkn) {
	const { newUpdateExitData, relay } = tkn;
	const { lp, outPhoto: unwantedPhoto, ticket } = newUpdateExitData;
	const verifyInTrafficResult = await verifyInTraffic(lp);
	if (!verifyInTrafficResult) {
		console.log(
			"alprdJs: nonMemberExit: No Valid Entry found. Use Entry lane."
		);
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
			: console.log(
					"alprdJs: nonMemberExit: UNPAID Ticket. Pay at Kiosk or Man-booth."
			  );
	}
}

function processEntry(tkn) {
	const { newUpdateEntryData, isMember } = tkn;
	const { lp } = newUpdateEntryData;
	console.log(`alprdJs: processEntry: ${lp} >>> Processing...`);
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
	console.log(`alprdJs: memberEntry: ${lp} >>> Processing...`);
	if (_.isEmpty(searchResultToUpdate)) {
		await createDoc(newDocData);
	} else {
		const { _id, inPhoto, outPhoto, direction, inTrafficId, outTrafficId } =
			searchResultToUpdate;
		direction === "IN" ? (oldPhoto = inPhoto) : (oldPhoto = outPhoto);
		if (inTrafficId && outTrafficId) {
			console.log("alprdJs: memberEntry: USED Traffic.");
			await createDoc(newDocData);
		} else {
			const updatedRecord = await updateDoc(_id, newUpdateEntryData);
			await makeRecordUsed(updatedRecord);
			await deleteOldPhoto(oldPhoto);
		}
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
	console.log(`alprdJs: nonMemberEntry: ${lp} >>> Processing...`);
	if (_.isEmpty(searchResultToUpdate)) {
		await createDoc(newDocData);
	} else {
		const { _id, inPhoto, outPhoto, direction } = searchResultToUpdate;
		direction === "IN" ? (oldPhoto = inPhoto) : (oldPhoto = outPhoto);
		const updatedRecord = await updateDoc(_id, newUpdateEntryData);
		await makeRecordUsed(updatedRecord);
		await deleteOldPhoto(oldPhoto);
	}
	console.log("alprdJs: nonMemberEntry: Must open ALB manually for", lp);
}

async function createDoc(newDocData) {
	const { lp } = newDocData;
	console.log(`${lp} > Creating NEW document.`);
	await saveInOutRecord(newDocData);
}

async function updateDoc(_id, newUpdateData) {
	const { lp } = newUpdateData;
	console.log(`alprdJs: updateDoc: ${lp} >>> Updating document...`);
	const updatedRecord = await updateInOutRecord(_id, newUpdateData);
	return updatedRecord;
}

async function openAlb(relay) {
	if (relay.relayValue == 0) {
		relay.relayValue = 1;
		await playAdam.setRelayValue(relay);
	} else {
		console.log("alprdJs: openAlb: ALB is already opened.", relay.relayValue);
	}
}

module.exports = router;
