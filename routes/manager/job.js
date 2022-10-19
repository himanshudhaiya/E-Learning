const router = require("express").Router();
const {
    NotLoggedIn
} = require("../../middlewares/managerauth");
const JobController = require("../../controllers/manager/jobController");

router.get("/list", NotLoggedIn, JobController.list);
router.post("/edit", NotLoggedIn, JobController.edit);
router.post("/delete", NotLoggedIn, JobController.delete);

module.exports = router;