const University = require("../../models/University");
const Course = require("../../models/Course");
const College = require("../../models/College");
const Branch = require("../../models/Branch");
const Subject = require("../../models/Subject");
const multer = require("multer");
const path = require("path");
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");

class SubjectController {
    static add = async (req, res) => {
        try {
            const subject = await Subject.find().populate(
                "course_id university_id college_id branch_id"
            );
            const college_id = await College.find().populate(
                "course_id university_id"
            );
            const university_id = await University.find().populate("course_id");
            const course_id = await Course.find();

            const branch_id = await Branch.find();
            return res.render("admin/add-subject", {
                course_id,
                university_id,
                college_id,
                branch_id,
                subject,
            });
        } catch (error) {
            console.log(error);
            return res.send("Something went wrong please try again later");
        }
    };

    static list = async (req, res) => {
        try {
            const subject = await Subject.find({}).populate(
                "course_id university_id college_id branch_id"
            );
            const college_id = await College.find().populate(
                "course_id university_id"
            );
            const university_id = await University.find().populate("course_id");
            const course_id = await Course.find();
            const branch_id = await Branch.find();
            return res.render("manager/subject", {
                college_id,
                course_id,
                university_id,
                branch_id,
                subject,
                subjects: subject.length,
            });
        } catch (error) {
            console.log(error);
            return res.send("Something went wrong please try again later");
        }
    };

    static add_subject = async (req, res) => {
        try {
            upload(req, res, async function (err) {
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
                    image: req.file.filename,
                    course_id: req.body.course_id,
                    university_id: req.body.university_id,
                    college_id: req.body.college_id,
                    branch_id: req.body.branch_id,
                    year: req.body.year,
                    semester: req.body.semester,
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
    static edit = async (req, res) => {
        try {
            // return console.log(req.body.editid)
            const subject = await Subject.findOne({
                _id: req.body.editid,
            });
            await Subject.findOneAndUpdate({
                _id: req.body.editid,
            }, {
                title: req.body.edit_title,
                course_id: req.body.edit_course_id,
                university_id: req.body.edit_university_id,
                college_id: req.body.edit_college_id,
                branch_id: req.body.edit_branch_id,
                year: req.body.edit_year,
                semester: req.body.edit_semester,
                description: req.body.edit_description,
            });
            return res.send({
                error: false,
                message: "Subject updated successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Somthing went wrong please try again later");
        }
    };
    static delete = async (req, res) => {
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
    destination: path.join(__dirname, "../../public/uploads/subject"),
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

module.exports = SubjectController;