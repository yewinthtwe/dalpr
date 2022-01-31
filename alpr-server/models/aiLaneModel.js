const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const AiLaneSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String },
	lane: { type: mongoose.Schema.Types.ObjectId, ref: "Lane" },
	camera: { type: mongoose.Schema.Types.ObjectId, ref: "Camera" },
	relay: { type: mongoose.Schema.Types.ObjectId, ref: "Relay" },
	ioModule: { type: mongoose.Schema.Types.ObjectId, ref: "IoModule" },
	status: { type: Boolean },
	//lane: { type: Object, required: true },
	//camera: { type: Object, required: true },
	//relay: { type: Object, required: true },
	//ioModule: { type: Object, required: true },
	// laneId: { type: String, required: true },
	// laneType: { type: String, required: true },
	//cameraId: { type: String, required: true },
	//ioModuleId: { type: String, required: true },
	//relayId: { type: String, required: true },
});
const AiLane = mongoose.model("AiLane", AiLaneSchema);

exports.AiLane = AiLane;
