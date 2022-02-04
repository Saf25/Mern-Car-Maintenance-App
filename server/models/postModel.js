const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  Car_Manufacturer: {
    type: String,
    required: true,
  },
  Model: { type: String, required: true },
  Engine_capacity: { type: String, required: true },
  Horse_Power: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "person" },
  createdAt: { type: Date, default: new Date() },
});
module.exports = new mongoose.model("post", postSchema);
