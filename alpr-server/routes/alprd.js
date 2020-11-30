const express = require("express");
const router = express.Router();
const _ = require("lodash");
const playAdam = require("../relayPlayer");
const validateUser = require('../validateUser');
const { validateTicket, saveInOutRecord } = require("../validateUser");
const { AlprCamera } = require("../models/alprCameraModel");

// Process Camera feed posted by Alpr daemon
router.post("/", async (req, res) => {

  const cameraFeed = _.pick(req.body, 'epoch_time', 'uuid', 'site_id', 'camera_id', 'results');
  const { results, epoch_time } = cameraFeed;
  const licensePlate = _.map(results, 'plate');

const alprCamera = await AlprCamera.findOne({'camera_id': cameraFeed.camera_id});
const { isExitLane, ioModuleId, upRelayId } = alprCamera;

const member = await validateUser.validateMember(licensePlate);
    if(!member) {
      if(isExitLane) {
        const validTicket = await validateTicket(cameraFeed);
        if(!validTicket) return res.status(200).send('You have no valid ticket or Already Checkout - pls use Entry lane');
        await saveInOutRecord(cameraFeed); // Found valid ticket
        console.log(`${licensePlate} Not member>> Valid Ticket: ${validTicket.ticketId} >> AUTO Open at Exit>> ${epoch_time}`);
        playAdam.setDO(ioModuleId, upRelayId,'1');
      } else {
        const validTicket = await validateTicket(cameraFeed); //Issue new ticket
        await saveInOutRecord(cameraFeed);
        console.log(`${licensePlate} Not member>> Issuing Ticket: ${validTicket.ticketId} >> MANUAL Open at Entry >> ${epoch_time}`);
      }
      res.status(200).send('Success');
    } else {
      await saveInOutRecord(cameraFeed);
      console.log(`${licensePlate} Member>> AUTO Open`);
      playAdam.setDO(ioModuleId, upRelayId,'1');
      res.status(200).send('Success');
    }
}); // routing post block End

module.exports = router;
