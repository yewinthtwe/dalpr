const config = require("config");
const axios = require("axios");
const xmlParser = require("xml2json");
const _ = require("lodash");
const { IoModule } = require("./models/ioModuleModel");

async function getRelayStatus(axiosUrl, axiosConfig) {
	try {
		const { data } = await axios.get(axiosUrl, axiosConfig);
		let relayStatus = xmlParser.toJson(data, config.get("xmlOptions"));
		relayStatus = relayStatus["ADAM-6060"];
		//console.log("relayPlayerJs: getRelayStatus: relayStatus:", relayStatus);
		return relayStatus;
	} catch (error) {
		console.error(
			"Error fecthing relay status data. Unable to connect to IOmodule, maybe offline.",
			error.message
		);
	}
}

async function setRelayValueInDb(relay) {
	const { ioModule, axiosUrl, axiosConfig } = relay;
	try {
		const relays = await getRelayStatus(axiosUrl, axiosConfig);
		_.forEach(relays, (o) => {
			const query = {
				name: ioModule,
				"relays.ID": o.ID,
			};
			const update = {
				$set: { "relays.$.VALUE": o.VALUE },
			};
			async () => {
				let result = await IoModule.updateOne(query, update, {
					new: true,
				});
				//console.log("Syncing.. relays in DB and IoModule..", result);
			};
		});
	} catch (error) {
		console.error(
			"relayPlayerJs : setRelayValueInDb: Unable to set relay Value in Database.",
			error.message
		);
	}
}

async function setRelayValueInIoModule(relay) {
	const { axiosUrl, axiosConfig, relayId, relayValue } = relay;
	// console.log("relayPlayer: setRelayValueInIoModule:", axiosUrl);
	// console.log("relayPlayer: setRelayValueInIoModule: relayID", relayId);
	// console.log("relayPlayer: setRelayValueInIoModule: axiosConfig", axiosConfig);
	try {
		const relaysStatus = await getRelayStatus(axiosUrl, axiosConfig);
		let relayONcollection = [];
		_.find(relaysStatus.DO, function (o) {
			if (o.ID == relayId) o.VALUE = relayValue;
			relayONcollection.push(`DO${o.ID}=${o.VALUE}&`);
		});
		// console.log(
		// 	"relayPlayer: setRelayValueInIoModule: relayOnCollection:",
		// 	relayONcollection
		// );
		let removedComma = _.replace(relayONcollection, /,/g, "");
		const datastring = _.toString(removedComma);
		const { data } = await axios.post(axiosUrl, datastring, axiosConfig);
		//console.log("relayPlayer: setRelayValueInIoModule: response from IO module:", data);
		let response = xmlParser.toJson(data, config.get("xmlOptions"));
		return response;
	} catch (error) {
		console.error(
			"relayPlayerJs : setRelayValueInIoModule: Unable to connect to IO module.",
			error.message
		);
	}
}

async function setRelayValue(relay) {
	await setRelayValueInIoModule(relay);
	await setRelayValueInDb(relay);
}

module.exports.getRelayStatus = getRelayStatus;
module.exports.setRelayValueInIoModule = setRelayValueInIoModule;
module.exports.setRelayValue = setRelayValue;

// const axiosUrl = "http://192.168.11.57/digitaloutput/all/value";

// const axiosConfig = {
// 	"headers": {
// 		"Content-Length": 0,
// 		"Content-Type": "text/plain"
// 	},
// 	"auth": {
// 		"username": "root",
// 		"password": "00000000"
// 	}
// };
// const { data } = await axios.post( config.get(`adamURL.${ioModuleId}`), datastring, config.get('adamConfig') );

// async function resetRelayValueInIoModule(axiosUrl, axiosConfig, relayId) {
// 	const datastring = `DO${relayId}=0`;
// 	try {
// 		const { data } = await axios.post(axiosUrl, datastring, axiosConfig);
// 		return data;
// 	} catch (error) {
// 		console.error(
// 			"unable to connect to IOmodule, maybe offline.",
// 			error.message
// 		);
// 	}

//const relays = await getRelayStatus( ioModuleId );
//const relayONcollection=[];
//   _.find( relays.DO, function (o) {
//     if( o.ID == relayId )
//     o.VALUE = '0';
//     relayONcollection.push(`DO${o.ID}=${o.VALUE}&`);
// });
//const removedComma =  _.replace(relayONcollection, /,/g,"");
//const datastring = _.toString(removedComma);
//console.log(datastring);
// }

// getOnlineIoModules();
//getRelayStatus('1');
//setRelayValueInIoModule('1', 5, '0');
// module.exports.resetRelayValueInIoModule = resetRelayValueInIoModule;
