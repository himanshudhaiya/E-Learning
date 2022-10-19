const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  course_type: {
    type: String,
  },
  course_name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  semester: {
    type: String,
  },
  language: {
    type: String,
  },
  description: {
    type: String,
  },
  mode: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0
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

module.exports = mongoose.model("Course", schema);
