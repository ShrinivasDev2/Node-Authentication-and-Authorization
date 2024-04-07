const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

console.log("Connected to Database!");

module.exports = mongoose;
