const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  timing_from: {
    type: String,
  },
  timing_to: {
    type: String,
  },
  amount: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mentorship", Schema);
