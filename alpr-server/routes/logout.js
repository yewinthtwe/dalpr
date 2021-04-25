const { User } = require("../models/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/:id", async (req, res) => {
	console.log(
		"loginJs: Receiving Logout request from client with cookie.",
		req.cookies.authToken
	);
	console.log(
		"loginJs: Receiving Logout request from client with cookie.",
		req.params.id
	);
	const updatedRecord = await User.updateOne(
		{ _id: req.params.id },
		{ $set: { isLoggedIn: false } },
		{ new: true }
	);
	console.log("loginJs: ", updatedRecord);
	res.status(200).clearCookie("authToken").send({ isLoggedIn: false });
});

module.exports = router;
