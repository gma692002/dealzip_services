module.exports = app => {
	const Businesses = require("../controllers/business.controller");
	const validation = require("../middleware/validation.middleware");
	const authenticateJWT = require("../middleware/authentication.middleware");
	// const upload = require('../../middleware/upload.middleware');

	const router = require("express").Router();
	router.get("/", authenticateJWT, Businesses.findAll);
	// router.post('/create', authenticateJWT, Businesses.create);
	// router.post('/upload-logo', [authenticateJWT, upload.uploadLogo], Businesses.uploadLogo);
	router.post('/upload-signature', [authenticateJWT], Businesses.uploadSignature);
	router.post(
		"/update",
		[authenticateJWT, validation.businessUpdate],
		Businesses.updateBusiness
	);
	router.post(
		"/detail",
		[authenticateJWT, validation.businessDetail],
		Businesses.detail
	);
	router.post(
		"/bank-detail",
		[authenticateJWT],
		Businesses.bankDetails
	);
	router.post(
		"/update-bank-detail",
		[authenticateJWT],
		Businesses.updateBankDetails
	);
	router.post("/store-upi", [authenticateJWT], Businesses.updateUpi);
	app.use("/api/business", router);
};;
