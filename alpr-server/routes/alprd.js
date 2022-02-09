const express = require("express");
const router = express.Router();
const _ = require("lodash");
const playAdam = require("../relayPlayer");
const { validateMember } = require("../validateUser");
const { getConfig } = require("../getConfig");
const { processExit } = require("../processExit");
const { processEntry } = require("../processEntry");
const {	lpSearchForUpdate } = require("../camFeedHandler");
//const { Price } = require("../models/priceModel");
//const { Camera } = require("../models/cameraModel");
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

	console.log(`alprdJs: Starting traffic scan for >>>>>>>>>>>>>>> ${lp}`);

	console.log(`alprdJs: Scanned License Plates as Candidates are : >>>>>>>>>>>>>>>`, candidates);

	console.log("alprdJs: Alpr-Camera ID is:", camera_id);

	//console.log("alprdJs: alprLane configuration:", alprLaneConfig);
		
	const currentConfig = await getConfig(camera_id);

	// let currentConfig = _.filter(alprLaneConfig, (o) => {
	// 	return o.camera.camera_id === camera_id;
	// });

	const member = await validateMember(lp, candidates);
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

	// console.log("alprdJs: IO module info:", ioMod);
	// console.log("alprdJs: relay info:", relayObjId);

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

		// console.log("alprdJs: moduleInfo:", o);
		// console.log("alprdJs: relayObjId:", relayObjId);

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
		enableParkingFee: false,
	};
	res.sendStatus(200);

	isExitLane ? processExit(tkn) : processEntry(tkn);
	console.log(`alprdJs: End traffic scan >>>>>>>>>>>>>>> ${lp}`);
}); // routing POST block End

module.exports = router;
