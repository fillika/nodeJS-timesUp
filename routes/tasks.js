const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTaskByID,
  deleteManyTaskByName,
} = require("../controllers/tasks");

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask).delete(deleteManyTaskByName);
router.route("/:id").patch(updateTask).delete(deleteTaskByID);

module.exports = router;
