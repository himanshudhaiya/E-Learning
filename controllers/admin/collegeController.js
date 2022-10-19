const University = require("../../models/University");
const Course = require("../../models/Course");
const College = require("../../models/College");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");

class CollegeController {
  static add = async (req, res) => {
    try {
      const college = await College.find().populate("course_id university_id");
      const university_id = await University.find().populate("course_id");
      const course_id = await Course.find();
      const admin = await Adminauth.find();
      return res.render("admin/add-college", {
        college,
        course_id,
        university_id,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static list = async (req, res) => {
    try {
      const college = await College.find().populate("course_id university_id");
      const university_id = await University.find().populate("course_id");
      const course_id = await Course.find();
      const admin = await Adminauth.find();
      return res.render("admin/list-college", {
        college,
        course_id,
        university_id,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add_college = async (req, res) => {
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

        const college = College({
          name: req.body.name,
          image: req.file.filename,
          course_id: req.body.course_id,
          university_id: req.body.university_id,
        });
        await college.save();
        return res.send({
          error: false,
          message: "College added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static edit = async (req, res) => {
    try {
      const college = await College.findOne({
        _id: req.body.editid,
      });

      await College.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          name: req.body.edit_name,
          course_id: req.body.edit_course_id,
          university_id: req.body.edit_university_id,
        }
      );
      return res.send({
        error: false,
        message: "College updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static delete = async (req, res) => {
    try {
      const college = await College.findOne({
        _id: req.body.id,
      });
      //  return console.log(college)
      await College.deleteOne({
        _id: college.id,
      });
      fs.unlink(
        path.join(root, "/public/uploads/college", college.image),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.send({
        error: false,
        message: "College Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/college"),
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

module.exports = CollegeController;
