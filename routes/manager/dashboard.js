const router = require("express").Router();
const {
    NotLoggedIn
} = require("../../middlewares/managerauth");
const DashboardController = require("../../controllers/manager/dashboardController");

router.get("/dashboard", DashboardController.dashboard);

module.exports = router;