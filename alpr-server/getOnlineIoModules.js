console.log("DummyRelayPlayer: WARNING!!!!! Using Dummy Relay player.");
const { IoModule } = require("./models/ioModuleModel");
const _ = require("lodash");

async function getOnlineIoModules() {
	try {
		const ioModules = await IoModule.find({ status: "online" }).populate(
			"relays"
		);
		return ioModules; // Return array
	} catch (error) {
		console.error(
			"getOnlineIoModulesJS: unable to connect to IOmodule, maybe offline.",
			error.message
		);
	}
}
getOnlineIoModules();

module.exports.getOnlineIoModules = getOnlineIoModules;
