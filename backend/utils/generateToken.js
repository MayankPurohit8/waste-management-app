const jwt = require("jsonwebtoken");

const generateToken = (usedId) => {
  return jwt.sign({ id: usedId }, process.env.JWT_SECRET);
};

module.exports = generateToken;
