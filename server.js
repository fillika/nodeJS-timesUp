const app = require("./app");

const server = {
  port: 22222,
  host: "127.0.0.1",
};

app.listen(server.port, server.host, () => {
  console.log(`Server staring at port ${server.port}`);
});
