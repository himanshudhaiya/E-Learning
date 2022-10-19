const router = require("express").Router();
const {
    NotLoggedIn
} = require("../../middlewares/managerauth");
const CourseController = require("../../controllers/manager/courseController");

router.get("/list", NotLoggedIn, CourseController.list);
router.post("/edit", NotLoggedIn, CourseController.edit);
router.post("/delete", NotLoggedIn, CourseController.delete);

module.exports = router;