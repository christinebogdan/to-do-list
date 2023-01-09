const mongoose = require("mongoose");

// Connect to database
module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todos");
    console.log("Successfully connected");
  } catch (e) {
    console.log("Database not connected:", e);
    throw new Error(e);
  }
};
