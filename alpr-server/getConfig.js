const _ = require("lodash");
const { AiLane } = require("./models/aiLaneModel");


async function getConfig(camera_id) {
	let configResult = await AiLane.find()
		.populate("camera")
		.populate("lane")
		.populate("ioModule");
		// console.log(`getConfigJs: Getting AI Lane configuration...`);
		let currentConfig = _.filter(configResult, (o) => {
			return o.camera.camera_id === camera_id;
		});
	//console.log("getConfigJs:",currentConfig);
	return currentConfig;
}

module.exports = {
	getConfig,
};
