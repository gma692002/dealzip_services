module.exports = app => {
	const AuthenticationController = require("../../controllers/admin/authentication.controller");
	const BusinessDetailController = require("../../controllers/admin/business-detail.controller");
	const DashboardController = require("../../controllers/admin/dashboard.controller");
	const ListingController = require("../../controllers/admin/listing.controller");
	const NotificationController = require("../../controllers/admin/notification.controller");
	const adminAuthenticateJWT = require("../../middleware/admin-authentication.middleware");
	const router = require("express").Router();
	router.post("/login", AuthenticationController.login);
	router.post("/total-data", adminAuthenticateJWT, DashboardController.findTotalCount);
	router.post("/filter-total-data", adminAuthenticateJWT, DashboardController.fetchFilterData);
	router.post("/users", adminAuthenticateJWT, ListingController.findAllUsers);
	router.post("/business", adminAuthenticateJWT, ListingController.findAllBusiness);
	router.post("/bills", adminAuthenticateJWT, ListingController.findAllBills);
	router.post("/activities", adminAuthenticateJWT, ListingController.findAllActivities);
	router.post("/parties", adminAuthenticateJWT, ListingController.findAllParties);
	router.post("/products", adminAuthenticateJWT, ListingController.findAllProducts);
	router.post("/payments", adminAuthenticateJWT, ListingController.findAllPayments);
	router.post("/expenses", adminAuthenticateJWT, ListingController.findAllExpenses);
	router.post("/detail-data", adminAuthenticateJWT, BusinessDetailController.fetchBusinessData);
	router.post("/notification-list", adminAuthenticateJWT, NotificationController.notificationListing);
	router.post("/shoot-notification", adminAuthenticateJWT, NotificationController.saveNotification);

	app.use("/api/admin", router);
};
