const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const SECRET_KEY = process.env.SECRET_KEY;

class UserController {
  static async register(req, res) {
    //Input Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Check if user already exists
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User Already Exists" });
      }

      //Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create User
      const user = await User.createUser(email, hashedPassword);

      //Respond with Success
      res.status(201).json({ message: "User Registered Successfully", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async login(req, res) {
    //Input Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Fetch the user from the database
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      //Check if the password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      //Generate JWT
      const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "15m",
      });

      //Generate refresh token (Can also store this in the database)
      const refreshToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "7d",
      });

      //Respond with tokens
      res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}

module.exports = UserController;
