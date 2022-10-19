const User = require("../../models/User");
const Order = require("../../models/Order");
const Razorpay = require("razorpay");
var invNum = require("invoice-number");
const Receipt = require("../../models/Receipt");
const Appointment = require("../../models/Appointment");
const jwt = require("jsonwebtoken");
const Course = require("../../models/Course");

class PaymentController {
  static order_with_rozorpay = async (req, res) => {
    try {
      const data = req.body;
      // let course_id = data.course_id;
      let subscription_id = data.subscription_id;
      // console.log(data);
      var token = req.body.token;
      if (!token) {
        return res.status(400).send({
          status: 400,
          key: "token",
          message: "token is required",
        });
      }
      if (!data.amount) {
        return res.status(400).send({
          status: 400,
          key: "amount",
          message: "amount is required",
        });
      }

      if (!data.duration) {
        return res.status(400).send({
          status: 400,
          key: "duration",
          message: "duration is required",
        });
      }
      const payload = jwt.decode(token, process.env.TOKEN_SECRET);
      const user = await User.findById(payload._id);
      if (!user) return res.status(401).send("User not found");

      req.login_user = user;
      const order_data = await instance.orders.create({
        amount: data.amount,
        currency: "INR",
      });

      // if (course_id) {
      //   const cours = await Course.findOne({
      //     _id: course_id,
      //   })

      const order = Order({
        user_id: req.login_user ? req.login_user._id : "",
        order_id: order_data.id,
        amount: order_data.amount,
        subscription_id: subscription_id,
        // course_id: cours,
        duration: data.duration,
        currency: order_data.currency,
        receipt_id: "12345",
        status: order_data.status,
      });
      var savedorder = await order.save();

      return res.send({
        order_id: order_data.id,
      });

      // return console.log(cours.mode)
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static order_with_rozorpayApi = async (req, res) => {
    try {
      const data = req.body;
      if (!data.amount) {
        return res.status(400).send({
          status: 400,
          key: "amount",
          message: "amount is required",
        });
      }
      // if (!data.subscription_id) {
      //   return res.status(400).send({
      //     status: 400,
      //     key: "subscription_id",
      //     message: "subscription_id is required",
      //   });
      // }
      if (!data.duration) {
        return res.status(400).send({
          status: 400,
          key: "duration",
          message: "duration is required",
        });
      }

      const user = await User.findOne({
        _id: data.user_id,
      });

      const order_data = await instance.orders.create({
        amount: data.amount,
        currency: "INR",
      });

      const order = Order({
        user_id: req.login_user ? req.login_user._id : "",
        order_id: order_data.id,
        amount: order_data.amount,
        subscription_id: data.subscription_id,
        // course_id: data.course_id,
        duration: data.duration,
        currency: order_data.currency,
        receipt_id: "12345",
        status: order_data.status,
      });
      var savedorder = await order.save();

      return res.send({
        order_id: order_data.id,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static checkout_with_rozorpay = async (req, res) => {
    try {
      const data = req.body;
      if (!data.order_id) {
        return res.status(400).send({
          status: 400,
          key: "order_id",
          message: "order_id is required",
        });
      }
      if (!data.payment_data) {
        return res.status(400).send({
          status: 400,
          key: "payment_data",
          message: "payment_data is required",
        });
      }

      const payment = await instance.orders.fetch(data.order_id);

      console.log(payment);

      if (payment.amount_due == 0) {
        return res.status(400).send({
          status: 400,
          message: "No Payment due",
        });
      } else {
        const order = await Order.findOneAndUpdate(
          {
            order_id: data.order_id,
          },
          {
            payment_data: data.payment_data,
          }
        );

        await Appointment.findOneAndUpdate(
          {
            order,
          },
          {
            status: 1,
          }
        );
      }

      return res.status(200).send({
        status: 200,
        message: "Success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: "Something went wrong please try again later",
      });
    }
  };
}

var instance = new Razorpay({
  key_id: "rzp_test_rFXwtHIILu1CTU",
  key_secret: "OagCUpxf4bDzhU7igpiUOxK2",
});

module.exports = PaymentController;
