const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req) => {
  try {
    const { email, name, pno, password, admin } = req.body;
    const user = await User.findOne({ email: email });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (!user) {
      const newUser = User.create({
        name,
        email,
        pno,
        admin,
        password: hash,
      });
    } else {
      res.status(400).send("User already registered");
    }
  } catch (err) {
    res.status(500).send("Something went wrong while registering the user");
  }
};

const login = async (req) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const verification = await bcrypt.compare(password, user.password);
      if (verification) {
        res.status().send("user Logged In");
      } else {
        res.status.send("Incorrect Password");
      }
    } else {
      res.status().send("Email is not registered");
    }
  } catch (err) {
    res.status.send("Something went wrong while logging in user");
  }
};

module.exports = { register, login };
