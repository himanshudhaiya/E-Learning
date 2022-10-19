const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  order_id: {
    type: String,
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    default: null,
  },
  duration: {
    type: String,
    default: null,
  },
  amount: {
    type: Number,
    require: true,
  },
  currency: {
    type: String,
    require: true,
    default: "INR",
  },
  receipt_id: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: "created",
  },
  created_at: {
    type: String,
    default: Date.now,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", schema);
