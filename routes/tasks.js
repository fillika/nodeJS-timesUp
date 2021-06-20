const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  isExist,
  middle
} = require("../controllers/tasks");

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
