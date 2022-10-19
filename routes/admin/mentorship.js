const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const MentorshipController = require("../../controllers/admin/mentorshipController");

router.get("/add", NotLoggedIn, MentorshipController.add);
router.get("/list", NotLoggedIn, MentorshipController.list);
router.post("/add", NotLoggedIn, MentorshipController.add_mentorship);
router.post("/edit", NotLoggedIn, MentorshipController.edit);
router.post("/delete", NotLoggedIn, MentorshipController.delete);

module.exports = router;
