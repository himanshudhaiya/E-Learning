const Manager = require("../../models/Manager");
const Adminauth = require("../../models/Adminauth");
const bcrypt = require("bcrypt");

class managerController {
  static List = async (req, res) => {
    try {
      const admin = await Adminauth.find({});
      const manager = await Manager.find();
      return res.render("admin/manager", {
        admin,
        manager,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static add = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      const passwords = await bcrypt.hashSync(req.body.password, salt);

      const manager = Manager({
        name: req.body.name,
        email: req.body.email,
        password: passwords,
        mobile_number: req.body.mobile_number,
        gender: req.body.gender,
      });
      await manager.save();
      return res.send({
        error: false,
        message: "Manager updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
}
module.exports = managerController;
