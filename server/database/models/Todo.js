const mongoose = require("mongoose");

// Connect to database
const connection = mongoose.createConnection(
  "mongodb://localhost:27017/todos",
  () => {
    console.log("connected to db");
  },
);

// Describes how the data will look
const todoSchema = new mongoose.Schema({
  description: String,
  completed: Boolean,
});

// We turn the schema into a model
const Todo = mongoose.model("todoitem", todoSchema);

module.exports = Todo;
