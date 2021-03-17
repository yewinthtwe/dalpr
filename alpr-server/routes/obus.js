const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { Obu } = require("../models/obuModel");
const express = require("express");
const router = express.Router();

router.get("/", [auth, isAdmin], async (req, res) => {
	const obus = await Obu.find().populate("memberId");
	res.status(200).send(obus);
});

module.exports = router;
