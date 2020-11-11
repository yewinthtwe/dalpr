const express = require("express");
const router = express.Router();
const playAdam = require("../relayPlayer");


router.post("/", async (req, res) => {
    
  try {
    let relayId =  req.body.relayId;
    const relayValue = req.body.relayValue;
    const relays = await playAdam.setDO(relayId, relayValue);
    res.status(200).send(relays);

  } catch (err) {
    console.log("Unexpected error occured while retriving data", err);
  }
  });


router.get("/", async (req, res) => {
  try {
    const lanes = await playAdam.showDO();
    res.status(200).send(lanes);

  } catch (err) {
    console.log("Unexpected error occured while retriving data", err);
  }
});

module.exports = router;
