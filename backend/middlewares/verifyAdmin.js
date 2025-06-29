const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (user.admin == true) {
      next();
    } else {
      res.status(500).json({ message: "no access" });
    }
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = verifyAdmin;
