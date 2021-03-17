const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { Relay } = require("../models/relayModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
	try {
		const relay = await Relay.find().populate("ioModule");
		//console.log("relayJS:", relay);
		res.status(200).send(relay);
	} catch (ex) {
		console.log("relayJS: Error.", ex);
	}
});

router.put("/:id", [auth], async (req, res) => {
	//console.log("relayJS: update relay:", req.body);
	const relay = await Relay.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			relayId: req.body.relayId,
			relayValue: req.body.relayValue,
			description: req.body.description,
			ioModule: req.body.ioModule,
			inUsed: req.body.inUsed,
			ID: req.body.ID,
			VALUE: req.body.VALUE,
		},
		{ new: true }
	);
	if (!relay)
		return res
			.status(404)
			.send("relayJS: The relay with the given ID was not found.");
	res.send(relay);
});

router.patch("/:name", [auth], async (req, res) => {
	console.log("relayJS: patching relay:", req.body);
	const relay = await Relay.findOneAndUpdate(
		{ name: req.params.name },
		{ inUsed: req.body.inUsed },
		{ new: true }
	);
	if (!relay)
		return res
			.status(404)
			.send("relayJS: The relay with the given name was not found.");
	res.send(relay);
});

router.post("/", auth, async (req, res) => {
	//console.log("relayJS: Add relay:", req.body);
	let relay = await Relay.findOne({ relayId: req.body.relayId });
	if (relay) return res.status(400).send("relayJS: Relay already registered.");
	relay = new Relay(
		_.pick(req.body, [
			"relayId",
			"name",
			"description",
			"relayValue",
			"inUsed",
			"ioModule",
			"ID",
			"VALUE",
		])
	);
	await relay.save();
	res
		.status(200)
		.send(
			_.pick(relay, [
				"relayId",
				"name",
				"description",
				"relayValue",
				"inUsed",
				"ioModule",
				"ID",
				"VALUE",
			])
		);
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
	//console.log("relayJS: Delete relay:", req.body);
	const relay = await Relay.findByIdAndRemove(req.params.id);
	if (!relay) return res.status(404).send("The give id was not found.");
	res.send(relay);
});

module.exports = router;
