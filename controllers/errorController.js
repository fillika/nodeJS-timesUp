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
  // 1) Log err
  // console.error('ERROR:', err);
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

module.exports = (err, req, res, next) => {
  let error = JSON.parse(JSON.stringify(err));

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  switch (error.name) {
    case "ValidationError":
      error = validationDBError(error);
      break;

    default:
      break;
  }

  // sendDevelopmentError(error, res);
  sendErrorForProduction(error, res);
};
