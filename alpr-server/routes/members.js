const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { Member, schema } = require("../models/memberModel");
//const validateObjectId = require("../middleware/validateObjectId");

const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res ) => {
    const members = await Member.find();
    res.status(200).send(members);
});

router.get("/:id", auth, async (req, res) => {
    const member = await Member.findById(req.params.id);
    if(!member)
    return res.status(404).send("The give id was not found.");
    res.send(member);
});

router.put("/:id", [auth], async (req, res) => {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      {
        licensePlate: req.body.licensePlate,
        memberName: req.body.memberName,
        address: req.body.address,
        obuId: req.body.obuId
      },
      {new: true}
    );
    if (!member)
      return res.status(404).send("The member with the given ID was not found.");
    res.send(member);
});

router.post("/", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let member = await Member.findOne({ licensePlate: req.body.licensePlate });
  if (member) return res.status(400).send("Car number already registered.");
  member = new Member(_.pick(req.body, ["memberName", "address", "licensePlate", "obuId"]));
  await member.save();
  res.status(200).send(_.pick(member, ["memberName", "address", "licensePlate", "registrationDate", "obuId"]));
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
    const member = await Member.findByIdAndRemove(req.params.id);
    if(!member) return res.status(404).send("The give id was not found.");
    res.status(200).send(member);
});

module.exports = router;
