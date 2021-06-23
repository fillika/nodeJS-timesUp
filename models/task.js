const mongoose = require("mongoose");

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
});

const ActiveTaskModel = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const TaskModel = mongoose.model("task", TaskSchema);
// const ActiveTask = mongoose.model("activeTask", ActiveTaskModel);

module.exports = { TaskModel };
