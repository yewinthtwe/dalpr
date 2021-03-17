const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { General } = require("../models/generalSettingModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res ) => {
  try {
      const generalSetting = await General.find();
      res.status(200).send(generalSetting);
  } catch (ex) {
      console.log('generalSettingJS: Error.', ex);
  }
});

router.put("/:id", [auth], async (req, res) => {
  console.log('generalSettingJS: update config:', req.body);
    const config = await General.findByIdAndUpdate(
      req.params.id,
      {
        serverName: req.body.serverName,
        ip: req.body.ip,
        port: req.body.port,
        apiUrl: req.body.apiUrl,
        photoStore: req.body.photoStore,
        configuredLanes: req.body.configuredLanes,
        status: req.body.status
      },
      {new: true}
    );
    if (!config)
      return res.status(404).send("generalSettingJS: The config with the given ID was not found.");
    res.send(config);
});

router.post("/", auth, async (req, res) => {
  console.log('generalSettingJS: Add config:', req.body );
  let config = await General.findOne({ ip: req.body.ip });
  if (config) return res.status(400).send("generalSettingJS: Server already registered.");
  config = new General(_.pick(req.body, ["serverName", "ip", "port", "apiUrl", "photoStore", "configuredLanes", "status" ]));
  await config.save();
  res.status(200).send(_.pick(config, ["serverName", "ip", "port", "apiUrl", "photoStore", "configuredLanes",  "status" ]));
});

router.delete("/:id", [auth, isAdmin],async (req, res) => {
  console.log('generalSettingJS: Delete config:', req.body );
  const config = await General.findByIdAndRemove(req.params.id);
  if(!config)
  return res.status(404).send("The give id was not found.");
  res.send(config);
});


module.exports = router;
