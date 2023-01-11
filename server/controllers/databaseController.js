const Todo = require("../database/models/Todo");

// get all todos from database
const getAllToDos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (e) {
    throw new Error(e);
  }
};

// create new todo in database
const createNewTodo = async (req, res) => {
  try {
    let todo = new Todo(req.body);
    const newtodo = await todo.save();
    res.send(newtodo);
  } catch (e) {
    res.send(e.message);
  }
};

// delete todo from database
const deleteToDo = async (req, res) => {
  try {
    const response = await Todo.deleteOne({ _id: req.body.id });
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
};

// update todo in database
const updateToDo = async (req, res) => {
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
};

module.exports = {
  getAllToDos,
  createNewTodo,
  deleteToDo,
  updateToDo,
};
