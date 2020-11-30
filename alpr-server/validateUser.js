
const { InOutRecord } = require("./models/inOutRecordModel");
const { Member } = require("./models/memberModel");
const { Ticket } = require("./models/ticketModel");
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { AlprCamera } = require('./models/alprCameraModel');
const fromUnixTime = require('date-fns/fromUnixTime');
const { differenceInMinutes } = require('date-fns');


async function saveInOutRecord (cameraFeed) {
  const { epoch_time, uuid, camera_id, results } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
  const photo = `${uuid}.jpg`;
  const alprCamera = await AlprCamera.findOne({'camera_id': camera_id});
  const inOutRecord = new InOutRecord ({
    licensePlate: licensePlate,
    Time: epoch_time,
    TrafficId: uuid,
    Photo: photo,
    CameraId: camera_id,
    Direction: 'IN',
  });
  if(alprCamera.isExitLane)  inOutRecord.Direction = 'OUT';  
  const savedRecord = await inOutRecord.save();
  return savedRecord;
}
 

async function getInOutRecords() {
     const inOutRecords = await InOutRecord
     .find({})
     .sort({Time: 'descending'})
     .limit(50);
     return inOutRecords;
}

async function getInOutRecord(id) {
  const inOutRecords = await InOutRecord.findById({'_id': id});
  return inOutRecords;
}

function calculateParkingFee (inTime, outTime) {
  let parkingFee = 0;
  const parkingTime = differenceInMinutes(outTime, inTime);
  const ticketData = { 'parkedMinutes': parkingTime, 'parkingFee': parkingFee };

  if( parkingTime > 1 ) {
    ticketData.parkingFee = parkingTime * 10;
    ticketData.parkedMinutes = parkingTime;
       
    return ticketData;
  }
  return ticketData;
}

async function validateTicket (cameraFeed) {
  const { epoch_time, camera_id, results } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
  const alprCamera = await AlprCamera.findOne({'camera_id': camera_id});
  
  if(alprCamera.isExitLane) {
    const ticket = await Ticket.findOne({'licensePlate': licensePlate, 'isUsed': false});

    if(!ticket) return console.log('No valid ticket found');
    const ticketData = calculateParkingFee(ticket.inTime, epoch_time);
    const updateTicket = {
      outTime : epoch_time,
      parkingFee: ticketData.parkingFee,
      parkedMinutes: ticketData.parkedMinutes,
      isPaid: true,
      isUsed : true,
    };
    const validTicket = await Ticket.findOneAndUpdate({'ticketId': ticket.ticketId, 'isUsed': false}, updateTicket,{ new: true});    
    return validTicket;
  } else { // If Entry Lane
        const ticket = new Ticket ({
        ticketId: uuidv4(),
        licensePlate: licensePlate,
        inTime: epoch_time,
        outTime: '',
        InvitedBy: '',
        parkingFee: 0,
        parkedMinutes: 0,
        isPaid: false,
        isUsed: false
      });
      const ticketForGateuser = await ticket.save();
      return ticketForGateuser;
    }
}

async function getUsedTickets() {
  const usedTickets = await Ticket.find({'isUsed': true });
  console.log(usedTickets);
  return usedTickets;

}

async function validateMember (licensePlate) {
  const member = await Member.findOne({'licensePlate': licensePlate})
  .select('memberId');
  return member;
}
 
  module.exports = {
    validateMember,
    validateTicket,
    saveInOutRecord,
    getInOutRecords,
    getInOutRecord,
    getUsedTickets
    
  };

