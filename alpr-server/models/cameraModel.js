const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const CameraSchema = new Schema({
	description: { type: String },
	name: { type: String, required: true, unique: true },
	camera_id: { type: String, required: true },
	ip: { type: String, required: true, unique: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	laneId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Lane",
	},
	relayId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Relay",
	},
	status: { type: Boolean },
});
const Camera = mongoose.model("Camera", CameraSchema);

exports.Camera = Camera;
