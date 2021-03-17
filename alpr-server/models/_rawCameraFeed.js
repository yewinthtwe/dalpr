const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const RawCameraFeed = new Schema({
    
  });

const CameraFeed = mongoose.model("CameraFeed", RawCameraFeed);

exports.CameraFeed = CameraFeed;


