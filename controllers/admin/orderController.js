const Order = require("../../models/Order");
const Adminauth = require("../../models/Adminauth");

class OrdersController {
  static List = async (req, res) => {
    try {
      const admin = await Adminauth.find({});
      const order = await Order.find()
        .populate("user_id subscription_id")
        .populate({
          path: "course_id",
          populate: {
            path: "course_id",
            model: "Course",
          },
        });
      return res.render("admin/orders", {
        admin,
        order,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = OrdersController;
