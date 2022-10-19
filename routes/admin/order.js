const router = require("express").Router();
const order = require("../../controllers/admin/orderController")

router.get("/list", order.List);

module.exports = router;