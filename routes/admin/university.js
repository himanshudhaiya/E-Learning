const router = require("express").Router();
const {
    NotLoggedIn
} = require("../../middlewares/Adminauth");
const UniversityController = require("../../controllers/admin/universityController");

router.get("/add", NotLoggedIn, UniversityController.add);
router.get("/list", NotLoggedIn, UniversityController.list);
router.post("/add", NotLoggedIn, UniversityController.add_university);
router.post("/edit", NotLoggedIn, UniversityController.edit);
router.post("/delete", NotLoggedIn, UniversityController.delete);

module.exports = router;