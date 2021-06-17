require("dotenv").config({ path: `${__dirname}/config.env` });

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const connectionDB = require("./dbConnection");
const taskRouter = require("./routes/tasks");

connectionDB();

const page404 = fs.readFileSync(
  path.join(__dirname, "/public/404.html"),
  "utf8"
);

var corsOptions = {
  origin: "http://127.0.0.1:5500",
  // methods: "POST",
  // allowedHeaders: "application/json",
};

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/tasks", cors(corsOptions), taskRouter);

app.use("*", (req, res) => {
  res.status(404).send(page404);
});

module.exports = app;
