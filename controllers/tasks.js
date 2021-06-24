const userID = "60c8be578a7a1e9f8c8edecb";
const { TaskModel } = require("../models/task");
const taskManager = require("../utils/Task");
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
  // Проверить at и start.
  const { at, start } = req.body;
  const nextDay = new Date(at).getDate();
  const currentDay = new Date(start).getDate();

  if (currentDay !== nextDay) {
    // Если это разные дни, тогда мы разбиваем таск и создаем 2 задачи
    const taskArray = taskManager.createTaskFromNextDay(req.body);
    const task = await TaskModel.create(taskArray);

    const result = await TaskModel.find({ userID: userID })
      .sort({ at: "desc" })
      .limit(80);

    try {
      res.status(200).json({
        status: "success",
        action: "CREATE",
        message: "All tasks have been created",
        data: {
          task,
          result,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
        error: error,
      });
    }
  } else {
    try {
      const task = await TaskModel.create(req.body);

      // Todo принимать переменную, по которой нужно получить определенное кол-во тасков.
      // Todo например это может быть множитель (1 * 60 или 3 * 60)
      const result = await TaskModel.find({ userID: userID })
        .sort({ at: "desc" })
        .limit(80);

      res.status(200).json({
        status: "success",
        action: "CREATE",
        message: "Task has been created",
        data: {
          task,
          tasks: result,
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
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    await TaskModel.findByIdAndUpdate(id, req.body);

    // Todo принимать переменную, по которой нужно получить определенное кол-во тасков.
    // Todo например это может быть множитель (1 * 60 или 3 * 60)
    const result = await TaskModel.find({ userID: userID })
      .sort({ at: "desc" })
      .limit(80);

    res.status(200).json({
      status: "success",
      message: "Task was updated",
      data: {
        tasks: result,
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

async function updateManyTasks(req, res) {
  const { name, date, set } = req.body;

  if (name && date && set) {
    try {
      const dateStart = new Date(date.slice(0, 10));
      const nextDay = new Date(dateStart).getTime() + 86400000;
      const dateEnd = new Date(nextDay);

      const query = {
        name: name,
        at: {
          $gte: dateStart,
          $lte: dateEnd,
        },
      };

      const updateResult = await TaskModel.updateMany(query, set);
      // Todo принимать переменную, по которой нужно получить определенное кол-во тасков.
      // Todo например это может быть множитель (1 * 60 или 3 * 60)
      const result = await TaskModel.find({ userID: userID })
        .sort({ at: "desc" })
        .limit(80);

      console.log(updateResult);

      if (updateResult.n > 0) {
        res.status(200).json({
          status: "success",
          message: "Task was deleted",
          data: {
            tasks: result,
          },
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "Something went wrong",
        });
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
      message: "You have to send NAME and DATE and SET in Body.JSON",
    });
  }
}

async function deleteTaskByID(req, res) {
  const { id } = req.params;

  if (id) {
    try {
      await TaskModel.findByIdAndDelete(id);

      // Todo принимать переменную, по которой нужно получить определенное кол-во тасков.
      // Todo например это может быть множитель (1 * 60 или 3 * 60)
      const result = await TaskModel.find({ userID: userID })
        .sort({ at: "desc" })
        .limit(80);

      res.status(200).json({
        status: "success",
        message: "Task was deleted",
        data: {
          tasks: result,
        },
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
  const { name, date } = req.body;
  // Todo проверка на DATE
  const dateStart = new Date(date.slice(0, 10));
  const nextDay = new Date(dateStart).getTime() + 86400000;
  const dateEnd = new Date(nextDay);

  if (name && date) {
    try {
      const query = {
        name: name,
        at: {
          $gte: dateStart,
          $lte: dateEnd,
        },
      };
      const result = await TaskModel.deleteMany(query);

      if (result.deletedCount) {
        res.status(204).json({
          status: "success",
          message: "All task was deleted",
        });
      } else {
        const err = new Error("Task does not exist");
        err.deletedCount = result.deletedCount;
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
  deleteManyTaskByName,
  updateManyTasks,
};
