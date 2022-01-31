const config = require("config");
const jwt = require("jsonwebtoken");
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
	email: {
		type: String,
		unique: true,
		trim: true,
	},
	isAdmin: Boolean,
	isActive: Boolean,
	isLoggedIn: Boolean,
});

userSchema.methods.generateAuthToken = function () {

	 //const expiration = 604800000;
	const jwtAuthToken = jwt.sign(
		{ username: this.username, _id: this._id, isAdmin: this.isAdmin },
		config.get("jwtPrivateKey"),
		{ expiresIn: "1h" }
	);
	return jwtAuthToken;

	// return res.cookie('authToken', jwtAuthToken, {
	// 	expires: new Date(Date.now() + expiration),
	// 	secure: false, // set to true if your using https
	// 	httpOnly: true,
	//   });

};

// userSchema.methods.generateCookie = function () {
// 	let userObject = {
// 		username: this.username,
// 		_id: this._id,
// 		isAdmin: this.isAdmin,
// 	};
// 	let token = jwt.sign(userObject, config.get("jwtPrivateKey"), {
// 		expiresIn: "1h",
// 	});
// 	// return res.cookie("token", token, {
// 	// 	httpOnly: true,
// 	// });
// 	return token;
// };

const User = mongoose.model("User", userSchema);

const schema = Joi.object({
	name: Joi.string(),
	username: Joi.string().min(4).max(30).required(),
	password: Joi.string().min(4).required(),
	email: Joi.string(),
	isAdmin: Joi.boolean().invalid(),
	isActive: Joi.boolean().invalid(),
});

exports.User = User;
exports.schema = schema;
