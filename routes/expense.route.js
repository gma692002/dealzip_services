module.exports = app => {
	const Expense = require("../controllers/expense.controller");
	const validation = require("../middleware/validation.middleware");
	const authenticateJWT = require("../middleware/authentication.middleware");

	const router = require("express").Router();
	router.post("/", authenticateJWT, Expense.findAll);
	router.post("/store", authenticateJWT, Expense.store);
	router.post("/overview", authenticateJWT, Expense.overview);
	router.post("/detail", authenticateJWT, Expense.detail);
	router.post("/category/list", authenticateJWT, Expense.findAllCategories);
	router.post("/category/store", authenticateJWT, Expense.categoryStore);
	// router.post("/preview", authenticateJWT, Expense.preview);
	router.post("/delete", authenticateJWT, Expense.deletExpense);
	// router.get("/web-preview/:expenseId/:businessId/:userId", Expense.webPreview);
	// router.post("/createPdf", authenticateJWT, Expense.createPdf);
	app.use("/api/expense", router);
};
