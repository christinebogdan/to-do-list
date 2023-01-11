const express = require("express");
const Todo = require("../database/models/Todo");

const router = express.Router();

// get all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (e) {
    throw new Error(e);
  }
});

// create new todo
router.post("/todo/add", async (req, res) => {
  try {
    let todo = new Todo(req.body);
    const newtodo = await todo.save();
    res.send(newtodo);
  } catch (e) {
    res.send(e.message);
  }
});

// Delete todo
router.delete("/todo/delete", async (req, res) => {
  try {
    const response = await Todo.deleteOne({ _id: req.body.id });
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

// Update todo
router.put("/todo/update", async (req, res) => {
  try {
    const response = await Todo.findOneAndReplace(
      { _id: req.body.id },
      req.body,
      { returnDocument: "after" },
    );
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
