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