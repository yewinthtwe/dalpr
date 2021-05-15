const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { Obu } = require("../models/obuModel");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
	const obus = await Obu.find().populate("memberId");
	res.status(200).send(obus);
});

router.get("/one", [auth], async (req, res) => {
	const obu = await Obu.findOne({ inUsed: false });
	console.log("obusJs: single obu:", obu);
	res.status(200).send(obu);
});
module.exports = router;
