const { body } = require("express-validator");

exports.registerValidator = [
  body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must have minimum 6 characters long"),
];

exports.loginValidator = [
  body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Invalid Password"),
];
