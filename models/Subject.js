const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  year: {
    type: String,
  },
  semester: {
    type: String,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  description: {
    type: String,
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

module.exports = mongoose.model("Subject", schema);
