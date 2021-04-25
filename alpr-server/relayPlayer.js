const config = require("config");
const axios = require("axios");
const xmlParser = require("xml2json");
const _ = require("lodash");
const { Relay } = require("./models/relayModel");

async function showDO(axiosUrl, axiosConfig) {
	try {
		const { data } = await axios.get(axiosUrl, axiosConfig);
		let moduleStatus = xmlParser.toJson(data, config.get("xmlOptions"));
		moduleStatus = moduleStatus["ADAM-6060"];
		return moduleStatus;
	} catch (error) {
		console.error(
			"unable to connect to IOmodule, maybe offline.",
			error.message
		);
	}
}

async function setRelayValue(relay) {
	const { ioModule, axiosUrl, axiosConfig, relayId, relayValue } = relay;
	try {
		await Relay.updateOne(
			{ relayId: relayId },
			{
				$set: {
					relayValue: relayValue,
					VALUE: relayValue,
				},
			}
		);
		console.log("setRelayValue: Turn-On fake relay.");
	} catch (error) {
		console.error(
			"setRelayValue: unable to connect to database.",
			error.message
		);
	}
	if (ioModule !== "dummyModule") {
		setDO(axiosUrl, axiosConfig, relayId, relayValue);
	} else {
		//await fakeRelayOff(relayId);
		console.log("setRelayValue: NOT trun-off as it is fake relay.");
	}
}

async function fakeRelayOff(relayId) {
	console.log("setRelayValue: Turn-Off fake relay.");
	try {
		await Relay.updateOne(
			{ relayId: relayId },
			{
				$set: {
					relayValue: 0,
					VALUE: 0,
				},
			}
		);
	} catch (error) {
		console.error(
			"fakeRelayOff: unable to connect to database.",
			error.message
		);
	}
}

async function setDO(axiosUrl, axiosConfig, relayId, relayValue) {
	try {
		const relays = await showDO(axiosUrl, axiosConfig);
		const relayONcollection = [];
		_.find(relays.DO, function (o) {
			if (o.ID == relayId) o.VALUE = relayValue;
			relayONcollection.push(`DO${o.ID}=${o.VALUE}&`);
		});
		const removedComma = _.replace(relayONcollection, /,/g, "");
		const datastring = _.toString(removedComma);
		const { data } = await axios.post(axiosUrl, datastring, axiosConfig);
		let relayStatus = xmlParser.toJson(data, config.get("xmlOptions"));
		return relayStatus;
	} catch (error) {
		console.error("setDO: unable to connect to database.", error.message);
	}
}

async function resetDO(axiosUrl, axiosConfig, relayId) {
	const datastring = `DO${relayId}=0`;
	try {
		const { data } = await axios.post(axiosUrl, datastring, axiosConfig);
		return data;
	} catch (error) {
		console.error(
			"unable to connect to IOmodule, maybe offline.",
			error.message
		);
	}

	//const relays = await showDO( ioModuleId );
	//const relayONcollection=[];
	//   _.find( relays.DO, function (o) {
	//     if( o.ID == relayId )
	//     o.VALUE = '0';
	//     relayONcollection.push(`DO${o.ID}=${o.VALUE}&`);
	// });
	//const removedComma =  _.replace(relayONcollection, /,/g,"");
	//const datastring = _.toString(removedComma);
	//console.log(datastring);
}

// getOnlineIoModules();
//showDO('1');
//setDO('1', 5, '0');
module.exports.showDO = showDO;
module.exports.setDO = setDO;
module.exports.resetDO = resetDO;
module.exports.setRelayValue = setRelayValue;
