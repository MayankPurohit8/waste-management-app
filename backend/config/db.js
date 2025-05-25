const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connection successfull at ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection failed ${err.message}`);
  }
};

module.exports = connectDB;
