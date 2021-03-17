const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const PriceSchema = new Schema ({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  billingCircle: { type: Number, required: true },
  discountEntitleMinutes: { type: Number, required: true },
  discountPercent: { type: Number, required: true },
  discountedRate: { type: Number, required: true },
  status: { type: Boolean },
  });
const Price = mongoose.model("Price", PriceSchema);

exports.Price = Price;
