const mongoose = require("mongoose");
PORT = process.env.PORT;
MONGO_URI = process.env.MONGO_URI;
//dotenv config
require("dotenv").config();

//main app

const connectDB = () => {
  mongoose.connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => (err ? console.log(err) : console.log("Database connected"))
  );
};

module.exports = connectDB;
