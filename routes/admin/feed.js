const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const FeedController = require("../../controllers/admin/feedController");

router.get("/add", NotLoggedIn, FeedController.add);
router.get("/list", NotLoggedIn, FeedController.list);
router.post("/add", NotLoggedIn, FeedController.add_feed);
router.post("/edit", NotLoggedIn, FeedController.edit);
router.post("/delete", NotLoggedIn, FeedController.delete);

module.exports = router;
