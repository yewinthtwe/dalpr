const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { Member, schema } = require("../models/memberModel");
const { Obu } = require("../models/obuModel");
//const validateObjectId = require("../middleware/validateObjectId");

const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { addDays } = require("date-fns");

router.get("/", auth, async (req, res) => {
	const members = await Member.find().populate("obu");
	res.status(200).send(members);
});

router.get("/:id", auth, async (req, res) => {
	const member = await Member.findById(req.params.id);
	if (!member) return res.status(404).send("The give id was not found.");
	res.send(member);
});

router.put("/:id", [auth], async (req, res) => {
	console.log("membersJS: receiving PUT request data:", req.body);
	const member = await Member.findByIdAndUpdate(
		req.params.id,
		{
			lp: req.body.lp,
			memberName: req.body.memberName,
			memberType: req.body.memberType,
			address: req.body.address,
			mobile: req.body.mobile,
			email: req.body.email,
			isActive: req.body.isActive,
		},
		{ new: true }
	);
	if (!member)
		return res.status(404).send("The member with the given ID was not found.");
	res.send(member);
});

router.post("/", auth, async (req, res) => {
	console.log("membersJS: receiving POST request data:", req.body);
	let licensePlates = req.body.lp;
	const query = {
		$or: [
			{ lp: { $elemMatch: { plate: { $in: _.map(licensePlates, "plate") } } } },
			{
				candidates: {
					$elemMatch: {
						plate: { $in: _.map(licensePlates, "plate") },
					},
				},
			},
		],
	};

	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let obu = await Obu.findOne({ inUsed: false });
	// console.log(`Picking random OBU : ${obu}`);
	let member = await Member.findOne(query);
	if (member)
		return res.status(400).send("License plate number already registered.");
	member = new Member(
		_.pick(req.body, [
			"memberName",
			"memberType",
			"address",
			"lp",
			"mobile",
			"email",
			"isActive",
		])
	);
	obu ? (member.obu = obu._id) : (member.obu = "0000000000000000");
	member.isActive = member.isActive;
	member.expireDate = addDays(new Date(), 90);
	//console.log(member);
	await member.save();
	if (member.obu) {
		const updatedRecord = await Obu.updateOne(
			{ _id: obu._id },
			{
				$set: {
					inUsed: true,
					memberId: member._id,
				},
			}
		);
	}

	res
		.status(200)
		.send(
			_.pick(member, [
				"memberName",
				"memberType",
				"address",
				"lp",
				"registrationDate",
				"expireDate",
				"mobile",
				"email",
				"isActive",
			])
		);
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
	const member = await Member.findByIdAndRemove(req.params.id);
	if (!member) return res.status(404).send("The give id was not found.");
	res.status(200).send(member);
});

module.exports = router;
