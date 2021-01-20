const fs = require('fs');
const { InOutRecord } = require("./models/inOutRecordModel");
// const { Member } = require("./models/memberModel");
const _ = require('lodash');
const config = require('config');
// const { AlprCamera } = require('./models/alprCameraModel');
const { differenceInMinutes, toDate } = require('date-fns');

const photoStoreTemp = config.get('photoStoreTemp.location');


async function saveInOutRecord (trafficToken) {

  const {
    currentTrafficId,
    currentTime,
    currentScanCameraId,
    currentPhoto,
    currentLicensePlate,
    currentCandidates,
    currentDirection,
    isExitLane,
    isMember,
   } = trafficToken;

  const inOutRecord = new InOutRecord ({
    licensePlate: null,
    isMember: false,
    Direction: null,
    scanCameraId: 0,
    candidates: null,
    
    inTime: 0,
    inPhoto: '',
    inTrafficId: '',

    outTime: 0,
    outPhoto: '',
    outTrafficId: '',
  
    ticket: {
      licensePlate: null,
      ticketId: 0,
      inTime: 0,
      outTime: 0,
      InvitedBy: '',
      parkingFee: 0,
      parkedMinutes: 0,
      isPaid: false,
      isUsed: false
    }
  });
  
 if( isExitLane ) {

    inOutRecord.licensePlate = currentLicensePlate;
    inOutRecord.isMember = isMember;
    inOutRecord.Direction = currentDirection;
    inOutRecord.scanCameraId = currentScanCameraId;
    inOutRecord.candidates = currentCandidates;
    inOutRecord.outTime = currentTime;
    inOutRecord.outPhoto = currentPhoto;
    inOutRecord.outTrafficId = currentTrafficId;

    inOutRecord.ticket.licensePlate = currentLicensePlate;
    inOutRecord.ticket.ticketId = currentTrafficId;
    inOutRecord.ticket.outTime = currentTime;
    
 } else {

  inOutRecord.licensePlate = currentLicensePlate;
  inOutRecord.isMember = isMember;
  inOutRecord.Direction = currentDirection;
  inOutRecord.scanCameraId = currentScanCameraId;
  inOutRecord.candidates = currentCandidates;
  inOutRecord.inTime = currentTime;
  inOutRecord.inPhoto = currentPhoto;
  inOutRecord.inTrafficId = currentTrafficId;

  inOutRecord.ticket.licensePlate = currentLicensePlate;
  inOutRecord.ticket.ticketId = currentTrafficId;
  inOutRecord.ticket.inTime = currentTime;

 }
  const savedRecord = await inOutRecord.save();
  return savedRecord;
}

async function updateInOutRecordById ( trafficToken ) {
  
  const {
    currentLicensePlate,
    currentTrafficId,
    currentTime,
    currentScanCameraId,
    currentPhoto,
    currentDirection,

    isExitLane,
    isMember,

    oldId,
    oldInTime,
  } = trafficToken;

  if( isExitLane ) {
    let parkingFee = 0;
    let parkedMinutes = 0;
    let isUsed = false;
    let rate = 100;

    if(!isMember) {
        
            console.log(`updateInOutRecordById: ${currentLicensePlate} > Calculating Parking Fee....`);
            console.log(`updateInOutRecordById: ${currentLicensePlate} > In Time: ${oldInTime}`);
            console.log(`updateInOutRecordById: ${currentLicensePlate} > Out Time: ${currentTime}`);
            parkedMinutes = differenceInMinutes(currentTime, oldInTime);
            console.log(`updateInOutRecordById: ${currentLicensePlate} > Total parked minutes: ${parkedMinutes}`);
            parkingFee = parkedMinutes * rate ;
            console.log(`updateInOutRecordById: ${currentLicensePlate} > Total parking fee: ${parkingFee}`);
            isUsed = true;
    }
    const updatedRecord = await InOutRecord.updateOne({'_id': oldId }, { 
        $set : {
        'scanCameraId' : currentScanCameraId,
        'outTime': currentTime,
        'outTrafficId' : currentTrafficId,
        'outPhoto' :  currentPhoto,
        'ticket.isUsed' : isUsed,
        'ticket.outTime' : currentTime,
        'Direction' : currentDirection,
        'ticket.parkingFee' : parkingFee,
        'ticket.parkedMinutes' : parkedMinutes,
        }
    });

  } else {

    const updatedRecord = await InOutRecord.updateOne({'_id': oldId }, { 
        $set : {
          'scanCameraId' : currentScanCameraId,
          'inTime': currentTime,
          'inTrafficId' : currentTrafficId,
          'inPhoto' :  currentPhoto,
          'ticket.inTime' : currentTime,
          'Direction' : currentDirection
        }
      });
  }
  console.log(`updateInOutRecordById: ${currentLicensePlate} > Document updated.`);
  
}


async function searchLicensePlate(licensePlate) {
  console.log(`searchLicensePlate: ${licensePlate} > Searching in temporary database (InOutRecords).`);

  try {
    //const lpDoc = await InOutRecord.findOne( { $or: [ {'licensePlate':{$in: licensePlate} } , {'candidates': {$in: licensePlate} } ], 'ticket.isUsed': false } ).sort({'updatedAt': -1}).limit(1);
    const lpDoc = await InOutRecord.findOne({'candidates.plate': {$in: licensePlate}, 'ticket.isUsed': false } ).sort({'updatedAt': -1}).limit(1);
    //console.log(lpDoc);
    if( !lpDoc ) {
      console.log(`searchLicensePlate: ${licensePlate} > No matching record found in temporary database: (InOutRecords).`);

      return lpDoc;

    } else {
      console.log(`searchLicensePlate: ${licensePlate} > Found document ID: ${lpDoc._id} in temporaty database.` );

      return lpDoc; 
    }
  } catch (error) {
      console.log(error);
    }
}

async function deleteOldPhoto (photo) {
    await fs.unlink( `${photoStoreTemp}/${photo}`, (err) => {
      if (err) throw err;
      console.log (`deleteOldPhoto: old photo file ${photoStoreTemp}/${photo} is deleted.`);
    });
}

module.exports = {
    saveInOutRecord,
    updateInOutRecordById,
    searchLicensePlate,
    deleteOldPhoto
};

