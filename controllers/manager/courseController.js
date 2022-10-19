const Course = require("../../models/Course");
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
            return res.render("manager/courses", {
                course
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
                    course_name: req.body.course_name,
                    image: req.file.filename,
                    year: req.body.year,
                    semester: req.body.semester,
                    chapter: req.body.chapter,
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

            await Course.findOneAndUpdate({
                _id: req.body.editid,
            }, {
                course_name: req.body.edit_course_name,
                year: req.body.edit_year,
                semester: req.body.edit_semester,
                chapter: req.body.edit_chapter,
                language: req.body.edit_language,
                description: req.body.edit_description,
                mode: req.body.edit_mode,
            });
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

module.exports = CourseController;