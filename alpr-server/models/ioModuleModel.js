const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const IoModuleSchema = new Schema({
	description: { type: String },
	name: { type: String, required: true, unique: true },
	ip: { type: String, required: true, unique: true },
	port: { type: Number },
	username: { type: String, required: true },
	password: { type: String, required: true },
	status: { type: String, default: "unknown" },
	Status: { type: String, default: "OK" },
	configParam: { type: Object },
	url: { type: String },
	relays: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Relay",
		},
	],
});
const IoModule = mongoose.model("IoModule", IoModuleSchema);

exports.IoModule = IoModule;
