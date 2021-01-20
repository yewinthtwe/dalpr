const express = require("express");
const router = express.Router();
const _ = require("lodash");
const playAdam = require("../DummyRelayPlayer");
const { validateMember } = require("../validateUser");
const { searchLicensePlate, saveInOutRecord, updateInOutRecordById, verifyTicket, deleteOldPhoto } = require("../camFeedHandler");
const { repeatCheck } = require("../repeatCheck");
const { AlprCamera } = require("../models/alprCameraModel");
const { getTime, isAfter, toDate, addSeconds } = require("date-fns");
const { docSaver } = require('../saveDocument');
const config = require("config");
// const { is } = require("date-fns/locale");



// Process Camera feed posted by Alpr daemon
router.post("/", async (req, res) => {

  const cameraFeed = _.pick(req.body, 'epoch_time', 'uuid', 'site_id', 'camera_id', 'results', 'processing_time_ms' );
  const { results, epoch_time, camera_id, uuid } = cameraFeed;
  const photo = `${uuid}.jpg`;
  const licensePlate = _.map (results, 'plate');
  const candidates = _.flatten(_.map(results,'candidates'));
  const humanTime = toDate(epoch_time);
  const alprCamera = await AlprCamera.findOne({'camera_id': camera_id});
  const { isExitLane, ioModuleId, upRelayId } = alprCamera;
  let Direction = "IN";
  if (isExitLane) {
    Direction = "OUT";
  }

  const relayStatus = await playAdam.showDO(ioModuleId);
  //relayStatus.DO[upRelayId].VALUE == 0;
  const isMember = await validateMember(licensePlate); // return true or false
  const inOutRecord = await searchLicensePlate(licensePlate); // return a Document
  
  
  const trafficToken = {

    currentTrafficId: uuid,
    currentTime: epoch_time,
    currentScanCameraId: camera_id,
    currentPhoto: photo,
    currentLicensePlate: licensePlate,
    currentCandidates: candidates,
    currentDirection: Direction,

    isExitLane: isExitLane,
    isMember: isMember,
    ioModuleId: ioModuleId,
    upRelayId: upRelayId,
    albStatus: relayStatus.DO[upRelayId].VALUE,

    oldId: '',
    oldScanCameraId: 0,
    oldInPhoto: '',
    oldInTime: 0,
    oldOutPhoto: '',
    oldOutTime: 0,
    oldUpdatedAt: 0,
    oldCandidates: [],
    oldDirection: '',

  };

  if(inOutRecord) {
    trafficToken.oldId= inOutRecord._id;
    trafficToken.oldScanCameraId= inOutRecord.scanCameraId;
    trafficToken.oldInPhoto= inOutRecord.inPhoto;
    trafficToken.oldInTime= inOutRecord.inTime;
    trafficToken.oldOutPhoto= inOutRecord.outPhoto;
    trafficToken.oldOutTime= inOutRecord.outTime;
    trafficToken.oldUpdatedAt= inOutRecord.updatedAt;
    trafficToken.oldCandidates= inOutRecord.candidates;
    trafficToken.oldDirection= inOutRecord.Direction;
  }


  res.sendStatus(200);
  const checkResult = await repeatCheck(trafficToken);
  
  if (checkResult) {
    console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Preparing to create NEW document....`);
    if ( !trafficToken.isMember ) {
      console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Preparing for NON-Member....`);
      if ( trafficToken.isExitLane ) {
            console.log(`alprdJS: ${trafficToken.currentLicensePlate} > must use ENTRY lane before EXIT.`);
            //console.log(`alprdJS: Cleaning photo file....`);
            //await deleteOldPhoto(trafficToken.oldOutPhoto);
      } else {
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Creating New document at Entry lane for NON-Member....`);
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > New document created for ${trafficToken.currentLicensePlate}`);
        const newDoc = await saveInOutRecord(trafficToken);
      }

    } else {
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Preparing for MEMBER....`);
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Creating New document for MEMER....`);
        const newDoc = await saveInOutRecord(trafficToken);
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > New document created for ${trafficToken.currentLicensePlate}`);
    }

  } else {
    console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Preparing for UPDATE process....`);
    console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Checking if EXIT lane....`);
    if( trafficToken.isExitLane ) {
      console.log(`alprdJS: ${trafficToken.currentLicensePlate} > EXIT lane.`);
      console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Preparing for UPDATE process at EXIT lane....`);
      console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Checking for membership at EXIT lane....`);
      if(!trafficToken.isMember) {
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > NON-Member.`);
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Checking valid document at EXIT lane for NON-Member....`);
        if(!trafficToken.oldId) {
          console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Valid document NOT found for NON-Member at EXIT lane. Please use Entry Lane.`);
          await deleteOldPhoto(trafficToken.currentPhoto); 
           
        } else {

          console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Valid document FOUND for NON-Member at EXIT lane.`);
          console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Updating document for NON-member....`);
          const updatedDoc = await updateInOutRecordById( trafficToken );
          

           if(trafficToken.oldOutPhoto) {
            console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Cleaning old Entry photo file before updating document at EXIT lane....`);
             await deleteOldPhoto(trafficToken.oldOutPhoto); 
           }
          console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Opening ALB at EXIT lane....`);
          const ioResult = await playAdam.setDO(ioModuleId, upRelayId, '1' );
        }
      } else {
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > MEMBER.`);
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Cleaning old photo file before updating document at EXIT lane for MEMBER....`);
        await deleteOldPhoto(trafficToken.oldOutPhoto);
        console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Updating document for MEMBER....`);
        const updatedDoc = await updateInOutRecordById( trafficToken );
        
      }
      
    } else {
      console.log(`alprdJS: ${trafficToken.currentLicensePlate} > ENTRY lane.`);
      console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Cleaning old photo file before updating document at ENTRY lane....`);
      await deleteOldPhoto(trafficToken.oldInPhoto);
      console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Updating document at ENTRY lane....`);
      const updatedDoc = await updateInOutRecordById( trafficToken );
      
    }
  }

  if(trafficToken.isMember) {
    console.log(`alprdJS: ${trafficToken.currentLicensePlate} > Auto Opening Lane barrier for Member....`);
    const ioResult = await playAdam.setDO(ioModuleId, upRelayId, '1' );
  }
  

//   console.log(`Is ${licensePlate} member?`);
//   if(member){
//     console.log(`Yes, Member Id: ${member.memberId}`);
//     const newDoc = await saveInOutRecord(cameraFeed);
//     }
//   } else {
//       console.log(`Found Matched ${matchedRecord._id} in Temporary database: InOutRecords`);
//       //console.log(matchedRecord); 
//       console.log(`Updating ${matchedRecord._id} in Temporary database....for >>> ${licensePlate}`);
//       // const recordId = _.map( matchedRecord, '_id' );
//       // console.log( `Matched record ID: ${recordId}`);
//       const updatedDoc = await updateInOutRecordById(matchedRecord._id, cameraFeed, alprCamera );
//       const savedDoc = await docSaver(matchedRecord._id);
      
//     }
//     console.log(`Opening Lane barrier....`);
//     const ioResult = await playAdam.setDO(ioModuleId, upRelayId, '1' );
    
//   } else { // Non-member logic
//     console.log(`Non-Member >>>`);
//     if(!matchedRecord) {
//       if(!isExitLane) {
//         if(relayStatus.DO[upRelayId].VALUE == 0 ) {
//           console.log(`>>>> Creating new record.....for >>> ${licensePlate} `);
//           const newDoc = await saveInOutRecord(cameraFeed);
//         }
//       } else { 
//         console.log(`Non-members are NOT allow to EXIT before Entering.`); 
//       }
//     } else {
//       console.log(`Found Matched ${matchedRecord._id} in Temporary database: InOutRecords`); 
//       console.log(`Updating ${matchedRecord._id} in Temporary database....for >>> ${licensePlate}`);
//       if(isExitLane) {
//         console.log(`Checking Ticket: ${matchedRecord.ticket.ticketId}`);
//         if(matchedRecord.ticket.ticketId) {
//           console.log(`Found Valid Ticket ${matchedRecord.ticket.ticketId}`);
//           console.log(`Auto opening Lane Barrier....`);
//           const ioResult = await playAdam.setDO(ioModuleId, upRelayId, '1' );
//           await docSaver(matchedRecord._id); 
//         }
//         const updatedDoc = await updateInOutRecordById(matchedRecord._id, cameraFeed, alprCamera );
//       }
//       const updatedDoc = await updateInOutRecordById(matchedRecord._id, cameraFeed, alprCamera );
//       //await docSaver(matchedRecord._id); 
//     }
//   }

}); // routing post block End

module.exports = router;
