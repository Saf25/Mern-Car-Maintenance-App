const express = require("express");
const middelware = require("../middelware/authMiddelware");
module.exports = function (app) {
  var calendar = require("../controllers/calendarController");

  // calendar Routes
  app.route("/entries").get(middelware, calendar.list_all_entries);
  app.route("/entries/newentry").post(middelware, calendar.create_an_entry);

  app
    .route("/entries/:entryId")
    .get(calendar.read_an_entry)
    .put(calendar.update_an_entry)
    .delete(calendar.delete_an_entry);
};
