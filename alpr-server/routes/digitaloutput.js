const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { Relay } = require("../models/relayModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/:relayId", async (req, res) => {
	try {
		const relay = await Relay.findOne({ relayId: req.params.relayId });
		//console.log("relayJS:", relay);
		res.status(200).send(relay);
	} catch (ex) {
		console.log("relayJS: Error.", ex);
	}
});

router.get("/", async (req, res) => {
	try {
		const relay = await Relay.find();
		//console.log("relayJS:", relay);
		res.status(200).send(relay);
	} catch (ex) {
		console.log("relayJS: Error.", ex);
	}
});

router.patch("/:relayId", [auth], async (req, res) => {
	console.log("relayJS: patching relay:", req.body);
	const relay = await Relay.findOneAndUpdate(
		{ relayId: req.params.relayId },
		{ VALUE: req.body.VALUE, relayValue: req.body.relayValue },
		{ new: true }
	);
	if (!relay)
		return res
			.status(404)
			.send("relayJS: The relay with the given name was not found.");
	res.send(relay);
});

module.exports = router;
