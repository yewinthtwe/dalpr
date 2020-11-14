const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const inOutRecordSchema = new Schema ({
    licensePlate: { type: Array, required: true },
    Time: { type: Date },
    TrafficId: { type: String },
    Photo: { type: String },
    CameraId: { type: Number },
    Direction: { type: String }
  });

const InOutRecord = mongoose.model("InOutRecord", inOutRecordSchema);

const schema = Joi.object({
  licensePlate: Joi.array().required()
});

exports.InOutRecord = InOutRecord;
exports.schema = schema;
