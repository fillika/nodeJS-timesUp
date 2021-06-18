const userID = "60c8be578a7a1e9f8c8edecb";
const TaskModel = require("../models/task");

async function getAllTasks(req, res) {
  try {
    const result = await TaskModel.find({ userID: userID });

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
  // TODO Проверка на совпадение по имени
  try {
    const isExist = await TaskModel.exists({ name: req.body.name });

    if (isExist) {
      const query = await TaskModel.findOne({ name: req.body.name });
      const timeArr = [...query.get("time"), req.body.time[0]];
      const result = await TaskModel.findOneAndUpdate(
        { name: req.body.name },
        { time: timeArr },
        { new: true } // Опция для того, чтобы прислать новый, уже изменененный таск
      );

      res.status(200).json({
        status: "success",
        message: "Task was updated",
        data: {
          task: result,
        },
      });
    } else {
      const result = await TaskModel.create(req.body);

      res.status(200).json({
        status: "success",
        message: "Task was created",
        data: {
          task: result,
        },
      });
    }
  } catch (error) {
    res.status(200).json({
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

async function deleteTask(req, res) {
  const { id } = req.params;

  await TaskModel.remove();

  res.status(204).json({
    status: "success",
    message: "Task was deleted",
    id,
    data: {
      task: null,
    },
  });
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
