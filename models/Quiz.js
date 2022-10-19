const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  name: {
    type: String,
    unique: true,
  },
  duration: {
    type: String,
  },
  description: {
    type: String,
  },
  no_of_attempts: {
    type: Number,
  },

  questions: [
    {
      question: {
        type: String,
      },
      option_a: {
        type: String,
      },
      option_b: {
        type: String,
      },
      option_c: {
        type: String,
      },
      option_d: {
        type: String,
      },
      right_answer: {
        type: String,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", Schema);
