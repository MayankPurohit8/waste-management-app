const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const app = express();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dotenv.config();
connectDB();

app.get("/", function (req, res) {
  res.send("Waste Management App");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/waste", wasteRoutes);
app.listen(process.env.PORT);
