const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/userController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");

Router.post("/register", registerValidator, UserController.register);
Router.post("/login", loginValidator, UserController.login);

module.exports = Router;
