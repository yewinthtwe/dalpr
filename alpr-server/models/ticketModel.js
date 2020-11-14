const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;
// const Traffic = mongoose.model(
//   "Traffic",
const TicketSchema = new Schema ({
    ticketId: { type: String, required: true },
    licensePlate: { type: Array, required: true },
    inTime: { type: Date },
    outTime: { type: Date },
    InvitedBy: { type: String },
    parkingFee: { type: Number },
    isPaid: { type: Boolean },
    isUsed: { type: Boolean }
  });

const Ticket = mongoose.model("Ticket", TicketSchema);

const schema = Joi.object({
  ticketId: Joi.string().required(),
  licensePlate: Joi.array().required(),
});

exports.Ticket = Ticket;
exports.schema = schema;
