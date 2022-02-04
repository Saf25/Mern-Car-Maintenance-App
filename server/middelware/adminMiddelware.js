//this Middelware is specific to indicate the roles
//mahchtich houni bel tokn
//hachti houni bel userModel

const Person = require("../models/userModel");

const adminMiddelware = async (req, res, next) => {
  try {
    //l user fih les infos ta3 admin wala user wala ay wehed
    //t3ada bel middelware hedha
    const user = await Person.findById(req.userId);
    if (user.role === "admin") next();
    else res.status(401).json({ msg: "you are not authorized" });
  } catch (error) {
    res.status(400).json({ msg: `invalid Token ${error}` });
  }
};

module.exports = adminMiddelware;
