const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const BranchController = require("../../controllers/admin/branchController");

router.get("/list", NotLoggedIn, BranchController.branchGET);
router.post("/add", NotLoggedIn, BranchController.branchPOST);
router.post("/delete", NotLoggedIn, BranchController.delete);

module.exports = router;
