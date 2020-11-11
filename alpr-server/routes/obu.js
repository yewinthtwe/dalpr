const auth = require('../middleware/auth');
const { OBUtags, schema } = require("../models/obuModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
  try {
    const obutags = await OBUtags.find();
    res.status(200).send(obutags);
  } catch (err) {
    res.status(500).send('Unexpected error');
    console.log("unexpected error retriving data", err);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let obutags = await OBUtags.findOne({ obuid: req.body.obuid });
  if (obutags) return res.status(400).send("The duplicate OBU number detected.");

  obutags = new OBUtags(_.pick(req.body, ["srNo", "obuid", "isActive", "activeDate"]));
  await obutags.save();
  res.status(200).send(_.pick(obutags, ["srNo", "obuid", "isActive", "activeDate"]));
});

router.delete("/", auth,async (req, res) => {
  const obuid = await OBUtags.deleteOne({ obuid: req.body.obuid });
  console.log("OBUtags is deleted " + obuid);
  res.status(200).send("The obu is deleted.");

});

module.exports = router;
