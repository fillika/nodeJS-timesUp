require("dotenv").config({ path: `${__dirname}/config.env` });

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const connectionDB = require("./dbConnection");

connectionDB();

const page404 = fs.readFileSync(
  path.join(__dirname, "/public/404.html"),
  "utf8"
);

var corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: "POST",
  allowedHeaders: "application/json",
};

app.use(cors());
app.use(express.static("public"));

// Get all task
app.get("/api/v1/tasks", cors(), function (req, res) {
  res.status(200).json({
    status: "success",
    message: "Get all tasks",
    data: {
      count: "Some number here...",
      tasks: "[Some tasks here...]",
    },
  });
});

app.post("/api/v1/tasks", cors(corsOptions), function (req, res) {
  res.status(200).json({
    status: "success",
    message: "Task was created",
    data: {
      task: "Created task",
    },
  });
});

app.patch("/api/v1/tasks/:id", cors(corsOptions), function (req, res) {
  const {id} = req.params;

  res.status(200).json({
    status: "success",
    message: "Task was updated",
    id,
    data: {
      task: "Updated task",
    },
  });
});

app.delete("/api/v1/tasks/:id", cors(corsOptions), function (req, res) {
  const {id} = req.params;

  res.status(204).json({
    status: "success",
    message: "Task was deleted",
    id,
    data: {
      task: "Updated task",
    },
  });
});

app.use("*", (req, res) => {
  res.status(404).send(page404);
});

module.exports = app;
