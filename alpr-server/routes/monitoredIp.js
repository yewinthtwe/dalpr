const ping = require("ping");
const { MonitoredIp } = require("../models/monitoredIpModel");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
	try {
		const monitoredIp = await MonitoredIp.find();
		await setStatus();
		res.status(200).send(monitoredIp);
	} catch (ex) {
		console.log("monitoredIpJS: Error.", ex);
	}
});

router.put("/:id", [auth], async (req, res) => {
	console.log("monitoredIpJS: update monitoredIp:", req.body);
	const monitoredIp = await MonitoredIp.findByIdAndUpdate(
		req.params.id,
		{
			description: req.body.description,
			name: req.body.name,
			ip: req.body.ip,
			status: req.body.status,
			isMonitored: req.body.isMonitored,
		},
		{ new: true }
	);
	if (!monitoredIp)
		return res
			.status(404)
			.send("monitoredIpJS: The monitoredIp with the given ID was not found.");
	res.send(monitoredIp);
});

router.post("/", auth, async (req, res) => {
	console.log("monitoredIpJS: Add monitoredIp:", req.body);
	let monitoredIp = await MonitoredIp.findOne({ name: req.body.name });
	if (monitoredIp)
		return res
			.status(400)
			.send("monitoredIpJS: Device name already registered.");
	monitoredIp = new MonitoredIp(
		_.pick(req.body, ["name", "description", "ip", "status", "isMonitored"])
	);
	await monitoredIp.save();
	res
		.status(200)
		.send(
			_.pick(monitoredIp, [
				"name",
				"description",
				"ip",
				"status",
				"isMonitored",
			])
		);
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
	console.log("monitoredIpJS: Delete monitoredIp:", req.body);
	const monitoredIp = await MonitoredIp.findByIdAndRemove(req.params.id);
	if (!monitoredIp) return res.status(404).send("The give id was not found.");
	res.send(monitoredIp);
});

async function setStatus() {
	const monitoredIp = await MonitoredIp.find({ isMonitored: true });
	monitoredIp.map((host) => {
		ping.sys.probe(host.ip, async function (isAlive) {
			let msg = isAlive
				? "Host " + host.ip + " is alive."
				: "Host " + host.ip + " is dead.";
			console.log("monitoredIpJS:", msg);
			if (isAlive) {
				await MonitoredIp.updateOne(
					{ _id: host._id },
					{
						$set: {
							status: "online",
						},
					}
				);
			} else {
				await MonitoredIp.updateOne(
					{ _id: host._id },
					{
						$set: {
							status: "offline",
						},
					}
				);
			}
		});
	});
}

module.exports = router;
