const express = require("express");
const router = express.Router();
const _ = require("lodash");
const playAdam = require("../relayPlayer");
const { validateMember, saveInOutRecord, updateInOutRecordById, searchLicensePlate } = require("../validateUser");
const { AlprCamera } = require("../models/alprCameraModel");
const { getTime, isAfter, toDate, addSeconds } = require("date-fns");
const {docSaver} = require('../saveDocument');
//const messageFilter = require("../middleware/messageFilter");
//const { InOutRecord } = require("../models/inOutRecordModel");
//const currentTime = Math.floor(new Date().getTime());
//const logger = require("../middleware/logger");

// Process Camera feed posted by Alpr daemon
router.post("/", async (req, res) => {
  
  const cameraFeed = _.pick(req.body, 'epoch_time', 'uuid', 'site_id', 'camera_id', 'results');
  const { results, epoch_time } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
  const humanTime = toDate(epoch_time);
  const alprCamera = await AlprCamera.findOne({'camera_id': cameraFeed.camera_id});
  const { isExitLane, ioModuleId, upRelayId } = alprCamera;
  const member = await validateMember(licensePlate);
  const relayStatus = await playAdam.showDO(ioModuleId);
  let timeOK = 0;
  let afterTimeOK = false;
 
  res.sendStatus(200);
  console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
  console.log(`>>>> Repetition Check for >>> ${licensePlate} >>>`);
  
  const matchedRecord = await searchLicensePlate(cameraFeed);
  if(matchedRecord) {
    timeOK = getTime(addSeconds(matchedRecord.updatedAt, 30));
    afterTimeOK = isAfter(epoch_time, timeOK); // true or false
  };
  console.log(`ALB status : ${relayStatus.DO[upRelayId].VALUE}`);
  console.log(`New entry in database allowed: ${afterTimeOK}`);

  if(member){
    if(!matchedRecord) {
      if(relayStatus.DO[upRelayId].VALUE == 0 ) {
        console.log(`>>>> Creating new record.....for >>> ${licensePlate} `);
        const newDoc = await saveInOutRecord(cameraFeed);
      }
    } else { 
      console.log(`Update >>> Member`);
      const updatedDoc = await updateInOutRecordById(matchedRecord._id, cameraFeed, alprCamera );
      await docSaver(matchedRecord._id);
    }
    const ioResult = await playAdam.setDO(ioModuleId, upRelayId, '1' );
    
  } else { // Non-member logic
    if(!matchedRecord) {
      if(!isExitLane) {
        if(relayStatus.DO[upRelayId].VALUE == 0 ) {
          console.log(`>>>> Creating new record.....for >>> ${licensePlate} `);
          const newDoc = await saveInOutRecord(cameraFeed);
        }
      } else { 
        console.log(`Non-members are NOT allow to EXIT before entering.`); 
      }
    } else { 
      console.log(`Update >>> Non-member`);
      if(isExitLane) {
        console.log(`Checking Ticket: ${matchedRecord.ticket.ticketId} >>> Non-member`);
        if(matchedRecord.ticket.ticketId) {
          console.log(`Valid Ticket ${matchedRecord.ticket.ticketId} >>> Opening ALB ... >>> Non-member`);
          const ioResult = await playAdam.setDO(ioModuleId, upRelayId, '1' );
        }
      }
      const updatedDoc = await updateInOutRecordById(matchedRecord._id, cameraFeed, alprCamera );
      await docSaver(matchedRecord._id); 
    }
  }

}); // routing post block End

module.exports = router;
