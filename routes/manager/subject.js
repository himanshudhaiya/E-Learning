const router = require("express").Router();
const {
    NotLoggedIn
} = require("../../middlewares/managerauth");
const SubjectController = require("../../controllers/manager/subjectController");

router.get("/list", NotLoggedIn, SubjectController.list);
router.post("/edit", NotLoggedIn, SubjectController.edit);
router.post("/delete", NotLoggedIn, SubjectController.delete);

module.exports = router;