const userID = "60c8be578a7a1e9f8c8edecb";
const TaskModel = require("../models/task");
const _ = require("lodash");

async function getAllTasks(req, res) {
  const result = await TaskModel.find({ userID: userID })
    .sort({ at: "desc" })
    .limit(80);

  try {
    res.status(200).json({
      status: "success",
      message: "Get all tasks",
      data: {
        tasks: result,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
      error: error,
      data: {
        tasks: null,
      },
    });
  }
}

async function createTask(req, res) {
  try {
    const result = await TaskModel.create(req.body);

    res.status(200).json({
      status: "success",
      action: "CREATE",
      message: "Task was created",
      data: {
        task: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
      error: error,
    });
  }
}

async function updateTask(req, res) {
  const { id } = req.params;

  res.status(200).json({
    status: "success",
    message: "Task was updated",
    id,
    data: {
      task: "Updated task",
    },
  });
}

async function deleteTaskByID(req, res) {
  const { id } = req.params;

  if (id) {
    try {
      const result = await TaskModel.findByIdAndDelete(id);

      res.status(204).json({
        status: "success",
        message: "Task was deleted",
        result,
        id,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
        error,
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "You have to send :ID param",
    });
  }
}

async function deleteManyTaskByName(req, res) {
  const { name } = req.body;

  if (name) {
    try {
      // TODO нужно настроить удаление тасков за определенную дату
      const result = await TaskModel.deleteMany({ name: name });

      if (result.deletedCount) {
        res.status(204).json({
          status: "success",
          message: "All task was deleted",
        });
      } else {
        const err = new Error('Task does not exist');
        err.deletedCount = result.deletedCount
        throw err;
      }
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
        error,
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "You have to send NAME in Body.JSON",
    });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTaskByID,
  deleteManyTaskByName
};
