const asyncCatchHandler = require("../utils/asyncCatchHandler");
const { UserModel } = require("../models/userModel");
const AppError = require("../utils/Error");

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

  res.status(201).json({
    status: "success",
    // token,
    data: {
      user: newUser,
    },
  });
};

exports.signUp = asyncCatchHandler(signUp);
