const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const serverSettings = {
  port: 22222,
  host: "127.0.0.1",
};

const page404 = fs.readFileSync(path.join(__dirname, "/public/404.html"), 'utf8');

app.use(express.static("public"));

app.use("*", (req, res) => {
  res.status(404).send(page404);
});

app.listen(serverSettings.port, serverSettings.host, () => {
  console.log(`Server staring at port ${serverSettings.port}`);
});
