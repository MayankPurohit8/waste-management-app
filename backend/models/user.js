const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pno: { type: Number, required: true },
  admin: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
