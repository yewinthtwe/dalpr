const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const TrafficHistory = mongoose.model(
  "TrafficHistory",
  new mongoose.Schema({
    licensePlate: { type: Array, required: true },
    photo: { type: String, required: true },
    inTime: { type: Date, required: true },
    outTime: { type: Date, required: true },
    isMember: { type: Boolean }
  })
);

exports.TrafficHistory = TrafficHistory;
