const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  job_name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  location: {
    type: String,
  },
  designation: {
    type: String,
  },
  salary: {
    type: String,
  },
  experience_level: {
    type: String,
  },
  last_dateofapply: {
    type: String,
  },
  about_company: {
    type: String,
  },
  job_description: {
    type: String,
    require: true,
  },
  apply_link: {
    type: String,
  },
  mode: {
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

module.exports = mongoose.model("Job", schema);
