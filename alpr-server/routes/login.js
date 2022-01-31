const { User } = require("../models/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	//console.log("authJs: Receiving login request from client.", req.body);
	const result = await User.findOne({ username: req.body.username });
	if (!result) {
		res.status(400).send("Login failed.");
		return null;
	}
	//console.log("authJs: user credentials in DB.", result);
	let validPassword = await bcrypt.compare(req.body.password, result.password);
	//console.log("authJs: password matching:", match);
	//let validPassword = req.body.password;

	if (!validPassword) {
		res.status(400).send("Login failed.");
		return null;
	}
	if (result) {

		// If Login successful, initialize JWT token
		const jwtAuthToken = result.generateAuthToken();
		console.log("authJs: Cookie initialized.", jwtAuthToken);

		// Set login status in database
		await User.updateOne(
			{ username: result.username },
			{ $set: { isLoggedIn: true } }
		);
		res.cookie("authToken", jwtAuthToken, {
			path: "/",
			httpOnly: true,
			sameSite: 'lax',
			// secure: false,
			maxAge: 3600000,
			
		})
	   .send({ _id: result._id, username: result.username, isLoggedIn: true });
			
	}
});

module.exports = router;
