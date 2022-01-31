const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const ConfigSchema = new Schema ({
  description: { type: String },
  configName: { type: String, required: true  },
  laneName: { type: String, required: true  },
  cameraName: { type: String, required: true },
  relayName: { type: String, required: true },
  status: { type: Boolean },
});
const Config = mongoose.model("Config", ConfigSchema);
exports.Config = Config;
