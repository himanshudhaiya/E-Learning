const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const usersController = require("../../controllers/admin/userController");

router.get("/list", NotLoggedIn, usersController.list);
router.get("/student/add", NotLoggedIn, usersController.add);
router.post("/student/add", NotLoggedIn, usersController.add_student);
router.get("/view/:id", NotLoggedIn, usersController.view);
router.post("/edit", NotLoggedIn, usersController.edit);
router.post("/delete", NotLoggedIn, usersController.delete);
router.post("/approved", NotLoggedIn, usersController.Approved);

module.exports = router;
