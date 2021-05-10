const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
// const { addDays } = require("date-fns");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
	memberId: { type: String, default: uuidv4() },
	memberName: { type: String, required: true, trim: true },
	memberType: { type: String, required: true },
	lp: { type: Array, required: true },
	address: { type: String, required: true },
	mobile: { type: Number },
	email: { type: String },
	registrationDate: { type: Date, default: Date.now },
	expireDate: { type: Date },
	candidates: { type: Array },
	isActive: { type: Boolean },
	obu: { type: mongoose.Schema.Types.ObjectId, ref: "Obu" },
});

const Member = mongoose.model("Member", MemberSchema);

const schema = Joi.object({
	lp: Joi.array().required(),
	memberName: Joi.string().min(6).max(100).required(),
	memberType: Joi.string().required(),
	address: Joi.string().min(6).max(254).required(),
	mobile: Joi.number().min(9).required(),
	email: Joi.string(),
	isActive: Joi.boolean(),
});

exports.Member = Member;
exports.schema = schema;
