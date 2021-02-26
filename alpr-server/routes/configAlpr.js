const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { Lane, Camera, IoModule, Config, Relay } = require("../models/alprConfigModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");


router.get("/lane", async (req, res ) => {
  try {
      const config = await Lane.find();
      res.status(200).send(config);
  } catch (ex) {
      console.log('configJS: Error.', ex);
  }
});

router.get("/camera", async (req, res ) => {
  try {
      const config = await Camera.find();
      res.status(200).send(config);
  } catch (ex) {
      console.log('configJS: Error.', ex);
  }
});

router.get("/iomodule", async (req, res ) => {
  try {
      const config = await IoModule.find();
      res.status(200).send(config);
  } catch (ex) {
      console.log('configJS: Error.', ex);
  }
});

router.get("/relay", async (req, res ) => {
  try {
      const config = await Relay.find();
      res.status(200).send(config);
  } catch (ex) {
      console.log('configJS: Error.', ex);
  }
});

router.get("/config", async (req, res ) => {
    try {
        const config = await Config.find();
        res.status(200).send(config);
    } catch (ex) {
        console.log('configJS: Error.', ex);
    }
});

router.put("/config/:id", [auth], async (req, res) => {
  console.log('configAlprJS: update cofnfig:', req.body);
    const config = await Config.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        configName: req.body.configName,
        laneName: req.body.laneName,
        cameraName: req.body.cameraName,
        relayName: req.body.relayName,
        status: req.body.status
      },
      {new: true}
    );
    if (!config)
      return res.status(404).send("configJS: The config with the given ID was not found.");
    res.send(config);
});

router.post("/config", auth, async (req, res) => {
  console.log('configJS: Add config:', req.body );
  let config = await Config.findOne({ configName: req.body.configName });
  if (config) return res.status(400).send("configJS: Config name already registered.");
  config = new Config(_.pick(req.body, ["configName", "description", "laneName", "cameraName", "relayName", "status" ]));
  await config.save();
  res.status(200).send(_.pick(config, ["configName", "description", "laneName", "cameraName", "relayName", "status" ]));
});

router.delete("/config/:id", [auth, isAdmin],async (req, res) => {
  console.log('configJS: Delete config:', req.body );
  const config = await Config.findByIdAndRemove(req.params.id);
  if(!config)
  return res.status(404).send("The give id was not found.");
  res.send(config);
});


router.post("/iomodule", auth, async (req, res) => {
  console.log('configJS:', req.body );
  let iomodule = await IoModule.findOne({ name: req.body.name });
  if (iomodule) return res.status(400).send("configJS: IOModule number already registered.");
  iomodule = new IoModule(_.pick(req.body, ["name", "description", "ip", "username", "password", "status", "relay" ]));
  await iomodule.save();
  res.status(200).send(_.pick(iomodule, ["name", "description", "ip", "username", "password", "status", "relay" ]));
});

router.post("/lane", auth, async (req, res) => {
    console.log('configJS:', req.body );
    let lane = await Lane.findOne({ name: req.body.name });
    if (lane) return res.status(400).send("configJS: Lane name already registered.");
    lane = new Lane(_.pick(req.body, ["name", "description", "isExitLane"]));
    await lane.save();
    res.status(200).send(_.pick(lane, ["name", "description", "isExitLane"]));
});

router.post("/camera", auth, async (req, res) => {
    console.log('configJS: camera:', req.body );
    let camera = await Camera.findOne({ name: req.body.name });
    if (camera) return res.status(400).send("configJS: Camera name already registered.");
    camera = new Camera(_.pick(req.body, ["name", "description", "ip", "username", "password", "laneName", "status"]));
    await camera.save();
    res.status(200).send(_.pick(camera, ["name", "description", "ip", "laneName", "status"]));
});

router.post("/relay", auth, async (req, res) => {
  console.log('configJS: relay:', req.body );
  let relay = await Relay.findOne({ name: req.body.name });
  if (relay) return res.status(400).send("configJS: Relay name already registered.");
  relay = new Relay(_.pick(req.body, ["name", "rlId", "value", "isUsedBy", "_id" ]));
  await relay.save();
  res.status(200).send(_.pick(relay, ["name", "rlId", "value", "isUsedBy", "_id" ]));
});

module.exports = router;
