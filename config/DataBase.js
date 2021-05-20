const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  console.log("mongodb conected");
};

module.exports = connectdb;
