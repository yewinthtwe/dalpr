const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const LaneSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true, minlength: 4, maxlength: 10 },
  description: { type: String },
  isExitLane: { type: Boolean }
});
const Lane = mongoose.model("Lane", LaneSchema);

const CameraSchema = new Schema ({
    description: { type: String },
    name: { type: String, required: true, unique: true  },
    ip: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    laneName: { type: String, required: true, unique: true  },
    status: { type: Boolean }
  });
const Camera = mongoose.model("Camera", CameraSchema);

const IoModuleSchema = new Schema ({
    description: { type: String },
    name: { type: String, required: true, unique: true  },
    ip: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean },
    
  });
const IoModule = mongoose.model("IoModule", IoModuleSchema);

const RelaySchema = new Schema ({
  rlId: { type: String },
  name: { type: String, required: true, unique: true  },
  value: { type: String, required: true, unique: true },
  isUsedBy: { type: Boolean },
  ioModule: { type: mongoose.Schema.Types.ObjectId, ref: "IoModule" }
});
const Relay = mongoose.model("Relay", RelaySchema);

const ConfigSchema = new Schema ({
  description: { type: String },
  configName: { type: String, required: true  },
  laneName: { type: String, required: true  },
  cameraName: { type: String, required: true },
  relayName: { type: String, required: true },
  status: { type: Boolean },
});
const Config = mongoose.model("Config", ConfigSchema);

exports.Lane = Lane;
exports.Camera = Camera;
exports.IoModule = IoModule;
exports.Relay = Relay;
exports.Config = Config;