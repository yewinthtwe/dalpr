
const { InOutRecord } = require("./models/inOutRecordModel");
const { Member } = require("./models/memberModel");
const { Ticket } = require("./models/ticketModel");
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

async function saveInOutRecord (cameraFeed) {
  const { epoch_time, uuid, camera_id, results } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
  const photo = `${uuid}.jpg`;
  
  const inOutRecord = new InOutRecord ({
    licensePlate: licensePlate,
      Time: epoch_time,
      TrafficId: uuid,
      Photo: photo,
      CameraId: camera_id,
      Direction: 'IN',
  });
  if(camera_id % 2 == 0) { inOutRecord.Direction = 'OUT' };
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

async function validateTicket (cameraFeed) {
  const { epoch_time, uuid, camera_id, results } = cameraFeed;
  const licensePlate = _.map(results, 'plate');
  if(camera_id % 2 == 0) {
    const update = {
      isUsed : true,
      outTime : epoch_time,
    };
    const validTicket = await Ticket.findOneAndUpdate({'licensePlate': licensePlate, 'isUsed': false}, update,{ new: true});
    console.log(`OUT lane >>> ${licensePlate} >>> Camera Id: ${camera_id} >>> Ticket: ${validTicket.ticketId}`);
    return validTicket;
  } else {
        const ticket = new Ticket ({
        ticketId: uuidv4(),
        licensePlate: licensePlate,
        inTime: epoch_time,
        outTime: '',
        InvitedBy: '',
        parkingFee: 0,
        isPaid: true,
        isUsed: false
      });
      console.log(`IN lane >>> ${licensePlate} >>> Camera Id: ${camera_id} >>> Ticket: ${ticket.ticketId}`);
      const ticketForGateuser = await ticket.save();
      return ticketForGateuser;
    }
}

async function updateTicket (ticketId) {
  const update = {
    outTime: Date(),
    parkingFee: 0,
    isPaid: true,
    isUsed: true
  };
  const usedTicket = await Ticket.findOneAndUpdate({'ticketId': ticketId}, update, { new: true} );
  return usedTicket;
}
 
async function validateMember (licensePlate) {
    const member = await Member.findOne({'licensePlate': licensePlate})
    .select('memberId');
    //console.log(member);
    return member;
  }

  module.exports = {
    validateMember,
    validateTicket,
    updateTicket,
    saveInOutRecord,
    getInOutRecords,
    getInOutRecord
    
  };

