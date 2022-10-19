const router = require("express").Router();
const manager = require("../../controllers/admin/managerController")

router.get("/list", manager.List);
router.post("/add", manager.add)

module.exports = router;