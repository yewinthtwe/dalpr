const Joi = require("joi");
const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;
// const Traffic = mongoose.model(
//   "Traffic",
const MemberSchema = new Schema({
    memberId: { type: String, default: uuidv4() },
    registrationDate: { type: Date, default: Date.now },
    licensePlate: { type: Array, required: true },
    memberName: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    obuId: { type: Number, required: true },
  });

const Member = mongoose.model("Member", MemberSchema);

const schema = Joi.object({
  licensePlate: Joi.string().required(),
  memberName: Joi.string().min(6).max(100).required(),
  address: Joi.string().min(6).max(254).required(),
  obuId: Joi.number().required()
});

exports.Member = Member;
exports.schema = schema;
