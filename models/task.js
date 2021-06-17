const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  start: Date,
  end: Date,
});

const TaskSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  time: [timeSchema],
});

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
