const express = require("express");
const router = express.Router();
const _ = require("lodash");
//const playAdam = require("../DummyRelayPlayer");
const playAdam = require("../relayPlayer");
const { validateMember } = require("../validateUser");
const {
	searchLicensePlate,
	saveInOutRecord,
	updateInOutRecordById,
	deleteOldPhoto,
} = require("../camFeedHandler");
const { repeatCheck } = require("../repeatCheck");
const { AlprCamera } = require("../models/alprCameraModel");
const { Camera } = require("../models/cameraModel");
const { getTime, isAfter, toDate, addSeconds } = require("date-fns");
const { docSaver } = require("../saveDocument");
const config = require("config");
// const { is } = require("date-fns/locale");

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
	const photo = `${uuid}.jpg`;
	const licensePlate = _.map(results, "plate");
	const candidates = _.flatten(_.map(results, "candidates"));
	const humanTime = toDate(epoch_time);
	const alprCamera = await AlprCamera.findOne({ camera_id: camera_id });
	const camera = await Camera.findOne({ camera_id: camera_id })
		.populate("laneId")
		.populate({ path: "relayId", populate: { path: "ioModule" } });
	const isExitLane = camera.laneId.isExitLane;
	const { ID: upRelayId, VALUE: albStatus } = camera.relayId;
	// const { VALUE: albStatus } = camera.relayId;
	//const { ioModuleId } = alprCamera;
	const {
		ip,
		port,
		url,
		configParam: axiosConfig,
		name: ioModule,
	} = camera.relayId.ioModule;
	const axiosUrl = `http://${ip}:${port}/${url}`;

	console.log("alprdJS: :", axiosUrl);
	//const relayStatus = await playAdam.showDO(ioModuleId);
	//relayStatus.DO[upRelayId].VALUE == 0;
	const member = await validateMember(candidates); // return a document
	const inOutRecord = await searchLicensePlate(licensePlate); // return a Document

	const relay = {
		ioModule: ioModule,
		axiosUrl: axiosUrl,
		axiosConfig: axiosConfig,
		relayId: upRelayId,
		relayValue: "",
	};

	const trafficToken = {
		currentTrafficId: uuid,
		currentTime: epoch_time,
		currentScanCameraId: camera_id,
		currentPhoto: photo,
		currentLicensePlate: licensePlate,
		currentCandidates: candidates,
		currentDirection: isExitLane ? "OUT" : "IN",
		isExitLane: isExitLane,
		isMember: member ? true : false,
		obu: member ? member.obu.obuId : "0000000000000000",
		//ioModuleId: ioModuleId,
		upRelayId: upRelayId,
		albStatus: albStatus,
		oldId: inOutRecord ? inOutRecord._id : "",
		oldScanCameraId: inOutRecord ? inOutRecord.scanCameraId : 0,
		oldInPhoto: inOutRecord ? inOutRecord.inPhoto : "",
		oldInTime: inOutRecord ? inOutRecord.inTime : 0,
		oldOutPhoto: inOutRecord ? inOutRecord.outPhoto : "",
		oldOutTime: inOutRecord ? inOutRecord.outTime : 0,
		oldUpdatedAt: inOutRecord ? inOutRecord.updatedAt : 0,
		oldCandidates: inOutRecord ? inOutRecord.candidates : [],
		oldDirection: inOutRecord ? inOutRecord.Direction : "",
	};

	res.sendStatus(200);
	const checkResult = repeatCheck(trafficToken);
	console.log("alprdJS: repeatCheck:", checkResult);

	if (checkResult) {
		if (trafficToken.isMember) {
			console.log(`alprdJS: > create NEW document > MEMBER.`);
			const newDoc = await saveInOutRecord(trafficToken);
			console.log(`alprdJS: > Open ALB > MEMBER.`);
			relay.relayValue = "1";
			const ioResult = await playAdam.setRelayValue(relay);
		} else {
			if (trafficToken.isExitLane) {
				console.log(`alprdJS: > Use Entry Lane > NON-MEMBER.`);
				console.log(`alprdJS: Cleaning Photo > ${trafficToken.oldOutPhoto}`);
				await deleteOldPhoto(trafficToken.oldOutPhoto);
			} else {
				console.log(`alprdJS: > create NEW document > NON-MEMBER.`);
				const newDoc = await saveInOutRecord(trafficToken);
				console.log(`alprdJS: > Open ALB > NON-MEMBER.`);
				relay.relayValue = "1";
				const ioResult = await playAdam.setRelayValue(relay);
			}
		}
	} else {
		console.log(`alprdJS: Cleaning Photo > ${trafficToken.currentPhoto}`);
		console.log(`alprdJS: > Update.`);
		await deleteOldPhoto(trafficToken.currentPhoto);
	}

	// CleanUP
	// Update Doc

	// if (checkResult) {
	// 	console.log(
	// 		`alprdJS: ${trafficToken.currentLicensePlate} > Preparing to create NEW document....`
	// 	);
	// 	if (!trafficToken.isMember) {
	// 		console.log(
	// 			`alprdJS: ${trafficToken.currentLicensePlate} > Preparing for NON-Member....`
	// 		);
	// 		if (trafficToken.isExitLane) {
	// 			console.log(
	// 				`alprdJS: ${trafficToken.currentLicensePlate} > must use ENTRY lane before EXIT.`
	// 			);
	// 			//console.log(`alprdJS: Cleaning photo file....`);
	// 			//await deleteOldPhoto(trafficToken.oldOutPhoto);
	// 		} else {
	// 			console.log(
	// 				`alprdJS: ${trafficToken.currentLicensePlate} > Creating New document at Entry lane for NON-Member....`
	// 			);
	// 			console.log(
	// 				`alprdJS: ${trafficToken.currentLicensePlate} > New document created for ${trafficToken.currentLicensePlate}`
	// 			);
	// 			const newDoc = await saveInOutRecord(trafficToken);
	// 		}
	// 	} else {
	// 		console.log(
	// 			`alprdJS: ${trafficToken.currentLicensePlate} > Preparing for MEMBER....`
	// 		);
	// 		console.log(
	// 			`alprdJS: ${trafficToken.currentLicensePlate} > Creating New document for MEMER....`
	// 		);
	// 		const newDoc = await saveInOutRecord(trafficToken);
	// 		console.log(
	// 			`alprdJS: ${trafficToken.currentLicensePlate} > New document created for ${trafficToken.currentLicensePlate}`
	// 		);
	// 	}
	// } else {
	// 	console.log(
	// 		`alprdJS: ${trafficToken.currentLicensePlate} > Preparing for UPDATE process....`
	// 	);
	// 	console.log(
	// 		`alprdJS: ${trafficToken.currentLicensePlate} > Checking if EXIT lane....`
	// 	);
	// 	if (trafficToken.isExitLane) {
	// 		console.log(`alprdJS: ${trafficToken.currentLicensePlate} > EXIT lane.`);
	// 		console.log(
	// 			`alprdJS: ${trafficToken.currentLicensePlate} > Preparing for UPDATE process at EXIT lane....`
	// 		);
	// 		console.log(
	// 			`alprdJS: ${trafficToken.currentLicensePlate} > Checking for membership at EXIT lane....`
	// 		);
	// 		if (!trafficToken.isMember) {
	// 			console.log(
	// 				`alprdJS: ${trafficToken.currentLicensePlate} > NON-Member.`
	// 			);
	// 			console.log(
	// 				`alprdJS: ${trafficToken.currentLicensePlate} > Checking valid document at EXIT lane for NON-Member....`
	// 			);
	// 			if (!trafficToken.oldId) {
	// 				console.log(
	// 					`alprdJS: ${trafficToken.currentLicensePlate} > Valid document NOT found for NON-Member at EXIT lane. Please use Entry Lane.`
	// 				);
	// 				await deleteOldPhoto(trafficToken.currentPhoto);
	// 			} else {
	// 				console.log(
	// 					`alprdJS: ${trafficToken.currentLicensePlate} > Valid document FOUND for NON-Member at EXIT lane.`
	// 				);
	// 				console.log(
	// 					`alprdJS: ${trafficToken.currentLicensePlate} > Updating document for NON-member....`
	// 				);
	// 				const updatedDoc = await updateInOutRecordById(trafficToken);

	// 				if (trafficToken.oldOutPhoto) {
	// 					console.log(
	// 						`alprdJS: ${trafficToken.currentLicensePlate} > Cleaning old Entry photo file before updating document at EXIT lane....`
	// 					);
	// 					await deleteOldPhoto(trafficToken.oldOutPhoto);
	// 				}
	// 				console.log(
	// 					`alprdJS: ${trafficToken.currentLicensePlate} > Opening ALB at EXIT lane....`
	// 				);
	// 				const ioResult = await playAdam.setDO(ioModuleId, upRelayId, "1");
	// 			}
	// 		} else {
	// 			console.log(`alprdJS: ${trafficToken.currentLicensePlate} > MEMBER.`);
	// 			console.log(
	// 				`alprdJS: ${trafficToken.currentLicensePlate} > Cleaning old photo file before updating document at EXIT lane for MEMBER....`
	// 			);
	// 			await deleteOldPhoto(trafficToken.oldOutPhoto);
	// 			console.log(
	// 				`alprdJS: ${trafficToken.currentLicensePlate} > Updating document for MEMBER....`
	// 			);
	// 			const updatedDoc = await updateInOutRecordById(trafficToken);
	// 		}
	// 	} else {
	// 		console.log(`alprdJS: ${trafficToken.currentLicensePlate} > ENTRY lane.`);
	// 		console.log(
	// 			`alprdJS: ${trafficToken.currentLicensePlate} > Cleaning old photo file before updating document at ENTRY lane....`
	// 		);
	// 		await deleteOldPhoto(trafficToken.oldInPhoto);
	// 		console.log(
	// 			`alprdJS: ${trafficToken.currentLicensePlate} > Updating document at ENTRY lane....`
	// 		);
	// 		const updatedDoc = await updateInOutRecordById(trafficToken);
	// 	}
	// }

	// if (trafficToken.isMember) {
	// 	console.log(
	// 		`alprdJS: ${trafficToken.currentLicensePlate} > Auto Opening Lane barrier for Member....`
	// 	);
	// 	const ioResult = await playAdam.setDO(ioModuleId, upRelayId, "1");
	// }
}); // routing post block End

module.exports = router;
