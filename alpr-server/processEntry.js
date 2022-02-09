const _ = require("lodash");
const playAdam = require("./relayPlayer");
const { createDoc, updateDoc} = require("./docHandler");
const {
	deleteOldPhoto,
	isTimeCheckOk,
	isTimeToCreateNewDoc
} = require("./camFeedHandler");

function processEntry(tkn) {
	const { newUpdateEntryData, isMember } = tkn;
	const { lp } = newUpdateEntryData;
	console.log(`processEntry: processEntry: ${lp} >>> Processing...`);
	isMember ? memberEntry(tkn) : nonMemberEntry(tkn);
}

async function memberEntry(tkn) {
	const {
		newDocData,
		newUpdateEntryData,
		searchResult: searchResultToUpdate,
		relay,
	} = tkn;

	await openAlb(relay);

	const { lp } = newUpdateEntryData;
	console.log(`processEntry: memberEntry: ${lp} >>> Processing...`);

	//let isTimeOk = isTimeCheckOk(tkn);
	//console.log("alprd: memberEntry: isTimeOk:", isTimeOk);
	if (_.isEmpty(searchResultToUpdate)) {
		await createDoc(newDocData);
	} else {
		const { _id, inPhoto: oldPhoto } = searchResultToUpdate;
	 	const updatedRecord = await updateDoc(_id, newUpdateEntryData);
		oldPhoto ? deleteOldPhoto(oldPhoto) : console.log("No Old photo file to delete.");
		//direction === "IN" ? (oldPhoto = inPhoto) : (oldPhoto = outPhoto);
		// if (inTrafficId && outTrafficId) {
		// 	console.log("processEntry: memberEntry: USED Traffic.");
		// 	await createDoc(newDocData);
		// } else {

	}
}


async function nonMemberEntry(tkn) {
	const {
		newDocData,
		newUpdateEntryData,
		searchResult: searchResultToUpdate,
	} = tkn;

	const { lp } = newUpdateEntryData;
	console.log(`processEntry: nonMemberEntry: ${lp} >>> Processing...`);
	if (_.isEmpty(searchResultToUpdate)) {
		await createDoc(newDocData);
	} else {
		const { _id, inPhoto: oldPhoto } = searchResultToUpdate;
		const updatedRecord = await updateDoc(_id, newUpdateEntryData);
		oldPhoto ? deleteOldPhoto(oldPhoto) : console.log("No Old photo file to delete.");
	}
}

async function openAlb(relay) {
	if (relay.relayValue == 0) {
		relay.relayValue = 1;
		await playAdam.setRelayValue(relay);
	} else {
		console.log("processEntry: openAlb: ALB is already opened.", relay.relayValue);
	}
}

module.exports = {
	processEntry,
};
