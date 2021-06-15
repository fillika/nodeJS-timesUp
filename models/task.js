const mongoose = require("mongoose");

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
  time: {
    type: [
      {
        from: Date,
        to: Date,
      },
    ],
  },
});

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
