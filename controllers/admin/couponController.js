const Coupon = require("../../models/Coupon");
const Course = require("../../models/Course");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");

class CouponController {
  static list = async (req, res) => {
    try {
      const coupon = await Coupon.find()
        .populate("course_id")
        .sort({ created_at: -1 });
      const course_id = await Course.find();
      const admin = await Adminauth.find();
      return res.render("admin/coupon", { coupon, course_id, admin });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add_coupon = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        const coupon = Coupon({
          image: req.file.filename,
          code: req.body.code,
          no_of_codes: req.body.no_of_codes,
          description: req.body.description,
          course_id: req.body.course_id,
          discount_percent: req.body.discount_percent,
          max_discount_value: req.body.max_discount_value,
          min_discount_value: req.body.min_discount_value,
          min_cart_value: req.body.min_cart_value,
          valid_till: req.body.valid_till,
          max_use_count: req.body.max_use_count,
        });

        await coupon.save();
        return res.send({
          error: false,
          message: "Coupon added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const coupon = await Coupon.findOne({
        _id: req.body.id,
      });
      fs.unlinkSync(root + "/public/uploads/coupon/" + coupon.image);
      await Coupon.deleteOne({
        _id: coupon.id,
      });
      return res.send({
        error: false,
        message: "Coupon deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}
module.exports = CouponController;

const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/coupon"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000,
  // },
  fileFilter: imageFilter,
}).single("image");
