const User = require("../../models/User");
const College = require("../../models/College");
const Course = require("../../models/Course");
const Subject = require("../../models/Subject");
const Adminauth = require("../../models/Adminauth");
const bcrypt = require("bcrypt");
require("dotenv");
const multer = require("multer");
const path = require("path");
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");
const Order = require("../../models/Order");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/users"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 1000000
  // },
  fileFilter: imageFilter,
}).single("image");

class usersController {
  static list = async (req, res) => {
    try {
      let user = await User.find().populate("college_name course").sort({
        created_at: -1,
      });
      const course = await Course.find();
      const college_name = await College.find();
      const admin = await Adminauth.find();
      return res.render("admin/user-list", {
        user,
        course,
        college_name,
        admin,
      });
    } catch (error) {
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static view = async (req, res) => {
    try {
      let userId = req.params.id;
      let user = await User.findById(userId)
        .populate("college_name course")
        .sort({
          created_at: -1,
        });
      console.log(user);
      const subject = await Subject.find({
        course_id: user.course,
      });
      const course = await Course.find({});
      const order = await Order.find({
        user_id: userId,
      }).populate("user_id subscription_id");
      const admin = await Adminauth.find();
      // return console.log(order)
      const college_name = await College.find();
      return res.render("admin/user-details", {
        user,
        course,
        college_name,
        subject,
        order,
        admin,
      });
    } catch (error) {
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static add = async (req, res) => {
    try {
      let student_user = await User.find().sort({
        created_at: -1,
      });
      const course = await Course.find();
      const college_name = await College.find();
      const admin = await Adminauth.find();
      return res.render("admin/add-student", {
        student_user,
        course,
        college_name,
        admin,
      });
    } catch (error) {
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static add_student = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an icon");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }
        // return console.log(req.body.course);
        const student_user = User({
          image: req.file.filename,
          name: req.body.name,
          email: req.body.email,
          mobile_number: req.body.mobile_number,
          college_name: req.body.college_name,
          year: req.body.year,
          course: req.body.course,
          gender: req.body.gender,
          dob: req.body.dob,
          address: req.body.address,
          state: req.body.state,
          pincode: req.body.pincode,
        });
        await student_user.save();
        return res.send({
          error: false,
          message: " Student (User) added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      const student_user = await User.findOne({
        _id: req.body.editid,
      });
      await User.findOneAndUpdate({
        _id: req.body.editid,
      }, {
        name: req.body.edit_name,
        email: req.body.edit_email,
        mobile_number: req.body.edit_mobile_number,
        course: req.body.edit_course,
        college_name: req.body.edit_college_name,
        year: req.body.edit_year,
        gender: req.body.edit_gender,
        dob: req.body.edit_dob,
        address: req.body.edit_address,
        state: req.body.edit_state,
        pincode: req.body.edit_pincode,
      });
      return res.send({
        error: false,
        message: "Student (User) updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const student_user = await User.findOne({
        _id: req.body.id,
      });
      //  return console.log(student_user)
      await User.deleteOne({
        _id: student_user.id,
      });
      fs.unlink(
        path.join(root, "/public/uploads/users", student_user.image),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.send({
        error: false,
        message: "Student (User) Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await User.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: User.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "User Status Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = usersController;