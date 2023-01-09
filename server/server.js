const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./database/connection");
const apiRouter = require("./routes/routes");

// db connection
dbConnection();

// Server
const app = express();
app.use(bodyParser.json());
app.listen(8000);

// Routes
app.use("/api", apiRouter);

// // ROUTES

// // Get all todos
// app.get("/api/todos", async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.send(todos);
//   } catch (e) {
//     throw new Error(e);
//   }
// });

// // Create new todo
// app.post("/api/todo/add", async (req, res) => {
//   try {
//     let todo = new Todo(req.body);
//     const newtodo = await todo.save();
//     res.send(newtodo);
//   } catch (e) {
//     res.send(e.message);
//   }
// });

// // Delete todo
// app.delete("/api/todo/delete", async (req, res) => {
//   try {
//     const response = await Todo.deleteOne({ _id: req.body.id });
//     res.send(response);
//   } catch (e) {
//     res.send(e.message);
//   }
// });

// // Update todo
// app.put("/api/todo/update", async (req, res) => {
//   try {
//     const response = await Todo.findOneAndReplace(
//       { _id: req.body.id },
//       req.body,
//       { returnDocument: "after" },
//     );
//     res.send(response);
//   } catch (e) {
//     res.send(e.message);
//   }
// });

// Connect to database
// mongoose.connect("mongodb://localhost:27017/todos", () =>
//   console.log("connected to db"),
// );

// const mongoose = require("mongoose");
// const Todo = require("./database/models/Todo");
