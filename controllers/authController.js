var jwt = require("jsonwebtoken");
const { promisify } = require("util");
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
    data: {
      token,
      user: {
        name: newUser.name,
      },
    },
  });
};

// Check logged user or not
const checkIsLogin = async (req, res, next) => {
  let token = null;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Times")) {
    token = authorization.slice(6);
  }

  if (!token) {
    return next(new AppError("Please, log in.", 401));
  }

  const verifyPromise = promisify(jwt.verify);
  const decodedData = await verifyPromise(token, process.env.JWT_SECRET);

  const currentUser = await UserModel.findById(decodedData.id);
  const isPasswordChanged = currentUser.checkPasswordDate(decodedData.iat);

  if (isPasswordChanged) {
    return next(
      new AppError("Password recently was change. Please log in again", 401)
    );
  }

  req.user = currentUser;
  next();
};

// Log in
const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please, provide your email and password", 401));
  }
  // Сравнить email и выдать токен
  const currentUser = await UserModel.findOne({ email }).select('+password');
  const isValid = await currentUser.comparePasswords(password, currentUser.password);

  if (!isValid) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(currentUser._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};

exports.signUp = asyncCatchHandler(signUp);
exports.checkIsLogin = asyncCatchHandler(checkIsLogin);
exports.logIn = asyncCatchHandler(logIn);
