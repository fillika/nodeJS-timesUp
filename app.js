require("dotenv").config({ path: `${__dirname}/config.env` });

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const connectionDB = require("./dbConnection");
const taskRouter = require("./routes/tasks");
const activeTaskRouter = require("./routes/activeTask");
const AppError = require("./utils/Error");
const globalErrorHandler = require("./controllers/errorController.js");

connectionDB();

var corsOptions = {
  origin: "http://127.0.0.1:5500",
  // methods: "POST",
  // allowedHeaders: "application/json",
};

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/tasks", cors(corsOptions), taskRouter);
app.use("/api/v1/activeTask", cors(corsOptions), activeTaskRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
