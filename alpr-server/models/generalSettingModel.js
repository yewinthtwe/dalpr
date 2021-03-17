const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const GeneralSettingSchema = new Schema ({
    serverName: { type: String, required: true, },
    ip: { type: String, required: true, unique: true },
    port: { type: Number, required: true },
    apiUrl: { type: String },
    photoStore: { type: String },
    configuredLanes: { type: Number },
    status: { type: Boolean }
  });
const General = mongoose.model("General", GeneralSettingSchema);

exports.General = General;
