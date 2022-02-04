const Person = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
//user Token def
const JWT_SECRET = process.env.JWT_SECRET;

//@ desc register new user & return token
//route POST /api/user/register
//@access public

const register = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    //---------------------------------express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //---------------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPerson = await Person.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newPerson._id }, JWT_SECRET);
    res.json({ msg: "User created: ", token });
  } catch (error) {
    res.status(500).json({ msg: `something went wrong ${error}` });
  }
};

//@ desc new user can login & return token
//route POST /api/user/login
//@access private

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existPerson = await Person.findOne({ email });
    if (!existPerson)
      return res.status(404).json({ msg: "you should register first" });
    const verifyPassword = await bcrypt.compare(password, existPerson.password);
    if (!verifyPassword) return res.status(401).json({ msg: "wrong password" });
    const token = jwt.sign({ id: existPerson._id, email: email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: `something went wrong${error}` });
  }
};

////@ desc takes token & user info
//route GET/api/user/loaduser
//@access private-user
//loaduser y3awen fel front bech au cas ou wfe date token et n est plus valide
const loadUserInfo = async (req, res) => {
  try {
    //.select nous permettra de faire disparaitre l affichage du mdp fel back
    // w front 5ater menhouni bech tetb3ath lel front hia elli tetb3ath
    const person = await Person.findById(req.userId).select("-password -__v");
    res.json(person);
  } catch (error) {
    res.status(500).json({ msg: `something went wrong ${error}` });
  }
};

module.exports = { register, login, loadUserInfo };
