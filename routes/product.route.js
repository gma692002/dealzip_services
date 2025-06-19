module.exports = app => {
	const Product = require("../controllers/product.controller");
	const validation = require("../middleware/validation.middleware");
	const authenticateJWT = require("../middleware/authentication.middleware");
	const router = require("express").Router();

	router.post("/", [authenticateJWT, validation.product], Product.findAll);
	router.post("/detail", [authenticateJWT, validation.product], Product.detail);
	router.post("/store", [authenticateJWT, validation.product], Product.store);
	router.post("/delete", [authenticateJWT], Product.deleteProduct);
	router.post("/overview", [authenticateJWT, validation.product], Product.overview);
	router.post("/stock", [authenticateJWT], Product.manageStock);
	app.use("/api/product", router);
};
