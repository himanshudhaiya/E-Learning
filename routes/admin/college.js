const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const CollegeController = require("../../controllers/admin/collegeController");

router.get("/add", NotLoggedIn, CollegeController.add);
router.get("/list", NotLoggedIn, CollegeController.list);
router.post("/add", NotLoggedIn, CollegeController.add_college);
router.post("/edit", NotLoggedIn, CollegeController.edit);
router.post("/delete", NotLoggedIn, CollegeController.delete);

module.exports = router;
