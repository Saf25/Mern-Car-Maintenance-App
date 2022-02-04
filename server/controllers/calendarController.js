const Entry = require("../models/calendarModel");
const Person = require("../models/userModel");

exports.list_all_entries = function (req, res) {
  Entry.find({}, function (err, entries) {
    if (err) res.send(err);
    return res.json(entries);
  });
};

exports.create_an_entry = async function (req, res) {
  try {
    const userId = req.userId;
    function toUTC(d) {
      return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 6000);
    }
    let reservation_date = toUTC(new Date(req.body.reservation_date));

    const { title, description, reservation_time } = req.body;
    const entries = await Entry.find();
    //check Owner----------
    const owner = await entries.find((o) => String(o.Owner) === userId);
    //check date exist-----
    const cd = await entries.find((d) => d.reservation_date);
    const checkdate = await entries.find(
      (d) => d.reservation_date === reservation_date
    );
    //check Time exist-------
    const ct = await entries.find((t) => t.reservation_time);
    const checktime = await entries.find(
      (t) => t.reservation_time === reservation_time
    );
    const check = await entries.find(() => {
      if (owner) {
        return res.status(401).json({
          msg: `you have already booked on ${cd.reservation_date.toDateString()} at ${
            ct.reservation_time
          }`,
        });
      }

      if (checktime && checkdate) {
        return res.status(401).json({
          msg: "this Time on this date is already booked,please choose another Time",
        });
      }
    });

    if (check) return check;
    const new_entry = await Entry.create({
      title,
      description,
      reservation_date,
      reservation_time,
      Owner: userId,
    });
    res.json(new_entry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};

exports.read_an_entry = function (req, res) {
  Entry.findById(req.params.entryId, function (err, entry) {
    if (err) res.send(err);
    res.json(entry);
  });
};

exports.update_an_entry = function (req, res) {
  Entry.findOneAndUpdate(
    { _id: req.params.entryId },
    req.body,
    { new: true },
    function (err, entry) {
      if (err) res.send(err);
      res.json(entry);
    }
  );
};

exports.delete_an_entry = function (req, res) {
  Entry.remove({ _id: req.params.entryId }, function (err, entry) {
    if (err) res.send(err);
    res.json({ message: "Calendar entry successfully deleted" });
  });
};
