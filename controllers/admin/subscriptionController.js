const Subscription = require("../../models/Subscription");
const Course = require("../../models/Course");
const Adminauth = require("../../models/Adminauth");
const Subject = require("../../models/Subject");

class SubscriptionController {
  static list = async (req, res) => {
    try {
      const subscription = await Subscription.find().populate(
        "course_id subject_id"
      );
      const admin = await Adminauth.find();
      const course_id = await Course.find();
      const subject_id = await Subject.find();
      return res.render("admin/subscription", {
        subscription,
        course_id,
        admin,
        subject_id,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      if (req.body.name == "") {
        return res.send("Name is required");
      }
      if (req.body.type == "") {
        return res.send("Type is required");
      }
      if (req.body.duration == "") {
        return res.send("Duration is required");
      }
      if (req.body.course_id == "") {
        return res.send("Course is required");
      }
      console.log(req.body);
      const subscription = Subscription({
        name: req.body.name,
        type: req.body.type,
        duration: req.body.duration,
        course_id: req.body.course_id,
        amount: req.body.amount ? req.body.amount : "",
        subject_id: req.body.subject_id,
      });

      await subscription.save();
      return res.send({
        error: false,
        message: "Subscription added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      if (req.body.name == "") {
        return res.send("Name is required");
      }
      if (req.body.type == "") {
        return res.send("Type is required");
      }
      if (req.body.duration == "") {
        return res.send("Duration is required");
      }
      if (req.body.course_id == "") {
        return res.send("Course is required");
      }
      if (req.body.amount == "") {
        return res.send("Amount is required");
      }

      const subscription = await Subscription.findOne({
        _id: req.body.editid,
      });

      await Subscription.findOneAndUpdate({
        _id: req.body.editid,
      }, {
        name: req.body.edit_name,
        type: req.body.edit_type,
        duration: req.body.edit_duration,
        course_id: req.body.edit_course_id,
        amount: req.body.edit_amount,
        subject_id: req.body.edit_subject_id,
      });
      return res.send({
        error: false,
        message: "Subscription updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const subscription = await Subscription.findOne({
        _id: req.body.id,
      });

      await Subscription.deleteOne({
        _id: subscription.id,
      });
      return res.send({
        error: false,
        message: "Subscription deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = SubscriptionController;