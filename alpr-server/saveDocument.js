
const fs = require('fs/promises');
//var differenceInMonths = require('date-fns/differenceInMonths')
const del = require('del');
const { InOutRecord } = require("./models/inOutRecordModel");
const { TrafficHistory } = require("./models/trafficHistoryModel");

const config = require('config');
// const photoStoreTemp = config.get('photoStoreTemp');
// const photoStore = config.get('photoStore');
const photoStoreTemp = 'C:\\Users\\rootnine\\dalpr\\alpr-server\\public\\plateimagesTemp';
const photoStore = 'C:\\Users\\rootnine\\dalpr\\alpr-server\\public\\plateimages';


async function docSaver (id) {
    const result = await InOutRecord.findOne({ '_id': id, 'ticket.isUsed' : true });
      if(result) {
        let newCopyDoc = new (TrafficHistory)(result.toJSON()) 
        result.remove();
        const savedDoc = await newCopyDoc.save();
         let photos = [];
           photos.push(savedDoc.inPhoto, savedDoc.outPhoto);
            //photos.map(photo => fs.copyFile(`${photoStoreTemp}/${photo}`, `${photoStore}/${photo}`));
            photos.map(photo => fs.copyFile( `${photoStoreTemp}\\${photo}` , `${photoStore}\\${photo}` ));
            (async () => {
              const deletedPaths = await del([`${photoStoreTemp}\\*.jpg`], {dryRun: true});
              console.log('Files and directories that would be deleted:\n', deletedPaths.join('\n'));
          })();
          cleanFalsePositiveInDoc();
      }
}

async function cleanFalsePositiveInDoc () {
  console.log(`Cleaning false positive documents from the database....`);
  const todayDate = Date().toString();
  console.log(todayDate);
  const result = await InOutRecord.find({ 'ticket.isUsed' : false, 'Direction': 'IN', 'Time' : { $lt: todayDate } });
  console.log('Result is:', result);
}

  module.exports = {
    docSaver,

  };

