const { MongoClient } = require("mongodb");
const clientDB = new MongoClient(
  "mongodb+srv://Admin:<password>@timesupcluster.8zoev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

const connectDB = async () => {
  try {
    await clientDB.connect();
    console.log("Соединение установлено");
    const users = clientDB.db().collection("users");
    const user = await users.findOne({ name: "First" });
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

connectDB();

module.exports = connectDB;
