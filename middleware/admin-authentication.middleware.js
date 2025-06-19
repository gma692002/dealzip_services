const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		if (token) {
			jwt.verify(
				token,
				process.env.ADMIN_ACCESS_TOKEN_SECRET,
				async (err, user) => {
					if (err) {
						return res.status(403).send({
							status: false,
							message: "Invalid Token"
						});
					}
					req.admin = { admin_id: user.user_id };
					next();
				}
			);
		} else {
			res.status(401).send({
				status: false,
				message: "Unautohrized Request"
			});
		}
	} else {
		res.status(401).send({
			status: false,
			message: "Unautohrized Request"
		});
	}
};

module.exports = authenticateJWT;
