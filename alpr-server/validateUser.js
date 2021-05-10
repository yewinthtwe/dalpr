const { Member } = require("./models/memberModel");
const { InOutRecord } = require("./models/inOutRecordModel");
const _ = require("lodash");

async function getInOutRecords() {
	const inOutRecords = await InOutRecord.find({})
		.sort({ Time: "descending" })
		.limit(100);
	//console.log(`validateMember: getInOutRecords: Providing InOutRecords.`);
	return inOutRecords;
}

async function getInOutRecord(id) {
	const inOutRecord = await InOutRecord.findOne({ _id: id });
	//console.log(`validateMember: getInOutRecord: Providing InOutRecord.`);
	return inOutRecord;
}

async function validateMember(lp, candidates) {
	console.log(`validateMember: Searching in Member database.....`);
	//const member = await Member.findOne({ $or: [{'lp': { $in: lp }}, {'candidates.plate': { $in: lp }}] });
	const query = {
		isActive: true,
		$or: [
			{ lp: { $elemMatch: { plate: { $in: lp } } } },
			{
				candidates: {
					$elemMatch: {
						plate: { $in: _.map(candidates, "plate") },
					},
				},
			},
		],
	};
	const member = await Member.findOne(query).populate("obu");
	//console.log("validateMember: member:", member);
	if (_.isEmpty(member)) {
		console.log(`validateMember: NOT found in member database.`);
		return member;
	} else {
		console.log(`validateMember: FOUND in member database.`);
		return member;
	}
}

module.exports = {
	validateMember,
	getInOutRecords,
	getInOutRecord,
};
