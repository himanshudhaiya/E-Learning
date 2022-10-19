const User = require("../../models/User");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const College = require("../../models/College");
const Adminauth = require("../../models/Adminauth");

class DashboardController {
  static dashboard = async (req, res) => {
    const users = await User.find();
    const subjects = await Subject.find();
    const course = await Course.find();
    const college = await College.find();
    const admin = await Adminauth.find();

    return res.render("admin/dashboard", {
      users: users.length,
      subjects: subjects.length,
      courses: course.length,
      colleges: college.length,
      admin,
    });
  };
}

module.exports = DashboardController;
