const { User } = require("../models/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	console.log("authJs: Receiving login request from client.");
	const result = await User.findOne({ username: req.body.username });
	if (!result) {
		res.status(400).send("Login failed. user not found.");
		return null;
	}
	const validPassword = await bcrypt.compare(
		req.body.password,
		result.password
	);
	if (!validPassword) {
		res.status(400).send("Login failed");
		return null;
	}
	if (result) {
		const jwtAuthToken = result.generateAuthToken();
		console.log("authJs: Cookie initialized.", jwtAuthToken);
		await User.updateOne(
			{ username: result.username },
			{ $set: { isLoggedIn: true } }
		);
		res
			.status(201)
			.cookie("authToken", jwtAuthToken, {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				maxAge: 3600000,
			})
			.send({ _id: result._id, username: result.username, isLoggedIn: true });
	}
});

module.exports = router;
