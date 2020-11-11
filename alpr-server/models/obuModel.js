const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const OBUtags = mongoose.model(
  "OBUtags",
  new mongoose.Schema({
    srNo: { type: Number },
    obuid: { type: Number },
    isActive: { type: Boolean},
    activeDate: { type: Date }
  })
);

exports.OBUtags = OBUtags;
