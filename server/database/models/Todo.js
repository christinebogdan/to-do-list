const mongoose = require("mongoose");

// Describes how the data will look
const todoSchema = new mongoose.Schema({
  description: String,
  completed: Boolean,
});

// We turn the schema into a model
const Todo = mongoose.model("todoitem", todoSchema);

module.exports = Todo;
