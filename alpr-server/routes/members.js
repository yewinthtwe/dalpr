const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { Member, schema } = require("../models/memberModel");
const { Obu } = require("../models/obuModel");
//const validateObjectId = require("../middleware/validateObjectId");

const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
	const members = await Member.find().populate("obu");
	res.status(200).send(members);
});

router.get("/:id", auth, async (req, res) => {
	const member = await Member.findById(req.params.id);
	if (!member) return res.status(404).send("The give id was not found.");
	res.send(member);
});

router.put("/:id", [auth], async (req, res) => {
	const member = await Member.findByIdAndUpdate(
		req.params.id,
		{
			licensePlate: req.body.licensePlate,
			memberName: req.body.memberName,
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
	const { error } = schema.validate(req.body);
	console.log("membersJS:", req.body, error);
	if (error) return res.status(400).send(error.details[0].message);

	let obu = await Obu.findOne({ inUsed: false });
	// console.log(`Picking random OBU : ${obu}`);
	let member = await Member.findOne({ licensePlate: req.body.licensePlate });
	if (member) return res.status(400).send("Car number already registered.");
	member = new Member(
		_.pick(req.body, [
			"memberName",
			"address",
			"licensePlate",
			"mobile",
			"email",
			"isActive",
		])
	);
	obu ? (member.obu = obu._id) : (member.obu = "0000000000000000");
	member.isActive = member.isActive;
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
				"address",
				"licensePlate",
				"registrationDate",
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
