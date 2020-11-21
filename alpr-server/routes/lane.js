const express = require("express");
const router = express.Router();
const playAdam = require("../relayPlayer");


router.post("/", async (req, res) => {
  if(!req.body.ioModuleId) return res.status(200).send( 'Invalid IO Module ID.' );
  try {
    const statusOfDO = [];
    const ioModuleId = req.body.ioModuleId;
    const relayId =  req.body.relayId;
    const relayValue = req.body.relayValue;
    const relay = await playAdam.setDO( ioModuleId, relayId, relayValue );
    statusOfDO.push(relay);
    res.status(200).send( statusOfDO );

  } catch (err) {
    console.log("Unexpected error occured while retriving data. IO modules may be offline.", err);
  }
  });

router.get("/:ioModuleId", async (req, res) => {
  if(!req.params.ioModuleId) return res.status(200).send( 'Invalid IO Module ID.');
  try {
    const ioModuleId = req.params.ioModuleId;
    const relaysStatus = await playAdam.showDO( ioModuleId );
    const statusOfDO = [];
    statusOfDO.push(relaysStatus);
    res.status(200).send( statusOfDO );

  } catch (err) {
    console.log("Unexpected error occured while retriving data. IO modules may be offline.", err);
  }
});

module.exports = router;
