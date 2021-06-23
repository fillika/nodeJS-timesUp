const { ActiveTask } = require("../models/activeTask");

async function getActiveTask(req, res) {
  const { id } = req.params;

  try {
    const result = await ActiveTask.findOne({ userID: id });

    res.status(200).json({
      status: "success",
      data: {
        activeTask: result,
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

async function updateActiveTask(req, res) {
  const { id } = req.params;

  try {
    const result = await ActiveTask.findOneAndUpdate({ userID: id }, req.body, {
      new: true,
    });

    if (result === null) {
      const createdTask = await createNewActiveTask(req.body);
      
      res.status(200).json({
        status: "success",
        message: "Task has been created",
        data: {
          activeTask: createdTask,
        },
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Task has been updated",
      data: {
        activeTask: result,
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

async function createNewActiveTask(data) {
  const result = await ActiveTask.create(data);
  return result;
}

module.exports = {
  getActiveTask,
  updateActiveTask,
};
