const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const YatKyaySchema = new Schema({
	အမည်: { type: String },
	အဖအမည်: { type: String },
	အမိအမည်: { type: String },
	ကဒ်ပြားအမှတ်: { type: String },
	လိင်: { type: String },
	အသက်: { type: Number },
	မွေးသက္ကရာဇ်: { type: String },
	လူမျိုး: { type: String },
	ဘာသာ: { type: String },
	အလုပ်အကိုင်: { type: String },
	နေရပ်လိပ်စာ: { type: String },
	အီးမေးလ်: { type: String },
	မိုဘိုင်းလ်ဖုန်း: { type: Number },
});

const YatKyay = mongoose.model("YatKyay", YatKyaySchema);
exports.YatKyay = YatKyay;
