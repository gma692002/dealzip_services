module.exports = app => {
	const Invoice = require("../controllers/invoice.controller");
	const validation = require("../middleware/validation.middleware");
	const authenticateJWT = require("../middleware/authentication.middleware");

	const router = require("express").Router();
	router.post("/", authenticateJWT, Invoice.findAll);
	router.post("/detail", authenticateJWT, Invoice.detail);
	router.post("/store", [authenticateJWT, validation.invoice], Invoice.store);
	router.post("/settings", authenticateJWT, Invoice.settings);
	router.post("/update-settings", authenticateJWT, Invoice.updateSetting);
	router.post("/fetch-qr", authenticateJWT, Invoice.paymentQr);
	// router.post('/settings/store', authenticateJWT, Invoice.settingsStore);
	// router.post('/preview', authenticateJWT, Invoice.preview);
	router.post("/delete", authenticateJWT, Invoice.deleteInvoice);
	// router.get("/web-preview/:invoiceId/:businessId/:userId", Invoice.webpreview);
	router.post("/createPdf", authenticateJWT, Invoice.createPdf);
	// router.post('/update-order-status', authenticateJWT,Invoice.updateOrderStatus);
	// router.post('/shop-settings', authenticateJWT,Invoice.shopSettings);
	// router.post('/shop-settings/store', authenticateJWT, Invoice.shopSettingStore);
	app.use("/api/invoice", router);
};
