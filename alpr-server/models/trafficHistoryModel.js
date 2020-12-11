const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const TicketSchema = new Schema ({
  licensePlate: { type: Array, required: true },
  ticketId: { type: String, required: true },
  inTime: { type: Number },
  outTime: { type: Number },
  InvitedBy: { type: String },
  parkingFee: { type: Number },
  parkedMinutes: { type: Number},
  isPaid: { type: Boolean },
  isUsed: { type: Boolean }
});

const inOutRecordSchema = new Schema ({
    licensePlate: { type: Array, required: true },
    isMember: { type: Boolean },
    Time: { type: Date },
    inTrafficId: { type: String },
    inPhoto: { type: String },
    inCameraId: { type: Number },
    outTrafficId: { type: String },
    outPhoto: { type: String },
    outCameraId: { type: Number },
    Direction: { type: String },
    ticket: TicketSchema
  }, { timestamps: true });
  
  const TrafficHistory = mongoose.model("TrafficHistory", inOutRecordSchema);
  //const Ticket = mongoose.model( "Ticket", TicketSchema);

const schema = Joi.object({
  licensePlate: Joi.array().required()
});

exports.TrafficHistory = TrafficHistory;
exports.schema = schema;
