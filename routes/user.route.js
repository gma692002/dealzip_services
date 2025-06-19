module.exports = app => {
	const User = require("../controllers/user.controller");
	const validation = require("../middleware/validation.middleware");
	const authenticateJWT = require("../middleware/authentication.middleware");
	// const authenticateJWT = require("../middleware/authentication.middleware");
	// const rateLimitMiddleware = require('../middleware/rateLimiter.middleware');

	const router = require("express").Router();
	// router.get("/", authenticateJWT, User.findAll);
	router.post("/login", [validation.login], User.login);
	// router.post("/details", authenticateJWT, User.details);
	router.post("/verify", [validation.otp], User.verifyOtp);
	router.post("/resend", User.resendOtp);
	router.post("/update-token", authenticateJWT, User.updateNotificationToken);
	app.use("/api/user", router);
};
