const { verify } = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	
	const cookieToken = req.cookies.authToken;

	//console.log("Middleware: cookie browser request received:", req.cookies);

	if (!cookieToken) {
		res.status(401).send("No cookie token provided.");
		return;
	} else {
		verify(cookieToken, config.get("jwtPrivateKey"), function (err, decoded) {
			if (!err && decoded) {
				console.log("auth Middleware: access cookieToken decoded :", decoded);
				next();
			} else {
				res.status(401).send("Unauthenticated.");
			}
		});
	}
};

// module.exports = function (req, res, next) {
// 	const token = req.header("x-auth-token");
// 	console.log("auth middleware:", req.header);
// 	if (!token) return res.status(401).send("Access Denied. No token provided.");
// 	try {
// 		const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
// 		req.user = decoded;
// 		next();
// 	} catch (ex) {
// 		res.status(400).send("Invalid token.");
// 	}
// };
