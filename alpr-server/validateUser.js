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

async function validateMember (candidates) {

  console.log(`validateMember: Searching in Member database.....`);
  //const member = await Member.findOne({ $or: [{'licensePlate': { $in: licensePlate }}, {'candidates.plate': { $in: licensePlate }}] });
  const member = await Member.findOne( { "isActive": true, $or: [
    {'licensePlate': { $in: candidates.map( l => l.plate ) }}, 
    {'candidates.plate': { $in: candidates.map( c => c.plate) }}] });
  console.log(member);
  if (!member) { 
    console.log(`validateMember: NOT found in member database.`);
    return false;
  } else {
    console.log(`validateMember: FOUND in member database.`);
    return true;
  }
 

}

  module.exports = {
    validateMember,
    getInOutRecords,
    getInOutRecord,
  };

