const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

// const Traffic = mongoose.model(
//   "Traffic",
const MemberSchema = new Schema({
    reg_date: { type: Date, default: Date.now },

    licensePlate: {
      type: String,
      required: true,
      unique: true
    },

    owner_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 100
    },

    address: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 254
    },

    obuId: {
      type: Number,
      unique: true,
      required: true,
      minlength: 12,
      maxlength: 16
    },
   
    
  });

const Member = mongoose.model("Member", MemberSchema);

const schema = Joi.object({
  licensePlate: Joi.string().required(),
  owner_name: Joi.string().min(6).max(100).required(),
  address: Joi.string().min(6).max(254).required(),
  obuId: Joi.number().required()
});

exports.Member = Member;
exports.schema = schema;
