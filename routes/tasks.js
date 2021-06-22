const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTaskByID,
  deleteManyTaskByName,
  updateManyTasks
} = require("../controllers/tasks");

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask).delete(deleteManyTaskByName).patch(updateManyTasks);
router.route("/:id").patch(updateTask).delete(deleteTaskByID);

module.exports = router;
