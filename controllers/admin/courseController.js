const Course = require("../../models/Course");
const Subject = require("../../models/Subject");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");

class CourseController {
  static list = async (req, res) => {
    try {
      const course = await Course.find();
      const admin = await Adminauth.find();
      return res.render("admin/courses", {
        course,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static add_subject = async (req, res) => {
    try {
      let course_id = req.query.id;
      const subject = await Subject.find({
        course_id: req.query.id,
      }).populate("course_id");
      const admin = await Adminauth.find();
      return res.render("admin/add-subject", {
        course_id,
        subject,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static list_subject = async (req, res) => {
    try {
      let course_id = req.query.id;
      const subject = await Subject.find({
        course_id: req.query.id,
      }).populate("course_id");

      const course = await Course.find({
        _id: req.query.id,
      });

      // return console.log(course);

      const admin = await Adminauth.find();
      return res.render("admin/list-subject", {
        course_id,
        subject,
        subjects: subject.length,
        admin,
        course,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add_course = async (req, res) => {
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

        const course = Course({
          course_type: req.body.course_type,
          course_name: req.body.course_name,
          image: req.file.filename,
          year: req.body.year,
          semester: req.body.semester,
          language: req.body.language,
          description: req.body.description,
          amount: req.body.amount,
          mode: req.body.mode,
        });
        await course.save();
        return res.send({
          error: false,
          message: " Course added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static edit = async (req, res) => {
    try {
      const course = await Course.findOne({
        _id: req.body.editid,
      });

      await Course.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          course_type: req.body.edit_course_type,
          course_name: req.body.edit_course_name,
          year: req.body.edit_year,
          semester: req.body.edit_semester,
          language: req.body.edit_language,
          description: req.body.edit_description,
          mode: req.body.edit_mode,
          amount: req.body.editamount ? req.body.editamount : "null",
        }
      );

      return res.send({
        error: false,
        message: "Course updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static delete = async (req, res) => {
    try {
      const course = await Course.findOne({
        _id: req.body.id,
      });
      //  return console.log(course)
      await Course.deleteOne({
        _id: course.id,
      });
      fs.unlink(
        path.join(root, "/public/uploads/course", course.image),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.send({
        error: false,
        message: "Course Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static add_subject_POST = async (req, res) => {
    try {
      upload1(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an file");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        const subject = Subject({
          title: req.body.title,
          year: req.body.year,
          semester: req.body.semester,
          image: req.file.filename,
          course_id: req.body.course_id,
          description: req.body.description,
        });
        await subject.save();
        return res.send({
          error: false,
          message: "Subject added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static edit_subject = async (req, res) => {
    try {
      const subject = await Subject.findOne({
        _id: req.body.editid,
      });

      await Subject.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          title: req.body.edit_title,
          year: req.body.edit_year,
          semester: req.body.edit_semester,
          description: req.body.edit_description,
        }
      );

      return res.send({
        error: false,
        message: "Subject updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static delete_subject = async (req, res) => {
    try {
      const subject = await Subject.findOne({
        _id: req.body.id,
      });
      //  return console.log(subject)
      await Subject.deleteOne({
        _id: subject.id,
      });
      fs.unlink(
        path.join(root, "/public/uploads/subject", subject.image),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.send({
        error: false,
        message: "Subject Deleted Successfully",
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
  destination: path.join(__dirname, "../../public/uploads/course"),
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

// Set The Storage Engine
const storage1 = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/subject"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload1 = multer({
  storage: storage1,
  // limits: {
  //     fileSize: 1000000
  // },
  fileFilter: imageFilter,
}).single("image");

module.exports = CourseController;
