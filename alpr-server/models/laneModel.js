const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const LaneSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true, minlength: 4, maxlength: 10 },
  description: { type: String },
  isExitLane: { type: Boolean }
});
const Lane = mongoose.model("Lane", LaneSchema);

exports.Lane = Lane;
