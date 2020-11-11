const express = require("express");
const _ = require("lodash");
const { GateUser } = require("../models/gateUserModel");
const router = express.Router();

router.get("/", async (req, res) => {
    const gateusers = await GateUser.find({'markToDelete': false})
    .limit(50);
    res.status(200).send(gateusers);
});

router.get("/:id", async (req, res) => {
    const gateuser = await GateUser.findById({_id: req.params.id });
    const obj =_.pick(gateuser, 'licensePlate', 'photo', 'inTime', 'outTime', 'isMember');
    res.status(200).send(obj);
});

module.exports = router;
