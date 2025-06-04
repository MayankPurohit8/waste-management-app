const generateToken = require("../utils/generateToken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, pno, password, admin } = req.body;
    const user = await User.findOne({ email: email });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (!user) {
      const newUser = await User.create({
        name,
        email,
        pno,
        admin,
        password: hash,
      });
      res.status(200).json({ message: "user registered sucessfully" });
    } else {
      res.status(400).send("User already registered");
    }
  } catch (err) {
    res.status(500).json({
      message: `Something went wrong while registering the user ${err}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const verification = await bcrypt.compare(password, user.password);
      if (verification) {
        const token = generateToken(user._id);

        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
          })
          .status(200)
          .json({ message: "Logged in successfully" });
      } else {
        res.status(404).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ message: "Email is not registered" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: `Something went wrong while logging in user ${err}` });
  }
};

module.exports = { register, login };
