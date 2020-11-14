const express = require("express");
const _ = require("lodash");
const { getInOutRecords, getInOutRecord } = require('../validateUser');
const router = express.Router();

router.get("/", async (req, res) => {
    const inOutRecords = await getInOutRecords();
    res.status(200).send(inOutRecords);
});

router.get("/:id", async (req, res) => {
    const inOutRecord = await getInOutRecord(req.params.id);
    res.status(200).send(inOutRecord);
});

module.exports = router;
