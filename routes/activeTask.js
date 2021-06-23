const express = require("express");
const router = express.Router();
const {
  getActiveTask,
  updateActiveTask,
} = require("../controllers/activeTask");

router.route("/:id").get(getActiveTask).patch(updateActiveTask);

module.exports = router;