const { Member } = require("./models/memberModel");
const { InOutRecord } = require("./models/inOutRecordModel");
//const _ = require('lodash');

async function getInOutRecords() {
     const inOutRecords = await InOutRecord
     .find({})
     .sort({Time: 'descending'})
     .limit(50);
     //console.log(`validateMember: getInOutRecords: Providing InOutRecords.`);
     return inOutRecords;
}

async function getInOutRecord(id) {
  const inOutRecord = await InOutRecord
  .findOne({'_id' : id});
  //console.log(`validateMember: getInOutRecord: Providing InOutRecord.`);
  return inOutRecord;
}

async function validateMember (licensePlate) {
  console.log(`validateMember: Searching ${licensePlate} in Member database.....`);
  const member = await Member.findOne({'licensePlate': { $in: licensePlate }});
  if (!member) { 
    console.log(`validateMember: ${licensePlate} was NOT found in Member database.`);
    return false;
  } else {
    console.log(`validateMember: ${licensePlate} FOUND in member database.`);
    return true;
  }
 

}

  module.exports = {
    validateMember,
    getInOutRecords,
    getInOutRecord,
  };

