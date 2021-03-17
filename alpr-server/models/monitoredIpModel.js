const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const MonitoredIpSchema = new Schema({
	description: { type: String },
	name: { type: String },
	ip: { type: String, required: true, unique: true },
	status: { type: String, default: "unknown" },
	isMonitored: { type: Boolean },
});
const MonitoredIp = mongoose.model("MonitoredIp", MonitoredIpSchema);

exports.MonitoredIp = MonitoredIp;
