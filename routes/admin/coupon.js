const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const CouponController = require("../../controllers/admin/couponController");

router.get("/list", NotLoggedIn, CouponController.list);
router.post("/add", NotLoggedIn, CouponController.add_coupon);
router.post("/delete", NotLoggedIn, CouponController.delete);

module.exports = router;
