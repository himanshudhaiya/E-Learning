const About = require("../../models/About");
const Contact = require("../../models/Contact");
const Faq = require("../../models/Faq");
const PrivacyPolicy = require("../../models/PrivacyPolicy");
const TermsCondition = require("../../models/TermsCondition");
const Branch = require("../../models/Branch");
const College = require("../../models/College");
const Coupon = require("../../models/Coupon");
const Course = require("../../models/Course");
const Feed = require("../../models/Feed");
const Job = require("../../models/Job");
const Mentorship = require("../../models/Mentorship");
const Order = require("../../models/Order");
const Subject = require("../../models/Subject");
const Subscription = require("../../models/Subscription");
const University = require("../../models/University");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
const Content = require("../../models/Content");
const Quiz = require("../../models/Quiz");

class ApiController {
  static about = async (req, res) => {
    try {
      const data = await About.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "About Us Updated",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("About Us Updated");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static contact = async (req, res) => {
    try {
      const data = await Contact.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Contact Us Updated",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Contact Us Updated");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static faq = async (req, res) => {
    try {
      const data = await Faq.find();
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Faq Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Faq Added");

      // sending notification end
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static privacypolicy = async (req, res) => {
    try {
      const data = await PrivacyPolicy.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Privacy Policy Updated",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Privacy Policy Updated");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static termscondition = async (req, res) => {
    try {
      const data = await TermsCondition.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Terms & Conditions Updated",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Terms & Conditions Updated");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static branch = async (req, res) => {
    try {
      const data = await Branch.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Branch Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Branch Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static college = async (req, res) => {
    try {
      const data = await College.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "College Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("College Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static coupon = async (req, res) => {
    try {
      const data = await Coupon.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Coupon Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Coupon Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static course = async (req, res) => {
    try {
      const data = await Course.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Course Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Course Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static notifications = async (req, res) => {
    try {
      const data = await Notification.find({});
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static feed = async (req, res) => {
    try {
      const data = await Feed.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Feed Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Feed Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static job = async (req, res) => {
    try {
      const data = await Job.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Job Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Job Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static mentorship = async (req, res) => {
    try {
      const data = await Mentorship.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Mentorship Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Mentorship Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static orders = async (req, res) => {
    try {
      const data = await Order.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Orders Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Orders Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static subject = async (req, res) => {
    try {
      const data = await Subject.find({
        course_id: req.body.course_id,
      }).populate("course_id");
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Subject Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Subject Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static content = async (req, res) => {
    try {
      const data = await Content.find({
        subject_id: req.body.subject_id,
      }).populate("subject_id");

      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static quiz = async (req, res) => {
    try {
      const data = await Quiz.find({
        subject_id: req.body.subject_id,
      }).populate("subject_id");

      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static subscription = async (req, res) => {
    try {
      const data = await Subscription.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Subscription Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Subscription Added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static university = async (req, res) => {
    try {
      const data = await University.find({});
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "University Added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("University Added");
      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static users = async (req, res) => {
    try {
      const data = await User.find({});
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static notifications = async (req, res) => {
    try {
      const data = await Notification.find({});
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = ApiController;
