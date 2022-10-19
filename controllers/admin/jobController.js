const Job = require("../../models/Job");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");

class JobController {
  static add = async (req, res) => {
    try {
      const job = await Job.find();
      const admin = await Adminauth.find();
      return res.render("admin/add-jobs", {
        job,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static list = async (req, res) => {
    try {
      const job = await Job.find();
      const admin = await Adminauth.find({});
      return res.render("admin/list-jobs", {
        job,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add_jobs = async (req, res) => {
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

        const job = Job({
          job_name: req.body.job_name,
          image: req.file.filename,
          location: req.body.location,
          designation: req.body.designation,
          salary: req.body.salary,
          experience_level: req.body.experience_level,
          last_dateofapply: req.body.last_dateofapply,
          about_company: req.body.about_company,
          job_description: req.body.job_description,
          apply_link: req.body.apply_link,
          mode: req.body.mode,
        });
        await job.save();
        return res.send({
          error: false,
          message: " Job added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static edit = async (req, res) => {
    try {
      const job = await Job.findOne({
        _id: req.body.editid,
      });
      await Job.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          job_name: req.body.job_name,
          location: req.body.editlocation,
          designation: req.body.editdesignation,
          salary: req.body.editsalary,
          experience_level: req.body.editexperience_level,
          last_dateofapply: req.body.editlast_dateofapply,
          about_company: req.body.editabout_company,
          job_description: req.body.editjob_description,
          apply_link: req.body.editapply_link,
          mode: req.body.editmode,
        }
      );

      return res.send({
        error: false,
        message: "Job updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static delete = async (req, res) => {
    try {
      const job = await Job.findOne({
        _id: req.body.id,
      });
      //  return console.log(job)
      await Job.deleteOne({
        _id: job.id,
      });
      fs.unlink(path.join(root, "/public/uploads/jobs", job.image), (err) => {
        if (err) {
          console.log(err);
        }
      });
      return res.send({
        error: false,
        message: "Job Deleted Successfully",
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
  destination: path.join(__dirname, "../../public/uploads/jobs"),
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

module.exports = JobController;
