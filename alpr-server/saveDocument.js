const fs = require('fs');
//var differenceInMonths = require('date-fns/differenceInMonths')
// const del = require('del');
const { InOutRecord } = require("./models/inOutRecordModel");
const { TrafficHistory } = require("./models/trafficHistoryModel");



//const photoStoreTemp = 'C:\\Users\\rootnine\\dalpr\\alpr-server\\public\\plateimagesTemp';
//const photoStore = 'C:\\Users\\rootnine\\dalpr\\alpr-server\\public\\plateimages';


async function docSaver (id) {
    console.log(`docSaver: Searching Document ID: ${id} in temporary database for Saving...`);
    const result = await InOutRecord.findOne( { $or: [{ '_id': id, 'ticket.isUsed' : true }, { '_id': id, 'isMember': true }] } );
    console.log(result);
      // if(result) {
      //   let newCopyDoc = new (TrafficHistory)(result.toJSON()) 
      //   result.remove();
      //   console.log(`Saving Document ${id} to TrafficHistory database....`);
      //   const savedDoc = await newCopyDoc.save();
      //   console.log(`Document saved as ${savedDoc._id} in TrafficHistory database.`);

      // } else {
      //   console.log(`No matching document found for saving in TrafficHistory database.`);
      // }
}

// async function copyPhoto (photo) {
//   await fs.copyFile( `${photoStoreTemp}/${photo}`, `${photoStore}/${photo}`, (err) => {
//     if (err) throw err;
//     console.log (`${photoStoreTemp}/${photo} was copied to ${photoStore}/${photo}`);
//   });

//   await fs.unlink( `${photoStoreTemp}/${photo}`, (err) => {
//     if (err) throw err;
//     console.log (`${photoStoreTemp}/${photo} is deleted.`);
//   });
// }

// async function cleanFalsePositiveInDoc () {
//   console.log(`Cleaning false positive documents from the database....`);
//   const todayDate = Date().toString();
//   console.log(todayDate);
//   const result = await InOutRecord.find({ 'ticket.isUsed' : false, 'Direction': 'IN', 'Time' : { $lt: todayDate } });
//   console.log('Result is:', result);
// }

  module.exports = {
    docSaver,
  };

