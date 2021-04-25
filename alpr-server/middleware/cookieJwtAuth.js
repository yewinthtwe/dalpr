const jwt = require("jsonwebtoken");
const config = require("config");

exports.cookieJwtAuth = (req, res, next) => {
	const token = req.cookies.token;
	try {
		const user = jwt.verify(token, config.get("jwtPrivateKey"));
		req.user = user;
		next();
	} catch (err) {
		res.clearCookie("token");
		return res.redirect("/");
	}
};
