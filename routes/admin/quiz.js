const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const QuizController = require("../../controllers/admin/quizController");

router.post("/add", NotLoggedIn, QuizController.add_quiz);

router.get("/questions", NotLoggedIn, QuizController.questionView);
router.post("/add_questions", NotLoggedIn, QuizController.add_question);
router.post("/import_excel", NotLoggedIn, QuizController.import_excel);
// // router.post("/edit", NotLoggedIn, QuizController.edit);
// router.post("/delete_question", NotLoggedIn, QuizController.delete_question);

module.exports = router;
