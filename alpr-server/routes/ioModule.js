const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { IoModule } = require("../models/ioModuleModel");
const { relayData } = require("../models/relayData");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
	try {
		// const ioModule = await IoModule.find().populate("relays");
		const ioModule = await IoModule.find();
		console.log("ioModuleJS:", ioModule);
		res.status(200).send(ioModule);
	} catch (ex) {
		console.log("ioModuleJS: Error.", ex);
	}
});

router.get("/relays", async (req, res) => {
	try {
		// const ioModule = await IoModule.find().populate("relays");
		const ioModule = await IoModule.find();
		console.log("ioModuleJS:", ioModule);
		res.status(200).send(ioModule);
	} catch (ex) {
		console.log("ioModuleJS: Error.", ex);
	}
});

router.get("/:id", async (req, res) => {
	try {
		// const ioModule = await IoModule.findById(req.params.id).populate("relays");
		const ioModule = await IoModule.findById(req.params.id);
		//console.log("ioModuleJS:", ioModule);
		res.status(200).send(ioModule);
	} catch (ex) {
		console.log("ioModuleJS: Error.", ex);
	}
});

router.put("/:id", [auth], async (req, res) => {
	console.log("ioModuleJS: update ioModule:", req.body);
	const ioModule = await IoModule.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			description: req.body.description,
			ip: req.body.ip,
			port: req.body.port,
			username: req.body.username,
			password: req.body.password,
			configParam: req.body.configParam,
			url: req.body.url,
			numberOfRelays: req.body.numberOfRelays,
		},
		{ new: true }
	);
	await createRelays(req.body.name, req.body.numberOfRelays);
	if (!ioModule)
		return res
			.status(404)
			.send("ioModuleJS: The ioModule with the given ID was not found.");
	res.send(ioModule);
});

router.post("/", auth, async (req, res) => {
	console.log("ioModuleJS: Add ioModule:", req.body);
	let ioModule = await IoModule.findOne({ name: req.body.name });
	if (ioModule)
		return res
			.status(400)
			.send("ioModuleJS: IoModule name already registered.");
	ioModule = new IoModule(
		_.pick(req.body, [
			"name",
			"description",
			"ip",
			"port",
			"username",
			"password",
			"numberOfRelays",
			"url",
			"configParam",
		])
	);
	await ioModule.save();
	await createRelays(req.body.name, req.body.numberOfRelays);
	res
		.status(200)
		.send(
			_.pick(ioModule, [
				"name",
				"description",
				"ip",
				"port",
				"username",
				"password",
				"numberOfRelays",
				"url",
				"configParam",
			])
		);
});

async function createRelays(ioModuleName, numberOfRelays) {
	_.map(relayData, (rl) => {
		rl.parentName = ioModuleName;
	});
	const relay = await IoModule.findOneAndUpdate(
		{ name: ioModuleName },
		{ relays: _.slice(relayData, 0, numberOfRelays) },
		{ new: true }
	);
}

router.delete("/:id", [auth, isAdmin], async (req, res) => {
	console.log("ioModuleJS: Delete ioModule:", req.body);
	const ioModule = await IoModule.findByIdAndRemove(req.params.id).select(
		"-relays"
	);
	if (!ioModule) return res.status(404).send("The give id was not found.");
	res.send(ioModule);
});

module.exports = router;
