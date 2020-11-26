//const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const AlprCameraSchema = new Schema ({
    camera_id: { type: Number, required: true, unique: true },
    cameraUrl: { type: String, required: true, unique: true  },
    laneId: { type: Number,required: true, unique: true  },
    isExitLane: { type: Boolean },
    gateName: { type: String,required: true },
    gateId: { type: Number, required: true },
    ioModuleId : { type: String, required: true },
    upRelayId: { type: String, required: true, unique: true },
    downRelayId: { type: String, required: true, unique: true }
  });

const AlprCamera = mongoose.model("AlprCamera", AlprCameraSchema);

// const schema = Joi.object({
//   camera_id: Joi.Number().required(),
//   cameraUrl: Joi.String().required(),
//   isExitLane: Joi.Boolean().required(),
// });

exports.AlprCamera = AlprCamera;
//exports.schema = schema;
