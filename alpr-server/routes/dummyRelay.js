const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { IoModule } = require("../models/ioModuleModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
	try {
		const relay = await IoModule.findOne({ name: "dummyModule" });
		console.log("dummyRelayJS:", relay);
		res.status(200).send(relay);
	} catch (ex) {
		console.log("relayJS: Error.", ex);
	}
});

router.patch("/:relayId", [auth], async (req, res) => {
	console.log("dummyRelayJS: patching relay:", req.body);
	const relay = await IoModule.findOneAndUpdate(
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

module.exports = router;
