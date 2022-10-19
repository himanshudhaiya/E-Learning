const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  branch_name: {
    type: String,
    require: true,
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

module.exports = mongoose.model("Branch", schema);
