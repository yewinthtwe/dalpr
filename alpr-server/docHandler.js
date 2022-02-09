const {
	saveInOutRecord,
	updateInOutRecord,
} = require("./camFeedHandler");

async function createDoc(newDocData) {
	const { lp } = newDocData;
	console.log("docHandlerJs: createDoc: Creating NEW document for", lp);
	await saveInOutRecord(newDocData);
}

async function updateDoc(_id, newUpdateData) {
	const { lp } = newUpdateData;
	console.log("docHandlerJs: updateDoc: Updating document for", lp);
	const updatedRecord = await updateInOutRecord(_id, newUpdateData);
	return updatedRecord;
}

module.exports = {
	createDoc,
	updateDoc
};
