const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const GateUser = mongoose.model(
  "GateUser",
  new mongoose.Schema({
    licensePlate: { type: Array, required: true },
    photo: { type: String, required: true },
    inTime: { type: Date },
    outTime: { type: Date },
    isMember: { type: Boolean, required: true },
    markToDelete: { type: Boolean },
  })
);

exports.GateUser = GateUser;
