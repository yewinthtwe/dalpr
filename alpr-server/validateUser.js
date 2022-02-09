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
	console.log(`validateMember: Searching ${lp} in Member database.....`);

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

// 	$or: [
// 		{ lp: { $elemMatch: { plate: { $in: _.map(lp, "plate") } } } },
// 		{
// 			candidates: {
// 				$elemMatch: {
// 					plate: { $in: _.map(candidates, "plate") },
// 				},
// 			},
// 		},
// 	],
// };

	
	const member = await Member.findOne(query).populate("obuObjectId");
	
	//console.log("validateMember: member object:", member);
	
	if (_.isEmpty(member)) {
		console.log(`validateUserJs: validateMember: NOT found in member database.`);
		return member;
	} else {
		//console.log(`validateUserJs: validateMember: FOUND in member database.`);
			const { memberName, memberId, lp: memberPlate, memberType } = member;
			console.log("validateUserJs: validateMember: member Name:", memberName);
			//console.log("validateUserJs: validateMember: member Id:", memberId);
			console.log("validateUserJs: validateMember: Registered license plate(s):", memberPlate);
			//console.log("validateUserJs: validateMember: member type:", memberType);
			console.log("validateUserJs: validateMember: OBU Id:", member.obuObjectId.obuId);
		
		return member;
	}
}

async function findActiveMembers() {
	console.log(`findActiveMembers: Searching in Member database.....`);
	//const member = await Member.findOne({ $or: [{'lp': { $in: lp }}, {'candidates.plate': { $in: lp }}] });
	const query = {
		isActive: true,
	};
	const member = await Member.find(query).populate("obuObjectId");
	console.log("findActiveMembers: member:", member);
	if (_.isEmpty(member)) {
		console.log(`findActiveMembers: NO Active member found in database.`);
		return member;
	} else {
		console.log(`findActiveMembers: Active members in database.`);
		return member;
	}
}

module.exports = {
	validateMember,
	getInOutRecords,
	getInOutRecord,
	findActiveMembers,
};
