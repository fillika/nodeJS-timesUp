const mongoose = require("mongoose");

module.exports = async function () {
  const connectionURL = process.env.DATABASE_URL.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  try {
    await mongoose.connect(connectionURL, options);
    console.log('Database connected');
  } catch (error) {
    console.error(error);
  }
};

async function createKitty() {
  const kittySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Kitty always must have a name"],
      unique: true,
    },
  });

  const Kitten = mongoose.model("kitten", kittySchema);

  try {
    await Kitten.create({ name: "Kitty" });
  } catch (error) {
    console.log("ERROR:", error);
  }
}


// createKitty();