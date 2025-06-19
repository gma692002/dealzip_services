module.exports = app => {
	const Dashboard = require("../controllers/dashboard.controller");
	const validation = require("../middleware/validation.middleware");
	const authenticateJWT = require("../middleware/authentication.middleware");

	const router = require("express").Router();
	router.post("/analytics", authenticateJWT, Dashboard.fetchDasboardData);
	router.post("/sales-data", authenticateJWT, Dashboard.fetchSalesData);
	app.use("/api/dashboard", router);
};
