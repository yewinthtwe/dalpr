
const { InOutRecord } = require("./models/inOutRecordModel");
const { Member } = require("./models/memberModel");
const { TrafficHistory } = require("./models/trafficHistoryModel");
const _ = require('lodash');
const { AlprCamera } = require('./models/alprCameraModel');
const { differenceInMinutes, toDate } = require('date-fns');


async function saveInOutRecord (cameraFeed) {
  const { epoch_time, uuid, camera_id, results } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
  const photo = `${uuid}.jpg`;
  const alprCamera = await AlprCamera.findOne({'camera_id': camera_id});
  const { isExitLane } = alprCamera;
  const member = await validateMember(licensePlate);
  
    const inOutRecord = new InOutRecord ({
    licensePlate: licensePlate,
    isMember: false,
    Time: epoch_time,
    Direction: '',
    inTrafficId: '',
    inCameraId: 0,
    inPhoto: '',
    outTrafficId: '',
    outCameraId: 0,
    outPhoto: '',
    ticket: {
      licensePlate: licensePlate,
      ticketId: '',
      inTime: 0,
      outTime: 0,
      InvitedBy: '',
      parkingFee: 0,
      parkedMinutes: 0,
      isPaid: false,
      isUsed: false
    }
  });
  if(member){
    inOutRecord.isMember = true;
  };
  if(isExitLane){
    inOutRecord.Direction = 'OUT';
    inOutRecord.outTrafficId = uuid;
    inOutRecord.outCameraId = camera_id;
    inOutRecord.outPhoto = photo;
    inOutRecord.ticket.ticketId = 'foc';
    inOutRecord.ticket.outTime = epoch_time;
    inOutRecord.ticket.parkingFee = 0;
    inOutRecord.ticket.parkedMinutes = 0;
  } else {
    inOutRecord.Direction = 'IN';
    inOutRecord.inTrafficId = uuid;
    inOutRecord.inCameraId = camera_id;
    inOutRecord.inPhoto = photo;
    inOutRecord.ticket.ticketId = uuid;
    inOutRecord.ticket.inTime = epoch_time;
    inOutRecord.ticket.parkingFee = 0;
    inOutRecord.ticket.parkedMinutes = 0;
  };

  const savedRecord = await inOutRecord.save();
  return savedRecord;
}

async function updateInOutRecordById ( id, cameraFeed, alprCamera ) {
  const { isExitLane, camera_id, } = alprCamera;
  const { epoch_time, uuid } = cameraFeed;
  //const licensePlate = _.map(results, 'plate');
  const photo = `${uuid}.jpg`;
  
    let Time = epoch_time;
    let isUsed = false;
    let Direction = 'IN';
    let outTime = 0;
    let outCameraId = 0;
    let outTrafficId = '';
    let outPhoto = '';
    let parkingFee = 0;
    let parkedMinutes = 0;

  if(isExitLane) {
    const parkingData = await calculateParkingFee(id);
    console.log(parkingData);

    outTime = epoch_time;
    outCameraId = camera_id;
    outTrafficId = uuid;
    outPhoto = photo;
    parkingFee = parkingData.parkingFee;
    parkedMinutes = parkingData.parkedMinutes;
    isUsed = true;
    Direction = 'OUT';
  };

  const updatedRecord = await InOutRecord.updateOne({'_id': id }, { 
    $set : {
      'outTrafficId' : outTrafficId,
      'outCameraId' : outCameraId,
      'outPhoto' :  outPhoto,
      'ticket.isUsed' : isUsed,
      'ticket.outTime' : outTime,
      'ticket.parkingFee' : parkingFee,
      'ticket.parkedMinutes' : parkedMinutes,
      'Direction' : Direction,
      'Time': Time
    }
  });

  console.log(`Record Id: ${id} is updated.`);
 
  return updatedRecord;
}

async function verifyTicket(cameraFeed) {
  const { epoch_time, camera_id, results } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
  const ticket = await InOutRecord.findOne({'licensePlate': licensePlate, 'ticket.isUsed': false});
  console.log(`>>>> Ticket verification...`);

  if(!ticket) { 
   console.log('No Valid Ticket found.');
   return null;
  } else {
    //console.log(ticket);
    return ticket;
  }
}

async function searchLicensePlate(cameraFeed) {
  const { epoch_time, uuid, camera_id, results } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
  const matchedRecord = await InOutRecord.findOne({'licensePlate': licensePlate, 'ticket.isUsed': false }).sort({'updatedAt': -1}).limit(1);
  console.log(`>>>> Searching ${licensePlate} at epoch_time: ${epoch_time}`, toDate(epoch_time));
  if(matchedRecord) {
    console.log(`Found, record id: ${matchedRecord._id} ${matchedRecord.licensePlate} ${matchedRecord.updatedAt}<<<`, toDate(matchedRecord.updatedAt));
    return matchedRecord;
  } else {
    console.log(`No matching record found in database. <<<`);
    return matchedRecord;
  }
}

async function getInOutRecords() {
     const inOutRecords = await TrafficHistory
     .find({})
     .sort({Time: 'descending'})
     .limit(50);
     return inOutRecords;
}

async function getInOutRecord(id) {
  const inOutRecords = await TrafficHistory
  .findOne({'_id' : id});
  return inOutRecords;
}

async function calculateParkingFee (id) {
  const result = await InOutRecord.findOne({'_id': id, 'ticket.isUsed': false });
  console.log(`>>>> Calculating Parking Fee...`);
  const inTime = result.ticket.inTime;
  const outTime = result.ticket.outTime;
  const parkedMinutes = differenceInMinutes(outTime, inTime);

  const parkingData = {
    'parkingFee': 0,
    'parkedMinutes' : 0
  };

  if( parkedMinutes > 1 ) {
    parkingData.parkingFee = parkedMinutes * 100;;
    parkingData.parkedMinutes = parkedMinutes;
    return parkingData;
  } else {
    return parkingData;
  }
}


async function validateMember (licensePlate) {
  const member = await Member.findOne({'licensePlate': licensePlate});
  //.select('memberId');
  return member;
}

  module.exports = {
    validateMember,
    verifyTicket,
    saveInOutRecord,
    getInOutRecords,
    getInOutRecord,
    searchLicensePlate,
    updateInOutRecordById
   
  };

