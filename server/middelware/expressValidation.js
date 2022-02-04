const { body } = require("express-validator");

const validation = [
  body("password").isLength(10).isAlphanumeric(),
  body("email").isEmail(),
];
module.exports = validation;
