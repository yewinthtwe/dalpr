
const { InOutRecord } = require("./models/inOutRecordModel");
const { TrafficHistory } = require("./models/trafficHistoryModel");

async function docSaver (id) {
    await InOutRecord.findOne({ '_id': id, 'ticket.isUsed' : true }, function(err, result) {

        if(result) {
            let swap = new (TrafficHistory)(result.toJSON()) 
            result.remove()
            swap.save()
        } //or result.toObject
        /* you could set a new id
        swap._id = mongoose.Types.ObjectId()
        swap.isNew = true
        */
        // swap is now in a better place
    })
}

  module.exports = {
    docSaver
  
  };

