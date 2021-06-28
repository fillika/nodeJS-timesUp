var jwt = require("jsonwebtoken");
const asyncCatchHandler = require("../utils/asyncCatchHandler");
const { UserModel } = require("../models/userModel");
const AppError = require("../utils/Error");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Register
const signUp = async (req, res, next) => {
  // проверить, существует ли User по email. Если он существует, выдать ошибку
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await UserModel.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: {
        name: newUser.name,
      },
    },
  });
};

exports.signUp = asyncCatchHandler(signUp);
