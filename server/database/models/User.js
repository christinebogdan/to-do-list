const mongoose = require("mongoose");
const Todo = require("./Todo");

// Describe how the data will look

const userSchema = new mongoose.Schema({
  sub: String,
  name: String,
  toDos: [Todo],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
