const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const CameraSchema = new Schema({
	
	description: { type: String },
	name: { type: String, required: true, unique: true },
	camera_id: { type: Number, unique: true },
	ip: { type: String, required: true, unique: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	status: { type: Boolean },
	// laneId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Lane",
	// },
	// relayId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Relay",
	// },
});
//CameraSchema.plugin(AutoIncrement, { inc_field: "camera_id" });
const Camera = mongoose.model("Camera", CameraSchema);
exports.Camera = Camera;
