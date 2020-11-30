const fs = require('fs/promises');
const mongoose = require("mongoose");
const config = require('config');
const { InOutRecord } = require("./models/inOutRecordModel");
const { Ticket } = require("./models/ticketModel");
const subDays = require('date-fns/subDays');

const photoStore = config.get('photoStore');
const currentTime = Math.floor(new Date().getTime());

mongoose
  .connect(config.get("dbURL"), config.get("mongooseConfig"))
  .then(() => console.log("Connected to Database."))
  .catch((error) => console.log("Could not connect to Database."));

  async function cleanRecords() {
    const oneDayOldRecords = subDays(currentTime, 1);
    const weekOldRecords = subDays(currentTime, 7);
    const usedTickets = await Ticket.findOneAndDelete({'isUsed': true, 'outTime': { $lt: weekOldRecords } });
    const inOutRecords = await InOutRecord
    .findOneAndDelete({'Time': { $lt : oneDayOldRecords }})
    .select('Photo');
    deletePhoto(`${photoStore.location}/${inOutRecords.Photo}`);
    Ticket.db.close();
    InOutRecord.db.close();
  }
  cleanRecords();

async function deletePhoto (path) {
    try{
        await fs.unlink(path);
        console.log(`successfully deleted ${path}`);
    } catch (error) {
        console.error('there was an error deleting photo:', error.message);
    }
}
