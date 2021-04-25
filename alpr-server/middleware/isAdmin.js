const { verify } = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	const token = req.cookies.authToken;
	verify(token, config.get("jwtPrivateKey"), function (err, decoded) {
		if (!err && decoded.isAdmin) {
			console.log("auth Middleware: Admin right granted:", decoded.isAdmin);
			next();
		} else {
			res.status(403).send("Access denied.");
		}
	});
};
