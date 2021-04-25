const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	lp: { type: Array, required: true },
	ticketId: { type: String },
	inTime: { type: String },
	outTime: { type: String },
	InvitedBy: { type: String },
	parkingFee: { type: Number },
	parkedMinutes: { type: Number },
	isPaid: { type: Boolean },
	isUsed: { type: Boolean },
});

const inOutRecordSchema = new Schema(
	{
		lp: { type: Array, required: true },
		isMember: { type: Boolean },
		candidates: { type: Array },
		direction: { type: String },
		camera_id: { type: Number },
		obu: { type: String },

		inTime: { type: Date },
		inTrafficId: { type: String },
		inPhoto: { type: String },

		outTime: { type: Date },
		outTrafficId: { type: String },
		outPhoto: { type: String },

		ticket: TicketSchema,
	},
	{ timestamps: true }
);

const InOutRecord = mongoose.model("InOutRecord", inOutRecordSchema);
//const TrafficHistory = mongoose.model("TrafficHistory", inOutRecordSchema);
//const Ticket = mongoose.model( "Ticket", TicketSchema);

const schema = Joi.object({
	lp: Joi.array().required(),
});

exports.InOutRecord = InOutRecord;
//exports.TrafficHistory = TrafficHistory;
exports.schema = schema;
