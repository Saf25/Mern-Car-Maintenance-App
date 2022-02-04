const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    sparse: true,
  },
  description: { type: String, required: true },

  location: { type: String, default: "Tunis" },

  // reservation date is the date the user reserves for
  reservation_date: {
    type: Date,
    required: true,
  },
  //reservation time is the time the user ll take 15-30-45 min
  reservation_time: {
    type: String,
    required: true,
  },
  Owner: { type: mongoose.Schema.Types.ObjectId, ref: "person" },
});

module.exports = mongoose.model("Entries", EntrySchema);
