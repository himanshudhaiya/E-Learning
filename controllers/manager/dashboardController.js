const User = require("../../models/User");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const College = require("../../models/College");

class DashboardController {
    static dashboard = async (req, res) => {
        const users = await User.find();
        const subjects = await Subject.find();
        const course = await Course.find();
        const college = await College.find();

        return res.render("manager/dashboard", {
            users: users.length,
            subjects: subjects.length,
            courses: course.length,
            colleges: college.length,
        });
    };
}

module.exports = DashboardController;