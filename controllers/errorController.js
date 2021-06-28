const AppError = require("../utils/Error");

const sendDevelopmentError = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error,
  });
};

const sendErrorForProduction = (err, res) => {
  // Operational, trusted err: send to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or other unknown errL don't leak err details
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
    err,
  });
};

const validationDBError = (err) => {
  const errorsMessages = Object.values(err.errors)
    .map((errObj) => errObj.message)
    .join(". ");
  return new AppError(errorsMessages, 400);
};
const validationJWTError = (err) => {
  return new AppError("Please, log in", 401);
};
const handlDuplicatedFieldsDB = (err) => {
  // keyValue, value
  const values = Object.values(err.keyValue);
  const message = `Duplicate field value: '${values}'. Please use another value`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  // console.error("ERROR:", err);
  let error = JSON.parse(JSON.stringify(err));

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.message = err.message;

  switch (error.name) {
    case "ValidationError":
      error = validationDBError(error);
      break;
    case "JsonWebTokenError":
      error = validationJWTError(error);
      break;

    default:
      break;
  }

  if (error.code === 11000) error = handlDuplicatedFieldsDB(error);

  sendErrorForProduction(error, res);
};
