const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

// const TicketSchema = new Schema({
// 	ticketId: { type: String },
// 	inTime: { type: String },
// 	outTime: { type: String },
// 	parkingFee: { type: Number },
// 	parkedMinutes: { type: Number },
// 	isPaid: { type: Boolean },
// });

const entryLogSchema = new Schema(
	{
		lp: { type: Array, required: true },
		isMember: { type: Boolean },
		candidates: { type: Array },
		camera_id: { type: Number },
		obu: { type: String },
		dateTime: { type: Date },
		photo: { type: String },
		ticketId: { type: String },
	},
	{ timestamps: true }
);

const EntryLog = mongoose.model("EntryLog", entryLogSchema);

const schema = Joi.object({
	lp: Joi.array().required(),
});

exports.EntryLog = EntryLog;
//exports.TrafficHistory = TrafficHistory;
exports.schema = schema;
