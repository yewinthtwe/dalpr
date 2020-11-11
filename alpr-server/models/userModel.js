const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  reg_date: { type: Date, default: Date.now },
  
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 100,
  },
  
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ username: this.username, _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

const schema = Joi.object({
  name: Joi.string(),
  username: Joi.string().min(4).max(30).required(),
  password: Joi.string().min(4).required(),
  isAdmin: Joi.boolean().invalid(),
});

exports.User = User;
exports.schema = schema;

