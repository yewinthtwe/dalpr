const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { Lane } = require("../models/laneModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res ) => {
  try {
      const lane = await Lane.find();
      res.status(200).send(lane);
  } catch (ex) {
      console.log('laneJS: Error.', ex);
  }
});

router.put("/:id", [auth], async (req, res) => {
  console.log('laneJS: update lane:', req.body);
    const lane = await Lane.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        isExitLane: req.body.isExitLane,
      },
      {new: true}
    );
    if (!lane)
      return res.status(404).send("laneJS: The lane with the given ID was not found.");
    res.send(lane);
});

router.post("/", auth, async (req, res) => {
  console.log('laneJS: Add lane:', req.body );
  let lane = await Lane.findOne({ name: req.body.name });
  if (lane) return res.status(400).send("laneJS: Lane name already registered.");
  lane = new Lane(_.pick(req.body, ["name", "description", "isExitLane" ]));
  await lane.save();
  res.status(200).send(_.pick(lane, ["name", "description", "isExitLane" ]));
});

router.delete("/:id", [auth, isAdmin],async (req, res) => {
  console.log('laneJS: Delete lane:', req.body );
  const lane = await Lane.findByIdAndRemove(req.params.id);
  if(!lane)
  return res.status(404).send("The give id was not found.");
  res.send(lane);
});

module.exports = router;
