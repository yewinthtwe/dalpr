const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { Camera } = require("../models/cameraModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
	try {
		const camera = await Camera.find();
		res.status(200).send(camera);
	} catch (ex) {
		console.log("cameraJS: Error.", ex);
	}
});

router.put("/:id", [auth], async (req, res) => {
	console.log("cameraJS: update camera:", req.body);
	const camera = await Camera.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			description: req.body.description,
			ip: req.body.ip,
			username: req.body.username,
			password: req.body.password,
			camera_id: req.body.camera_id,
			status: req.body.status,
		},
		{ new: true }
	);
	if (!camera)
		return res
			.status(404)
			.send("cameraJS: The camera with the given ID was not found.");
	res.send(camera);
});

router.post("/", auth, async (req, res) => {
	console.log("cameraJS: Add camera:", req.body);
	// const addedCamera = await Camera.findOne({ camera_id: { $gte: 8 } });
	// if (addedCamera) {
	// 	await Camera.counterReset("camera_id", function (err) {
	// 		console.log("cameraJs: resetting camera counter.");
	// 	});
	// }

	let camera = await Camera.findOne({ name: req.body.name });

	if (camera)
		return res.status(400).send("cameraJS: Camera name already registered.");
	camera = new Camera(
		_.pick(req.body, [
			"name",
			"description",
			"ip",
			"camera_id",
			"username",
			"password",
			"status",
		])
	);
	console.log("cameraJs: camera object:", camera);
	await camera.save();
	res
		.status(200)
		.send(
			_.pick(camera, [
				"name",
				"description",
				"camera_id",
				"ip",
				"username",
				"password",
				"status",
				"camera_id",
			])
		);
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
	console.log("cameraJS: Delete camera:", req.body);
	const camera = await Camera.findByIdAndRemove(req.params.id);
	if (!camera) return res.status(404).send("The give id was not found.");
	res.send(camera);
});

module.exports = router;
