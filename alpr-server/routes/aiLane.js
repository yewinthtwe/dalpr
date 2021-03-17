const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { AiLane } = require("../models/aiLaneModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
	try {
		const aiLane = await AiLane.find();
		res.status(200).send(aiLane);
	} catch (ex) {
		console.log("aiLaneJS: Error.", ex);
	}
});

router.put("/:id", [auth], async (req, res) => {
	console.log("aiLaneJS: update aiLane:", req.body);
	const aiLane = await AiLane.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			description: req.body.description,
			lane: req.body.lane,
			laneId: req.body.laneId,
			laneType: req.body.laneType,
			camera: req.body.camera,
			cameraId: req.body.cameraId,
			ioModule: req.body.ioModule,
			ioModuleId: req.body.ioModuleId,
			relay: req.body.relay,
			relayId: req.body.relayId,
			status: req.body.status,
		},
		{ new: true }
	);
	if (!aiLane)
		return res
			.status(404)
			.send("aiLaneJS: The aiLane with the given ID was not found.");
	res.send(aiLane);
});

router.post("/", auth, async (req, res) => {
	console.log("aiLaneJS: Add aiLane:", req.body);
	let aiLane = await AiLane.findOne({ name: req.body.name });
	if (aiLane)
		return res.status(400).send("aiLaneJS: AiLane name already registered.");
	aiLane = new AiLane(
		_.pick(req.body, [
			"name",
			"description",
			"camera",
			"cameraId",
			"ioModule",
			"ioModuleId",
			"relay",
			"relayId",
			"lane",
			"laneId",
			"laneType",
			"status",
		])
	);
	await aiLane.save();
	res
		.status(200)
		.send(
			_.pick(aiLane, [
				"name",
				"description",
				"camera",
				"cameraId",
				"ioModule",
				"ioModuleId",
				"relay",
				"relayId",
				"lane",
				"laneId",
				"laneType",
				"status",
			])
		);
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
	console.log("aiLaneJS: Delete aiLane:", req.body);
	const aiLane = await AiLane.findByIdAndRemove(req.params.id);
	if (!aiLane) return res.status(404).send("The give id was not found.");
	res.send(aiLane);
});

module.exports = router;
