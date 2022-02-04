const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  userName: {
    type: String,
    required: [true, "you have to add a name"],
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "this email has been already used"],
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: { type: String, enum: ["user", "admin"] }, 
  createdAt: { type: Date, default: new Date() },
});
module.exports = new mongoose.model("person", userSchema);
