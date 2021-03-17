const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const AiLaneSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String },
	camera: { type: String, required: true },
	cameraId: { type: String, required: true },
	ioModule: { type: String, required: true },
	ioModuleId: { type: String, required: true },
	lane: { type: String, required: true },
	laneId: { type: String, required: true },
	laneType: { type: String, required: true },
	relay: { type: String, required: true },
	relayId: { type: String, required: true },
	status: { type: Boolean },
});
const AiLane = mongoose.model("AiLane", AiLaneSchema);

exports.AiLane = AiLane;
