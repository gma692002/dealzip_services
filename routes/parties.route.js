module.exports = app => {
	const Parties = require("../controllers/parties.controller");
	const validation = require("../middleware/validation.middleware");
	const authenticateJWT = require("../middleware/authentication.middleware");

	const router = require("express").Router();
	router.post("/", [authenticateJWT, validation.party], Parties.findAll);
	router.post("/detail", [authenticateJWT, validation.party], Parties.detail);
	router.post("/overview", [authenticateJWT, validation.party], Parties.overview);
	router.post("/store", [authenticateJWT, validation.party], Parties.store);
	router.post("/delete", [authenticateJWT, validation.party], Parties.delete);
	app.use("/api/parties", router);
};
