const app = require("./app");

const server = {
  port: process.env.PORT,
  host: process.env.HOST,
};

app.listen(server.port, server.host, () => {
  console.log(`Server staring at port ${server.port}`);
});
