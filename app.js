const express = require("express");

const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
require("./config/db");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
