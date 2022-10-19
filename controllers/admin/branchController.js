const Branch = require("../../models/Branch");
const Adminauth = require("../../models/Adminauth");

class BranchController {
  static branchGET = async (req, res) => {
    try {
      const branch = await Branch.find();
      const admin = await Adminauth.find();
      return res.render("admin/branch", {
        branch,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static branchPOST = async (req, res) => {
    try {
      //Create data
      let data = req.body;
      data.branch_name = data.branch_name;

      // console.log(data);
      const branch = Branch(data);

      //save data
      await branch.save();
      return res.send({
        error: false,
        message: "Branch added successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const branch = await Branch.findOne({
        _id: req.body.id,
      });
      await Branch.deleteOne({
        _id: branch.id,
      });
      return res.send({
        error: false,
        message: "Branch deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = BranchController;
