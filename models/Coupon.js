const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: {
    type: String,
  },
  code: {
    type: String,
  },
  no_of_codes: {
    type: Number,
  },
  description: {
    type: String,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  discount_percent: {
    type: String,
  },
  max_discount_value: {
    type: String,
  },
  min_discount_value: {
    type: String,
  },
  min_cart_value: {
    type: String,
  },
  valid_till: {
    type: String,
  },
  max_use_count: {
    type: Number,
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

module.exports = mongoose.model("Coupon", schema);
