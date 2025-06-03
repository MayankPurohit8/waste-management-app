const jwt = require("jsonwebtoken");

const generateToken = (usedId) => {
  return jwt.sign({ id: usedId }, process.env.JWT_SECRET, {
    exxpiresIn: "7d",
  });
};

module.exports = { generateToken };
