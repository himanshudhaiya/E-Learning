const router = require("express").Router();
const {
    NotLoggedIn
} = require("../../middlewares/Adminauth");

const ContentController = require("../../controllers/admin/contentController");

router.get("/add", NotLoggedIn, ContentController.add);
router.get("/list", NotLoggedIn, ContentController.list);
router.post("/add", NotLoggedIn, ContentController.add_content);

router.post("/edit/quiz", NotLoggedIn, ContentController.edit);
router.post("/delete/quiz", NotLoggedIn, ContentController.deleteQuiz);
router.post("/delete", NotLoggedIn, ContentController.delete);

module.exports = router;