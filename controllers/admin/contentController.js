const Subject = require("../../models/Subject");
const Content = require("../../models/Content");
const Adminauth = require("../../models/Adminauth");
const Quiz = require("../../models/Quiz");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");
const baseURL = process.env.URL;

class ContentController {
  static add = async (req, res) => {
    try {
      let subject_id = req.query.id;
      const content = await Content.find({
        subject_id: req.query.id,
      }).populate("subject_id");
      const admin = await Adminauth.find();
      return res.render("admin/add-content", {
        subject_id,
        subject_id,
        content,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static list = async (req, res) => {
    try {
      const mediaUrl = baseURL + "/uploads/content/";
      let subject_id = req.query.id;

      const textbook = await Content.find({
        subject_id: req.query.id,
        type: "textbook",
      }).populate("subject_id");

      const pdf = await Content.find({
        subject_id: req.query.id,
        type: "pdf",
      }).populate("subject_id");

      const ppt = await Content.find({
        subject_id: req.query.id,
        type: "ppt",
      }).populate("subject_id");

      const note = await Content.find({
        subject_id: req.query.id,
        type: "Notes",
      }).populate("subject_id");

      const quiz = await Quiz.find({
        subject_id: req.query.id,
      }).populate("subject_id");

      const admin = await Adminauth.find();

      return res.render("admin/list-content", {
        subject_id,
        textbook,
        textbooks: textbook.length,
        pdf,
        pdfs: pdf.length,
        ppt,
        ppts: ppt.length,
        note,
        notes: note.length,
        mediaUrl,
        admin,
        quiz,
        quizs: quiz.length,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add_content = async (req, res) => {
    upload(req, res, async function (err) {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.files.pdf) {
        if (req.files.thumbnail) {
          fs.unlinkSync("tmp/" + req.files.thumbnail[0].filename);
        }
        return res.send("Please upload a note");
      } else if (!req.files.thumbnail) {
        if (req.files.video) {
          fs.unlinkSync("tmp/" + req.files.pdf[0].filename);
        }
        return res.send("Please upload a thumbnail");
      } else if (err instanceof multer.MulterError) {
        console.log(err);
        return res.send(err);
      } else if (err) {
        console.log(err);
        return res.send(err);
      }

      try {
        fs.rename(
          "tmp/" + req.files.thumbnail[0].filename,
          "public/uploads/thumbnail/" + req.files.thumbnail[0].filename,
          function (err) {
            if (err) throw err;
            console.log("Successfully");
          }
        );
        fs.rename(
          "tmp/" + req.files.pdf[0].filename,
          "public/uploads/content/" + req.files.pdf[0].filename,
          function (err) {
            if (err) throw err;
            console.log("Successfully ");
          }
        );

        const content = Content({
          thumbnail: req.files.thumbnail[0].filename,
          basename: req.files.pdf[0].filename,
          type: req.body.type ? req.body.type : "",
          title: req.body.title,
          subject_id: req.body.subject_id,
          description: req.body.description,
        });
        await content.save();
        return res.send({
          error: false,
          message: "Content added successfully",
        });
      } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
      }
    });
  };

  static edit = async (req, res) => {
    try {
      const content = await Quiz.findOne({
        _id: req.body.editid2,
      });
      // return console.log(req.body);

      await Quiz.findOneAndUpdate({
        _id: req.body.editid2,
      }, {
        $set: {
          name: req.body.name,
          description: req.body.edit_description2,
        },
      });
      return res.send({
        error: false,
        message: "Content updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static deleteQuiz = async (req, res) => {
    try {
      const quiz = await Quiz.findOne({
        _id: req.body.id,
      });
      //  return console.log(content)
      await Quiz.deleteOne({
        _id: quiz.id,
      });

      return res.send({
        error: false,
        message: "Content Deleted Successfully",
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
      const content = await Content.findOne({
        _id: req.body.id,
      });
      //  return console.log(content)
      await Content.deleteOne({
        _id: content.id,
      });
      fs.unlink(
        path.join(root, "/public/uploads/content", content.basename),
        path.join(root, "/public/uploads/thumbnail", content.thumbnail),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      return res.send({
        error: false,
        message: "Content Deleted Successfully",
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
  destination: path.join(__dirname, "/../../tmp"),
  filename: function (req, files, cb) {
    if (files.fieldname == "pdf") {
      cb(
        null,
        files.originalname + "_" + Date.now() + path.extname(files.originalname)
      );
    } else {
      cb(null, `${Date.now()}.jpg`);
    }
  },
});

// Init Video Upload
const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 5000000,
  // },
  // fileFilter: contentFilter,
}).fields([{
    name: "pdf",
    maxCount: 1,
  },
  {
    name: "thumbnail",
    maxCount: 1,
  },
]);

module.exports = ContentController;