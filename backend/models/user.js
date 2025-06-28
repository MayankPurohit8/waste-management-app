const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pno: { type: Number, required: true },
  admin: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "WasteReport" }],
});

module.exports = mongoose.model("User", userSchema);
