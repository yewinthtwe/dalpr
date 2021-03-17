// const Joi = require("joi");
// const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const ObuSchema = new Schema({
	srNo: { type: Number },
	obuId: { type: Number },
	inUsed: { type: Boolean },
	memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
});

const Obu = mongoose.model("Obu", ObuSchema);
exports.Obu = Obu;
