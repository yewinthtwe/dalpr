const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { InOutRecord } = require("../models/inOutRecordModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { format } = require("date-fns");

// format(new Date(2014, 1, 11), 'MM/dd/yyyy')
//format(new Date(1616413947139), "dd,MM,yyyy");
//format(new Date(toDate), 'dd/MM/yyyy');

router.post("/", async (req, res) => {
	console.log("reportJS: body:", req.body);

	const filterOptions = _.pick(
		req.body,
		"dateFrom",
		"dateTo",
		"member",
		"nonMember"
	);
	const { dateFrom, dateTo, member, nonMember } = filterOptions;

	const fromDate = format(new Date(dateFrom), "yyyy,MM,dd");
	const toDate = format(new Date(dateTo), "yyyy,MM,dd");

	// console.log("fromDate:", fromDate);
	// console.log("toDate:", toDate);
	if (member && nonMember && dateFrom) {
		const result = await allSelected(fromDate, toDate);
		res.send(result);
	} else if (member && dateFrom) {
		const result = await memberWithDateFilter(fromDate, toDate);
		res.send(result);
	} else if (nonMember && dateFrom) {
		const result = await nonMemberWithDateFilter(fromDate, toDate);
		res.send(result);
	} else if (nonMember) {
		const result = await nonMemberWithDefaultDate();
		res.send(result);
	} else if (member) {
		const result = await memberWithDefaultDate();
		res.send(result);
	} else if (dateFrom || dateTo) {
		const result = await allWithDateFilter(fromDate, toDate);
		res.send(result);
	} else {
		const result = await allWithDefaultDate();
		res.send(result);
	}
});

async function allSelected(fromDate, toDate) {
	try {
		const result = await InOutRecord.find({
			createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
		});
		console.log("allSelected:", result);
		return result;
	} catch (ex) {
		console.log("reportJS: Error.", ex);
	}
}
async function allWithDateFilter(fromDate, toDate) {
	try {
		const result = InOutRecord.find({
			createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
		});
		console.log("allWith Date Filter:", result);
		return result;
	} catch (ex) {
		console.log("reportJS: Error.", ex);
	}
}

async function memberWithDefaultDate() {
	try {
		const result = await InOutRecord.find({ isMember: true });
		console.log("member With Default Date:", result);
		return result;
	} catch (ex) {
		console.log("reportJS: Error.", ex);
	}
}
async function memberWithDateFilter(fromDate, toDate) {
	try {
		const result = await InOutRecord.find({
			isMember: true,
			createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
		});
		console.log("member With Date filter:", result);
		return result;
	} catch (ex) {
		console.log("reportJS: Error.", ex);
	}
}
async function nonMemberWithDateFilter(fromDate, toDate) {
	try {
		const result = await InOutRecord.find({
			isMember: false,
			createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
		});
		console.log("nonMember With DateFilter:", result);
		return result;
	} catch (ex) {
		console.log("reportJS: Error.", ex);
	}
}
async function nonMemberWithDefaultDate() {
	try {
		const result = await InOutRecord.find({
			isMember: false,
		});
		console.log("nonMember With Default Date:", result);
		return result;
	} catch (ex) {
		console.log("reportJS: Error.", ex);
	}
}
async function allWithDefaultDate() {
	try {
		const result = await InOutRecord.find();
		console.log("allWith Default Date:", result);
		return result;
	} catch (ex) {
		console.log("reportJS: Error.", ex);
	}
}

module.exports = router;
