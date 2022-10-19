const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/managerauth");
const CollegeController = require("../../controllers/manager/collegeController");

router.get("/list", NotLoggedIn, CollegeController.list);
router.post("/edit", NotLoggedIn, CollegeController.edit);
router.post("/delete", NotLoggedIn, CollegeController.delete);

module.exports = router;
