const Quiz = require("../../models/Quiz");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const reader = require("xlsx");
const root = process.cwd();
const moment = require("moment");
const baseURL = process.env.URL;
const excelFilter = require("../../config/excelFilter");

class QuizController {
  static questionView = async (req, res) => {
    const data = await Quiz.findOne({ _id: req.query.id });
    // console.log(data);
    const admin = await Adminauth.find({});
    return res.render("admin/quiz_questions", {
      questions:
        data && data.questions && data.questions.length ? data.questions : [],
      admin,
    });
  };

  static add_quiz = async (req, res) => {
    if (!req.body.name) return res.send("Netjrf Test Name is Required");
    if (!req.body.duration) return res.send("Duration is Required");
    if (!req.body.description) return res.send("Description is Required");
    if (!req.body.subject_id) return res.send("Subject is Required");

    try {
      const quiz = new Quiz({
        name: req.body.name,
        duration: req.body.duration,
        description: req.body.description,
        no_of_attempts: req.body.no_of_attempts,
        questions: req.body.questions ? req.body.questions : [],
        subject_id: req.body.subject_id,
      });
      await quiz.save();
      return res.send({
        status: true,
        message: "Quiz Added Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went Wrong!! Try Again..");
    }
  };

  static add_question = async (req, res) => {
    try {
      // return console.log(req.body);
      const postResponse = await Quiz.findOneAndUpdate(
        { _id: req.body.id },
        {
          $push: {
            questions: {
              question: req.body.question,
              option_a: req.body.option_a,
              option_b: req.body.option_b,
              option_c: req.body.option_c,
              option_d: req.body.option_d,
              right_answer: req.body.right_answer,
            },
          },
        }
      );

      // console.log(postResponse);
      return res.send({
        status: true,
        message: "Quiz Questions added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static import_excel = async (req, res) => {
    req.setTimeout(0);
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an excel file");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        const file = reader.readFile(path.join(root, "tmp/questions.xlsx"));

        const sheets = file.SheetNames;

        for (let i = 0; i < sheets.length; i++) {
          const questions = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]]
          );
          try {
            const postResponse = await Quiz.findOneAndUpdate(
              { _id: req.body.id },
              { $addToSet: { questions: questions } }
            );

            console.log(postResponse);
            return res.send({
              status: true,
              message: "Questions added successfully",
            });
          } catch (error) {
            console.log("error");
          }
        }
      });
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      const content = await Content.findOne({
        _id: req.body.editid,
      });

      await Content.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          title: req.body.edit_title,
          description: req.body.edit_description,
        }
      );
      return res.send({
        error: false,
        message: "Content updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete_question = async (req, res) => {
    try {
      const questions = await Quiz.findOne({ _id: req.body.id });
      await Quiz.deleteOne({
        _id: questions.id,
      });
      return res.send({
        error: false,
        message: "questions deleted successfully",
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
    cb(null, `questions.xlsx`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000
  // },
  fileFilter: excelFilter,
}).single("excel");

module.exports = QuizController;
