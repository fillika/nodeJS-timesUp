const { ActiveTask } = require("../models/activeTask");
const asyncCatchHandler = require("../utils/asyncCatchHandler");

const getActiveTask = async (req, res, next) => {
  const { id } = req.user;

  const result = await ActiveTask.findOne({ userID: id });

  res.status(200).json({
    status: "success",
    data: {
      activeTask: result,
    },
  });
};

const updateActiveTask = async (req, res, next) => {
  const { id } = req.user;
  const newBody = JSON.parse(JSON.stringify(req.body))
  newBody.userID = id;

  const result = await ActiveTask.findOneAndUpdate({ userID: id }, newBody, {
    new: true,
  });

  if (result === null) {
    const createdTask = await createNewActiveTask(newBody);

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
};

exports.getActiveTask = asyncCatchHandler(getActiveTask);
exports.updateActiveTask = asyncCatchHandler(updateActiveTask);

async function createNewActiveTask(data) {
  const result = await ActiveTask.create(data);
  return result;
}
