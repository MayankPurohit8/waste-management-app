const mongoose = require("mongoose");

const wasteSchema = mongoose.Schema({
  address: { type: String, required: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "in progress", "completed"],
  },
  level: { type: Number, default: 1 },
  img_url: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WasteReport", wasteSchema);
