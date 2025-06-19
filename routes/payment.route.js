module.exports = app => {
	const Payment = require("../controllers/payment.controller");
	const validation = require("../middleware/validation.middleware");
	const authenticateJWT = require("../middleware/authentication.middleware");

	const router = require("express").Router();
	router.post("/", authenticateJWT, Payment.findAll);
	router.post("/overview", authenticateJWT, Payment.overview);
	router.post("/detail", authenticateJWT, Payment.details);
	router.post("/store", authenticateJWT, Payment.store);
	router.post("/invoice", authenticateJWT, Payment.findInvoice);
	router.post("/delete", authenticateJWT, Payment.delete);
	router.post("/createPdf", authenticateJWT, Payment.createPdf);
	app.use("/api/payments", router);
};
