const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile_number: {
    type: String,
    max: 10,
  },
  college_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },
  year: {
    type: String,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("User", schema);
