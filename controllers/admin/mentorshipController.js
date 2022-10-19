const Mentorship = require("../../models/Mentorship");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");

class MentorshipController {
  static add = async (req, res) => {
    try {
      const mentorship = await Mentorship.find();
      const admin = await Adminauth.find();
      return res.render("admin/add-mentorship", { mentorship, admin });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static list = async (req, res) => {
    try {
      const mentorship = await Mentorship.find();
      return res.render("admin/list-mentorship", { mentorship });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add_mentorship = async (req, res) => {
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

        const mentorship = Mentorship({
          title: req.body.title,
          content: req.body.content,
          timing_from: req.body.timing_from,
          timing_to: req.body.timing_to,
          amount: req.body.amount,
          description: req.body.description,
          image: req.file.filename,
        });
        await mentorship.save();
        return res.send({
          error: false,
          message: " Mentorship added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static edit = async (req, res) => {
    try {
      const mentorship = await Mentorship.findOne({
        _id: req.body.editid,
      });

      await Mentorship.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          title: req.body.edit_title,
          content: req.body.edit_content,
          timing_from: req.body.edit_timing_from,
          timing_to: req.body.edit_timing_to,
          amount: req.body.edit_amount,
          description: req.body.edit_description,
        }
      );
      return res.send({
        error: false,
        message: "Mentorship updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static delete = async (req, res) => {
    try {
      const mentorship = await Mentorship.findOne({
        _id: req.body.id,
      });
      //  return console.log(mentorship)
      await Mentorship.deleteOne({
        _id: mentorship.id,
      });
      fs.unlink(
        path.join(root, "/public/uploads/mentorship", mentorship.image),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.send({
        error: false,
        message: "Mentorship Deleted Successfully",
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
  destination: path.join(__dirname, "../../public/uploads/mentorship"),
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

module.exports = MentorshipController;
