const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Appauth");
const ApiController = require("../../controllers/app/apiController");

router.get("/aboutus", NotLoggedIn, ApiController.about);
router.get("/contactus", NotLoggedIn, ApiController.contact);
router.get("/faq", NotLoggedIn, ApiController.faq);
router.get("/privacypolicy", NotLoggedIn, ApiController.privacypolicy);
router.get("/termscondition", NotLoggedIn, ApiController.termscondition);
router.get("/branch/list", NotLoggedIn, ApiController.branch);
router.get("/college/list", NotLoggedIn, ApiController.college);
router.get("/coupon/list", NotLoggedIn, ApiController.coupon);
router.get("/course/list", NotLoggedIn, ApiController.course);
router.post("/content/list", NotLoggedIn, ApiController.content);
router.post("/quiz/list", NotLoggedIn, ApiController.quiz);
router.get("/feed/list", NotLoggedIn, ApiController.feed);
router.get("/job/list", NotLoggedIn, ApiController.job);
router.get("/mentorship/list", NotLoggedIn, ApiController.mentorship);
router.get("/orders/list", NotLoggedIn, ApiController.orders);
router.post("/subjects/list", NotLoggedIn, ApiController.subject);
router.get("/subscription/list", NotLoggedIn, ApiController.subscription);
router.get("/university/list", NotLoggedIn, ApiController.university);
router.get("/users/list", NotLoggedIn, ApiController.users);
router.get("/notifications/list", NotLoggedIn, ApiController.notifications);

module.exports = router;
