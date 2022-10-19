const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const JobController = require("../../controllers/admin/jobController");

router.get("/add", NotLoggedIn, JobController.add);
router.get("/list", NotLoggedIn, JobController.list);
router.post("/add", NotLoggedIn, JobController.add_jobs);
router.post("/edit", NotLoggedIn, JobController.edit);
router.post("/delete", NotLoggedIn, JobController.delete);

module.exports = router;
