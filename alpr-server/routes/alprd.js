const express = require("express");
const router = express.Router();
const _ = require("lodash");
const logger = require("../middleware/logger");
const playAdam = require("../relayPlayer");
const validateUser = require('../validateUser');
const { validateTicket, saveInOutRecord } = require("../validateUser");
// const { saveTrafficHistory } = require("../validateUser");

//const { Member } = require("../models/memberModel");
//const {TrafficHistory} = require("../models/trafficHistoryModel");
//const { find } = require("lodash");

// Process Camera feed posted by Alpr daemon
router.post("/", async (req, res) => {

  const cameraFeed = _.pick(req.body, 'epoch_time', 'uuid', 'site_id', 'camera_id', 'results');
  const { results } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
 
const member = await validateUser.validateMember(licensePlate);
    if(!member) {
      const validTicket = await validateTicket(cameraFeed);
      if(!validTicket) return res.status(200).send('You have no valid ticket or Already Checkout - pls use Entry lane');
      const savedRecord = await saveInOutRecord(cameraFeed);
      console.log(`${licensePlate} is Not member >>> Valid Ticket: ${validTicket.ticketId} >>> Auto Open`);
      res.status(200).send('Success');
    } else {
      const savedRecord = await saveInOutRecord(cameraFeed);
      console.log(`${licensePlate} is member >>> Auto Open`);
      res.status(200).send('Success');
    }
}); // routing post block End

module.exports = router;
