const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

app.get("/", function (req, res) {
  res.send("Waste Management App");
});

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT);
