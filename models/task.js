const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  start: Date,
  end: Date,
});

const TaskSchema = new mongoose.Schema({
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
  duration: {
    type: Number,
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
  time: [timeSchema],
});

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;