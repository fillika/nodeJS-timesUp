const mongoose = require("mongoose");

const activeTaskSchema = new mongoose.Schema({
  at: {
    type: Date,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  stop: {
    type: Date,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  totalTime: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  isTimeActive: {
    type: Boolean,
    required: true
  }
});

const ActiveTask = mongoose.model("activeTask", activeTaskSchema);
module.exports = { ActiveTask };
