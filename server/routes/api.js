const express = require("express");
const Todo = require("../database/models/Todo");
const databaseController = require("../controllers/databaseController");

const router = express.Router();

// get all todos
router.get("/todos", databaseController.getAllToDos);

// create new todo
router.post("/todo/add", databaseController.createNewTodo);

// Delete todo
router.delete("/todo/delete", databaseController.deleteToDo);

// Update todo
router.put("/todo/update", databaseController.updateToDo);

module.exports = router;
