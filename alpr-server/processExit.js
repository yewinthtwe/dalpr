const _ = require("lodash");
const playAdam = require("./relayPlayer");
const {
	verifyInTraffic,
	deleteOldPhoto,
	movePhoto,
	makeRecordUsed,
	isTimeCheckOk,
	isTimeToCreateNewDoc,
} = require("./camFeedHandler");
const { createDoc, updateDoc} = require("./docHandler");


async function processExit(tkn) {
		const { isMember } = tkn;
		console.log(`processExitJs: processExit: Processing...`);
		isMember ? memberExit(tkn) : nonMemberExit(tkn);
}

async function memberExit(tkn) {
	const {
		newDocData,
		newUpdateExitData,
		searchResult: searchResultToUpdate,
		relay,
	} = tkn;

	await openAlb(relay);

	if (_.isEmpty(searchResultToUpdate)) {
		//await createDoc(newDocData);
		console.log("No Entry record found. Discarding traffic...");
		deleteOldPhoto(newDocData.outPhoto);
	} else {
		const { _id, outPhoto: oldPhoto } =	searchResultToUpdate;
			const updatedRecord = await updateDoc(_id, newUpdateExitData);
			await makeRecordUsed(updatedRecord);
			oldPhoto ? deleteOldPhoto(oldPhoto) : console.log("No old photo file to delete.");
	} 
}

async function nonMemberExit(tkn) {
	const {
		newDocData,
		newUpdateExitData,
		searchResult: searchResultToUpdate,
		relay,
	} = tkn;

	if (_.isEmpty(searchResultToUpdate)) {
		//await createDoc(newDocData);
		console.log("No Entry record found. Discarding traffic...");
		deleteOldPhoto(newDocData.outPhoto);
	} else {
		const { _id, outPhoto: oldPhoto } =	searchResultToUpdate;
			const updatedRecord = await updateDoc(_id, newUpdateExitData);
			await makeRecordUsed(updatedRecord);
			oldPhoto ? deleteOldPhoto(oldPhoto) : console.log("No old photo file to delete.");
		} 
	}

async function openAlb(relay) {
	if (relay.relayValue == 0) {
		relay.relayValue = 1;
		await playAdam.setRelayValue(relay);
	} else {
		console.log("processExitJs: openAlb: ALB is already opened.", relay.relayValue);
	}
}

module.exports = {
	processExit,
};
