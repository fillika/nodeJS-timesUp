const express = require("express");
const router = express.Router();
const {
  getActiveTask,
  updateActiveTask,
} = require("../controllers/activeTask");
const { checkIsLogin } = require("../controllers/authController");

router.use(checkIsLogin)
router.route("/").patch(updateActiveTask).get(getActiveTask)


module.exports = router;