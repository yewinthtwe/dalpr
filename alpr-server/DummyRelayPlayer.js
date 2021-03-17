console.log("DummyRelayPlayer: WARNING!!!!! Using Dummy Relay player.");
const { IoModule } = require("./models/ioModuleModel");
const _ = require("lodash");

let moduleStatus = {
	Status: "OK",
	DO: [
		{ ID: "0", VALUE: "0" },
		{ ID: "1", VALUE: "0" },
		{ ID: "2", VALUE: "0" },
		{ ID: "3", VALUE: "0" },
		{ ID: "4", VALUE: "0" },
		{ ID: "5", VALUE: "0" },
	],
};

async function getOnlineIoModules() {
	try {
		const ioModules = await IoModule.find({ status: "online" }).populate(
			"relays"
		);
		return ioModules; // Return array
		//console.log("getOnlineIoModulesJS:", ioModules);
	} catch (error) {
		console.error(
			"getOnlineIoModulesJS: unable to connect to IOmodule, maybe offline.",
			error.message
		);
	}
}
getOnlineIoModules();

function showDO(ioModuleId) {
	//console.log(`Status of Module ID: ${ioModuleId}`);
	//console.log(moduleStatus);
	getOnlineIoModules();
	return moduleStatus;
}

function setDO(ioModuleId, relayId, setValue) {
	//console.log(`Dummy Relay >>>>\nModule ID: ${ioModuleId} \nRelay Id: ${relayId} \nSet Value: ${setValue}`);
	getOnlineIoModules();
	moduleStatus.DO[relayId].VALUE = setValue;
	console.log(
		`DummyRelayPlayer: Relay value: ${moduleStatus.DO[relayId].VALUE}`
	);
	console.log(`DummyRelayPlayer: Relay value reseting to OFF.`);
	moduleStatus.DO[relayId].VALUE = 0;
	return moduleStatus;
}

function resetDO(ioModuleId, relayId) {
	//console.log(`Module ID: ${ioModuleId} with Relay Id: ${relayId}`);
	let data = null;
	return data;
}

//showDO('1');
//setDO('1', 5, '0');
module.exports.showDO = showDO;
module.exports.setDO = setDO;
