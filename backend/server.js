const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
//connectDB();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(process.env.PORT);
