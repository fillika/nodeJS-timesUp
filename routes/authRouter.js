const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const { signUp, logIn } = require("../controllers/authController");

router.post("/signup", formidable(), signUp);
router.post("/login", formidable(), logIn);

module.exports = router;
