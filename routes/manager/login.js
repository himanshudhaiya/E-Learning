const router = require("express").Router();
const AuthController = require("../../controllers/manager/authController")
const {
    NotLoggedIn
} = require("../../middlewares/managerauth")

router.get("/login", AuthController.loginGET)
router.post("/login", AuthController.loginPOST)

module.exports = router;