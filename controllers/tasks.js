async function getAllTasks(req, res) {
  res.status(200).json({
    status: "success",
    message: "Get all tasks",
    data: {
      count: "Some number here...",
      tasks: "[Some tasks here...]",
    },
  });
}

async function createTask(req, res) {
  res.status(200).json({
    status: "success",
    message: "Task was created",
    data: {
      task: "Created task",
    },
  });
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
