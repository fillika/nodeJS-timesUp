require("dotenv").config({ path: `${__dirname}/config.env` });

const express = require("express");
const path = require('path');
const cors = require("cors");
const app = express();
const connectionDB = require("./dbConnection");
const taskRouter = require("./routes/tasks");
const activeTaskRouter = require("./routes/activeTask");
const authRouter = require("./routes/authRouter");
const AppError = require("./utils/Error");
const globalErrorHandler = require("./controllers/errorController.js");

connectionDB();

var allowList = ["http://127.0.0.1:5500", "http://localhost:3000/", "http://localhost:5500/"];

var corsOptions = {
  // origin: "http://127.0.0.1:5500",
  origin: allowList,
  // methods: "POST",
  // allowedHeaders: "application/json",
};


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/tasks", cors(corsOptions), taskRouter);
app.use("/api/v1/activeTask", cors(corsOptions), activeTaskRouter);
app.use("/api/v1", cors(corsOptions), authRouter);

app.get('*', cors(corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
