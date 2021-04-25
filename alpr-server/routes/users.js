const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, schema } = require("../models/userModel");
// const { exist } = require('joi');

router.post("/", auth, async (req, res) => {
	console.log("usersJS: req body extracted: username:", req.body.username);
	const { error } = schema.validate(req.body);
	if (error) {
		console.log(`usersJs: Validation error: ${error}`);
		return res.status(400).send(error.details[0].message);
	}

	let user = await User.findOne({ username: req.body.username });
	if (user) {
		console.log(
			`usersJs: Error adding user. ${req.body.username} already registered.`
		);
		return res.status(400).send(error.details[0].message);
	}

	user = new User(
		_.pick(req.body, [
			"_id",
			"username",
			"password",
			"name",
			"email",
			"isAdmin",
			"isActive",
		])
	);
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();
	res
		.status(200)
		.send(
			_.pick(user, [
				"_id",
				"username",
				"email",
				"isAdmin",
				"reg_date",
				"name",
				"isActive",
			])
		);
	// res
	// .header('x-auth-token', token)
	// .header('access-control-expose-headers', "x-auth-token")
	// .status(200).send(_.pick(user, ["_id", "username", "email", "isAdmin", "reg_date", "name", "isActive"]));
});

router.get("/me", auth, async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	res.status(200).send(user);
});

router.get("/", auth, async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (err) {
		res.status(500).send("Unexpected error");
		console.log("usersJs: Unexpected error while retriving data.", err);
	}
});

router.get("/:id", auth, async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).send("The give id was not found.");
	res.send(user);
});

router.put("/:id", [auth, isAdmin], async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const newPassword = await bcrypt.hash(req.body.password, salt);

	user = await User.findByIdAndUpdate(req.params.id, {
		username: req.body.username,
		password: newPassword,
		name: req.body.name,
		email: req.body.email,
		isAdmin: req.body.isAdmin,
		isActive: req.body.isActive,
	});
	if (!user)
		return res.status(404).send("The user with the given ID was not found.");
	res.send(user);
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	if (!user) return res.status(404).send("The give id was not found.");
	res.send(user);
});

module.exports = router;
