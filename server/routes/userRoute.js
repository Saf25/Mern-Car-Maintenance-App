const express = require("express");
const {
  register,
  login,
  loadUserInfo,
} = require("../controllers/userController");
const middelware = require("../middelware/authMiddelware");
const validation = require("../middelware/expressValidation");
const Person = require("../models/userModel");
const router = express.Router();

// Delete all Person Data
router.get("/deleteAll", async (req, res) => {
  await Person.deleteMany({});
  res.json("Formated Collection");
});
//ADD A NEW USER TO THE DATABASE
//(validation here is the middelware API created via API express.validator)
router.post("/register", validation, register);

// Login added User
router.post("/login", login);

//Return all Users
router.get("/getpeople", (req, res) => {
  Person.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

//Route of getting the infos of the user based on token
// middelware is essential in the process(middelware called by loaduser then route)

router.get("/loaduser", middelware, loadUserInfo);

module.exports = router;
