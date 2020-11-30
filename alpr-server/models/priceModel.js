const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const ParkingFeeSchema = new Schema ({
    basePrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    hourlyPrice: { type: Number, required: true },
    freeMinutes: { type: Number, required: true },
    currencySymbol: { type: String, required: true},
    currencyName: { type: String, required: true}
  });

const ParkingFee = mongoose.model("ParkingFee", ParkingFeeSchema);

const schema = Joi.object({
  basePrice: Joi.Number().required(),
  discount: Joi.Number().required(),
  hourlyPrice: Joi.Number().required(),
  freeMinutes: Joi.Number().required(),
  currencySymbol: Joi.String().required(),
  currencyName: Joi.String().required()
});

exports.ParkingFee = ParkingFee;
exports.schema = schema;
