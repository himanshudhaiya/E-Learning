const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const CourseController = require("../../controllers/admin/courseController");

router.get("/list", NotLoggedIn, CourseController.list);
router.post("/add", NotLoggedIn, CourseController.add_course);
router.post("/edit", NotLoggedIn, CourseController.edit);
router.post("/delete", NotLoggedIn, CourseController.delete);

router.get("/add_subject", NotLoggedIn, CourseController.add_subject);
router.get("/subject_list", NotLoggedIn, CourseController.list_subject);
router.post("/subject_add", NotLoggedIn, CourseController.add_subject_POST);
router.post("/subject_edit", NotLoggedIn, CourseController.edit_subject);
router.post("/subject_delete", NotLoggedIn, CourseController.delete_subject);

module.exports = router;
