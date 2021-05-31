const express = require("express");
const fs = require("fs");
const path = require("path");
const { tasks } = require("./mock-data/tasks");
const cors = require("cors");
const app = express();

const serverSettings = {
  port: 22222,
  host: "127.0.0.1",
};

const page404 = fs.readFileSync(
  path.join(__dirname, "/public/404.html"),
  "utf8"
);

var corsOptions = {
  origin: 'http://127.0.0.1:5500',
}

app.use(cors());
app.use(express.static("public"));

app.post("/api/tasks/", cors(corsOptions), function (req, res) {
  res.json(tasks);
});

app.use("*", (req, res) => {
  res.status(404).send(page404);
});

app.listen(serverSettings.port, serverSettings.host, () => {
  console.log(`Server staring at port ${serverSettings.port}`);
});
