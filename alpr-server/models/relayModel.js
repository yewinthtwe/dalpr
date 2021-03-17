const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const RelaySchema = new Schema({
	name: { type: String, required: true },
	relayId: { type: Number, required: true },
	relayValue: { type: Number, required: true },
	description: { type: String },
	ioModule: { type: mongoose.Schema.Types.ObjectId, ref: "IoModule" },
	inUsed: { type: Boolean, default: false },
	ID: { type: String },
	VALUE: { type: String },
});
const Relay = mongoose.model("Relay", RelaySchema);

exports.Relay = Relay;
